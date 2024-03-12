from django.urls import path
from . import views

urlpatterns = [
    path("", views.getRoutes),
    path("animals/", views.AnimalListCreate.as_view(), name="animals"),
    path(
        "animals/<int:pk>/", views.AnimalRetrieveUpdateDestroy.as_view(), name="animal"
    ),
    path("habitats/", views.HabitatsListCreate.as_view(), name="habitats"),
    path(
        "habitats/<int:pk>/",
        views.HabitatsRetrieveUpdateDestroy.as_view(),
        name="habitat",
    ),
    path("feedbacks/", views.FeedbackListCreate.as_view(), name="feedbacks"),
    path("staff/<str:pk>/animals", views.getStaffAnimals),
    path("staff/<str:pk>/routines", views.getStaffRoutines),
    path("login/", views.login_user),
    path("logout/", views.logout_user),
    path(
        "get_next_habitats/<int:pk>/<str:leave_time>/",
        views.getNextHabitats,
        name="get_next_habitats",
    ),
    path("create_tour/", views.createTour, name="create_tour"),
    path("get_tours/", views.getTours, name="get_tours"),
    path("get_tour/<int:pk>/", views.getTour, name="get_tour"),
    path("delete_tour/<int:pk>/", views.deleteTour, name="delete_tour"),
]
