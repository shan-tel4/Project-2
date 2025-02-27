from django import forms
from .models import AudioFile  # Ensure models are imported

class ContactForm(forms.Form):  
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    message = forms.CharField(widget=forms.Textarea)

class AudioUploadForm(forms.ModelForm):
    class Meta:
        model = AudioFile
        fields = ['file']
