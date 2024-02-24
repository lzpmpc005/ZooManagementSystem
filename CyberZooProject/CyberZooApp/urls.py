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
]