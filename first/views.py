from django.shortcuts import render
from django.views.generic import TemplateView
from first.models import Task,TaskOptions
from django.views.generic.edit import FormView
from .forms import TaskForm

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

class TaskView(FormView):
    template_name = 'first/task.html'
    form_class = TaskForm
    success_url = '/'

    def form_valid(self, form):
		# This method is called when valid form data has been POSTed.
		# It should return an HttpResponse.
        form.save()
        return super().form_valid(form)


