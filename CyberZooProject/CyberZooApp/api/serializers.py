from rest_framework.serializers import ModelSerializer
from CyberZooApp.models import (Animal, Habitat, Staff,
                                Routine, Log, Prescription, Tour, Pathway)


class HabitatSerializer(ModelSerializer):
    class Meta:
        model = Habitat
        fields = '__all__'


class AnimalSerializer(ModelSerializer):
    class Meta:
        model = Animal
        fields = '__all__'


class StaffSerializer(ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'


class RoutineSerializer(ModelSerializer):
    class Meta:
        model = Routine
        fields = '__all__'


class LogSerializer(ModelSerializer):
    class Meta:
        model = Log
        fields = '__all__'


class PrescriptionSerializer(ModelSerializer):
    class Meta:
        model = Prescription
        fields = '__all__'


class TourSerializer(ModelSerializer):
    habitat1 = HabitatSerializer(read_only=True)
    habitat2 = HabitatSerializer(read_only=True)
    habitat3 = HabitatSerializer(read_only=True)
    habitat4 = HabitatSerializer(read_only=True)
    habitat5 = HabitatSerializer(read_only=True)
    habitat6 = HabitatSerializer(read_only=True)

    class Meta:
        model = Tour
        fields = ['id', 'name', 'description', 'start_time', 'habitat1', 'leave_time1', 'habitat2', 'leave_time2',
                  'habitat3', 'leave_time3', 'habitat4', 'leave_time4', 'habitat5', 'leave_time5', 'habitat6',
                  'end_time']