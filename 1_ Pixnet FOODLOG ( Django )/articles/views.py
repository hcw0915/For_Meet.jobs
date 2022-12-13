from django.shortcuts import render
from .scrapers import Pixnet

# Create your views here.

def index(request):
  articles = ''
  restaurant = []

  if request.method == "POST":
    pixnet = Pixnet(request.POST.get('restaurant_name'))
    articles = pixnet.get_articles()
    # 找歷史資訊-
    restaurant.append(articles[0]["restaurant_name"])

  context = {
    'articles': articles, 
    'restaurant': restaurant
  }
  return render(request, "index.html", context)

