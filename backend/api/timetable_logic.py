import random
from collections import defaultdict

class TimetableGenerator:
    def __init__(self, faculty_data, subject_data, batches, manual_assignments=None, slots_per_day=7, days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]):
        """
        faculty_data: list of dicts { 'id': 1, 'name': 'John', 'subjects': ['Math'], 'max_hours_day': 6, 'assigned_batches': ['B.Tech-CS-3A'] }
        subject_data: list of dicts { 'name': 'Math', 'hours_week': 5 }
        batches: list of strings ['B.Tech-CS-3A']
        manual_assignments: list of dicts { 'faculty_id': 1, 'subject_name': 'Math', 'batch': 'B.Tech-CS-3A' }
        """
        self.faculty_data = faculty_data
        self.subject_data = subject_data
        self.batches = batches
        self.manual_assignments = manual_assignments or []
        self.slots_per_day = slots_per_day
        self.days = days
        self.timetable = []

    def generate(self):
        batch_subject_hours = {}
        for batch in self.batches:
            for sub in self.subject_data:
                batch_subject_hours[(batch, sub['name'])] = sub['hours_week']

        faculty_daily_hours = defaultdict(lambda: defaultdict(int))
        faculty_slot_busy = defaultdict(lambda: defaultdict(bool))

        for day in self.days:
            for slot_idx in range(1, self.slots_per_day + 1):
                slot_label = f"Slot {slot_idx}"
                
                if slot_idx == 4:
                    for batch in self.batches:
                        self.timetable.append({
                            'day': day,
                            'slot': slot_label,
                            'subject': 'BREAK',
                            'teacher_name': 'N/A',
                            'batch': batch,
                            'room_number': 'Lounge'
                        })
                    continue

                for batch in self.batches:
                    # 1. Manual assignments (if any)
                    # ... simplified for now

                    # 2. Automated allocation
                    possible_subjects = [s['name'] for s in self.subject_data if batch_subject_hours[(batch, s['name'])] > 0]
                    random.shuffle(possible_subjects)

                    allocated = False
                    for sub_name in possible_subjects:
                        eligible_faculty = [f for f in self.faculty_data 
                                           if sub_name in f['subjects'] 
                                           and batch in f['assigned_batches']
                                           and not faculty_slot_busy[f['id']][(day, slot_label)]
                                           and faculty_daily_hours[f['id']][day] < f['max_hours_day']]
                        
                        if eligible_faculty:
                            faculty = random.choice(eligible_faculty)
                            self._allocate(day, slot_label, sub_name, faculty, batch, batch_subject_hours, faculty_slot_busy, faculty_daily_hours)
                            allocated = True
                            break
                    
                    if not allocated:
                        self.timetable.append({
                            'day': day,
                            'slot': slot_label,
                            'subject': 'SELF STUDY',
                            'teacher_name': 'N/A',
                            'batch': batch,
                            'room_number': 'Library'
                        })

        return self.timetable

    def _allocate(self, day, slot, sub_name, faculty, batch, batch_subject_hours, faculty_slot_busy, faculty_daily_hours):
        self.timetable.append({
            'day': day,
            'slot': slot,
            'subject': sub_name,
            'teacher_name': faculty['name'],
            'batch': batch,
            'room_number': f"LH-{batch.split('-')[-1]}" # Lecture Hall
        })
        batch_subject_hours[(batch, sub_name)] -= 1
        faculty_slot_busy[faculty['id']][(day, slot)] = True
        faculty_daily_hours[faculty['id']][day] += 1

class ResourcePlanner:
    @staticmethod
    def calculate_staff_needs(subjects, batches):
        needs = {}
        for sub in subjects:
            total_hours_needed = sub.hours_per_week * len(batches)
            avg_faculty_capacity = 20 # University faculty usually have lower lecture load
            required_staff = (total_hours_needed + avg_faculty_capacity - 1) // avg_faculty_capacity
            needs[sub.name] = {
                'total_hours': total_hours_needed,
                'staff_count': max(1, required_staff)
            }
        return needs

def run_allocation():
    from .models import FacultyProfile, Subject, User
    
    subjects = Subject.objects.all()
    faculty_profiles = FacultyProfile.objects.select_related('user').prefetch_related('subjects').all()
    
    batches = set()
    for profile in faculty_profiles:
        for batch in profile.assigned_batches:
            batches.add(batch)
    
    faculty_data = []
    for fp in faculty_profiles:
        faculty_data.append({
            'id': fp.user.id,
            'name': fp.user.username,
            'subjects': [s.name for s in fp.subjects.all()],
            'max_hours_day': fp.max_hours_per_day,
            'assigned_batches': fp.assigned_batches
        })
        
    subject_data = [{'name': s.name, 'hours_week': s.hours_per_week} for s in subjects]
    
    generator = TimetableGenerator(faculty_data, subject_data, list(batches))
    return generator.generate()

