from django.urls import path
from .views import homepage_view, login_view, signup_view, contact_view, session_view

urlpatterns = [
    path('', homepage_view, name='homepage'), 
    path('login/', login_view, name='login'),
    path('signup/', signup_view, name='signup'),
    path('contact/', contact_view, name='contact'),
    path('session/', session_view, name='session'),
]
