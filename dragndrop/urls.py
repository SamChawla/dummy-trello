from django.urls import path
from dragndrop.views import HomeView

urlpatterns = [
    path('', HomeView.as_view(),name='dragndrop-home'),
]
