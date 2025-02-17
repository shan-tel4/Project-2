from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from .forms import ContactForm

def login_view(request):
    return render(request, 'login.html')

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
                print("trying to save")
                user.save()
                print("saved user")

                messages.success(request, 'Signup successful')
                return redirect('session')
            except Exception as e:
                print("Error", e)
                messages.error(request, 'Could not sign up')
        else:
            print("error")
            messages.error(request, 'Passwords do not match')
            return render(request, 'signup.html', {'error': 'Passwords should match'})

    return render(request, 'signup.html', {'error': 'An error occurred'})

def contact_view(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']

            # Send email (Optional)
            try:
                send_mail(
                    subject=f"New Contact Form Submission from {name}",
                    message=message,
                    from_email=email,  # Sender's email
                    recipient_list=['your_email@example.com'],  # Replace with your email
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

def session_view(request):
    return render(request, 'session.html')

def homepage_view(request):
    return render(request, 'login.html')
