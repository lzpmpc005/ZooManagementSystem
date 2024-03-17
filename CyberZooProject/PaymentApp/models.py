from django.db import models

class CreditCardAccount(models.Model):
    card_number = models.CharField(max_length=16)
    card_holder = models.CharField(max_length=100)
    expire_year = models.IntegerField()
    expire_month = models.IntegerField()
    cvv = models.CharField(max_length=3)
    balance = models.DecimalField(max_digits=10, decimal_places=2)


