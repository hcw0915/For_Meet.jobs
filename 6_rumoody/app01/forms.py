from django import forms
from .models import Post


class PostForm(forms.ModelForm):
  class Meta:
    model = Post
    fields = ['mood', 'nickname', 'message', 'del_pass']
    labels = {
      'mood': '現在心情',
      'nickname': '你的暱稱',
      'message': '心情留言',
      'del_pass': '設定密碼'
    }
