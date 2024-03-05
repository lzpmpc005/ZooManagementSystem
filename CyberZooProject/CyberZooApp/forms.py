from django import forms
from django.contrib.auth.models import User

from .models import Staff, Habitat, Animal, Routine, Log, Prescription

from django.forms import ModelForm


class StaffForm(forms.ModelForm):
    username = forms.CharField(max_length=150)
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)
    role = forms.ChoiceField(choices=Staff.ROLE_CHOICES)

    class Meta:
        model = Staff
        fields = ['qualification', 'role']

    def save(self, commit=True):
        ifExists = Staff.objects.filter(user__username=self.cleaned_data['username'])
        if ifExists:
            user = User.objects.get(username=self.cleaned_data['username'])
            user.email = self.cleaned_data['email']
            user.save()

            staff = super().save(commit=False)
            staff.user = user
            if commit:
                staff.save()
            return staff
        else:
            user = User.objects.create_user(
                username=self.cleaned_data['username'],
                email=self.cleaned_data['email'],
                password=self.cleaned_data['password']
            )

        staff = super().save(commit=False)
        staff.user = user
        if commit:
            staff.save()
        return staff


class HabitatForm(ModelForm):
    class Meta:
        model = Habitat
        fields = '__all__'


class AnimalForm(ModelForm):
    class Meta:
        model = Animal
        fields = '__all__'


class CareRoutineForm(ModelForm):
    def __init__(self, *args, **kwargs):
        animals = kwargs.pop('animals', None)
        super(CareRoutineForm, self).__init__(*args, **kwargs)
        if animals:
            self.fields['animal'].queryset = animals

    class Meta:
        model = Routine
        fields = '__all__'


# class RoutineForm(ModelForm):
#     class Meta:
#         model = Routine
#         fields = '__all__'


class LogForm(ModelForm):
    def __init__(self, *args, **kwargs):
        animals = kwargs.pop('animals', None)
        super(LogForm, self).__init__(*args, **kwargs)
        if animals:
            self.fields['animal'].queryset = animals
    class Meta:
        model = Log
        fields = ['animal', 'action', 'animal_status1', 'animal_status2']


class PrescriptionForm(ModelForm):
    class Meta:
        model = Prescription
        fields = '__all__'
