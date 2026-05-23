import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser, registerUser } from '../services/api';
import { useStore } from '../store/useStore';
import { toast } from 'sonner';
import { Eye, EyeOff, Leaf, Loader2 } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const navigate = useNavigate();
  const setUser = useStore((s) => s.setUser);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && form.password !== form.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const fn = isLogin ? loginUser : registerUser;
      const { data } = await fn(payload);

      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.user.email)
      setUser(data.user);
      toast.success(isLogin ? `Welcome back, ${data.user.name}!` : `Account created! Welcome, ${data.user.name}!`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-700 via-green-600 to-emerald-800 items-center justify-center text-white p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-md">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold">SmartCrop AI</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">Intelligent Farming Starts Here 🌾</h1>
          <p className="text-green-100 text-lg leading-relaxed mb-8">
            AI-powered crop advisory, real-time weather insights, market prices & profit optimization — built for India's farmers.
          </p>
          <div className="space-y-3">
            {['AI Crop Recommendations', 'Real-Time Weather Alerts', 'Live Mandi Prices', 'Disease Detection'].map((f) => (
              <div key={f} className="flex items-center space-x-3">
                <span className="w-5 h-5 rounded-full bg-green-400/30 flex items-center justify-center text-xs">✓</span>
                <span className="text-green-50 font-medium">{f}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Leaf className="w-6 h-6 text-green-600" />
            <span className="text-sm font-semibold text-green-600 uppercase tracking-widest">SmartCrop AI</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {isLogin ? 'Welcome back 👋' : 'Create account'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {isLogin ? 'Login to your farm dashboard' : 'Join thousands of smart farmers'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  name="name" type="text" required value={form.name} onChange={handleChange}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                name="email" type="email" required value={form.email} onChange={handleChange}
                placeholder="farmer@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <div className="relative">
                <input
                  name="password" type={showPassword ? 'text' : 'password'} required value={form.password} onChange={handleChange}
                  placeholder="Min 6 characters"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition pr-12"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                <input
                  name="confirm" type="password" required value={form.confirm} onChange={handleChange}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mt-2"
            >
              {loading ? <><Loader2 size={18} className="animate-spin" /><span>Please wait...</span></> : <span>{isLogin ? 'Login to Dashboard' : 'Create Account'}</span>}
            </button>
          </form>

          <p className="text-center mt-5 text-sm text-gray-500 dark:text-gray-400">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setIsLogin(!isLogin); setForm({ name: '', email: '', password: '', confirm: '' }); }}
              className="text-green-600 font-semibold hover:underline ml-1">
              {isLogin ? 'Sign Up Free' : 'Login'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}