from . models import Tour


def avoidOverlap(habitat_ids, leave_time):
    available_ids = []
    for habitat_id in habitat_ids:
        overlap = False
        for i in range(1, 6):
            tours = Tour.objects.filter(**{f'habitat{i}_id': habitat_id})
            if not tours:
                continue
            for tour in tours:
                print(i)
                if i == 1:
                    if (tour.start_time < leave_time < getattr(tour, f'leave_time{i}')
                            or tour.start_time == leave_time == getattr(tour, f'leave_time{i}')):
                        overlap = True
                        break
                else:
                    if getattr(tour, f'leave_time{i-1}') < leave_time < getattr(tour, f'leave_time{i}')\
                            or getattr(tour, f'leave_time{i-1}') == leave_time == getattr(tour, f'leave_time{i}'):
                        overlap = True
                        break
            if overlap:
                break
        # For the last habitat field (habitat6_id)
        if not overlap:
            tours = Tour.objects.filter(habitat6_id=habitat_id)
            if tours:
                for tour in tours:
                    if (tour.leave_time5 < leave_time < tour.end_time
                            or tour.leave_time5 == leave_time == tour.end_time):
                        overlap = True
                        break
        if not overlap:
            available_ids.append(habitat_id)
    return available_ids

print(avoidOverlap([6], '09:40'))