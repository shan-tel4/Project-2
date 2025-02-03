"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path, include  # Include is needed for nested URL routing

urlpatterns = [
    path('admin/', admin.site.urls),             # Admin page
    path('', include('myapp.urls')),             # Include myapp's URLs for root URL '/'
]

