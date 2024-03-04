import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from CyberZooApp.models import Animal, Habitat, Staff, Routine, Log, Prescription
from .serializers import HabitatSerializer, AnimalSerializer, RoutineSerializer, LogSerializer, PrescriptionSerializer
from django.db.models import Q
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import csrf_exempt


@api_view(['GET'])
def getRoutes(request):
    routes = [
        'GET /api',
        'GET /api/animals/',
        'GET /api/animals/id/',
        'GET /api/habitats/',
        'GET /api/habitats/id/',
        'GET /api/staff/',
        'GET /api/staff/id/',
    ]
    return Response(routes)


@api_view(['GET'])
def getHabitats(request):
    habitats = Habitat.objects.all()  # page
    serializer = HabitatSerializer(habitats, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getHabitat(request, pk):
    habitat = Habitat.objects.get(id=pk)  # page
    serializer = HabitatSerializer(habitat, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getStaffAnimals(request, pk):
    staffAnimals = Animal.objects.filter(
        Q(enricher_id=pk) | Q(cleaner_id=pk) |
        Q(veterinarian_id=pk) | Q(nutritionist_id=pk)
    )
    serializer = AnimalSerializer(staffAnimals, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getStaffRoutines(request, pk):
    staffAnimals = Animal.objects.filter(
        Q(enricher_id=pk) | Q(cleaner_id=pk) |
        Q(veterinarian_id=pk) | Q(nutritionist_id=pk)
    )
    routine = Routine.objects.filter(animal__in=staffAnimals)

    serializer = RoutineSerializer(routine, many=True)
    return Response(serializer.data)


@csrf_exempt
@require_POST
def login_user(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        if username is None or password is None:
            return JsonResponse({'error': 'Please provide both username and password'}, status=400)
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'detail': 'Login successful'})
        else:
            return JsonResponse({'error': 'Invalid username or password'}, status=400)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format'}, status=400)


@csrf_exempt
def logout_user(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'You are not logged in'}, status=400)
    logout(request)
    return JsonResponse({'detail': 'Logout successful'})

