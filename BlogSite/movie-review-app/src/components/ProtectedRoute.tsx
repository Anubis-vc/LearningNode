import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContex'

type ProtectedRouteProps = {
	requireAdmin?: boolean;
}

export const ProtectedRoute = ({ requireAdmin = false }: ProtectedRouteProps) => {
	const { user, loading, isAdmin } = useAuth();

	if (loading) {
		return <div>loading...</div>
	}
	if (!user) {
		return <Navigate to='/login'/>
	}
	if (requireAdmin && !isAdmin) {
		return <Navigate to='unauthorized' />
	}

	return <Outlet />
}