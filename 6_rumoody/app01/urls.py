from django.urls import path
from .views import index, delete
# from .views import Index


urlpatterns = [
  # 方法一
  path('', index, name="index"),
  path('<int:pid>/<str:del_pass>', index, name="delete"),
  
  # 方法二
  # path('<int:pid>/<str:del_pass>', delete, name="delete"),
]