import { Link } from 'react-router-dom';
import { Leaf, Twitter, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-800 mt-auto py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          
          {/* Left: Logo + short description */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold">
                SmartCrop
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Empowering small and marginal farmers with AI-driven agricultural insights and real-time market data.
            </p>
          </div>

          {/* Center: Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link to="/weather" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Weather Alert</Link></li>
              <li><Link to="/market" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Market Prices</Link></li>
            </ul>
          </div>

          {/* Right: Contact info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                <Phone size={16} className="shrink-0 text-primary" />
                <span>Helpline: 1551 (Kisan Call Center)</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                <Mail size={16} className="shrink-0 text-primary" />
                <span>support@smartcrop.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom: Copyright line */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SmartCrop Advisory System. All rights reserved.
          </p>
          <div className="flex items-center space-x-1">
            <span>Made with</span>
            <Leaf size={14} className="text-primary" />
            <span>for Indian Farmers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
