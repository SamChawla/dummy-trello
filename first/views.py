from django.shortcuts import render
from django.views.generic import TemplateView
from first.models import Task

# Create your views here.

class HomeView(TemplateView):
	template_name = "first/home.html"

	def get_context_data(self,**kwargs):
		context = super(HomeView, self).get_context_data(**kwargs)
		context['todo'] = Task.objects.filter(tag='TODO').values().order_by('order_no','-date_posted')
		context['inprogress']=Task.objects.filter(tag='INPROGRESS').values().order_by('order_no','-date_posted')
		context['done'] = Task.objects.filter(tag='DONE').values().order_by('order_no','-date_posted')
		return context


