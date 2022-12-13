from django.shortcuts import render,HttpResponse, redirect
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView, FormView
from django.urls import reverse_lazy

from django.contrib.auth.views import LoginView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.forms import UserCreationForm 
from django.contrib.auth import login 

from base.models import Task


class CustomLoginView(LoginView):
  template_name = 'base/login.html'
  fields = '__all__'
  redirect_authenticated_user = True

  def get_success_url(self):
    return reverse_lazy('tasks')
#! reverse_lazy() 多用於 CBVs 在 url載入前, reverse() 多用於 FBVs 在 url載入喉
#! https://blog.csdn.net/qq_38534144/article/details/103834966

class RegisterPage(FormView):
  template_name = 'base/register.html'
  form_class = UserCreationForm 
  redirect_authenticated_user = True
  success_url = reverse_lazy('tasks')

  def form_valid(self, form):
    user = form.save()
    if user is not None:
      login(self.request, user)
    return super(RegisterPage, self).form_valid(form)

  def get(self, *args, **kwargs):
    '''
    如果request的user是經過驗證為True
    則導回'tasks'這個網頁
    '''
    if self.request.user.is_authenticated:
      return redirect('tasks')
    return super(RegisterPage, self).get(*args, **kwargs)


class TaskList(LoginRequiredMixin, ListView):
  model = Task
  context_object_name = 'tasks'
  
  def get_context_data(self, **kwargs):
    # 取得字典型態的 context
    context = super().get_context_data(**kwargs)
    # print(context['tasks'])
    # print(context)
    context['tasks'] = context['tasks'].filter(user=self.request.user) #! 這裡是篩選會員不同
    context['count'] = context['tasks'].filter(complete=False).count() #! 這裡是數有幾項未完成的
    # print(context)
    # print(self.request)
    # print(self.request.user)
    search_input = self.request.GET.get('search-area', '')
    if search_input :
      context['tasks'] = context['tasks'].filter(title__icontains=search_input)  #! title裡面包含的字串

    context['search_input'] = search_input
    return context

class TaskDetail(LoginRequiredMixin, DetailView):
  # ListView可以展示某個資料庫模型裡的資料，像內建查詢功能一樣
  # models、context_object_name 都是繼承 DetailViews 下的屬性之一
  # 所以也不用去return render(HTML),建立class之後 就會自動找尋名為 (class名)_detail.html 的網頁
  model = Task
  context_object_name = 'task'  #! 自訂在html裡面所顯示的變數名稱 ( 預設為 {{ object }} )
  template_name = 'base/task.html' #! 自訂html名稱 ( 預設為 (class名)_detail.html )

class TaskCreate(LoginRequiredMixin, CreateView):
  model = Task
  fields = ['title', 'description', 'complete']
  success_url = reverse_lazy('tasks') 

  # """If the form is valid, save the associated model."""  
  def form_valid(self, form):
    # 指定在form 送出的資料裡的user為request.user (當下登入的user)，
    form.instance.user = self.request.user 
    # print(form)
    return super(TaskCreate, self).form_valid(form)


class TaskUpdate(LoginRequiredMixin, UpdateView):
  model = Task
  fields = ['title', 'description', 'complete']
  success_url = reverse_lazy('tasks')

class TaskDelete(LoginRequiredMixin, DeleteView):
  model = Task
  context_object_name = 'task'  
  success_url = reverse_lazy('tasks')