import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContex'

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword]= useState('');
	const [error, setError] = useState('');
	const [isAdminLogin, setIsAdminLogin] = useState(false)
	const { login, adminLogin } = useAuth();
	const navigate = useNavigate();

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
		catch (err:any){
			setError(err.response?.data?.error || 'Login failed')
		}
	};

	return (
		<div className='login-container'>
			<h1>{isAdminLogin ? 'Admin Login' : 'Login' }</h1>

			{error && <div className='error-message'>{error}</div>}

			<form onSubmit={handleSubmit}>
				<div className='field-container'>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id='username'
						value={username}
						onChange={e => setUsername(e.target.value)}
						required	
					/>
				</div>
				<div className='field-container'>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type='submit'>Log In</button>
			</form>

			<div className='login-options'>
				<button
					onClick={() => setIsAdminLogin(!isAdminLogin)}
					className='switch-login'	
				>
					{isAdminLogin ? 'Switch to regular login' : 'Switch to admin login'}
				</button>

				<p>Don't have an account? <a href="/register">Register</a></p>
			</div>
		</div>
	)
};

export default Login;