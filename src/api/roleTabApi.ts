import apiClient from './client';

export const RoleTabApi = {
  // Backend: GET /api/role-tab-mappings/?role=<role>
  getByRole: (role: string) => apiClient.get('role-tab-mappings/', { params: { role } }),
};

