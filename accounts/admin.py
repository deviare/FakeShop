from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User
from .forms import MyUserChangeForm, MyUserCreationForm



class UserAdmin(BaseUserAdmin):

    form = MyUserChangeForm
    add_form = MyUserCreationForm
    list_display = ['username', 'email', 'is_superuser', 'date_joined']
    order = ['date_joined']
    search_fields = ['email', 'username']
    model = User



admin.site.register(User, UserAdmin)


