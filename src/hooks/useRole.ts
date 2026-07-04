import { useStore } from '../store/useStore';
import { UserRole } from '../types';

export const useRole = () => {
  const user = useStore((state) => state.user);

  const isRole = (role: UserRole) => user?.role === role;

  return {
    role: user?.role,
    isAdmin: isRole('Admin'),
    isAccountant: user?.role === 'Finance',
    isSectionCoord: user?.role === 'Faculty',
    isStaff: !!user?.role && !['Student', 'Parent'].includes(user.role),
    isAuthenticated: !!user,
  };
};
