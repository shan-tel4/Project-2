import os
from pathlib import Path
import dj_database_url

# Path to the project directory
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-kb48jqvbqd6w^&fe9okw65vz-)0ri)c=v9s%xs=8=+v_w6!=a#')  # Set SECRET_KEY in environment variable for production

# Turn off debug mode in production
DEBUG = os.getenv('DEBUG', 'False') == 'True'  # Use environment variable for control

ALLOWED_HOSTS = [
    'localhost', 
    '127.0.0.1', 
    '8000-shantel4-project2-joy9cunfd3c.ws-eu118.gitpod.io'
]


# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'

# Whitenoise middleware to serve static files in production
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

# Whitenoise static files storage
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Static files directories for development
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'myapp/static'),  # This points to your static directory inside your app
]

# Set STATIC_ROOT for production static files
if not DEBUG:
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')  # Directory for static files in production

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

# Root URL configuration
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

# Internationalization settings
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Email configuration for both development (Gitpod) and production
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

# Templates configuration
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),  # This is if you keep it in the root level
        ],
        'APP_DIRS': True,  # Allow Django to search inside 'templates' of each app
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

# Security settings for production (use HTTPS, secure cookies)
if not DEBUG:
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    SECURE_SSL_REDIRECT = True  # Redirect HTTP to HTTPS
    X_FRAME_OPTIONS = 'DENY'  # Add this to block clickjacking attacks
    SECURE_HSTS_SECONDS = 3600  # Use HTTP Strict Transport Security for one hour
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True


if os.getenv('HEROKU_APP_NAME'):
    SECURE_SSL_REDIRECT = True

# Django security settings (for production environments)
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True

# Set session cookie and CSRF cookie to be secure in production
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

# Static files configuration for production
WHITENOISE_ROOT = os.path.join(BASE_DIR, 'staticfiles')  # Ensure this points to the correct folder for production




