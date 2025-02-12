from django.urls import path
from . import views

urlpatterns = [
    path('', views.signup_view, name='signup'),
    path('signup', views.signup_view, name='login'),  # Root URL
    path('login/', views.homepage_view, name='homepage'),
    path('contact/', views.contact_view, name='contact'),
    path('session/', views.session_view, name='session'),
]
