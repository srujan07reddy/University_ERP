import { create } from 'zustand';
import { User, UserRole, LiveStats, BusRoute, Asset, PayrollRecord, AuditLog, Message, CalendarEvent, Survey, ApprovalRequest, BusinessRule, MessLog, MessReview } from '../types';
import { MOCK_USERS } from '../utils/mockData';
import { setAuthToken } from '../utils/api';

interface Substitution {
  staffId: string;
  substituteId: string;
  date: string;
  status: 'Active' | 'Completed';
}

interface AppState {
  user: User | null;
  token: string | null;
  users: User[];
  auditLogs: AuditLog[];
  calendarEvents: CalendarEvent[];
  surveys: Survey[];
  liveStats: LiveStats;
  notes: Array<{ id: string; sender: string; title: string; content: string; date: string; department: string }>;
  assignments: Array<{ id: string; title: string; deadline: string; totalMarks: number; submissions: number; course: string }>;
  leaveRequests: Array<{ id: string; senderId: string; senderName: string; receiverRole: string; reason: string; status: 'Pending' | 'Approved' | 'Rejected'; date: string }>;
  approvalRequests: ApprovalRequest[];
  assets: Asset[];
  payroll: PayrollRecord[];
  messages: Message[];
  substitutions: Substitution[];
  performanceSettings: { high: string; medium: string; low: string };
  businessRules: BusinessRule[];
  isLoading: boolean;
  messLogs: MessLog[];
  messReviews: MessReview[];

