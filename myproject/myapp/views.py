from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.decorators import login_required
from .forms import ContactForm, AudioUploadForm
from .models import AudioFile


# ✅ Homepage View (Fixed)
def homepage_view(request):
    return render(request, 'login.html')  # Ensure you have a `homepage.html` in `templates/`


# ✅ Login View
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, 'Login successful!')
            return redirect('session')
        else:
            messages.error(request, 'Invalid username or password.')

    return render(request, 'session.html')


# ✅ Logout View
def logout_view(request):
    logout(request)
    messages.success(request, 'You have been logged out successfully.')
    return redirect('login')


# ✅ Signup View
def signup_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm-password')

        if password != confirm_password:
            messages.error(request, 'Passwords do not match.')
            return redirect('signup')

        User = get_user_model()

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists. Please choose a different one.')
            return redirect('signup')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'An account with this email already exists.')
            return redirect('signup')

        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
            messages.success(request, 'Signup successful! You can now log in.')
            return redirect('login')
        except Exception as e:
            messages.error(request, f'Signup failed: {str(e)}. Please try again.')

    return render(request, 'signup.html')


# ✅ Contact View (Fixed)
def contact_view(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']

            try:
                send_mail(
                    subject=f"New Contact Form Submission from {name}",
                    message=message,
                    from_email=email,
                    recipient_list=['shantel490@googlemail.com'], 
                    fail_silently=False,
                )
                messages.success(request, "Your message has been sent successfully!")
                return redirect('contact')
            except Exception as e:
                messages.error(request, f"Failed to send message: {str(e)}. Please try again later.")
    else:
        form = ContactForm()

    return render(request, "contact.html", {"form": form})


# ✅ Session View (Added Missing Function)
@login_required(login_url='login')
def session_view(request):
    if request.method == 'POST':
        form = AudioUploadForm(request.POST, request.FILES)
        if form.is_valid():
            audio_file = form.save(commit=False)
            audio_file.user = request.user
            audio_file.save()
            messages.success(request, "Audio file uploaded successfully!")
            return redirect('session')
        else:
            messages.error(request, "Error uploading audio file. Please try again.")

    else:
        form = AudioUploadForm()

    uploaded_tracks = AudioFile.objects.filter(user=request.user)

    return render(request, 'session.html', {'form': form, 'uploaded_tracks': uploaded_tracks})
