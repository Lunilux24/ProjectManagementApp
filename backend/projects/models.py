from django.db import models

class Project(models.Model):
    class Status(models.TextChoices):
        READY = 'ready', 'Ready'
        IN_PROGRESS = 'in_progress', 'In Progress'
        COMPLETED = 'complete', 'Completed'
        
    name = models.CharField(max_length=70, blank=False, default='')
    description = models.TextField(max_length=500, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.READY)