  setUser: (user: User | null, token?: string | null) => void;
  addUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  updateLiveStats: (stats: Partial<LiveStats>) => void;
  addNote: (note: any) => void;
  addAssignment: (assignment: any) => void;
  addLeaveRequest: (req: any) => void;
  updateLeaveStatus: (id: string, status: 'Approved' | 'Rejected') => void;
  submitApprovalRequest: (req: Omit<ApprovalRequest, 'id' | 'status' | 'dateCreated' | 'history'>) => void;
  updateApprovalStatus: (id: string, action: 'Approve' | 'Reject' | 'Correction' | 'Escalate', actorName: string, actorRole: UserRole, comments?: string) => void;
  approvePayroll: (id: string) => void;
  addLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  addCalendarEvent: (event: CalendarEvent) => void;
  addSurvey: (survey: Survey) => void;
  voteSurvey: (surveyId: string, optionIndex: number) => void;
  addMessage: (msg: any) => void;
  assignSubstitution: (sub: Substitution) => void;
  updatePerformanceSettings: (settings: { high: string; medium: string; low: string }) => void;
  updateBusinessRule: (id: string, value: number | string | boolean, isEnabled?: boolean) => void;
  simulateHours: (hours: number) => void;
  appointUser: (appointingRole: UserRole, newUser: User) => void;
  updateUser: (userId: string, updatedFields: Partial<User>) => void;
  addMessLog: (log: Omit<MessLog, 'id'>) => void;
  addMessReview: (review: Omit<MessReview, 'id'>) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  token: null,
  users: MOCK_USERS,
  auditLogs: [
    { id: '1', timestamp: new Date().toISOString(), actor: 'System', action: 'Login', details: 'University Admin session started', severity: 'Info' },
  ],
  calendarEvents: [
    { id: '1', title: 'Convocation 2026', date: '2026-06-15', type: 'Event', visibility: 'All', description: 'Annual graduation ceremony' },
    { id: '2', title: 'Faculty Research Symposium', date: '2026-05-20', type: 'Meeting', visibility: 'Staff', description: 'Presentation of H1 research findings' }
  ],
  surveys: [],
  liveStats: {
    staffPresent: 142,
    studentsPresent: 4850,
    liveBuses: 0,
    revenue: 450000
  },
  notes: [
    { id: '1', sender: 'Dr. Sarah Wilson', title: 'AI Lecture Notes', content: 'Fundamentals of Neural Networks and Backpropagation.', date: '2026-04-25', department: 'Computer Science' },
  ],
  assignments: [
    { id: '1', title: 'Quantum Computing Research', deadline: '2026-05-15', totalMarks: 100, submissions: 45, course: 'Advanced Physics' },
  ],
  leaveRequests: [],
  approvalRequests: [
    {
      id: 'app_1',
      category: 'Leave',
      title: 'Medical Leave - Dr. Wilson',
      senderId: 'fac_1',
      senderName: 'Dr. Sarah Wilson',
      senderRole: 'Faculty',
      description: 'Requesting sick leave for surgery recovery (3 days).',
      status: 'Pending',
      currentApproverRole: 'HoD',
      dateCreated: '2026-07-01',
      history: [
        { status: 'Pending', actorName: 'Dr. Sarah Wilson', actorRole: 'Faculty', actionDate: '2026-07-01', comments: 'Submitted for HOD review.' }
      ]
    },
    {
      id: 'app_2',
      category: 'Budget',
      title: 'Lab Equipments Purchase for Biotech Dept',
      senderId: 'hod_1',
      senderName: 'Dr. Ramesh Kumar',
      senderRole: 'HoD',
      description: 'Procurement of PCR Thermal Cyclers & Centrifuges. Total budget: $12,500.',
      amount: 12500,
      status: 'Pending',
      currentApproverRole: 'Dean',
      dateCreated: '2026-07-02',
      history: [
        { status: 'Pending', actorName: 'Dr. Ramesh Kumar', actorRole: 'HoD', actionDate: '2026-07-02', comments: 'Requested budget clearance.' }
      ]
    }
  ],
  assets: [
    { id: '1', name: 'Supercomputer Cluster A', category: 'IT', condition: 'Good', lastMaintenance: '2026-01-10', nextMaintenance: '2026-07-10' },
  ],
  payroll: [],
  messages: [],
  substitutions: [],
  performanceSettings: {
    high: 'Exceeding university benchmarks (90%+)',
    medium: 'Meeting standards (75-89%)',
    low: 'Below requirement (<75%)'
  },
  businessRules: [
    { id: 'rule_1', name: 'Minimum Attendance Criteria (%)', value: 75, isEnabled: true, category: 'Attendance' },
    { id: 'rule_2', name: 'Placement Package Multiplier (x)', value: 2, isEnabled: true, category: 'Placement' },
    { id: 'rule_3', name: 'HOD vs Dean OD Threshold (Days)', value: 3, isEnabled: true, category: 'Leave' },
    { id: 'rule_4', name: 'Workflow Escalation Timeout (Hours)', value: 24, isEnabled: true, category: 'General' },
  ],
  messLogs: [
    { id: 'm1', date: '2026-07-04', mealType: 'Breakfast', cookedQty: 120, wastedQty: 8, studentsFed: 420, rating: 4.2 },
    { id: 'm2', date: '2026-07-04', mealType: 'Lunch', cookedQty: 250, wastedQty: 22, studentsFed: 780, rating: 3.8 },
    { id: 'm3', date: '2026-07-03', mealType: 'Dinner', cookedQty: 220, wastedQty: 15, studentsFed: 690, rating: 4.5 },
    { id: 'm4', date: '2026-07-03', mealType: 'Lunch', cookedQty: 240, wastedQty: 18, studentsFed: 750, rating: 4.0 },
  ],
  messReviews: [
    { id: 'r1', studentName: 'Aditya Sen', rating: 4.5, comment: 'Puri Sabji was amazing today, less oil please.', date: '2026-07-04', mealType: 'Breakfast' },
    { id: 'r2', studentName: 'Neha Nair', rating: 3.0, comment: 'Rice was a bit undercooked. Paneer gravy was good.', date: '2026-07-04', mealType: 'Lunch' },
    { id: 'r3', studentName: 'Rahul Verma', rating: 5.0, comment: 'Chicken biryani was outstanding! Kudos.', date: '2026-07-03', mealType: 'Dinner' },
  ],
  isLoading: false,

