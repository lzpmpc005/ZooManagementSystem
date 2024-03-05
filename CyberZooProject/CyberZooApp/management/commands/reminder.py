import datetime
from django.core.management.base import BaseCommand
from CyberZooApp.models import Routine, Log, Staff, Animal, Habitat
from django.core.mail import EmailMessage


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        while True:
            try:
                all_routines = Routine.objects.all()

                for routine in all_routines:
                    animal = routine.animal
                    nutritionist = Staff.objects.get(id=animal.nutritionist_id)
                    veterinarian = Staff.objects.get(id=animal.veterinarian_id)
                    enricher = Staff.objects.get(id=animal.enricher_id)
                    cleaner = Staff.objects.get(id=animal.cleaner_id)
                    current_date = datetime.datetime.now().date()
                    current_time = datetime.datetime.now().time()

                    if routine.feeding_time < current_time:
                        log = Log.objects.filter(animal_id=animal.id,
                                              staff_id=animal.nutritionist_id,
                                              date=current_date)
                        if not log:
                            if routine.feeding_time < current_time.replace(hour=current_time.hour - 1):
                                trigger = "1hfeeding"
                            else:
                                trigger = "feeding"
                            self.email_notification(nutritionist.user.email, animal.id, trigger)

                    if routine.cleaning_time < current_time:
                        log = Log.objects.filter(animal_id=animal.id,
                                              staff_id=animal.cleaner_id,
                                              date=current_date)
                        if not log:
                            if routine.cleaning_time < current_time.replace(hour=current_time.hour - 1):
                                trigger = "1hcleaning"
                            else:
                                trigger = "cleaning"
                            self.email_notification(cleaner.user.email, animal.id, trigger)

                    if routine.training_time < current_time:
                        log = Log.objects.filter(animal_id=animal.id,
                                              staff_id=animal.enricher_id,
                                              date=current_date)
                        if not log:
                            if routine.training_time < current_time.replace(hour=current_time.hour - 1):
                                trigger = "1htraining"
                            else:
                                trigger = "training"
                            self.email_notification(enricher.user.email, animal.id, trigger)

                    if routine.examination_date == current_date:
                        if routine.examination_time < current_time:
                            log = Log.objects.filter(animal_id=animal.id,
                                                  staff_id=animal.veterinarian_id,
                                                  date=current_date)
                            if not log:
                                if routine.examination_time < current_time.replace(hour=current_time.hour - 1):
                                    trigger = "1hexamination"
                                else:
                                    trigger = "examination"
                                self.email_notification(veterinarian.user.email, animal.id, trigger)

                    if routine.examination_date < current_date:
                        log = Log.objects.filter(animal_id=animal.id,
                                              staff_id=animal.veterinarian_id,
                                              date=current_date)
                        if not log:
                            trigger = "dexamination"
                            self.email_notification(veterinarian.user.email, animal.id, trigger)

            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error: {e}"))

    def email_notification(self, email, animal_id, trigger):
        animal = Animal.objects.get(id=animal_id)
        habitat = Habitat.objects.get(id=animal.habitat_id)
        manager = Staff.objects.get(id=habitat.manager_id)
        manager_email = manager.user.email

        if trigger == 'feeding':
            message = f"Animal {animal.species} {animal.id} needs to eat. Please take actions."
            recipient_list = [email]
        elif trigger == '1hfeeding':
            message = f"Animal {animal.species} {animal.id} needs to eat. It's 1 Hour Late. Please take actions."
            recipient_list = [email, manager_email]
        elif trigger == 'cleaning':
            message = f"Animal {animal.species} {animal.id} needs to be cleaned. Please take actions."
            recipient_list = [email]
        elif trigger == '1hcleaning':
            message = f"Animal {animal.species} {animal.id} needs to be cleaned. It's 1 Hour Late. Please take actions."
            recipient_list = [email, manager_email]
        elif trigger == 'training':
            message = f"Animal {animal.species} {animal.id} needs to be trained. Please take actions."
            recipient_list = [email]
        elif trigger == '1htraining':
            message = f"Animal {animal.species} {animal.id} needs to be trained. It's 1 Hour Late. Please take actions."
            recipient_list = [email, manager_email]
        elif trigger == 'examination':
            message = f"Animal {animal.species} {animal.id} needs to be examined. Please take actions."
            recipient_list = [email]
        elif trigger == '1hexamination':
            message = f"Animal {animal.species} {animal.id} needs to be examined. It's 1 Hour Late. Please take actions."
            recipient_list = [email, manager_email]
        elif trigger == 'dexamination':
            message = f"Animal {animal.species} {animal.id} needs to be examined. It's Overdue. Please take actions."
            recipient_list = [email, manager_email]

        subject = 'Animal Needs Attention!'
        from_email = 'leipzig_traffic@outlook.com'
        email = EmailMessage(subject, message, from_email, recipient_list)
        email.send()
        print(f"Email sent to {recipient_list}")