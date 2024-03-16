from rest_framework.serializers import ModelSerializer
from CyberZooApp.models import (
    Animal,
    Habitat,
    Staff,
    Routine,
    Log,
    Prescription,
    Tour,
    Pathway,
    Feedback,
    Membership,
    Customer,
)
from django.contrib.auth.models import User


class HabitatSerializer(ModelSerializer):
    class Meta:
        model = Habitat
        fields = "__all__"


class AnimalSerializer(ModelSerializer):
    class Meta:
        model = Animal
        fields = "__all__"


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class StaffSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Staff
        fields = ["id", "user", "role", "qualification", "status"]


class RoutineSerializer(ModelSerializer):
    class Meta:
        model = Routine
        fields = "__all__"


class LogSerializer(ModelSerializer):
    class Meta:
        model = Log
        fields = "__all__"


class PrescriptionSerializer(ModelSerializer):
    class Meta:
        model = Prescription
        fields = "__all__"


class TourSerializer(ModelSerializer):
    guide = StaffSerializer(read_only=True)
    habitat1 = HabitatSerializer(read_only=True)
    habitat2 = HabitatSerializer(read_only=True)
    habitat3 = HabitatSerializer(read_only=True)
    habitat4 = HabitatSerializer(read_only=True)
    habitat5 = HabitatSerializer(read_only=True)
    habitat6 = HabitatSerializer(read_only=True)

    class Meta:
        model = Tour
        fields = [
            "id",
            "guide",
            "name",
            "description",
            "start_time",
            "habitat1",
            "leave_time1",
            "habitat2",
            "leave_time2",
            "habitat3",
            "leave_time3",
            "habitat4",
            "leave_time4",
            "habitat5",
            "leave_time5",
            "habitat6",
            "end_time",
        ]


class FeedbackSerializer(ModelSerializer):
    class Meta:
        model = Feedback
        fields = "__all__"


class MembershipSerializer(ModelSerializer):
    class Meta:
        model = Membership
        fields = "__all__"


class CustomerSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    membership = MembershipSerializer(read_only=True)

    class Meta:
        model = Customer
        fields = ["id", "age", "user", "membership"]
