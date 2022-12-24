from django.shortcuts import render, redirect
from .models import Post, Mood, models
from . forms import PostForm


def index(request, pid=None, del_pass=None):
  posts = Post.objects.filter(enabled=True).order_by('-pub_time')[:30] 
  moods = Mood.objects.all()
  
  if del_pass and pid :
    try:
      post = Post.objects.get(id=pid)
    except:
      post = None
    if post:
      if post.del_pass == del_pass:
        post.delete()
        message = '資料刪除成功'
      else:
        message = '密碼錯誤'

  try:
    user_id = request.POST.get('user_id')
    user_pass = request.POST.get('user_pass')
    user_post = request.POST.get('user_post')
    user_mood = request.POST.get('mood')
  except:
    user_id = None
    message = '如果要張貼訊息則每一個欄位都要填...'

  if user_id != None:
    mood = Mood.objects.get(status=user_mood)
    post = Post.objects.create(
      mood=mood,
      nickname=user_id, 
      del_pass=user_pass, 
      message=user_post
      )
    post.save()
    message=f'成功儲存!請記得你的密碼[{user_pass}]!，訊息需要經過審查之後才會顯示。'
  return render(request, 'index.html', locals())


# ====================================================方法二
def index(request, pid=None, del_pass=None): 
  posts = Post.objects.filter(enabled=True).order_by('-pub_time')[:30]
  moods = Mood.objects.all()

  try:
    user_id = request.POST.get('user_id')
    user_pass = request.POST.get('user_pass')
    user_post = request.POST.get('user_post')
    user_mood = request.POST.get('mood')
  except:
    user_id = None

  if user_id and user_post:
    mood = Mood.objects.get(status=user_mood)
    post = Post.objects.create(
      mood = mood,
      nickname = user_id, 
      del_pass = user_pass, 
      message = user_post
      )
    post.save()
    message='成功儲存!請記得你的密碼[{}]!，訊息需要經過審查之後才會顯示。'.format(user_pass)
  return render(request, 'index.html', locals())


def delete(request, pid, del_pass):
  # * 真刪
  if pid and del_pass:
    post = Post.objects.get(id=pid)
    if post.del_pass == del_pass:
      post.delete()        
      message = '資料刪除成功'
      return redirect('index')
    else:
      message = '密碼錯誤'

  #* 偽刪
  # if pid and del_pass:
  #   post = Post.objects.get(id=pid)
  #   if post.del_pass == del_pass:
  #     # post.delete()        
  #     post.enabled = False
  #     post.save()
  #     message = '資料刪除成功'
  #     return redirect('index')
  #   else:
  #     message = '密碼錯誤'

  return render(request, 'index.html', locals())
