from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from projects.models import Project, Tasks
from projects.serializers import TaskSerializer


# Task CRUD endpoints
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_task(request, project_id):
    try:
        project = Project.objects.get(pk=project_id, user=request.user)
    except Project.DoesNotExist:
        return JsonResponse({'message': 'Project not found or you do not have permission to access it'}, status=status.HTTP_404_NOT_FOUND)
    data = JSONParser().parse(request)
    data['project'] = project.id
    serializer = TaskSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_delete_task(request, pk):
    try:
        task = Tasks.objects.get(pk=pk)
        # Check if the user owns the project that this task belongs to
        if task.project.user != request.user:
            return JsonResponse({'message': 'You do not have permission to modify this task'}, status=status.HTTP_403_FORBIDDEN)
    except Tasks.DoesNotExist:
        return JsonResponse({'message': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = TaskSerializer(task, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        task.delete()
        return JsonResponse({'message': 'Task was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
