from django.urls import path
from first.views import home_view,update_content,update_task,new_task,new_tag

urlpatterns = [
    path('', home_view,name='first-home'),
    path('update', update_task ,name='update-task'),
    path('updatecontent', update_content ,name='update-content'),
    path('newtask',new_task ,name="new-task"),
    path('newtag',new_tag,name="new-tag")
]
