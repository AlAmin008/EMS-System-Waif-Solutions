from django.shortcuts import render
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from .models import Employee
from .serializers import EmployeeSerializer
import os
import random
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

# Create your views here.
class EmployeesView(APIView):

    def get(self,request):
        employees = Employee.objects.all()

        # Handle search parameters
        name = request.query_params.get('name', '')
        email = request.query_params.get('email', '')
        birthday = request.query_params.get('birthday', '')
        mobile = request.query_params.get('mobile', '')

        # Apply search filters
        if name:
            employees = employees.filter(name__icontains=name)
        if email:
            employees = employees.filter(email__icontains=email)
        if birthday:
            employees = employees.filter(birthday=birthday)
        if mobile:
            employees = employees.filter(mobile=mobile)

        if not employees.exists():
            return Response(status=status.HTTP_204_NO_CONTENT)

        sort_by = request.query_params.get('sort_by')
        order = request.query_params.get('order_by', 'asc')

        if sort_by:
            if order == 'desc':
                employees = employees.order_by(f'-{sort_by}')
            else:
                employees = employees.order_by(sort_by)
        
        paginator = LimitOffsetPagination()  
        limit = request.query_params.get('limit', 2)
        try:
            limit = int(limit) 
        except ValueError:
            return Response({"error": "Invalid page size"}, status=status.HTTP_400_BAD_REQUEST)
        paginator.default_limit = limit
        paginated_employees = paginator.paginate_queryset(employees, request)
        serializer = EmployeeSerializer(paginated_employees, many=True)
        return paginator.get_paginated_response(serializer.data)
 
class EmployeeCreateView(APIView):
       def post(self, request):
            new_employee = EmployeeSerializer(data = request.data)
            if new_employee.is_valid():
                new_employee.save()
                return Response(new_employee.data,status=status.HTTP_201_CREATED)
            return Response(new_employee.errors, status= status.HTTP_406_NOT_ACCEPTABLE) 
    
class EmployeeDetailView(APIView):
        def get(self,request,pk):
            try:
                employee = Employee.objects.get(pk=pk)
            except Employee.DoesNotExist:
                return Response({"msg":"Not Found"},status=status.HTTP_404_NOT_FOUND)
            serializer = EmployeeSerializer(employee)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        
       
        def put(self,request,pk):
            try:
                employee = Employee.objects.get(pk=pk)
            except Employee.DoesNotExist:
                return Response({"msg":"Not Found"},status=status.HTTP_404_NOT_FOUND)
            serializer = EmployeeSerializer(employee,data = request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
       
        def delete(self, request, pk):
            try:
                employee = Employee.objects.get(pk=pk)
            except Employee.DoesNotExist:
                return Response({"msg": "Not Found"}, status=status.HTTP_404_NOT_FOUND)
            
            employee.delete()
            return Response({"msg": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

    