from django.contrib import admin
from .models import Mood, Post

# Register your models here.
class PostAdmin(admin.ModelAdmin):
  list_display = ('id','nickname','message','enabled', 'pub_time','mood', 'del_pass')
  ordering = ('-pub_time',)


admin.site.register(Mood)
admin.site.register(Post,PostAdmin)