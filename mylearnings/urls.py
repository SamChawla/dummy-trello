from django.contrib import admin
from django.urls import path, include
from users.views import signup_view


urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup/',signup_view, name = 'signup'),
    path('', include('first.urls')),
]
