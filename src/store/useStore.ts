import { create } from 'zustand';
import { User, UserRole, LiveStats, BusRoute, Asset, PayrollRecord, AuditLog, Message, CalendarEvent, Survey } from '../types';
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
  assets: Asset[];
  payroll: PayrollRecord[];
  messages: Message[];
  substitutions: Substitution[];
  performanceSettings: { high: string; medium: string; low: string };
  isLoading: boolean;

  setUser: (user: User | null, token?: string | null) => void;
  addUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  updateLiveStats: (stats: Partial<LiveStats>) => void;
  addNote: (note: any) => void;
  addAssignment: (assignment: any) => void;
  addLeaveRequest: (req: any) => void;
  updateLeaveStatus: (id: string, status: 'Approved' | 'Rejected') => void;
  approvePayroll: (id: string) => void;
  addLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  addCalendarEvent: (event: CalendarEvent) => void;
  addSurvey: (survey: Survey) => void;
  voteSurvey: (surveyId: string, optionIndex: number) => void;
  addMessage: (msg: any) => void;
  assignSubstitution: (sub: Substitution) => void;
  updatePerformanceSettings: (settings: { high: string; medium: string; low: string }) => void;
  appointUser: (appointingRole: UserRole, newUser: User) => void;
  updateUser: (userId: string, updatedFields: Partial<User>) => void;
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
}));

