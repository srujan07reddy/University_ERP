from rest_framework import viewsets
from ..models import User, Department, RoleTabMapping, BusRoute, Message, TimetableEntry, Subject
from ..serializers import (
    UserSerializer, DepartmentSerializer, RoleTabMappingSerializer,
    BusRouteSerializer, MessageSerializer, TimetableEntrySerializer, SubjectSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RoleTabMappingViewSet(viewsets.ModelViewSet):
    queryset = RoleTabMapping.objects.all()
    serializer_class = RoleTabMappingSerializer

    def get_queryset(self):
        queryset = RoleTabMapping.objects.all()
        role = self.request.query_params.get('role')
        if role is not None:
            queryset = queryset.filter(role=role)
        return queryset

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class BusRouteViewSet(viewsets.ModelViewSet):
    queryset = BusRoute.objects.all()
    serializer_class = BusRouteSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class TimetableEntryViewSet(viewsets.ModelViewSet):
    queryset = TimetableEntry.objects.all()
    serializer_class = TimetableEntrySerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
