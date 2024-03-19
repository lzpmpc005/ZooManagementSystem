from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
import json

from .models import CreditCardAccount


@api_view(["POST"])
def checkout(request):
    data = json.loads(request.body)
    card_number = data.get("cardNumber")
    account = CreditCardAccount.objects.filter(card_number=card_number).first()
    if not account:
        return JsonResponse({"message": "No Account Found."}, status=400)
    try:
        holder = data.get("cardName")
        expire_month = int(data.get("expireMonth"))
        expire_year = int(data.get("expireYear"))
        cvv = data.get("cvv")
        if not (holder == account.card_holder
                and expire_month == account.expire_month
                and expire_year == account.expire_year
                and cvv == account.cvv):
            return JsonResponse({"message": "Invalid Card Information."}, status=400)
        return JsonResponse({"message": "Payment Successful."}, status=200)
    except Exception as e:
        return JsonResponse({"message": str(e)}, status=400)
