import { UserRole } from '../types';

// School_ERP roles are NOT the same as University_ERP.
// Keep mapping here so we can normalize School_ERP role strings to University_ERP UserRole values.
// Add new entries as soon as we discover new mismatches.

export type SchoolRole = string;

export const schoolToUniversityRole = (schoolRole: SchoolRole): UserRole | null => {
  const r = (schoolRole || '').trim();

  const direct: Partial<Record<SchoolRole, UserRole>> = {
    // Examples based on backend conventions seen in Django models ("Vice Chancellor" vs "ViceChancellor")
    'Vice Chancellor': 'ViceChancellor',
    'ViceChancellor': 'ViceChancellor',

    'Head of Department': 'HoD',
    'HoD': 'HoD',

    'Administrator': 'Admin',
    'Admin': 'Admin',

    'Finance Officer': 'Finance',
    'Finance': 'Finance',

    'Controller of Examinations': 'CoE',
    'CoE': 'CoE',

    'Placement Officer': 'PlacementOfficer',
    'PlacementOfficer': 'PlacementOfficer',

    'Faculty': 'Faculty',
    'Student': 'Student',
    'Parent': 'Parent',

    'Chancellor': 'Chancellor',
    'Dean': 'Dean',
    'Registrar': 'Registrar',
    'Admissions': 'Admissions',

    'Administrative Staff': 'Faculty', // best-effort; refine if School_ERP defines a distinct staff role
    'Staff': 'Faculty',
  };

  if (direct[r as SchoolRole]) return direct[r as SchoolRole]!;

  // Fuzzy normalization: remove extra spaces and unify casing.
  const normalized = r.replace(/\s+/g, '');
  const fuzzy: Partial<Record<string, UserRole>> = {
    'ViceChancellor': 'ViceChancellor',
    'ViceChancellorOfficial': 'ViceChancellor',
    'HeadOfDepartment': 'HoD',
    'Admin': 'Admin',
    'FinanceOfficer': 'Finance',
    'PlacementOfficer': 'PlacementOfficer',
    'ControllerofExaminations': 'CoE',
  };

  if (fuzzy[normalized]) return fuzzy[normalized]!;

  return null;
};