  setUser: (user, token) => {
    if (token) setAuthToken(token);
    set({ user, token });
  },
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  deleteUser: (userId) => set((state) => ({ users: state.users.filter(u => u.id !== userId) })),
  updateLiveStats: (stats) => set((state) => ({ liveStats: { ...state.liveStats, ...stats } })),
  addNote: (note) => set((state) => {
    const newLogs = [{ id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toISOString(), actor: 'Faculty', action: 'Resource Shared', details: `New resource: ${note.title}`, severity: 'Info' as const }, ...state.auditLogs];
    return { notes: [note, ...state.notes], auditLogs: newLogs };
  }),
  addAssignment: (assignment) => set((state) => {
    const newLogs = [{ id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toISOString(), actor: 'Faculty', action: 'Coursework Posted', details: `New assignment: ${assignment.title}`, severity: 'Info' as const }, ...state.auditLogs];
    return { assignments: [assignment, ...state.assignments], auditLogs: newLogs };
  }),
  addLeaveRequest: (req) => set((state) => ({ leaveRequests: [req, ...state.leaveRequests] })),
  updateLeaveStatus: (id, status) => set((state) => ({
    leaveRequests: state.leaveRequests.map(r => r.id === id ? { ...r, status } : r)
  })),
  submitApprovalRequest: (req) => set((state) => {
    const newReq: ApprovalRequest = {
      ...req,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Pending',
      dateCreated: new Date().toISOString().split('T')[0],
      history: [
        {
          status: 'Pending',
          actorName: req.senderName,
          actorRole: req.senderRole,
          actionDate: new Date().toISOString().split('T')[0],
          comments: 'Request submitted.'
        }
      ]
    };
    const log: AuditLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      actor: req.senderRole,
      action: 'Approval Request Submitted',
      details: `${req.category} request: "${req.title}"`,
      severity: 'Info'
    };
    return {
      approvalRequests: [newReq, ...state.approvalRequests],
      auditLogs: [log, ...state.auditLogs]
    };
  }),
  updateApprovalStatus: (id, action, actorName, actorRole, comments) => set((state) => {
    const statusMap: Record<string, 'Approved' | 'Rejected' | 'CorrectionRequired' | 'Escalated'> = {
      Approve: 'Approved',
      Reject: 'Rejected',
      Correction: 'CorrectionRequired',
      Escalate: 'Escalated'
    };

    const newStatus = statusMap[action];

    const updatedRequests = state.approvalRequests.map((req) => {
      if (req.id === id) {
        let nextApprover: UserRole = req.currentApproverRole;
        if (action === 'Approve') {
          if (req.currentApproverRole === 'HoD' && req.category === 'Budget') {
            nextApprover = 'Dean';
          } else if (req.currentApproverRole === 'Dean' && req.category === 'Budget' && (req.amount || 0) > 5000) {
            nextApprover = 'ProVC';
          }
        }
        
        return {
          ...req,
          status: newStatus,
          currentApproverRole: nextApprover,
          comments: comments || req.comments,
          history: [
            ...req.history,
            {
              status: newStatus,
              actorName,
              actorRole,
              actionDate: new Date().toISOString().split('T')[0],
              comments
            }
          ]
        };
      }
      return req;
    });

    const targetReq = state.approvalRequests.find(r => r.id === id);
    const log: AuditLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      actor: actorRole,
      action: `Approval Request ${action}`,
      details: `${targetReq?.category} request: "${targetReq?.title}" updated to ${newStatus}`,
      severity: action === 'Reject' ? 'Warning' : 'Info'
    };

    return {
      approvalRequests: updatedRequests,
      auditLogs: [log, ...state.auditLogs]
    };
  }),
  approvePayroll: (id) => set((state) => ({
    payroll: state.payroll.map(p => p.id === id ? { ...p, status: 'Disbursed' } : p)
  })),
  addLog: (log) => set((state) => ({
    auditLogs: [{ id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toISOString(), ...log } as AuditLog, ...state.auditLogs]
  })),
  addCalendarEvent: (event) => set((state) => ({ 
    calendarEvents: [...state.calendarEvents, event],
    auditLogs: [{ id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toISOString(), actor: 'Admin', action: 'Institutional Calendar Update', details: `New ${event.type}: ${event.title}`, severity: 'Info' as const }, ...state.auditLogs]
  })),
  addSurvey: (survey) => set((state) => ({ 
    surveys: [survey, ...state.surveys],
    auditLogs: [{ id: Math.random().toString(36).substr(2, 9), timestamp: new Date().toISOString(), actor: 'System', action: 'New Campus Survey', details: survey.title, severity: 'Info' as const }, ...state.auditLogs]
  })),
  voteSurvey: (surveyId, optionIndex) => set((state) => ({
    surveys: state.surveys.map(s => {
      if (s.id === surveyId) {
        const optionKey = s.options[optionIndex];
        return { ...s, results: { ...s.results, [optionKey]: (s.results[optionKey] || 0) + 1 } };
      }
      return s;
    })
  })),
  appointUser: (appointingRole: UserRole, newUser: User) => set((state) => {
    const permissions: Record<string, UserRole[]> = {
      ViceChancellor: ['Registrar', 'Finance', 'Dean', 'HoD', 'Admissions'],
      Registrar: ['Faculty', 'Admin'],
      Admissions: ['Student'],
      Admin: ['Chancellor', 'ViceChancellor', 'Dean', 'Registrar', 'Finance', 'Faculty', 'Student', 'Parent', 'PlacementOfficer', 'CoE', 'HoD', 'Admissions'],
      CoE: ['Faculty'],
      HoD: ['Faculty']
    };

    const allowedRoles = permissions[appointingRole as string] || [];
    if (!allowedRoles.includes(newUser.role)) {
      console.warn(`Unauthorized appointment: ${appointingRole} cannot appoint ${newUser.role}`);
      return state;
    }

    const log: AuditLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      actor: appointingRole,
      action: 'User Appointment',
      details: `Appointed ${newUser.name} as ${newUser.role}`,
      severity: 'Info'
    };

    return { 
      users: [...state.users, newUser],
      auditLogs: [log, ...state.auditLogs]
    };
  }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  assignSubstitution: (sub) => set((state) => ({ substitutions: [...state.substitutions, sub] })),
  updatePerformanceSettings: (settings) => set({ performanceSettings: settings }),
  updateBusinessRule: (id, value, isEnabled) => set((state) => {
    const updated = state.businessRules.map(r => {
      if (r.id === id) {
        return { ...r, value, isEnabled: isEnabled !== undefined ? isEnabled : r.isEnabled };
      }
      return r;
    });
    const targetRule = state.businessRules.find(r => r.id === id);
    const log: AuditLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      actor: 'Admin',
      action: 'Business Rule Updated',
      details: `${targetRule?.name} updated to ${value}`,
      severity: 'Warning'
    };
    return { businessRules: updated, auditLogs: [log, ...state.auditLogs] };
  }),
  simulateHours: (hours) => set((state) => {
    const escalationTimeoutRule = state.businessRules.find(r => r.id === 'rule_4');
    const timeout = typeof escalationTimeoutRule?.value === 'number' ? escalationTimeoutRule.value : 24;
    
    let newLogs: AuditLog[] = [];
    const updatedRequests = state.approvalRequests.map(req => {
      if (req.status === 'Pending') {
        const currentElapsed = (req.hoursElapsed || 0) + hours;
        let isEscated = req.isEscalated || false;
        let currentApproverRole = req.currentApproverRole;
        let history = [...req.history];
        
        if (currentElapsed >= timeout && !req.isEscalated) {
          isEscated = true;
          let nextRole: UserRole = currentApproverRole;
          if (currentApproverRole === 'HoD') nextRole = 'Dean';
          else if (currentApproverRole === 'Dean') nextRole = 'ProVC';
          else if (currentApproverRole === 'ProVC') nextRole = 'ViceChancellor';
          
          if (nextRole !== currentApproverRole) {
            currentApproverRole = nextRole;
            history.push({
              status: 'Escalated',
              actorName: 'System Escalation Engine',
              actorRole: 'Admin',
              actionDate: new Date().toISOString().split('T')[0],
              comments: `Automatically escalated after exceeding ${timeout} hours threshold.`
            });
            
            newLogs.push({
              id: Math.random().toString(36).substr(2, 9),
              timestamp: new Date().toISOString(),
              actor: 'System',
              action: 'Workflow Escalation',
              details: `Request "${req.title}" escalated to ${nextRole}`,
              severity: 'Critical'
            });
          }
        }
        
        return {
          ...req,
          hoursElapsed: currentElapsed,
          isEscalated: isEscated,
          currentApproverRole,
          history
        };
      }
      return req;
    });
    
    return {
      approvalRequests: updatedRequests,
      auditLogs: [...newLogs, ...state.auditLogs]
    };
  }),
  updateUser: (userId, updatedFields) => set((state) => {
    const updatedUsers = state.users.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          ...updatedFields,
          universityData: {
            ...u.universityData,
            ...updatedFields.universityData
          }
        };
      }
      return u;
    });
    const currentUser = state.user?.id === userId ? {
      ...state.user,
      ...updatedFields,
      universityData: {
        ...state.user.universityData,
        ...updatedFields.universityData
      }
    } : state.user;
    return { users: updatedUsers, user: currentUser };
  }),
  addMessLog: (log) => set((state) => {
    const newLog: MessLog = {
      ...log,
      id: Math.random().toString(36).substr(2, 9),
    };
    return { messLogs: [newLog, ...state.messLogs] };
  }),
  addMessReview: (review) => set((state) => {
    const newReview: MessReview = {
      ...review,
      id: Math.random().toString(36).substr(2, 9),
    };
    return { messReviews: [newReview, ...state.messReviews] };
  }),
}));

