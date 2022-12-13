from django.apps import AppConfig


class BaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base'






# {
#   'paginator': None, 
#   'page_obj': None, 
#   'is_paginated': False, 
#   'object_list': <QuerySet [
#       <Task: 吃晚餐>,
#       <Task: ｗｅｒ>, 
#       <Task: qweqwe>, 
#       <Task: qweqwe>]>, 
#   'tasks': <QuerySet [
#     <Task: 吃晚餐>, 
#     <Task: ｗｅｒ>, 
#     <Task: qweqwe>]>, 
#   'view': <base.views.TaskList object at 0x000001DDAE16FDC0>, 
#   'count': 3
# }