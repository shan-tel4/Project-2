import os
from pathlib import Path
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-kb48jqvbqd6w^&fe9okw65vz-)0ri)c=v9s%xs=8=+v_w6!=a#')  # Set SECRET_KEY in environment variable for production

DEBUG = False  # Set to False for production on Heroku

ALLOWED_HOSTS = [
    'your-heroku-app.herokuapp.com', 
    'www.your-domain.com', 
    'shay-mixer-5000-94ce7070b792.herokuapp.com',  
]

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'

# Use Whitenoise to serve static files on Heroku
MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Add this line for Whitenoise
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Whitenoise config:
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Static files directories for development
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'myapp/static'),  # Make sure this points to your static directory
]

# For Heroku, set STATIC_ROOT to a directory outside 'myapp'
if not DEBUG:
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')  # Define STATIC_ROOT only once

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'myapp',  # Your app name
]

# Make sure to set ROOT_URLCONF
ROOT_URLCONF = 'myproject.urls'

WSGI_APPLICATION = 'myproject.wsgi.application'

# Database configuration (SQLite for local development, PostgreSQL for production)
DATABASES = {
    'default': dj_database_url.config(default='sqlite:///' + str(BASE_DIR / 'db.sqlite3')),
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Email configuration
if os.getenv('GITPOD_WORKSPACE_ID'):  
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'  # Use console email backend for development
else:
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST = 'smtp.gmail.com'
    EMAIL_PORT = 587
    EMAIL_USE_TLS = True
    EMAIL_USE_SSL = False
    EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
    EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
    DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/login/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Logging for Heroku to track any issues
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}

# TEMPLATES Setting to define where to look for templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),  # Point to templates directory in the root of the project
        ],
        'APP_DIRS': True,  # Allow Django to search for templates in the 'templates' folder inside each app
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

