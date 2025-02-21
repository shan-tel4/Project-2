from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.contrib.auth import authenticate, login, logout  # Import for authentication
from django.contrib.auth.decorators import login_required  # Protect views for logged-in users
from .forms import ContactForm

# Login View
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)  # Authenticate user

        if user is not None:
            login(request, user)  # Log the user in
            messages.success(request, 'Login successful!')
            return redirect('session')  # Redirect to session page on successful login
        else:
            messages.error(request, 'Invalid username or password.')  # Show error if login fails

    return render(request, 'login.html')  # Render login page for GET requests or failed logins

# Logout View
def logout_view(request):
    logout(request)  # Log the user out
    messages.success(request, 'You have been logged out successfully.')
    return redirect('login')  # Redirect to login page after logout

# Signup View
def signup_view(request):
    from django.contrib.auth.models import User  # Import inside the function

    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        confirm_password = request.POST['confirm-password']

        if password == confirm_password:
            try:
                user = User.objects.create_user(username=username, email=email, password=password)
                user.save()

                messages.success(request, 'Signup successful!')
                return redirect('session')  # Redirect to session after signup
            except Exception as e:
                print("Error:", e)
                messages.error(request, 'Signup failed. Please try again.')
        else:
            messages.error(request, 'Passwords do not match.')

    return render(request, 'signup.html')

# Contact View
def contact_view(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']

            # Send email
            try:
                send_mail(
                    subject=f"New Contact Form Submission from {name}",
                    message=message,
                    from_email=email,  # Sender's email
                    recipient_list=['shantel490@googlemail.com'],  # Replace with your email
                    fail_silently=False,
                )
                messages.success(request, "Your message has been sent successfully!")
                return redirect('contact')
            except Exception as e:
                messages.error(request, "Failed to send message. Please try again later.")
                print("Email Error:", e)
    else:
        form = ContactForm()

    return render(request, "contact.html", {"form": form})

# Session View (Only accessible if logged in)
@login_required(login_url='login')
def session_view(request):
    return render(request, 'session.html')

# Homepage View
def homepage_view(request):
    return render(request, 'login.html')
