from django.urls import path
from projects import views

urlpatterns = [
    path('projects/', views.project_list),
    path('projects/<int:pk>/', views.project_detail),
    path('projects/<int:project_id>/tasks/', views.create_task),
    path('tasks/<int:pk>/', views.update_delete_task),
]
