from django.db import models
from django.contrib.auth.models import User


class Staff(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # nutritionist, veterinarian, enricher, cleaner
    qualification = models.CharField(max_length=100)
    # delete responsibilities field because ForeignKey is used in Animal model
    # status will be turned into "unavailable" when assigned to 10 animals
    status = models.CharField(max_length=100, null=True, blank=True, default="available")

    MANAGER = 'Manager'
    NUTRITIONIST = 'Nutritionist'
    VETERINARIAN = 'Veterinarian'
    ENRICHER = 'Enricher'
    CLEANER = 'Cleaner'
    UNDECIDED = 'Undecided'
    TOURMANAGER = 'TourManager'
    TOURGUIDE = 'TourGuide'

    ROLE_CHOICES = [
        (MANAGER, 'Manager'),
        (NUTRITIONIST, 'Nutritionist'),
        (VETERINARIAN, 'Veterinarian'),
        (ENRICHER, 'Enricher'),
        (CLEANER, 'Cleaner'),
        (UNDECIDED, 'Undecided'),
        (TOURMANAGER, 'TourManager'),
        (TOURGUIDE, 'TourGuide'),
    ]

    role = models.CharField(
        max_length=30,
        choices=ROLE_CHOICES,
        default=UNDECIDED
    )

    def __str__(self):
        return self.user.username


class Habitat(models.Model):  # going to implement a map
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
    # responsible for food
    nutritionist = models.ForeignKey(Staff, on_delete=models.SET_NULL,
                                     null=True, blank=True, related_name='animals_nurturing')
    # responsible for physical health
    veterinarian = models.ForeignKey(Staff, on_delete=models.SET_NULL,
                                     null=True, blank=True, related_name='animals_caring')
    # responsible for training/behavior/mental health
    enricher = models.ForeignKey(Staff, on_delete=models.SET_NULL,
                                 null=True, blank=True, related_name='animals_enriching')
    # responsible for cleaning and facility maintenance
    cleaner = models.ForeignKey(Staff, on_delete=models.SET_NULL,
                                null=True, blank=True, related_name='animals_cleaning')
    image_url = models.CharField(max_length=200, null=True, blank=True)

    FINE = 'Fine'
    SICK = 'Sick'
    INJURED = 'Injured'
    PREGNANT = 'Pregnant'
    RECOVERING = 'Recovering'
    DECEASED = 'Deceased'
    UNDEROBSERVATION = 'Under_Observation'
    QUARANTINED = 'Quarantined'

    STATUS_CHOICES = [
        (FINE, 'Fine'),
        (SICK, 'Sick'),
        (INJURED, 'Injured'),
        (PREGNANT, 'Pregnant'),
        (RECOVERING, 'Recovering'),
        (DECEASED, 'Deceased'),
        (UNDEROBSERVATION, 'Under_Observation'),
        (QUARANTINED, 'Quarantined'),
    ]

    status1 = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default=FINE,
    )

    status2 = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default=FINE,
    )

    def __str__(self):
        return self.species


# class CareRoutine(models.Model):
#     animal = models.OneToOneField(Animal, on_delete=models.CASCADE)
#     zookepeer = models.ForeignKey(Staff, on_delete=models.CASCADE)
#     feeding_times = models.CharField(max_length=100)
#     medical_needs = models.TextField()
#
#     def __str__(self):
#         return self.animal.species


# modify Routine model if you need
class Routine(models.Model):
    animal = models.OneToOneField(Animal, on_delete=models.CASCADE)
    feeding_time = models.TimeField(null=True, blank=True)
    diet_plan = models.CharField(max_length=100, null=True, blank=True)
    cleaning_time = models.TimeField(null=True, blank=True)
    training_time = models.TimeField(null=True, blank=True)
    examination_date = models.DateField(null=True, blank=True)
    examination_time = models.TimeField(null=True, blank=True)

    def __str__(self):
        return self.feeding_time


# When a prescription is added, animal's status will be updated
# All related staff will be notified, then they will modify animal's routine accordingly
class Prescription(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    health_condition = models.CharField(max_length=100, default=None)
    medical_needs = models.CharField(max_length=100, default=None)
    medication = models.CharField(max_length=100, default=None)
    dosage = models.CharField(max_length=100, default=None)
    duration = models.CharField(max_length=100, default=None)
    diet_suggestion = models.CharField(max_length=100, default=None)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.medication


class Log(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
    action = models.CharField(max_length=100)

    FINE = 'Fine'
    SICK = 'Sick'
    INJURED = 'Injured'
    PREGNANT = 'Pregnant'
    RECOVERING = 'Recovering'
    DECEASED = 'Deceased'
    UNDEROBSERVATION = 'Under_Observation'
    QUARANTINED = 'Quarantined'

    STATUS_CHOICES = [
        (FINE, 'Fine'),
        (SICK, 'Sick'),
        (INJURED, 'Injured'),
        (PREGNANT, 'Pregnant'),
        (RECOVERING, 'Recovering'),
        (DECEASED, 'Deceased'),
        (UNDEROBSERVATION, 'Under_Observation'),
        (QUARANTINED, 'Quarantined'),
    ]

    animal_status1 = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default=FINE,
    )

    animal_status2 = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default=FINE,
    )

    def __str__(self):
        return self.action


class Pathway(models.Model):
    start = models.ForeignKey(Habitat, on_delete=models.CASCADE, related_name='start')
    end = models.ForeignKey(Habitat, on_delete=models.CASCADE, related_name='end')


class Tour(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    habitat1 = models.ForeignKey(Habitat, on_delete=models.SET_NULL, null=True, blank=True, related_name='habitat1')
    leave_time1 = models.TimeField(null=True, blank=True)
    habitat2 = models.ForeignKey(Habitat, on_delete=models.SET_NULL, null=True, blank=True, related_name='habitat2')
    leave_time2 = models.TimeField(null=True, blank=True)
    habitat3 = models.ForeignKey(Habitat, on_delete=models.SET_NULL, null=True, blank=True, related_name='habitat3')
    leave_time3 = models.TimeField(null=True, blank=True)
    habitat4 = models.ForeignKey(Habitat, on_delete=models.SET_NULL, null=True, blank=True, related_name='habitat4')
    leave_time4 = models.TimeField(null=True, blank=True)
    habitat5 = models.ForeignKey(Habitat, on_delete=models.SET_NULL, null=True, blank=True, related_name='habitat5')
    leave_time5 = models.TimeField(null=True, blank=True)
    habitat6 = models.ForeignKey(Habitat, on_delete=models.SET_NULL, null=True, blank=True, related_name='habitat6')
    end_time = models.TimeField(null=True, blank=True)

    def __str__(self):
        return self.name