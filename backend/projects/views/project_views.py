from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from projects.models import Project
from projects.serializers import ProjectSerializer


# Create a new project and retrieve all projects
@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def project_list(request):
    if request.method == 'POST':
        project_data = JSONParser().parse(request)
        project_serializer = ProjectSerializer(data=project_data)
        if project_serializer.is_valid():
            project_serializer.save(user=request.user)
            return JsonResponse(project_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(project_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET': 
        projects = Project.objects.filter(user=request.user)

        title = request.GET.get('title', None)
        if title is not None:
            projects = projects.filter(name__icontains=title)
            
        status_param = request.GET.get('status', None)
        if status_param is not None:
            projects = projects.filter(status=status_param)
        
        project_serializer = ProjectSerializer(projects, many=True)
        return JsonResponse(project_serializer.data, safe=False)


# Retrieve, update or delete a project by id
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def project_detail(request, pk):
    try:
        project = Project.objects.get(pk=pk, user=request.user)
    except Project.DoesNotExist:
        return JsonResponse({'message': 'The project does not exist or you do not have permission to access it'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        project_serializer = ProjectSerializer(project)
        return JsonResponse(project_serializer.data)
    elif request.method == 'PUT':
        project_data = JSONParser().parse(request)
        project_serializer = ProjectSerializer(project, data=project_data)
        if project_serializer.is_valid():
            project_serializer.save()
            return JsonResponse(project_serializer.data)
        return JsonResponse(project_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        project.delete()
        return JsonResponse({'message': 'Project was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
