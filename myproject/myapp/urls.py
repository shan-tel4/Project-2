from django.urls import path
from . import views

urlpatterns = [
    path('', views.homepage_view, name='homepage'),  # Root URL
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('contact/', views.contact_view, name='contact'),
    path('session/', views.session_view, name='session'),
]
