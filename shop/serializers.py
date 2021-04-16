from rest_framework import serializers

from .models import Item, OrderItem, ShippingAddress




class ItemSerializer(serializers.ModelSerializer):
    
    image = serializers.CharField(source='get_image_path')
    price = serializers.CharField(source='get_price')

    class Meta:
        model = Item
        fields = [
                'name',
                'price',
                'image',
                'description',
                'id'
                ]


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        exclude = [
                'order',
                'user'
                ]
    
    def get_if_exits(self, user, validated_data):
        try:
            return ShippingAddress.objects.get(**validated_data, user=user)
        except ShippingAddress.DoesNotExist:
            return None



class OrderItemSerializer(serializers.ModelSerializer):

    relative_total = serializers.CharField(source='get_relative_total')
    image = serializers.CharField(source='get_item_image_path')
    price = serializers.CharField(source='item.price')
    name = serializers.CharField(source='item.name')

    class Meta:
        model = OrderItem
        fields = [
                'item',
                'name',
                'quantity',
                'relative_total',
                'image',
                'price'
                ]
