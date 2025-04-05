import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isAdminLogin, setIsAdminLogin] = useState(false)
	const [isFormValid, setIsFormValid] = useState(false);
	const { login, adminLogin } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		setIsFormValid(username.trim() != '' && password.trim() != '');
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		try {
			if (isAdminLogin) {
				await adminLogin(username, password);
				navigate('/admin')
			}
			else {
				await login(username, password);
				navigate('/')
			}
		}
		catch (err: any) {
			setError(err.response?.data?.error || 'Login failed')
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
				<h1 className="text-2xl font-bold text-center text-gray-800">
					{isAdminLogin ? 'Admin Login' : 'Login'}
				</h1>

				{error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">{error}</div>}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-1">
						<label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={e => setUsername(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>

					<div className="space-y-1">
						<label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>

					<button
						type="submit"
						disabled={!isFormValid}
						className={`w-full py-2 px-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ${isFormValid
								? 'bg-blue-600 hover:bg-blue-700 text-white'
								: 'bg-gray-300 text-gray-500 cursor-not-allowed'
							}`}
					>
						Log In
					</button>
				</form>

				<div className="space-y-3 text-center">
					<button
						onClick={() => setIsAdminLogin(!isAdminLogin)}
						className="text-sm text-blue-600 hover:text-blue-800 font-medium"
					>
						{isAdminLogin ? 'Switch to regular login' : 'Switch to admin login'}
					</button>

					<p className="text-sm text-gray-600">
						Don't have an account? <a href="/register" className="text-blue-600 hover:text-blue-800">Register</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;