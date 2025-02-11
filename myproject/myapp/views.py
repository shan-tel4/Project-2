from django.shortcuts import render

def login_view(request):
    return render(request, 'login.html')

def signup_view(request):
    return render(request, 'signup.html')

def contact_view(request):
    return render(request, 'contact.html')

def session_view(request):
    return render(request, 'session.html')
