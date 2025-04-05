import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type ProtectedRouteProps = {
	requireAdmin?: boolean;
	requireAuth?: boolean;
}

// check to see whether admin or user access required here
export const ProtectedRoute = ({ requireAdmin = false, requireAuth = true }: ProtectedRouteProps) => {
	const { user, loading, isAdmin } = useAuth();

	if (loading) {
		return <div>loading...</div>
	}
	if (requireAuth && !user) {
		return <Navigate to='/login'/>
	}
	if (requireAdmin && !isAdmin) {
		return <Navigate to='unauthorized' />
	}

	return <Outlet />
}