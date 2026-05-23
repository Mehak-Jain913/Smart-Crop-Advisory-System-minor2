import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Cloud, Sunrise, Leaf, DollarSign, Droplets, Video, PhoneCall, TrendingUp, RefreshCw } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { useEffect, useState } from 'react';
import { getDashboardData } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const t = useTranslation();
  const navigate = useNavigate();
  const user = useStore((s) => s.user);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if(!user) {alert(' Please login first.');
    navigate('/login');}
  },[user, navigate]);
  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const d = await getDashboardData();
      setData(d);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-md">
        <div>
          <h1 className="text-2xl font-bold">{t.welcome}{user ? `, ${user.name}` : ''} 👋</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t.overview}</p>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={fetchDashboard} className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition" title="Refresh">
            <RefreshCw size={18} className={loading ? 'animate-spin text-green-600' : 'text-gray-500'} />
          </button>
          <button className="hidden sm:flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-colors">
            <PhoneCall size={18} />
            <span>{t.talkToExpert}</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title={t.weatherCondition}
          value={loading ? '...' : `${data?.weather?.temperature} / ${data?.weather?.condition}`}
          icon={<Sunrise className="text-amber-500" />} change={data?.weather?.humidity ? `Humidity: ${data.weather.humidity}` : t.optimal} />
        <MetricCard title={t.recommendedCrop}
          value={loading ? '...' : (data?.recommendedCrop || 'Wheat')}
          icon={<Leaf className="text-primary" />} change={t.highYield} />
        <MetricCard title={t.expectedYield}
          value={loading ? '...' : (data?.expectedYield || '7.2 Tons')}
          icon={<Cloud className="text-blue-500" />} change="+12% from last year" />
        <MetricCard title={t.estimatedProfit}
          value={loading ? '...' : (data?.estimatedProfit || '₹1.4 Lakhs')}
          icon={<DollarSign className="text-green-600" />} change="+8% market trend" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-bold mb-6">{t.yieldForecast}</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.yieldData || []}>
                <defs>
                  <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#888' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="yield" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorYield)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-6">
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold">{t.smartIrrigation}</h3>
                <div className="p-2 bg-blue-100 dark:bg-gray-800 rounded-xl"><Droplets className="text-blue-600 w-5 h-5" /></div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Next scheduled watering is approaching.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 mt-4 flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Requirement</p>
                <p className="font-bold mt-1">{loading ? '...' : (data?.irrigation?.requirement || '15 mm Water')}</p>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Timing</p>
                <p className="font-bold text-blue-500 mt-1">{loading ? '...' : (data?.irrigation?.timing || 'Tomorrow, 6:00 AM')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold mb-1">{t.helpline}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Connect with KVK experts instantly.</p>
              <a href="tel:1551" className="inline-flex items-center space-x-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:bg-green-700 transition-all">
                <PhoneCall size={18} />
                <span>Kisan Call Center: 1551</span>
              </a>
            </div>
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <PhoneCall className="w-10 h-10 text-primary opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Market Snapshot */}
      {data?.topMarketCrop && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="text-green-600" />
            <h2 className="text-lg font-bold">Top Market Pick Today</h2>
          </div>
          <div className="flex items-center space-x-4 bg-green-50 dark:bg-gray-800 p-4 rounded-xl border border-green-200 dark:border-gray-700">
            <div className="text-3xl">🌾</div>
            <div>
              <p className="font-bold text-xl text-gray-900 dark:text-white">{data.topMarketCrop.name}</p>
              <p className="text-green-600 font-semibold">{data.topMarketCrop.price}</p>
              <p className="text-xs text-gray-500">Trending UP — Good time to sell</p>
            </div>
          </div>
        </div>
      )}

      {/* Video Advisory */}
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-md">
        <div className="flex items-center space-x-2 mb-6">
          <Video className="text-red-600" />
          <h2 className="text-xl font-bold">{t.videoAdvisory}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Modern Wheat Farming', img: 'https://www.fao.org/fileadmin/user_upload/nfms-for-redd/images/large_EAC%20experts%20convene%20to%20validate%20regional%20strategy%20on%20highly%20hazardous%20pesticides.jpg' },
            { title: 'Weather Protection', img: 'https://www.dtn.com/wp-content/uploads/2018/11/ag_weather_corn_blog.jpg' },
            { title: 'Financial Support', img: 'https://rangde.in/blog-admin/uploads/fda7d8_7a884971af314713878a73d0a1bcc375_mv2_f60eac9753.png' },
          ].map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-3 border border-gray-200 dark:border-gray-700 transition-colors">
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-l-[14px] border-l-green-600 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                </div>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover relative z-0" />
              </div>
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">AgriTech India • 12K views</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const MetricCard = ({ title, value, icon, change }) => (
  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col justify-between group">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h4>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
      </div>
      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl group-hover:scale-110 transition-transform">{icon}</div>
    </div>
    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-1 bg-gray-100 dark:bg-gray-800 inline-block rounded-full self-start">{change}</div>
  </div>
);
