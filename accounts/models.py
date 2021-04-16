from django.db import models
from django.contrib.auth.models import AbstractUser

from django.core.validators import EmailValidator




class User(AbstractUser):

    email = models.EmailField(null=False, blank=False, unique=True, validators=[EmailValidator])
    username = models.CharField( max_length=30, null=False, blank=False, unique=True)

    USERNAME_FIELD = ('email')
    REQUIRED_FIELDS = ('username',)

    def __str__(self):
        return self.username


