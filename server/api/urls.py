from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('profile/create', views.ConsumerCreate.as_view()),
    path('profile/add_wallet', views.ConsumerAddWallet.as_view()),
    path('profile/update', views.ConsumerUpdate.as_view()),
    path('profile/', views.ConsumerDetail.as_view()),
    path('foundation/', views.FoundationViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('foundation/<int:pk>/', views.FoundationViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('generate_order/', views.generate_order),
]