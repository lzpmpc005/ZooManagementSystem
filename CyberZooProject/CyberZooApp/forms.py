from django import forms
from django.contrib.auth.models import User

from .models import Staff, Habitat, Animal, Routine, Log, Prescription, CareRoutine

from django.forms import ModelForm


class StaffForm(forms.ModelForm):
    username = forms.CharField(max_length=150)
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = Staff
        fields = ['qualification', 'status']



    def save(self, commit=True):
        ifExists = Staff.objects.filter(user__username=self.cleaned_data['username'])
        if ifExists:
            user = User.objects.get(username=self.cleaned_data['username'])
            user.email = self.cleaned_data['email']
            user.set_password(self.cleaned_data['password'])
            user.save()

            staff = super().save(commit=False)
            staff.user = user
            if commit:
                staff.save()
            return staff

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
    class Meta:
        model = CareRoutine
        fields = '__all__'


class LogForm(ModelForm):
    class Meta:
        model = Log
        fields = '__all__'


class PrescriptionForm(ModelForm):
    class Meta:
        model = Prescription
        fields = '__all__'
