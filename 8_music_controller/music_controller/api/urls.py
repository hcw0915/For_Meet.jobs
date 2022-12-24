from django.urls import path
from .views import GetRoom, JoinRoom, RoomView, CreateRoomView, UpdateView, UserInRoom, LeaveRoom

urlpatterns = [
    # path('', views.main, name="main"),
    path('room', RoomView.as_view()), #! Roomview.as_view()又是甚麼鬼
    path('create-room', CreateRoomView.as_view()),
    path('get-room',GetRoom.as_view()),
    path('join-room',JoinRoom.as_view()),
    path('user-in-room', UserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path('update-room', UpdateView.as_view()),
]
