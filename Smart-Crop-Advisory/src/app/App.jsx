import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { LanguageProvider } from '../context/LanguageContext';

import { Navbar } from '../layout/Navbar';
import { Sidebar } from '../layout/Sidebar';
import { Landing } from '../pages/Landing';
import { Dashboard } from '../pages/Dashboard';
import { Recommend } from '../pages/Recommend';
import { Weather } from '../pages/Weather';
import { Market } from '../pages/Market';
import { Calendar } from '../pages/Calendar';
import { Profile } from '../pages/Profile';
import { Admin } from '../pages/Admin';
import { Pesticide } from '../pages/Pesticide';
import { Schedule } from '../pages/Schedule';
import { Chatbot } from '../pages/Chatbot';
import { Disease } from '../pages/Disease';
import { Schemes } from '../pages/Schemes';
import { A11yPanel } from '../components/A11yPanel';
import Login from '../pages/login';

const App = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Toaster position="top-right" richColors theme="system" />
        <A11yPanel />
        
        <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors">
          <Sidebar />
          
          <div className="flex-1 flex flex-col min-w-0 h-full relative z-10">
            <Routes >
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            </Routes>
            <Navbar />
            
            <main className="flex-1 overflow-y-auto p-0 md:p-6 bg-secondary/20 relative w-full h-full">
              
              <Routes>
                
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/recommend" element={<Recommend />} />
                <Route path="/schemes" element={<Schemes />} />
                <Route path="/pesticide" element={<Pesticide />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/disease" element={<Disease />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/market" element={<Market />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
