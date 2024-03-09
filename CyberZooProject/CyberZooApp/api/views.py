import json
from datetime import datetime

from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from CyberZooApp.models import Animal, Habitat, Staff, Routine, Log, Prescription, Pathway, Tour
from .serializers import (HabitatSerializer, AnimalSerializer,
                          RoutineSerializer, LogSerializer,
                          PrescriptionSerializer, TourSerializer)
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
    routines = Routine.objects.filter(animal__in=staffAnimals)
    serializer = RoutineSerializer(routines, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def login_user(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        if username is None or password is None:
            return JsonResponse({'error': 'Please provide both username and password'}, status=400)
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_superuser:
                login(request, user)
                return JsonResponse({'detail': 'Login successful', 'username': username, 'id': user.id, 'role': 'admin'})
            else:
                staff = Staff.objects.get(user=user)
                login(request, user)
                return JsonResponse({'detail': 'Login successful', 'username': username, 'id': staff.id, 'role': staff.role})
        else:
            return JsonResponse({'error': 'Invalid username or password'}, status=400)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format'}, status=400)


def logout_user(request):
    print(request.user)
    # if not request.user.is_authenticated:
    #     print(request.user)
    #     return JsonResponse({'error': 'You are not logged in'}, status=400)
    logout(request)
    return JsonResponse({'detail': 'Logout successful'})


@api_view(['POST'])
def delete_animal(request, pk):
    animal = get_object_or_404(Animal, id=pk)
    habitat = Habitat.objects.get(id=animal.habitat_id)

    if not request.user.is_superuser and request.user.staff.id != habitat.manager_id:
        return JsonResponse({'error': 'You are not allowed here!'}, status=400)

    if request.method == 'POST':
        animal.delete()
        return JsonResponse({'detail': 'Animal deleted successfully'}, status=400)
    return JsonResponse({'error': 'Not Allowed'}, status=400)


@api_view(['GET'])
def getNextHabitats(request, pk, leave_time):
    # print(request.user)
    # if not request.user.is_superuser and request.user.staff.role != "TourManager":
    #     return JsonResponse({'error': 'You are not allowed here!'}, status=400)
    leave_time = datetime.strptime(leave_time, '%H:%M').time()
    if not pk:
        habitats = Habitat.objects.all()
        habitat_ids = [habitat.id for habitat in habitats]
        habitat_ids = avoidOverlap(habitat_ids, leave_time)
    else:
        ids = avoidOverlap([pk], leave_time)
        if not ids:
            return JsonResponse({"message": "Overlapped! Leave earlier or choose another habitat."}, status=404)
        pathways1 = Pathway.objects.filter(start_id=pk)
        habitat_ids1 = [pathway.end_id for pathway in pathways1]
        pathways2 = Pathway.objects.filter(end_id=pk)
        habitat_ids2 = [pathway.start_id for pathway in pathways2]
        habitat_ids = habitat_ids1 + habitat_ids2
        second_pathways = Pathway.objects.filter(Q(start_id__in=habitat_ids) | Q(end_id__in=habitat_ids))
        habitat_ids = [pathway.start_id for pathway in second_pathways] + [pathway.end_id for pathway in second_pathways]
        habitat_ids = set(habitat_ids)
        if pk in habitat_ids:
            habitat_ids.remove(pk)
        habitat_ids = avoidOverlap(habitat_ids, leave_time)
    if not habitat_ids:
        return JsonResponse({"message": "No habitats found."}, status=404)

    habitats = Habitat.objects.filter(id__in=habitat_ids)
    serializer = HabitatSerializer(habitats, many=True)
    return Response(serializer.data)


def avoidOverlap(habitat_ids, leave_time):
    available_ids = []
    for habitat_id in habitat_ids:
        overlap = False
        for i in range(1, 6):
            tours = Tour.objects.filter(**{f'habitat{i}_id': habitat_id})
            if not tours:
                continue
            for tour in tours:
                print(i)
                if i == 1:
                    if (tour.start_time < leave_time < getattr(tour, f'leave_time{i}')
                            or tour.start_time == leave_time or leave_time == getattr(tour, f'leave_time{i}')):
                        overlap = True
                        break
                else:
                    print(getattr(tour, f'leave_time{i-1}'), leave_time, getattr(tour, f'leave_time{i}') )
                    if getattr(tour, f'leave_time{i-1}') < leave_time < getattr(tour, f'leave_time{i}')\
                            or getattr(tour, f'leave_time{i-1}') == leave_time or leave_time == getattr(tour, f'leave_time{i}'):
                        overlap = True
                        break
            if overlap:
                break
        # For the last habitat field (habitat6_id)
        if not overlap:
            tours = Tour.objects.filter(habitat6_id=habitat_id)
            if tours:
                for tour in tours:
                    if (tour.leave_time5 < leave_time < tour.end_time
                            or tour.leave_time5 == leave_time or leave_time == tour.end_time):
                        overlap = True
                        break
        if not overlap:
            available_ids.append(habitat_id)
    return available_ids


@api_view(['POST'])
def createTour(request):
    data = json.loads(request.body)
    # if not request.user.is_superuser and request.user.staff.role != "TourManager":
    #     return JsonResponse({'error': 'You are not allowed here!'}, status=400)
    try:
        Tour.objects.create(
            name=data.get('name'),
            description=data.get('description'),
            start_time=data.get('start_time'),
            habitat1_id=data.get('habitat1_id'),
            leave_time1=data.get('leave_time1'),
            habitat2_id=data.get('habitat2_id'),
            leave_time2=data.get('leave_time2'),
            habitat3_id=data.get('habitat3_id'),
            leave_time3=data.get('leave_time3'),
            habitat4_id=data.get('habitat4_id'),
            leave_time4=data.get('leave_time4'),
            habitat5_id=data.get('habitat5_id'),
            leave_time5=data.get('leave_time5'),
            habitat6_id=data.get('habitat6_id'),
            end_time=data.get('end_time'),
        )
        return JsonResponse({'detail': 'Tour created successfully'}, status=201)
    except Exception as e:
        print(e)
        return JsonResponse({'error': f'{e}'}, status=400)


@api_view(['GET'])
def getTours(request):
    tours = Tour.objects.all().select_related('habitat1', 'habitat2', 'habitat3', 'habitat4', 'habitat5', 'habitat6')
    serializer = TourSerializer(tours, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def deleteTour(request, pk):
    Tour.objects.filter(id=pk).delete()
    return JsonResponse({'detail': 'Tours deleted successfully'}, status=200)