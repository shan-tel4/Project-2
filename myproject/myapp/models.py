from django.db import models

# Create your models here.

# models.py

from django.db import models

class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    registration_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username


class AudioFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=100)
    file_path = models.CharField(max_length=255)
    upload_date = models.DateTimeField(auto_now_add=True)
    duration = models.IntegerField()  # Duration in seconds
    format = models.CharField(max_length=10)

    def __str__(self):
        return self.file_name


class Session(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
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

