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

    path("get_guides/", views.getGuides, name="get_guides"),

    # week 4
    path("create_membership/", views.createMembership, name="create_membership"),
    path("get_memberships/", views.getMemberships, name="get_memberships"),
    path("update_membership/", views.updateMembership, name="update_membership"),
    path("register/", views.register, name="register"),
    path("get_customer/<int:pk>", views.getCustomer, name="get_customer"),
    path("get_customers/", views.getCustomers, name="get_customers"),
    path("join_membership/", views.joinMembership, name="join_membership"),
    path("change_membership/", views.changeMembership, name="change_membership"),
    path("events/", views.event_list, name="event_list"),
    path("events/<int:pk>", views.event_detail, name="event_detail"),
    path('send_event_email/', views.send_event_email, name='send_event_email'),
]
