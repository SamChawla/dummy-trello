from django import forms
from .models import Task,TaskOptions

class TaskForm(forms.ModelForm):

    class Meta:
        model = Task
        fields=('title','content','author','tag')