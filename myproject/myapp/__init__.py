from django.urls import path
from . import views  # import views from the current app

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('session/', views.session_view, name='session'),
    path('contact/', views.contact_view, name='contact'),
    path('signup/', views.signup_view, name='signup'),
]
