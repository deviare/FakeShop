from django import forms 
from .models import User
from django.contrib.auth.forms import UserCreationForm, UserChangeForm




class MyUserCreationForm(UserCreationForm):

    email = forms.EmailField(widget=forms.EmailInput)
    class Meta:
        model = User
        fields = ('email',)





class MyUserChangeForm(UserCreationForm):

    class Meta:
        model = User
        fields = UserChangeForm.Meta.fields









