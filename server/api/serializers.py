from operator import mod
from django.contrib.auth.models import User
from rest_framework import serializers

from . import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')

class ConsumerCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        consumer = models.Consumer.objects.create(user=user)
        consumer.save()

        return user
    
    class Meta:
        model = models.User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')

class FoundationSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = models.Foundation
        fields = ('user', 'name', 'description')


class ConsumerOrderSerializer(serializers.ModelSerializer):
    foundation = FoundationSerializer()

    class Meta:
        model = models.FoundationOrder
        fields = ('price', 'uuid', 'foundation')


class ConsumerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = models.Consumer
        fields = ('user', 'access_token', 'foundation_orders')

class FoundationOrderSerializer(serializers.ModelSerializer):
    consumer = ConsumerSerializer()

    class Meta:
        model = models.FoundationOrder
        fields = ('price', 'uuid', 'consumer')

class FoundationOrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FoundationOrder
        fields = ('price', 'uuid', 'foundation')
