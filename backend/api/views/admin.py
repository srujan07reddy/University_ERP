from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Subject, Student, User, TimetableEntry
from ..timetable_logic import run_allocation, ResourcePlanner

class ResourcePlanningAPIView(APIView):
    def get(self, request):
        subjects = Subject.objects.all()
        batches = list(Student.objects.values_list('batch', flat=True).distinct())
        if not batches:
            batches = ["2024-A", "2024-B"]
            
        planner = ResourcePlanner()
        needs = planner.calculate_staff_needs(subjects, batches)
        return Response(needs)

class GenerateTimetableAPIView(APIView):
    def post(self, request):
        try:
            entries = run_allocation()
            db_entries = []
            for entry in entries:
                subject = Subject.objects.get(name=entry['subject'])
                faculty = User.objects.get(username=entry['teacher_name'])
                
                db_entries.append(TimetableEntry(
                    day=entry['day'],
                    slot=entry['slot'],
                    subject=subject,
                    faculty=faculty,
                    batch=entry['batch'],
                    room_number=entry['room_number']
                ))
            
            TimetableEntry.objects.bulk_create(db_entries)
            return Response({"status": "success", "message": f"Generated {len(entries)} entries"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"status": "error", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
