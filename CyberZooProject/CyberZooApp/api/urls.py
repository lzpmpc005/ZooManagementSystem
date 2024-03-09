from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('habitats/', views.getHabitats),
    path('animals/', views.getAnimals),
    path('habitats/<str:pk>/', views.getHabitat),
    path('staff/<str:pk>/animals', views.getStaffAnimals),
    path('staff/<str:pk>/routines', views.getStaffRoutines),
    path('login/', views.login_user),
    path('logout/', views.logout_user),
    path('delete_animal', views.delete_animal),

    path('get_next_habitats/<int:pk>/<str:leave_time>/', views.getNextHabitats, name='get_next_habitats'),
    path('create_tour/', views.createTour, name='create_tour'),
    path('get_tours/', views.getTours, name='get_tours'),
    path('delete_tour/<int:pk>/', views.deleteTour, name='delete_tour'),

]