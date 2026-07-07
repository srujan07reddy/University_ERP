import { User } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Dr. Arthur Pendragon',
    email: 'admin@university.com',
    role: 'Administration',
  },
  {
    id: '2',
    name: 'Prof. Albus Dumbledore',
    email: 'vc@university.com',
    role: 'ViceChancellor',
    universityData: {
      vcData: {
        strategicGoals: ['Campus Expansion 2026', 'AI Research Center Launch', 'Top 50 Ranking'],
        performanceKpis: [
          { label: 'Institutional Health', value: 'Excellent' },
          { label: 'Research Output', value: '+24%' }
        ]
      }
    }
  },
  {
    id: '3',
    name: 'Dr. Sarah Smith',
    email: 'faculty@university.com',
    role: 'Faculty',
    universityData: {
      facultyData: {
        facultyId: 'FAC001',
        department: 'Computer Science',
        designation: 'Professor',
        teachingHoursPerWeek: 18,
        researchGrants: 3,
        publications: 12,
        syllabusProgress: 65,
        leaveBalance: 12,
        assignedCourses: [
          { name: 'Advanced Algorithms', performance: [85, 70, 92, 65, 88] },
          { name: 'Distributed Systems', performance: [60, 55, 75, 40, 68] }
        ]
      }
    }
  },
  {
    id: '4',
    name: 'John Doe',
    email: 'student@university.com',
    role: 'Student',
    universityData: {
      studentData: {
        studentId: 'STU001',
        major: 'Software Engineering',
        currentSemester: 6,
        creditsEarned: 102,
        creditsTotal: 140,
        cgpa: 3.85,
        attendancePercentage: 82,
        registeredCourses: ['CS301', 'CS302', 'CS305'],
        feesDue: 1500,
        feeHistory: [
          { date: '2024-01-10', amount: 3000, status: 'Success' },
          { date: '2023-08-15', amount: 3000, status: 'Success' }
        ],
        backlogs: 0
      }
    }
  },
  {
    id: '5',
    name: 'Robert Wilson',
    email: 'parent@university.com',
    role: 'Parent',
  },
  {
    id: '6',
    name: 'Alice Cooper',
    email: 'finance@university.com',
    role: 'Finance',
  },
  {
    id: '7',
    name: 'Dr. Victor Fries',
    email: 'coe@university.com',
    role: 'CoE',
    universityData: {
      coeData: {
        totalExams: 124,
        marksUploaded: 98,
        marksPending: 26,
        integrityAlerts: [
          { id: '1', msg: 'Anomalous grading in CS301 Section B', severity: 'High' },
          { id: '2', msg: 'Delayed result upload for PH101', severity: 'Low' }
        ]
      }
    }
  },
  {
    id: '8',
    name: 'Dr. Minerva McGonagall',
    email: 'dean@university.com',
    role: 'Dean',
  },
  {
    id: '9',
    name: 'Argus Filch',
    email: 'registrar@university.com',
    role: 'Registrar',
    universityData: {
      registrarData: {
        enrollmentTrends: [
          { year: '2023', count: 38000 },
          { year: '2024', count: 40500 },
          { year: '2025', count: 42500 }
        ],
        staffingRatio: '1:18',
        occupancyRate: 88
      }
    }
  },
  {
    id: '10',
    name: 'Lord Chancellor',
    email: 'chancellor@university.com',
    role: 'Chancellor',
  },
  {
    id: '11',
    name: 'James Bond',
    email: 'placement@university.com',
    role: 'PlacementOfficer',
  },
  {
    id: '12',
    name: 'Dr. Gregory House',
    email: 'hod@university.com',
    role: 'HoD',
    universityData: {
      facultyData: {
        facultyId: 'HOD001',
        department: 'Medical Sciences',
        designation: 'Head of Department',
        teachingHoursPerWeek: 12,
        researchGrants: 5,
        publications: 45,
        syllabusProgress: 88,
        leaveBalance: 15,
        assignedCourses: [
          { name: 'Diagnostic Pathology', performance: [95, 98, 92, 90, 96] }
        ]
      }
    }
  },
  {
    id: '13',
    name: 'Sarah Connor',
    email: 'admissions@university.com',
    role: 'Admissions',
    universityData: {
      admissionsData: {
        totalApplications: 4500,
        underReview: 1200,
        shortlisted: 850,
        admitted: 640,
        conversionRate: 14.2
      }
    }
  },
  {
    id: '14',
    name: 'Dr. Minerva McGonagall',
    email: 'provc@university.com',
    role: 'ProVC',
  },
  {
    id: '15',
    name: 'Otto Mann',
    email: 'busincharge@university.com',
    role: 'BusIncharge',
  },
  {
    id: '16',
    name: 'Gordon Ramsay',
    email: 'messincharge@university.com',
    role: 'MessIncharge',
  }
];
