from django.shortcuts import render
from django.contrib import messages
from django.shortcuts import redirect

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
                # login(request, user)
                print("saved user")

                messages.success(request, 'signup successfully')
                return redirect('contact')
            except Exception as e:
                print("Error", e)
                messages.error(request, 'could not signup')
                # return render(request, 'signup.html', {'error': 'An error occurred'})
        else:
            print("error ")
            messages.error(request, 'could not piiiiiii')
            return render(request, 'signup.html', {'error': 'Password should match'})
    else:
         return render(request, 'signup.html', {'error': 'An error occurred'}) 

    print("nowww")
   
    return render(request, 'signup.html')

def contact_view(request):
    return render(request, 'contact.html')

def session_view(request):
    return render(request, 'session.html')

def homepage_view(request):
    return render(request, 'homepage.html')
