from django.db import models
from django.conf import settings
from django.utils import timezone


class TaskOptions(models.Model):
    """
    Model to cretae Task Options
    """
    title = models.CharField(max_length=20)
    order_no = models.IntegerField(null=True, blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    @property
    def tasks_in_tag(self):
        tasks = Task.objects.filter(tag=self, author_id=self.author).values().order_by('order_no', '-date_posted')
        return tasks


class Task(models.Model):
    """
    Model to create Tasks
    """
    title = models.CharField(max_length=100)
    content = models.TextField()
    order_no = models.IntegerField(null=True, blank=True)
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tag = models.ForeignKey('TaskOptions', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    def update_order_no(self,order):
        self.order_no = order
        self.save()

    def update_tag_id(self, status_id):
        self.tag_id = status_id
        self.save()
