export type UserRole = 
  | 'Chancellor' 
  | 'ViceChancellor' 
  | 'ProVC'
  | 'Dean' 
  | 'Registrar' 
  | 'Finance' 
  | 'Faculty' 
  | 'Student' 
  | 'Parent' 
  | 'PlacementOfficer' 
  | 'CoE'
  | 'HoD'
  | 'Admissions'
  | 'Admin';

export interface UniversityData {
  studentData?: {
    studentId: string;
    major: string;
    currentSemester: number;
    creditsEarned: number;
    creditsTotal: number;
    cgpa: number;
    attendancePercentage: number;
    registeredCourses: string[];
    feesDue: number;
    feeHistory: { date: string; amount: number; status: string }[];
    backlogs: number;
  };
  facultyData?: {
    facultyId: string;
    department: string;
    designation: string;
    teachingHoursPerWeek: number;
    researchGrants: number;
    publications: number;
    assignedCourses: { name: string; performance: number[] }[];
    syllabusProgress?: number;
    leaveBalance?: number;
  };
  coeData?: {
    totalExams: number;
    marksUploaded: number;
    marksPending: number;
    integrityAlerts: { id: string; msg: string; severity: 'High' | 'Low' }[];
    evaluationProgress?: number;
  };
  registrarData?: {
    enrollmentTrends: { year: string; count: number }[];
    staffingRatio: string;
    occupancyRate: number;
  };
  vcData?: {
    strategicGoals: string[];
    performanceKpis: { label: string; value: string }[];
  };
  admissionsData?: {
    totalApplications: number;
    underReview: number;
    shortlisted: number;
    admitted: number;
    conversionRate: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  avatar?: string;
  universityData?: UniversityData;
}

export interface LeaveRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  receiverRole: UserRole;
  date: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
  severity: 'Info' | 'Warning' | 'Critical';
}
export interface LiveStats {
  staffPresent: number;
  studentsPresent: number;
  liveBuses: number;
  revenue: number;
}

export interface BusRoute {
  id: string;
  busNo: string;
  driver: string;
  phone: string;
  route: string;
  status: string;
  students: number;
  currentStop: string;
}

export interface Asset {
  id: string;
  name: string;
  category: string;
  condition: string;
  lastMaintenance: string;
  nextMaintenance: string;
}

export interface PayrollRecord {
  id: string;
  staffName: string;
  amount: number;
  month: string;
  status: 'Pending' | 'Disbursed';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'Meeting' | 'Exam' | 'Holiday' | 'Event';
  visibility: 'All' | 'Staff' | 'Students';
  description: string;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  role: 'All' | UserRole;
  options: string[];
  results: { [key: string]: number };
  createdBy: string;
  createdAt: string;
  isActive: boolean;
}

export interface ApprovalHistoryItem {
  status: string;
  actorName: string;
  actorRole: string;
  actionDate: string;
  comments?: string;
}

export interface ApprovalRequest {
  id: string;
  category: 'Leave' | 'OD' | 'Budget' | 'Event' | 'Purchase' | 'Research' | 'MarksLocking';
  title: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  description: string;
  amount?: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'CorrectionRequired' | 'Escalated';
  currentApproverRole: UserRole;
  comments?: string;
  dateCreated: string;
  history: ApprovalHistoryItem[];
  hoursElapsed?: number;
  isEscalated?: boolean;
  escalationTargetRole?: UserRole;
}

export interface BusinessRule {
  id: string;
  name: string;
  value: number | string | boolean;
  isEnabled: boolean;
  category: 'Attendance' | 'Placement' | 'Leave' | 'General';
}

