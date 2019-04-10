from django.shortcuts import render
from django.http import JsonResponse
from django.views.generic import TemplateView
from django.views.generic.edit import FormView
from .forms import TaskForm
from .mixins import AjaxFormMixin
from first.models import Task,TaskOptions


# Create your views here.

class HomeView(TemplateView):
	template_name = "first/home.html"

	def get_context_data(self,**kwargs):
		context = super(HomeView, self).get_context_data(**kwargs)
		Tasks = TaskOptions.objects.all()
		data = {}
		for task in Tasks:
			data[task] = task.tasks_in_option
		context['data'] = data
		print(data)
		return context

# class TaskView(AjaxFormMixin,FormView):
#     template_name = 'first/task.html'
#     form_class = TaskForm
#     success_url = '/'