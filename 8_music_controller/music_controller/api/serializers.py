from dataclasses import field
from rest_framework import serializers #! 這是甚麼鬼?
from .models import Room

class RoomSerializer(serializers.ModelSerializer):  #! 這是甚麼鬼?
  class Meta:
    model = Room
    fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at') #! 為什麼要用tuple?

class CreateRoomSerializer(serializers.ModelSerializer):
  class Meta:
    model = Room
    fields = ('guest_can_pause', 'votes_to_skip')
    
class UpdateRoomSerializer(serializers.ModelSerializer):
  code = serializers.CharField(validators=[]) 

  class Meta:
    model = Room
    fields = ('guest_can_pause', 'votes_to_skip', 'code')
    