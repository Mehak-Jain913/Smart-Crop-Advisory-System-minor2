import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Droplets, TrendingUp, Sun } from 'lucide-react';
import { Footer } from '../layout/Footer';
import { useTranslation } from '../hooks/useTranslation';
import Video from './videoplayback.mp4'

export const Landing = () => {
  const t = useTranslation();

  return (
    <div className="w-full min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 w-full h-screen z-[-1]">
        {/* <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSox8qPH7r24VhAnHdy1n8DrQtoqVHuOggBg&s" 
          alt="Agriculture Background" 
          className="w-full h-full object-cover"
        /> */}
        <video 
          src={Video} 
          autoPlay
          loop
          muted 
          className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto flex flex-col items-center mt-20"
        >
          <div className="inline-flex items-center space-x-2 bg-gray-900 px-4 py-2 rounded-full text-sm font-semibold text-white mb-6 border border-gray-700 shadow-md">
            <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span>{t.empowering || "Empowering Next-Gen Farming"}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl mt-60 font-bold tracking-tight mb-6 text-white drop-shadow-md">
            {t.intelligent || "The Intelligent"} <br className="hidden md:block" />
            <span className="text-primary drop-shadow-md">
              {t.cropAdvisorySys || "Crop Advisory System"}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white font-medium max-w-2xl mx-auto mb-10 leading-relaxed bg-gray-900 p-6 rounded-2xl border border-gray-700 shadow-lg">
            {t.heroDesc || "Boost your yield, manage risks, and increase profits with AI-driven crop recommendations, real-time weather alerts, and market insights."}
          </p>

          <Link 
            to="/login" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-green-600 hover:bg-green-700 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-600/50"
          >
            {t.getStartedFree || "Get Started"}
          </Link>
        </motion.div>

        {/* Features Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 mb-16 max-w-7xl mx-auto w-full px-4"
        >
           <FeatureCard 
             linkTo="/recommend"
             icon={<Leaf className="text-primary w-8 h-8" />} 
             title={t.smartRecommend || "Smart Recommend"} 
             desc="AI suggestions based on soil and climate." 
           />
           <FeatureCard 
             linkTo="/weather"
             icon={<Sun className="text-amber-500 w-8 h-8" />} 
             title={t.weatherAlerts || "Weather Alerts"} 
             desc="Hyper-local forecasts to protect crops." 
           />
           <FeatureCard 
             linkTo="/market"
             icon={<TrendingUp className="text-blue-500 w-8 h-8" />} 
             title={t.marketPricesCard || "Market Prices"} 
             desc="Real-time mandi rates to maximize profit." 
           />
           <FeatureCard 
             linkTo="/schedule"
             icon={<Droplets className="text-cyan-500 w-8 h-8" />} 
             title={t.irrigationCard || "Irrigation Calendar"} 
             desc="Optimize water usage effectively." 
           />
        </motion.div>
      </div>
      
      {/* Featured Images / Gallery */}
      <div className="bg-white dark:bg-gray-900 mt-60 pt-20 pb-16 z-10 relative px-6 w-full shadow-inner border-t border-gray-200 dark:border-gray-800">
         <div className="text-center mb-12 max-w-7xl mx-auto">
           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Empowering the Agricultural Community</h2>
           <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg pt-2">Transforming farming through technology, education, and modern practices.</p>
         
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full text-left">
             <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1OW8A_TqBrXwdgzqStyGqeEhp5W91dtdidw&s" alt="Farming practice" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <span className="text-white font-bold text-xl">Modern Techniques</span>
               </div>
             </div>
             <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
               <img src="https://borgenproject.org/wp-content/uploads/29602966388_8aa39dc110_c-e1665388210344.jpg" alt="Crop Support" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <span className="text-white font-bold text-xl">Sustainable Growth</span>
               </div>
             </div>
             <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
               <img src="https://www.shutterstock.com/image-photo/create-image-happy-indian-farmer-260nw-2590856727.jpg" alt="Happy Farmer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <span className="text-white font-bold text-xl">Empowered Farmers</span>
               </div>
             </div>
           </div>
         </div>
      </div>

      <Footer className="relative z-10" />
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, linkTo }) => (
  <Link to={linkTo} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all relative overflow-hidden group block">
    <div className="w-14 h-14 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 font-medium text-base">{desc}</p>
  </Link>
);

