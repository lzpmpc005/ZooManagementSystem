from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.loginUser, name='login'),
    path('logout/', views.logoutUser, name='logout'),
    path('register/', views.registerUser, name='register'),
    path('', views.home, name='home'),
    path('habitat/<str:name>/', views.habitat, name='Habitat'),
    path('create_habitat/', views.create_habitat, name='create_habitat'),
    path('update_habitat/<str:name>/', views.update_habitat, name='update_habitat'),
    path('delete_habitat/<str:name>/', views.delete_habitat, name='delete_habitat'),
    path('create_staff/', views.create_staff, name='create_staff'),
    path('update_staff/<int:pk>', views.update_staff, name='update_staff'),
    path('delete_staff/<int:pk>/', views.delete_staff, name='delete_staff'),

    path('animals/', views.animals, name='Animals'),
    path('animals/<str:species>', views.animal_detail, name='Animal'),
    path('create_animal/', views.create_animal, name='create_animal'),
    path('update_animal/<str:species>', views.update_animal, name='update_animal'),
    path('delete_animal/<str:species>', views.delete_animal, name='delete_animal'),

    path('staff/<int:pk>/animals', views.staffAnimals, name='staffanimals'),
    path('staff/<int:pk>/routine', views.staffRoutines, name='staffroutines'),
    path('staff/report', views.report, name='report'),

]
