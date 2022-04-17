from django.contrib.auth.models import User

from django.db import models

# Create your models here.
class Wallet (models.Model):
    address = models.CharField(max_length=100)

    def __str__(self):
        return self.address[0:4]
        # return f'{self.consumer.user.username}\'s wallet'
    
    class Meta:
        verbose_name_plural = "Wallets"

class Consumer (models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    wallet = models.OneToOneField(Wallet, null=True, blank=True, on_delete=models.CASCADE)
    access_token = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.user.username}\'s profile'
    
    class Meta:
        verbose_name_plural = "Consumers"

class Foundation (models.Model):
    wallet = models.OneToOneField(Wallet, on_delete=models.CASCADE)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return f'{self.user.username}\'s foundation'
    
    class Meta:
        verbose_name_plural = "Foundations"

class FoundationOrder (models.Model):
    consumer = models.ForeignKey(Consumer, related_name='foundation_orders', on_delete=models.CASCADE)
    foundation = models.ForeignKey(Foundation, related_name='foundation_orders', on_delete=models.CASCADE)
    
    price = models.DecimalField(max_digits=9, decimal_places=2)
    uuid = models.UUIDField(primary_key=True, unique=True)

    class Meta:
        verbose_name_plural = "Foundation Orders"

    def __str__(self):
        return f'{self.consumer.user.username}\'s Order to {self.foundation.name} for {self.price}'