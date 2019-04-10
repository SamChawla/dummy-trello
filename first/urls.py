from django.urls import path
from first.views import HomeView #,TaskView
from first.utilities import updatetask,updatecontent,newTask

urlpatterns = [
    path('', HomeView.as_view(),name='first-home'),
    path('update', updatetask ,name='update-task'),
    path('updatecontent', updatecontent ,name='update-content'),
    path('new-task',newTask,name="new-task"),
]
