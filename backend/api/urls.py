from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, DepartmentViewSet, StudentViewSet, AttendanceViewSet, TransactionViewSet, 
    BusRouteViewSet, MessageViewSet, AssignmentViewSet, 
    LeaveRequestViewSet, SubstitutionViewSet, TimetableEntryViewSet,
    SubjectViewSet, FacultyProfileViewSet, RoleTabMappingViewSet,
    GenerateTimetableAPIView, ResourcePlanningAPIView
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'departments', DepartmentViewSet)
router.register(r'students', StudentViewSet)
router.register(r'attendance', AttendanceViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'bus-routes', BusRouteViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'assignments', AssignmentViewSet)
router.register(r'leave-requests', LeaveRequestViewSet)
router.register(r'substitutions', SubstitutionViewSet)
router.register(r'timetable', TimetableEntryViewSet)
router.register(r'subjects', SubjectViewSet)
router.register(r'faculty-profiles', FacultyProfileViewSet)
router.register(r'role-tab-mappings', RoleTabMappingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('generate-timetable/', GenerateTimetableAPIView.as_view(), name='generate-timetable'),
    path('resource-planning/', ResourcePlanningAPIView.as_view(), name='resource-planning'),
]

