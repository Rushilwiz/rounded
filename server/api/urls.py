from django.urls import path
from . import views


urlpatterns = [
    path('profile/create', views.ConsumerCreate.as_view()),
    path('profile/', views.ConsumerDetail.as_view()),
    path('foundation/', views.FoundationViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('foundation/<int:pk>/', views.FoundationViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
]