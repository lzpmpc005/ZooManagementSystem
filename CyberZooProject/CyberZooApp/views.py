from django.shortcuts import render, redirect
from django.db.models import Q
from .models import Habitat, Staff, Animal, CareRoutine
from .forms import HabitatForm, StaffForm, AnimalForm, CareRoutineForm
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm


def loginUser(request):
    page = 'login'
    if request.user.is_authenticated:
        return redirect('home')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
            user = User.objects.get(username=username)
        except:
            messages.error(request, 'User does not exist')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Username or Password is incorrect')

    context = {'page': page}
    return render(request, "CyberZooApp/login_register.html", context)


def logoutUser(request):
    logout(request)
    return redirect('home')


def registerUser(request):
    page = 'register'
    form = UserCreationForm()
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.save()
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'An error occurred')
    context = {'form': form}
    return render(request, "CyberZooApp/login_register.html", context)


def home(request):
    q = request.GET.get('q')
    if q:
        habitats = Habitat.objects.filter(
            Q(name__icontains=q) |
            Q(description__icontains=q) |
            Q(climate__icontains=q) |
            Q(suitable_species__icontains=q)).order_by('name')
    else:
        habitats = Habitat.objects.all().order_by('name')
    context = {'habitats': habitats}
    return render(request, "CyberZooApp/home.html", context)


def animals(request):
    animal = Animal.objects.all().order_by('species')
    print(animal)
    context = {'animals': animal}
    return render(request, "CyberZooApp/animals.html", context)

def animal_detail(request, species):
    animal = Animal.objects.get(species=species)
    context = {'animal': animal}
    return render(request, "CyberZooApp/animal_detail.html", context)

@login_required(login_url='login')
def create_animal(request):
    habitat = Habitat.objects.filter(manager__user=request.user).first()
    if not request.user.is_superuser and not habitat:
        return HttpResponse('You are not allowed here!')
    form = AnimalForm()
    if request.method == 'POST':
        form = AnimalForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    context = {'form': form}
    return render(request, "CyberZooApp/animal_form.html", context)

@login_required(login_url='login')
def update_animal(request, species):
    animal = Animal.objects.get(species=species)
    habitat_manager = animal.habitat.manager if animal.habitat.manager else None
    if not request.user.is_superuser and request.user != habitat_manager.user:
        return HttpResponse('You are not allowed here!')
    if request.method == 'POST':
        form = AnimalForm(request.POST, instance=animal)
        if form.is_valid():
            animal = form.save(commit=False)
            animal.save()
            return redirect('home')
    else:
        form = AnimalForm(instance=animal)
    context = {'form': form}
    return render(request, "CyberZooApp/animal_form.html", context)

@login_required(login_url='login')
def delete_animal(request, species):
    animal = Animal.objects.get(species=species)
    habitat_manager = animal.habitat.manager if animal.habitat.manager else None
    if not request.user.is_superuser and request.user != habitat_manager.user:
        return HttpResponse('You are not allowed here!')
    if request.method == 'POST':
        animal.delete()
        return redirect('home')
    return render(request, "CyberZooApp/delete.html", {'obj': animal})


def habitat(request, name):
    habitat = Habitat.objects.get(name=name)
    animals = habitat.animal_set.all()
    context = {'habitat': habitat, 'animals': animals}
    return render(request, "CyberZooApp/Habitat.html", context)


@login_required(login_url='login')
def create_habitat(request):
    if not request.user.is_superuser:
        return HttpResponse('You are not allowed here!')
    form = HabitatForm()
    if request.method == 'POST':
        form = HabitatForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    context = {'form': form}
    return render(request, "CyberZooApp/habitat_form.html", context)


@login_required(login_url='login')
def update_habitat(request, name):
    habitat = Habitat.objects.get(name=name)
    manager_instance = habitat.manager if habitat.manager else None
    is_manager = manager_instance.user == request.user if manager_instance else False

    if request.method == 'POST':
        form = HabitatForm(request.POST, instance=habitat)
        if form.is_valid():
            habitat = form.save(commit=False)
            manager_id = request.POST.get('manager')
            if manager_id:
                manager_instance = Staff.objects.get(pk=manager_id)
                habitat.manager = manager_instance

            habitat.save()
            return redirect('home')
    else:
        form = HabitatForm(instance=habitat)

    context = {
        'form': form,
        'manager_instance': manager_instance,
        'is_manager': is_manager
    }
    return render(request, "CyberZooApp/habitat_form.html", context)


@login_required(login_url='login')
def delete_habitat(request, name):
    if not request.user.is_superuser:
        return HttpResponse('You are not allowed here!')
    habitat = Habitat.objects.get(name=name)
    if request.method == 'POST':
        habitat.delete()
        return redirect('home')
    return render(request, "CyberZooApp/delete.html", {'obj': habitat})


@login_required(login_url='login')
def create_staff(request):
    if not request.user.is_superuser:
        return HttpResponse('You are not allowed here!')
    form = StaffForm()
    if request.method == 'POST':
        form = StaffForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    context = {'form': form}
    return render(request, "CyberZooApp/staff_form.html", context)


@login_required(login_url='login')
def update_staff(request, pk):
    if not request.user.is_superuser:
        return HttpResponse('You are not allowed here!')
    staff = Staff.objects.get(id=pk)
    form = StaffForm(instance=staff)

    if request.method == 'POST':
        form = StaffForm(request.POST, instance=staff)
        if form.is_valid():
            form.save()
            return redirect('home')
    context = {'form': form}
    return render(request, "CyberZooApp/staff_form.html", context)


@login_required(login_url='login')
def delete_staff(request, pk):
    if not request.user.is_superuser:
        return HttpResponse('You are not allowed here!')
    staff = Staff.objects.get(id=pk)
    if request.method == 'POST':
        staff.delete()
        return redirect('home')
    return render(request, "CyberZooApp/delete.html", {'obj': staff})

@login_required(login_url='login')
def create_care_routine(request):
    if not request.user.is_superuser:
        return HttpResponse('You are not allowed here!')
    form = CareRoutineForm()
    if request.method == 'POST':
        form = CareRoutineForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('careroutine')
    context = {'form': form}
    return render(request, "CyberZooApp/care_routine_form.html", context)

def care_routine_list(request):
    care_routines = CareRoutine.objects.all()
    context = {'care_routines': care_routines}
    return render(request, "CyberZooApp/care_routine_list.html", context)

def update_care_routine(request, pk):
    if not request.user.is_superuser:
        return HttpResponse('You are not allowed here!')
    care_routine = CareRoutine.objects.get(id=pk)
    form = CareRoutineForm(instance=care_routine)

    if request.method == 'POST':
        form = CareRoutineForm(request.POST, instance=care_routine)
        if form.is_valid():
            form.save()
            return redirect('careroutine')
    context = {'form': form}
    return render(request, "CyberZooApp/care_routine_form.html", context)

def delete_care_routine(request, pk):
    if not request.user.is_superuser:
        return HttpResponse('You are not allowed here!')
    care_routine = CareRoutine.objects.get(id=pk)
    if request.method == 'POST':
        care_routine.delete()
        return redirect('careroutine')
    return render(request, "CyberZooApp/delete.html", {'obj': care_routine})
    

def staff_list(request):
    staffs = Staff.objects.all()
    context = {'staffs': staffs}
    return render(request, "CyberZooApp/staff_list.html", context)

