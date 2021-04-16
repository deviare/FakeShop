from django.db import models
from accounts.models import User






def rename_image(instance, file):
    name = instance.name
    return f'{name}.jpg'





class Item(models.Model):
    name = models.CharField(max_length=30, unique=True, null=False, blank=False)
    price = models.DecimalField(decimal_places=2, max_digits=6, null=False, blank=False)
    image = models.ImageField(upload_to=rename_image, null=False, blank=False)
    description = models.TextField(default='item desc', null=False, blank=False)

    def get_price(self):
        return str(self.price)

    def get_image_path(self):
        if ' ' in self.name:
            return f"static/img/{self.name.replace(' ', '_')}.jpg"
        return f'static/img/{self.name}.jpg'

    def __str__(self):
        return self.name



class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    transiction_id = models.IntegerField(null=True, unique=True)
    date_start = models.DateTimeField(null=False, auto_now_add=True)


    def __str__(self):
            return f'{self.user.username} {self.transiction_id}'


    def get_total(self):
        order_items = self.orderitem_set.all()
        total = sum([ item.get_relative_total() for item in order_items ])
        return str(total)


class OrderItem(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.IntegerField(null=False, blank=False, default=0)

    def get_relative_total(self):
        return self.item.price * self.quantity

    def get_item_image_path(self):
        return self.item.get_image_path()


class ShippingAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    city = models.CharField(max_length=30, null=False, blank=False)
    phone = models.CharField(max_length=30, null=False, blank=False)
    address = models.CharField(max_length=100, null=False, blank=False)
    postal_code = models.CharField(max_length=15, null=False, blank=False)

