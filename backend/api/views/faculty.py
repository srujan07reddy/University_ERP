from rest_framework import viewsets
from ..models import Assignment, LeaveRequest, Substitution, FacultyProfile
from ..serializers import (
    AssignmentSerializer, LeaveRequestSerializer, SubstitutionSerializer, FacultyProfileSerializer
)

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

class LeaveRequestViewSet(viewsets.ModelViewSet):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveRequestSerializer

class SubstitutionViewSet(viewsets.ModelViewSet):
    queryset = Substitution.objects.all()
    serializer_class = SubstitutionSerializer

class FacultyProfileViewSet(viewsets.ModelViewSet):
    queryset = FacultyProfile.objects.all()
    serializer_class = FacultyProfileSerializer
