from django.urls import path
from .views import EmployeesView,EmployeeDetailView,EmployeeCreateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('employees/',EmployeesView.as_view(),name='Employee_list'),
    path('employee/',EmployeeCreateView.as_view(),name='Add_Employee'),
    path('employee/<int:pk>/',EmployeeDetailView.as_view(),name='Employee_detail'),
]
