
from django.contrib import admin
from .models import User, AudioFile, Session, Deck, DeckAssignment  # Import all models

# Register each model
admin.site.register(User)
admin.site.register(AudioFile)
admin.site.register(Session)
admin.site.register(Deck)
admin.site.register(DeckAssignment)

