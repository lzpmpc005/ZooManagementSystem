from django.db import models
from django.contrib.auth.models import User


class Staff(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    qualification = models.CharField(max_length=100)
    responsibilities = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)

    def __str__(self):
        return self.user.username


class Habitat(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    size = models.IntegerField(null=True, blank=True)
    climate = models.CharField(max_length=100, null=True, blank=True)
    suitable_species = models.CharField(max_length=100, null=True, blank=True)
    image_url = models.CharField(max_length=200, null=True, blank=True)
    manager = models.ForeignKey(Staff, on_delete=models.SET_NULL, null=True, blank=True, default=None)

    def __str__(self):
        return self.name


class Animal(models.Model):
    species = models.CharField(max_length=100)
    diet = models.CharField(max_length=100)
    lifespan = models.IntegerField(null=True, blank=True)
    behavior = models.TextField(null=True, blank=True)
    habitat = models.ForeignKey(Habitat, on_delete=models.SET_NULL, null=True, blank=True)
    caretaker = models.ForeignKey(Staff, on_delete=models.SET_NULL, null=True, blank=True)
    image_url = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.species

class CareRoutine(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    zookepeer = models.ForeignKey(Staff, on_delete=models.CASCADE)
    feeding_times = models.CharField(max_length=100)
    medical_needs = models.TextField()

    def __str__(self):
        return self.animal.species
