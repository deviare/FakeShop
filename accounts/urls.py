from django.urls import path, include 
from rest_auth.urls import LoginView, UserDetailsView, LogoutView
from .views import updateUser, RegisterView


urlpatterns =[
        path('login', LoginView.as_view() , name='rest_login'),
        path('logout', LogoutView.as_view() , name='rest_logout'),
        path('register', RegisterView.as_view() , name='rest_user_register_'),
        path('user_details', UserDetailsView.as_view() , name='rest_user_details'),
        path('update_account', updateUser, name='update-account-view'),
        ]
