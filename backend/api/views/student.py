from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from django.contrib.auth import get_user_model
from ..models import Student, Attendance, StudentFeeLedger, Department
from ..serializers import StudentSerializer, AttendanceSerializer, StudentFeeLedgerSerializer

User = get_user_model()

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    @action(detail=False, methods=['post'], url_path='enroll')
    def enroll(self, request):
        data = request.data
        email = data.get('email')
        name = data.get('name')
        roll_number = data.get('roll_number')
        department_id = data.get('department')
        course = data.get('course')
        specialization = data.get('specialization', '')
        batch = data.get('batch')
        total_term_fees = data.get('total_term_fees')
        due_date = data.get('due_date')
        paid_fees = data.get('paid_fees', 0.0)

        if not (email and name and roll_number and course and batch and total_term_fees and due_date):
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                # 1. Create User
                username = email.split('@')[0]
                # Ensure username is unique
                counter = 1
                base_username = username
                while User.objects.filter(username=username).exists():
                    username = f"{base_username}{counter}"
                    counter += 1

                user = User.objects.create_user(
                    username=username,
                    email=email,
                    first_name=name.split(' ')[0],
                    last_name=' '.join(name.split(' ')[1:]) if len(name.split(' ')) > 1 else '',
                    role='Student'
                )
                user.set_password(roll_number) # Roll number as default password
                user.save()

                # 2. Get Department
                dept = None
                if department_id:
                    dept = Department.objects.filter(id=department_id).first()

                # 3. Create Student Profile
                student = Student.objects.create(
                    user=user,
                    roll_number=roll_number,
                    department=dept,
                    course=course,
                    specialization=specialization,
                    batch=batch
                )

                # 4. Create Student Fee Ledger
                StudentFeeLedger.objects.create(
                    student=student,
                    total_term_fees=total_term_fees,
                    paid_fees=paid_fees,
                    due_date=due_date,
                    status='Paid' if float(paid_fees) >= float(total_term_fees) else ('Partial' if float(paid_fees) > 0 else 'Unpaid')
                )

                serializer = StudentSerializer(student)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

class StudentFeeLedgerViewSet(viewsets.ModelViewSet):
    queryset = StudentFeeLedger.objects.all()
    serializer_class = StudentFeeLedgerSerializer

