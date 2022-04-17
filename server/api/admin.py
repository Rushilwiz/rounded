from django.contrib import admin

from . import models

# Register your models here.
admin.site.register(models.Consumer)
admin.site.register(models.Foundation)
admin.site.register(models.Wallet)
admin.site.register(models.FoundationOrder)