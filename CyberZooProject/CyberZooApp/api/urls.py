from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('habitats/', views.getHabitats),
    path('habitats/<str:pk>/', views.getHabitat),
    path('staff/<str:pk>/animals', views.getStaffAnimals),
    path('staff/<str:pk>/routines', views.getStaffRoutines),
    path('login/', views.login_user),
    path('logout/', views.logout_user),
    path('register/', views.register_user),
]