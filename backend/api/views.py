from rest_framework import viewsets
from .models import User, Student, Attendance, Transaction, BusRoute, Message, Assignment, LeaveRequest, Substitution, TimetableEntry, Subject, FacultyProfile, Department
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .timetable_logic import run_allocation, ResourcePlanner
from .serializers import (
    UserSerializer, StudentSerializer, AttendanceSerializer, 
    TransactionSerializer, BusRouteSerializer, MessageSerializer,
    AssignmentSerializer, LeaveRequestSerializer, SubstitutionSerializer,
    TimetableEntrySerializer, SubjectSerializer, FacultyProfileSerializer, DepartmentSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class BusRouteViewSet(viewsets.ModelViewSet):
    queryset = BusRoute.objects.all()
    serializer_class = BusRouteSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

class LeaveRequestViewSet(viewsets.ModelViewSet):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveRequestSerializer

class SubstitutionViewSet(viewsets.ModelViewSet):
    queryset = Substitution.objects.all()
    serializer_class = SubstitutionSerializer

class TimetableEntryViewSet(viewsets.ModelViewSet):
    queryset = TimetableEntry.objects.all()
    serializer_class = TimetableEntrySerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class FacultyProfileViewSet(viewsets.ModelViewSet):
    queryset = FacultyProfile.objects.all()
    serializer_class = FacultyProfileSerializer

class ResourcePlanningAPIView(APIView):
    def get(self, request):
        subjects = Subject.objects.all()
        # Get all unique batches from students
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
                # Resolve subject and faculty from name/username for database storage
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

