import json

from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from CyberZooApp.models import Animal, Habitat, Staff, Routine, Log, Prescription
from .serializers import HabitatSerializer, AnimalSerializer, RoutineSerializer, LogSerializer, PrescriptionSerializer
from django.db.models import Q
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

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
def getAnimals(request):
    animals = Animal.objects.all()
    # num_per_page = 12
    # paginator = Paginator(animals, num_per_page)
    # page_number = request.GET.get('page')
    # try:
    #     page_animals = paginator.page(page_number)
    # except PageNotAnInteger:
    #     page_animals = paginator.page(1)

    serializer = AnimalSerializer(animals, many=True)
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
        staff = Staff.objects.get(user=user)
        if user is not None:
            login(request, user)
            print(staff.id)
            return JsonResponse({'detail': 'Login successful', 'username': username, 'id': staff.id})
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


# @api_view(['DELETE'])
# def delete_animal_api(request, species):
#     animal = get_object_or_404(Animal, species=species)
#     habitat_manager = animal.habitat.manager if animal.habitat.manager else None
#
#     if not request.user.is_superuser and request.user != habitat_manager.user:
#         return JsonResponse({'error': 'You are not allowed here!'}, status=400)
#
#     if request.method == 'DELETE':
#         animal.delete()
#         return JsonResponse({'detail': 'Animal deleted successfully'}, status=400)
#
#     return JsonResponse({'error': 'Method Not Allowed'}, status=400)


