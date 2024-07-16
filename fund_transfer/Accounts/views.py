from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Account
import csv
from django.db import transaction
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from rest_framework.decorators import api_view
from rest_framework.response import Response
from decimal import Decimal
@api_view(['POST'])
def import_accounts(request):
    if request.method == 'POST' and request.FILES['file']:
        
        csv_file = request.FILES['file']
        file_data = csv_file.read().decode("utf-8")
        lines = file_data.split("\n")
        for line in lines[1:]:
            fields = line.split(",")
            if len(fields) == 3:
                id, name, balance = fields
                
                Account.objects.create(id=id, name=name, balance=Decimal(balance))
        return Response({"status": "success"})
    return Response({"status": "failed"})

@api_view(['GET'])
def list_accounts(request):
    accounts = Account.objects.all()
    return Response({"accounts": list(accounts.values())})

@api_view(['GET'])
def get_account(request, id):
    try:
        account = Account.objects.get(id=id)
        return Response({"status":"success","data":{"id": account.id, "name": account.name, "balance": account.balance}})
    except:
        return Response({"status": "failed", "message": "Account not found"})

@api_view(['POST'])
def transfer_funds(request):
    if request.method == 'POST':
        from_account_number = request.data['from_account']
        to_account_number = request.data['to_account']
        amount = Decimal(request.data['amount'])

        try:
            from_account = Account.objects.get(id=from_account_number)
            to_account = Account.objects.get(id=to_account_number)
            if(amount<=0):
                return Response({"status": "failed", "message": "Amount should be greater than 0"})
            if(from_account== to_account):
                return Response({"status": "failed", "message": "Cannot transfer funds to the same account"})
                
            if(from_account.balance<amount):
                return Response({"status": "failed", "message": "Insufficient funds"})
            if from_account.balance >= amount:
                from_account.balance -= amount
                to_account.balance += amount
                from_account.save()
                to_account.save()
                return Response({"status": "success"})
            else:
                return Response({"status": "failed", "message": "Insufficient funds"})
        except:
            return Response({"status": "failed", "message": "Account not found"})
    else:
        return Response({"status": "failed", "message": "Invalid request"})


    
