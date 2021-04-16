from django.shortcuts import render
from .serializers import UserSerializer
from .models import User
from django.db import IntegrityError
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password


from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.parsers import  JSONParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

from io import BytesIO




class RegisterView(APIView):

    def post(self, request):
            stream = BytesIO(request.body)
            data = JSONParser().parse(stream)
            if data['password'] == data['confirm_password']:
                new_user = User(
                        email = data['email'],
                        username = data['username'],
                        password = make_password(data['password'])
                        )
                    
                try:           
                        new_user.full_clean()
                        new_user.save()
                except ValidationError as e:
                    print(e) 
                    return Response(e.error_dict, status=status.HTTP_400_BAD_REQUEST)
                
                return Response({'key':'go to login'}, status = status.HTTP_200_OK)
            
            else:
                return Response({'password':'passwords are not matching'}, status = status.HTTP_400_BAD_REQUEST)




@api_view(['POST'])
def updateUser(request):

    if request.user.is_authenticated:
        stream = BytesIO(request.body)
        data = JSONParser().parse(stream)
        try:
            user =  User.objects.get(pk=request.user.pk)
            user.username = data['username']
            user.email = data['email']
            try:
                user.full_clean()
                user.save()
                serializer = UserSerializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK )
            except ValidationError as e:
                print(e)
                return Response({'error':'invalid email'}, status=status.HTTP_400_BAD_REQUEST)

        except BaseException as e:
            print(e)
            return Response({'error':'user not updated'}, status=status.HTTP_400_BAD_REQUEST)




