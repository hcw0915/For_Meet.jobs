import requests
import time

# 痞客邦網站
class Pixnet():

  # 餐廳名稱屬性
  def __init__(self, restaurant_name):
    self.restaurant_name = restaurant_name 

  # 取得餐廳食記
  def get_articles(self):
    result = [] 
    # 這個是第一頁的資料 _page=XX 控制每頁資料筆數
    if self.restaurant_name:
      response = requests.get(
        f"https://www.pixnet.net/mainpage/api/tags/{self.restaurant_name}/feeds?filter=articles&sort=latest&per_page=5")
      feeds = response.json()['data']['feeds']

      for feed in feeds:
        avatar = feed['avatar']
        author = feed['display_name']
        title = feed['title']
        hit = feed['hit']
        link = feed['link']
        created_stamp = feed['created_at']
        
        # 時間戳 time_stamp 轉型
        created_array = time.localtime(created_stamp)
        created_at = time.strftime("%Y-%m-%d",  created_array)

        result.append(
          dict(
            avatar = avatar,
            author = author,
            title = title,
            hit = hit,
            link = link,
            created_at = created_at,
            restaurant_name = self.restaurant_name
          )
        )
    return  result


