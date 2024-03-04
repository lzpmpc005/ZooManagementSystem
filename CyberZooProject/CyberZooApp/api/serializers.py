from rest_framework.serializers import ModelSerializer
from CyberZooApp.models import Animal, Habitat, Staff, Routine, Log, Prescription


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
