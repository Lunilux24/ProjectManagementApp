from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    class Status(models.TextChoices):
        READY = 'ready', 'Ready'
        IN_PROGRESS = 'in_progress', 'In Progress'
        COMPLETED = 'complete', 'Completed'
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=70, blank=False, default='')
    description = models.TextField(max_length=500, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.READY)

class Tasks(models.Model):
    project = models.ForeignKey(Project, related_name='tasks', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=False, default='')
    description = models.TextField(max_length=300, blank=True, default='')
    status = models.CharField(max_length=20, choices=Project.Status.choices, default=Project.Status.READY)
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateField(null=True, blank=True)
    
