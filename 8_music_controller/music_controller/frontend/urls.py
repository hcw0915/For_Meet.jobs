from django.urls import path
from . import views

app_name = 'frontend'  #! 這是三小

urlpatterns = [
    path('', views.index, name=''),
    path('join', views.index),
    path('create', views.index),
    path('room/<str:roomCode>', views.index),
]
