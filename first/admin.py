from django.contrib import admin
from first.models import Task,TaskOptions

# Register your models here.
class TaskAdmin(admin.ModelAdmin):
    pass

class TaskOptionsAdmin(admin.ModelAdmin):
    pass

admin.site.register(Task,TaskAdmin)
admin.site.register(TaskOptions,TaskOptionsAdmin)

