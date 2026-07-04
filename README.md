# Jeppiaar University - Enterprise Resource Planning (ERP) Portal

A modern, high-fidelity, responsive, and mobile-friendly university management ecosystem designed for the multi-school structure of **Jeppiaar University**. The system implements strict role-based access control (RBAC), real-time global state synchronization, and next-gen AI modules.

---

## 🏛️ University Structure

Every student, faculty member, and academic asset is nested inside a multi-tier database hierarchy:
$$\text{University} \rightarrow \text{School} \rightarrow \text{Department} \rightarrow \text{Program} \rightarrow \text{Batch} \rightarrow \text{Section} \rightarrow \text{Student}$$

### 🏫 Schools & Departments (Jeppiaar Layout)
1.  **School of Engineering & Technology (SET)**: CSE, CSE Cyber Security, AI & DS, AI & ML, ECE, Biotechnology.
2.  **School of Sciences & Allied Health Science (SSAHS)**: BCA, B.Sc CS, B.Sc AI, B.Sc Forensic Science, B.Sc MLT.
3.  **School of Arts, Humanities & Management (SAHM)**: BBA, B.Com, MBA.
4.  **School of Aviation**: B.Sc Aviation, BBA Airline & Airport Management, BBA Shipping & Logistics.
5.  **School of Physical Education & Sports Science (SPESS)**: B.Sc Physical Education.

---

### 🏛️ University Leadership & Admins

#### 👑 Vice Chancellor (VC) Dashboard ([VCDashboard.tsx](file:///d:/University_ERP/src/screens/University/VCDashboard.tsx))
Provides high-level strategic oversight of the entire institution:
*   **Strategic KPIs**: Real-time monitoring of global metrics like NIRF Ranking, Academic Ratings, Research Outputs, and overall Faculty count.
*   **Vision 2025 Milestones**: Tracking progress on international accreditations and multi-million dollar research grant utilization.
*   **Directive Pipeline**: Global task routing for annual reviews and tenure approvals.

#### 🏅 Pro Vice Chancellor (Pro VC) Dashboard ([ProVCDashboard.tsx](file:///d:/University_ERP/src/screens/University/ProVCDashboard.tsx))
Dedicated to Academic & Student Affairs operations:
*   **OBE Trackers**: Monitor Outcome Based Education metrics and curriculum schedules.
*   **Collaborations**: Manage active MoUs and industry partnerships.
*   **Appraisals Monitoring**: View global faculty performance appraisal cycles.

#### 📜 University Registrar Dashboard ([RegistrarDashboard.tsx](file:///d:/University_ERP/src/screens/University/RegistrarDashboard.tsx))
Focused on records, compliance, and campus-wide governance:
*   **Enrollment Master**: Monitor active enrollments and degree audit completion status.
*   **Compliance Logs**: Track Service Book digitizations and convocation clearance audits.
*   **Clearance Queue**: Action employee exit clearings and end-of-term academic grade logs.

---

### 👥 Role-Based Access Control (RBAC) & Dashboards

### 1. 🎓 Dean Dashboard (School Admin)
Scoped exclusively to their school (e.g. Dean of SET cannot access Aviation or SAHM data):
*   **Academic Overview**: Track total departments, active courses, pass rates, and syllabus progression.
*   **Faculty Monitoring**: Oversee workload hours, lesson plan updates, and student feedback.
*   **Approvals Center**: Approve or reject budget allocations, event proposals, and equipment purchases.
*   **My Staff Operations**: Fully functional faculty module access (Timetables, Student Attendance marking, Internal Assessment Gradebook, Assignments posting, AI Lesson planner, and Research portfolio tracker) to accommodate Dean teaching duties.

### 2. 💼 HOD Console (Dual-Role)
Operates at department-level (e.g. CSE HOD owns only CSE data) and features a dual layout:
*   **HOD Management**: Allocate subjects, schedules, class advisors, lab inventories, and authorize student marks.
*   **My Staff Operations**: Complete suite of teaching tools (Attendance, Grades, Assignments, AI lesson planner, Research tracker, Timetable, and personal leave) for HOD academic duties.

### 3. 👩‍🏫 Faculty Hub
*   **Internal Gradebook**: Filter students by **Subject, Year/Batch, and Section** to enter marks. Excel export/import simulator.
*   **Student Attendance**: Mark daily attendance, notify absentees, and view shortage alerts.
*   **AI Lesson Planner**: Generates weekly lesson breakdowns mapping topics to Bloom's Taxonomy.
*   **Student Directory Profiles**: View comprehensive student profiles (attendance rate, current CGPA, parent contacts, achievements) directly from the gradebook roster.

### 4. 👨‍🎓 Student Portal
*   **My Services**: Dynamic rendering of Hostel Room, Transport routes, and Placement options depending on residency/eligibility status.
*   **AI Academic Tutor**: Interactive sidebar to query syllabus topics and recommended resources.
*   **AI Resume Matcher**: Upload CVs to parse skills, check ATS scores, and find skill gaps.
*   **Faculty Academic Research Logs**: View profiles of course-instructors detailing their qualifications, experience, scientific publications, and logged patents.

### 5. 🏢 Training & Placement (TPMS)
*   **Eligibility Rule Engine**: Filter eligible students by CGPA, active backlogs, gender, and skills.
*   **CRM Recruiter Database**: Maintain historical hiring trends (offers/packages) and MoU status.
*   **AI Analytics**: Run analysis on unplaced student risk indexes and corporate demand alignment.

### 6. 💬 SafeChat & Notification Center (All Roles)
*   **Push Notifications**: Deans, VCs, and Admins can broadcast priority notification announcements targeting HODs, Faculty, or Students.
*   **Direct Chat**: Instant bidirectional messaging between any user in the university directory.

---

## 🛠️ Technology Stack & Web Optimizations

1.  **Frontend Core**: React Native (Expo) supporting Web and Native compilation targets.
2.  **State Management**: Zustand (State changes in HOD allocations or Gradebook reflect globally in real-time).
3.  **Aesthetics & Styling**: CSS utilities configured for responsiveness.
4.  **Web Viewport Enhancements**:
    *   **Permanent Left Navigation Sidebar**: Renders a fixed $280\text{px}$ sidebar on Desktop browsers (`Platform.OS === 'web'`), collapsing to a sliding drawer modal on Mobile viewports.
    *   **Native Scroll Correction**: Added `overflowY: 'auto'` to workspace columns on Web to resolve clipped/hidden scrollable containers.
    *   **Bottom Navigation**: Automatically hidden on Web targets to prevent UI clutter.
