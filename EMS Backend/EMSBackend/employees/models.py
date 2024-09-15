from django.db import models

# Create your models here.
class Employee(models.Model):
    employee_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100,blank=False)
    email = models.EmailField(max_length=100,unique=True,blank=False)
    phone = models.CharField(max_length=14)
    birthday = models.DateField()
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)