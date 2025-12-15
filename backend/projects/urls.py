from django.urls import path
from projects import views

urlpatterns = [
    path('projects/', views.project_list),
    path('projects/<int:pk>/', views.project_detail),
]
