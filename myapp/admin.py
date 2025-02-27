from django.contrib import admin
from django.contrib.auth.models import User  # Import Django's built-in User model
from .models import AudioFile, Session, Deck, DeckAssignment

# Do NOT register User if you are using Django's built-in User model
admin.site.register(AudioFile)
admin.site.register(Session)
admin.site.register(Deck)
admin.site.register(DeckAssignment)

