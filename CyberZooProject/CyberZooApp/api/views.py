from rest_framework.decorators import api_view
from rest_framework.response import Response
from CyberZooApp.models import Animal, Habitat, Staff, Routine, Log, Prescription
from .serializers import HabitatSerializer, AnimalSerializer, RoutineSerializer, LogSerializer, PrescriptionSerializer
from django.db.models import Q
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout


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


@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({'detail': 'Login successful'})
    else:
        return Response({'error': 'Invalid username or password'}, status=400)


@api_view(['POST'])
def logout_user(request):
    logout(request)
    return Response({'detail': 'Logout successful'})


@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)

    user = User.objects.create_user(username=username, password=password)
    login(request, user)
    return Response({'detail': 'Registration successful'})

