from django.shortcuts import render
from django.views.generic import ListView, DetailView
from django.shortcuts import get_object_or_404


# Create your views here.
def home_view(request):
    hv = "."
    return render(request,'main/home.html',{'hv':hv})