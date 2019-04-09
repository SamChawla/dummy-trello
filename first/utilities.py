from django.http import HttpResponse
from first.models import Task
import json

def updatetask(request):
    task_status_id = request.GET.get('taskstatusid')
    task_id = request.GET.get('taskid')
    task_order = request.GET.get('taskorder')
    task_order = json.loads(task_order)
    #import pdb;pdb.set_trace()

    for idx,value in enumerate(task_order[1:]):
        if Task.objects.filter(id=value).exists():
            task = Task.objects.get(id=value)
            task.order_no = idx
            task.save()

    if Task.objects.filter(id=task_id).exists():
        task = Task.objects.get(id=task_id)
        task.tag_id = task_status_id
        task.save()
        return HttpResponse(json.dumps({'task': f"Task {task_id} Updated"}), content_type="application/json")
    return HttpResponse(json.dumps({'task': f"Task {task_id}  Failed"}), content_type="application/json")

def updatecontent(request):
    updated_content = request.GET.get('updatedcontent')
    task_id = request.GET.get('taskid')
    is_title = request.GET.get('is_title')
    if is_title=="true":
        if Task.objects.filter(id=task_id).exists():
            task = Task.objects.get(id=task_id)
            task.title = updated_content.strip()
            task.save()
            return HttpResponse(json.dumps({'task': f"Task {task_id} Updated"}), content_type="application/json")
        return HttpResponse(json.dumps({'task': f"Task {task_id}  Failed"}), content_type="application/json")
    else:
        if Task.objects.filter(id=task_id).exists():
            task = Task.objects.get(id=task_id)
            task.content = updated_content
            task.save()
            return HttpResponse(json.dumps({'task': f"Task {task_id} Updated"}), content_type="application/json")
        return HttpResponse(json.dumps({'task': f"Task {task_id}  Failed"}), content_type="application/json")
        
    