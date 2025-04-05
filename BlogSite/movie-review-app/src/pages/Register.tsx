import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);
	const { register } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		setIsFormValid(
		  username.trim() !== '' && 
		  email.trim() !== '' && 
		  password.trim() !== '' && 
		  confirmPassword.trim() !== ''
		);
	}, [username, email, password, confirmPassword]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		if (password != confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		try {
			await register(username, email, password);
			navigate('/');
		} 
		  catch (err: any) {
			setError(err.response?.data?.error || 'Registration failed');
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
		  <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
			<h1 className="text-2xl font-bold text-center text-gray-800">Create an Account</h1>
			
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
				<label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
				<input
				  type="email"
				  id="email"
				  value={email}
				  onChange={e => setEmail(e.target.value)}
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
			  
			  <div className="space-y-1">
				<label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
				<input
				  type="password"
				  id="confirmPassword"
				  value={confirmPassword}
				  onChange={e => setConfirmPassword(e.target.value)}
				  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				  required
				/>
			  </div>
			  
			  <button 
				type="submit"
				disabled={!isFormValid}
				className={`w-full py-2 px-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150
					${
				  isFormValid 
					? 'bg-blue-600 hover:bg-blue-700 text-white' 
					: 'bg-gray-300 text-gray-500 cursor-not-allowed'
				}`}
			  >
				Register
			  </button>
			</form>
			
			<div className="text-center">
			  <p className="text-sm text-gray-600">
				Already have an account? <a href="/login" className="text-blue-600 hover:text-blue-800">Log in</a>
			  </p>
			</div>
		  </div>
		</div>
	  );
	};
	
	export default Register;