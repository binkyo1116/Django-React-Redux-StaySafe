from django.db import models
from django.conf import settings


class Product(models.Model):
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=200, null=False, blank=False)
    category = models.CharField(max_length=200, null=False, blank=False)
    image = models.ImageField(null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    usecase = models.CharField(max_length=200, null=False, blank=False)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)
    numReviews = models.IntegerField(null=False, blank=False, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)
    countInStock = models.IntegerField(null=False, blank=False, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name
 

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=200, null=False, blank=False)
    rating = models.IntegerField(null=False, blank=False, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)
    paymentMethod = models.CharField(max_length=200, null=False, blank=False)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200, null=False, blank=False)
    quantity = models.IntegerField(null=False, blank=False, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=False, blank=False)
    city = models.CharField(max_length=200, null=False, blank=False)
    postalCode = models.CharField(max_length=200, null=False, blank=False)
    country = models.CharField(max_length=200, null=False, blank=False)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)
