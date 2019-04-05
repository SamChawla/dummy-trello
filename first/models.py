from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Task(models.Model):

    PROGRESS = (
        ('TODO','To-Do'),
        ('INPROGRESS','In-Progress'),
        ('DONE','Done')
    )
    title = models.CharField(max_length=100)
    content = models.TextField()
    order_no = models.IntegerField(null=True,blank=True)
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    tag = models.CharField(max_length=15,choices=PROGRESS,default='TODO')

    def __str__(self):
        return self.title