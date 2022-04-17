from django.shortcuts import render

from uuid import uuid4

import requests 

from .models import *
from .serializers import *

from rest_framework import status, permissions

from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

# Create your views here.
class FoundationViewSet(ModelViewSet):
    queryset = models.Foundation.objects.all()
    serializer_class = FoundationSerializer

class ConsumerOrderViewSet(ModelViewSet):
    queryset = ''
    serializerClass = ConsumerOrderSerializer

    def list(self, request, *args, **kwargs):
        queryset = request.user.consumer.foundation_orders.all()
        serializer = ConsumerOrderSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ConsumerCreate(CreateAPIView):
    model = User
    permission_classes = [permissions.AllowAny]
    serializer_class = ConsumerCreateSerializer

class ConsumerDetail(APIView):
    def get(self, request, format=None):
        profile = request.user.consumer
        serializer = ConsumerSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ConsumerUpdate(APIView):
    def post(self, request, format=None):
        profile = request.user.consumer
        profile.phone = request.data['phone']
        profile.save()

class ConsumerAddWallet(APIView):
    def post(self, request, format=None):
        profile = request.user.consumer
        profile.wallet = Wallet.objects.create(address=request.data['address'])
        profile.save()

def generate_order(request):
    if request.method == 'POST':
        foundation = User.objects.get(username=request.POST['foundation']).foundation
        price = int(request.POST['price'])
        uuid = uuid4()
        order = FoundationOrder.objects.create(consumer=request.user.consumer, foundation=foundation, price=price, uuid=uuid)

        rate = int(requests.get("https://node.deso.org/api/v0/get-exchange-rate").json()["USDCentsPerBitCloutExchangeRate"])

        price_in_nanos = (((10**9) * price) / rate)

        options = {
	        "SenderPublicKeyBase58Check": request.user.consumer.wallet.address,
	        "RecipientPublicKeyOrUsername": foundation.wallet.address,
	        "AmountNanos": price_in_nanos
        }

        hex = request.post('https://node.deso.org/api/v0/send-deso', json=options).json()["TransactionHex"]
        foundation.hex = hex

        foundation.save()

