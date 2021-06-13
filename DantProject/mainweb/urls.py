from django.urls import path
from .views import homepage

app_name = 'mainweb'
urlpatterns = [
    path('',homepage,name="home")
]