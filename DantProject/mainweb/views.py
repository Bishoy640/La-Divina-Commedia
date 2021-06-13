from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpRequest

# Create your views here.

def homepage(request):
    to_home = ""
    return render(request,"index.html",{"home":to_home})
