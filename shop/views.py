from django.shortcuts import render
from django.views.generic import TemplateView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from .serializers import ItemSerializer, OrderItemSerializer, ShippingAddressSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Item, OrderItem, Order, ShippingAddress

from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.parsers import JSONParser

from django.http import JsonResponse

import io
import json
import random


@method_decorator(ensure_csrf_cookie, name='dispatch')
class ReactView(TemplateView):
    template_name = 'index.html'


@csrf_exempt
def all_products(request):
    if request.method == 'POST':
        query_set = Item.objects.all()
        data = []

        for item in query_set:
            data.append(ItemSerializer(item).data)
        
        return JsonResponse(data , safe=False)
    return JsonResponse({'error':'Methon GET not allowed'} , safe=False)



@api_view(['GET'])
@ensure_csrf_cookie
def get_token(request):
    if request.method == 'GET':
        return JsonResponse({'message':'csrf token cookie is set'}, safe= False)
    return JsonResponse({'erro':'method not allowed'}, safe= False)


@api_view(['POST'])
@csrf_exempt
def updateCart(request):
    if request.method == 'POST' and request.user.is_authenticated:
        data = json.loads(request.body)
        action = data['action']
        quantity = data['quantity']
        product_id = data['id']
        item = Item.objects.get(id=product_id)
        order, created = Order.objects.get_or_create(user=request.user, completed=False) 
        orderItem, created = OrderItem.objects.get_or_create(order=order, item=item)
        if action == 'add': 
            orderItem.quantity += quantity
            orderItem.save()

    
        if action == 'remove':
            
            current_quantity = orderItem.quantity
            if current_quantity <= 1:
                OrderItem.objects.get(id=orderItem.id).delete()

            else:
                orderItem.quantity -=1
                orderItem.save()
        allOrderItems = OrderItem.objects.filter(order=order)
        response = []

        for element in allOrderItems:
            response.append(OrderItemSerializer(element).data)

        return Response(response, status=status.HTTP_200_OK )

    return Response({'error':'method not allowd or user not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def get_cart_items(request):

    if request.user.is_authenticated:
        response = []
        order = get_object_or_404(Order, user=request.user, completed=False)
        orderItems = OrderItem.objects.filter(order=order)

        for order_item in orderItems:
            response.append(OrderItemSerializer(order_item).data)        
   
        print(response)
        return Response(response, status = status.HTTP_200_OK)






@api_view(['POST'])
def get_addreses(request):

    if request.user.is_authenticated:
        shipping_addreses = ShippingAddress.objects.filter(user=request.user)
        if len(shipping_addreses) != 0:
            response = [ ShippingAddressSerializer(address).data for address in shipping_addreses  ]
            return Response( response, status=status.HTTP_200_OK )
        return Response( {'message':'no addreses for this user'}, status=status.HTTP_200_OK ) 
    return Response( {'error':'user is not authanticated'}, status=status.HTTP_401_UNAUTHORIZED) 



@api_view(['POST'])
def delete_shipping_address(request):
    if request.user.is_authenticated:
        stream = io.BytesIO(request.body)
        data = JSONParser().parse(stream)
        addr_serializer = ShippingAddressSerializer(data=data )
        if addr_serializer.is_valid():
            old_addr = addr_serializer.get_if_exits( request.user, addr_serializer.validated_data ) 

            if old_addr is not None:
                old_addr.delete()
                return Response(addr_serializer.data, status=status.HTTP_200_OK)
            return Response({'message':'address does not exists'}, status=status.HTTP_208_ALREADY_REPORTED)
        return Response(addr_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['POST'])    
def process_order(request):
    if request.user.is_authenticated:
        stream = io.BytesIO(request.body) 
        data = JSONParser().parse(stream)
        if not data['phone'].startswith('+'):
            return Response({'error':'phone number have to start with country prefix, es: +1'}, status=status.HTTP_400_BAD_REQUEST)
        address_serialized = ShippingAddressSerializer(data=data)
        order = get_object_or_404(Order, user=request.user, completed=False)
        orderItems = OrderItem.objects.filter(order=order)
        completed_order = []
        
        if address_serialized.is_valid():
            address = address_serialized.get_if_exits( request.user, address_serialized.validated_data)
            if address is None:
                address_serialized.save( user=request.user, order=order)
            
            for orderItem in orderItems:
                item_ser = {
                            'item_id':orderItem.item.id,
                            'name': orderItem.item.name,
                            'quantity':orderItem.quantity,
                            'price':orderItem.item.get_price(),
                        }
                completed_order.append(item_ser)
            order_meta = {
                    'total':order.get_total(),
                    'shipping_address':address_serialized.data
                    }
            completed_order.append(order_meta)

            

            while True:
                transition = random.randint(1235, 999999999)
                try:
                    Order.objects.get(transiction_id=transition)
                    continue
                except Order.DoesNotExist:
                    break


            order.completed=True
            order.transiction_id = transition
            order.save()
            print(json.dumps(completed_order, indent=4 ))
            return Response ( {'message':'nice onee'}, status=status.HTTP_200_OK )

    
