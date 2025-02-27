from django.db import models
from django.conf import settings  # Use settings.AUTH_USER_MODEL instead of get_user_model()

class AudioFile(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  
    file = models.FileField(upload_to='uploads/', null=True, blank=True)
    upload_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name if self.file else "No File"

class Session(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    session_date = models.DateTimeField(auto_now_add=True)
    session_name = models.CharField(max_length=100)

    def __str__(self):
        return self.session_name

class Deck(models.Model):
    deck_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.deck_name

class DeckAssignment(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    deck = models.ForeignKey(Deck, on_delete=models.CASCADE)
    audio_file = models.ForeignKey(AudioFile, on_delete=models.CASCADE)
    speed = models.FloatField()
    preserve_pitch = models.BooleanField(default=True)

    def __str__(self):
        return f"Assignment {self.id}"
