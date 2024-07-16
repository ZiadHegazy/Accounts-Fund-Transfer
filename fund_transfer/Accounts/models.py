from django.db import models

# Create your models here.
class Account(models.Model):
    id=models.TextField(primary_key=True)
    name=models.CharField(max_length=100,default="")
    balance=models.DecimalField(max_digits=10, decimal_places=2,default=0.0)
