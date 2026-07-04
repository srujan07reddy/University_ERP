from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('Chancellor', 'Chancellor'),
        ('ViceChancellor', 'Vice Chancellor'),
        ('Dean', 'Dean'),
        ('Registrar', 'Registrar'),
        ('HoD', 'Head of Department'),
        ('CoE', 'Controller of Examinations'),
        ('Finance', 'Finance Officer'),
        ('PlacementOfficer', 'Placement Officer'),
        ('Faculty', 'Faculty'),
        ('Admin', 'Administrator'),
        ('Staff', 'Administrative Staff'),
        ('Student', 'Student'),
        ('Parent', 'Parent'),
    )
    role = models.CharField(max_length=30, choices=ROLE_CHOICES)
    address = models.TextField(blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)

class Department(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)
    head = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='headed_department')

    def __str__(self):
        return f"{self.name} ({self.code})"

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    roll_number = models.CharField(max_length=20, unique=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True, blank=True)
    course = models.CharField(max_length=100) # e.g. B.Tech Computer Science
    semester = models.IntegerField(default=1)
    batch = models.CharField(max_length=10) # e.g. 2024-2028
    parent_name = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.roll_number})"


class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=10, choices=(('Present', 'Present'), ('Absent', 'Absent'), ('Late', 'Late')))

class Transaction(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    status = models.CharField(max_length=10, choices=(('Paid', 'Paid'), ('Pending', 'Pending')))
    description = models.CharField(max_length=255)

class BusRoute(models.Model):
    bus_number = models.CharField(max_length=20)
    driver_name = models.CharField(max_length=100)
    driver_phone = models.CharField(max_length=20, blank=True, null=True)
    route_name = models.CharField(max_length=200, blank=True, null=True)
    current_stop = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=20, default='On Time')
    student_count = models.IntegerField(default=0)
    latitude = models.FloatField(default=0.0)
    longitude = models.FloatField(default=0.0)
    updated_at = models.DateTimeField(auto_now=True)

class Subject(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True)
    credits = models.IntegerField(default=3)
    hours_per_week = models.IntegerField(default=3)

    def __str__(self):
        return f"{self.name} ({self.code})"

class FacultyProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='faculty_profile')
    department = models.ForeignKey(Department, on_delete=models.CASCADE, null=True, blank=True)
    designation = models.CharField(max_length=100) # e.g. Assistant Professor
    subjects = models.ManyToManyField(Subject, related_name='teachers')
    max_hours_per_day = models.IntegerField(default=6)
    assigned_batches = models.JSONField(default=list) # e.g. ["B.Tech-CS-3A", "B.Tech-CS-3B"]


    def __str__(self):
        return f"{self.designation}: {self.user.get_full_name()}"

class TimetableEntry(models.Model):
    day = models.CharField(max_length=20)
    slot = models.CharField(max_length=20)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    faculty = models.ForeignKey(User, on_delete=models.CASCADE)
    batch = models.CharField(max_length=50) # e.g. B.Tech-CS-3A
    room_number = models.CharField(max_length=20)
    is_optimized = models.BooleanField(default=True)

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Assignment(models.Model):
    title = models.CharField(max_length=200)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, null=True)
    deadline = models.DateField()
    total_marks = models.IntegerField(default=100)
    submissions = models.IntegerField(default=0)
    batch = models.CharField(max_length=50)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

class LeaveRequest(models.Model):
    STATUS_CHOICES = (('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected'))
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    receiver_role = models.CharField(max_length=50)
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    date = models.CharField(max_length=50)

class Substitution(models.Model):
    absent_faculty = models.ForeignKey(User, on_delete=models.CASCADE, related_name='absent_subs')
    substitute_faculty = models.ForeignKey(User, on_delete=models.CASCADE, related_name='covering_subs')
    date = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

class RoleTabMapping(models.Model):
    role = models.CharField(max_length=50)
    tab_id = models.CharField(max_length=100)
    label = models.CharField(max_length=100)
    icon = models.CharField(max_length=50)
    order = models.IntegerField(default=0)
    category = models.CharField(max_length=100, default='Base Portal')

    class Meta:
        ordering = ['role', 'category', 'order']
        unique_together = ('role', 'tab_id')

    def __str__(self):
        return f"{self.role} -> {self.tab_id} ({self.category})"

