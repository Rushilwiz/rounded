from django.shortcuts import render

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

