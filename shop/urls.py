from django.urls import path, include 
from .views import (
        ReactView,
        all_products,
        updateCart,
        get_token,
        get_cart_items,
        get_addreses,
        delete_shipping_address,
        process_order
        )

urlpatterns = [

        path('',ReactView.as_view(), name='react-view'),
        path('all_products', all_products, name='all-products-view'),
        path('update_item', updateCart, name='update-cart-view'),
        path('get_token', get_token , name='get-token-view'),
        path('get_cart_items', get_cart_items , name='get-cart-items-view'),
        path('get_shipping_address', get_addreses , name='get-addredes-view'),
        path('delete_shipping_address', delete_shipping_address, name='delete-shipping-address-view'),  
        path('process_order', process_order, name='process_order-view'),        
        ]
