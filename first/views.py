import json
from django.views import View
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.views.generic import TemplateView

from first.forms import TaskForm
from first.models import Task,TaskOptions

def updated_data():
    """
    Method to get a dictionary with keys as tags and values as tasks.
    """
    Tasks = TaskOptions.objects.all() # As in ToDo,InProgress etc.
    data = {}
    # Loop over each tag and get the tasks from each
    for task in Tasks:
        data[task] = task.tasks_in_tag
    return data


class HomeView(TemplateView):
	template_name = "first/home.html"

	def get_context_data(self,**kwargs):
		context = super(HomeView, self).get_context_data(**kwargs)
		data = updated_data()
		context['data'] = data
		return context

home_view = HomeView.as_view()

class UpdateTaskView(View):

    def post(self, request, *args, **kwargs):
        task_status_id = request.POST.get('taskstatusid')
        task_id = request.POST.get('taskid')
        task_order = request.POST.get('taskorder')
        task_order = json.loads(task_order)

        for idx,value in enumerate(task_order[2:]):
            if Task.objects.filter(id=value).exists():
                task = Task.objects.get(id=value)
                task.update_order_no(idx)

        if Task.objects.filter(id=task_id).exists():
            task = Task.objects.get(id=task_id)
            task.update_tag_id(task_status_id)
        data = updated_data()
        return render(request, 'first/tasks.html', {'data':data})

update_task = UpdateTaskView.as_view()

class UpdateContentView(View):

    def post(self, request, *args, **kwargs):
        updated_content = request.POST.get('updatedcontent')
        task_id = request.POST.get('taskid')
        is_title = request.POST.get('is_title')
        if is_title=="true":
            if Task.objects.filter(id=task_id).exists():
                task = Task.objects.get(id=task_id)
                task.title = updated_content.strip()
                task.save()
            return HttpResponse(json.dumps({'title':task.title}))
        else:
            if Task.objects.filter(id=task_id).exists():
                task = Task.objects.get(id=task_id)
                task.content = updated_content
                task.save()
            return HttpResponse(json.dumps({'content':task.content}))

update_content = UpdateContentView.as_view()

class NewTaskView(View):

    def post(self, request, *args, **kwargs):
        task_title = request.POST.get("title")
        task_content = request.POST.get("content")
        task_user_id = request.POST.get("user_id")
        task_status_id = request.POST.get("status_id")
        task_user = User.objects.get(id=task_user_id)
        task_status = TaskOptions.objects.get(id=task_status_id)
        data = {'title':task_title,'content':task_content,'author':task_user,'tag':task_status}
        task = Task.objects.create(**data)
        data = updated_data()
        return render(request, 'first/tasks.html', {'data':data})

new_task = NewTaskView.as_view()


class NewTagForm(View):

    def post(self, request, *args, **kwargs):
        tag_title = request.POST.get("title")
        order = TaskOptions.objects.all().count()

        data = {'title':tag_title,'order_no':order}
        tag = TaskOptions.objects.create(**data)
        data = updated_data()
        return render(request, 'first/tasks.html', {'data':data})

new_tag=NewTagForm.as_view()

class DeleteTask(View):

    def get(self, request, *args, **kwargs):
        task_id = kwargs['id']
        task = Task.objects.get(id=task_id)
        task.delete()
        data = updated_data()
        return render(request, 'first/tasks.html', {'data':data})

delete_task=DeleteTask.as_view()