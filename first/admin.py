from django.contrib import admin
from first.models import Task

# Register your models here.
class TaskAdmin(admin.ModelAdmin):
    pass

admin.site.register(Task,TaskAdmin)

