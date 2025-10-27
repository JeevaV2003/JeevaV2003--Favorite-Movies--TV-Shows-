
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
    const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false);

    const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await login(data);
      setAuth(res.token, res.user);
      navigate('/');
    } catch (err: any) { 
      alert(err?.response?.data?.message || 'Login failed'); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" {...register('email')} type="email" placeholder="you@example.com" className="mt-1 block w-full p-3 border rounded-md shadow-sm" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" {...register('password')} type="password" placeholder="••••••••" className="mt-1 block w-full p-3 border rounded-md shadow-sm" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition-colors">
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="text-center mt-4">
            <Link to="/signup" className="text-sm text-blue-600 hover:underline">Don't have an account? Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
