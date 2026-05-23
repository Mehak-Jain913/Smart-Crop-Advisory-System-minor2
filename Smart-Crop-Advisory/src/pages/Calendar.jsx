import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Droplets, Scissors, Sprout } from 'lucide-react';
import dayjs from 'dayjs';

const events = [
  { id: 1, title: 'Sow Wheat', date: '2023-11-15', type: 'sowing', icon: <Sprout size={16}/> },
  { id: 2, title: 'Irrigation Round 1', date: '2023-12-05', type: 'irrigation', icon: <Droplets size={16}/> },
  { id: 3, title: 'Fertilizer Application', date: '2023-12-20', type: 'irrigation', icon: <Droplets size={16}/> },
  { id: 4, title: 'Harvest Wheat', date: '2024-04-10', type: 'harvest', icon: <Scissors size={16}/> },
];

export const Calendar = () => {
  const currentMonth = dayjs().format('MMMM YYYY');
  const daysInMonth = dayjs().daysInMonth();
  const firstDay = dayjs().startOf('month').day();

  const getDayEvents = (day) => {
    const dStr = dayjs().date(day).format('YYYY-MM-DD');
    return events.filter(e => e.date.startsWith(dStr.substring(0, 7)) && parseInt(e.date.split('-')[2]) === day);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Crop Calendar</h1>
          <p className="text-muted-foreground mt-1">Manage your farming schedule efficiently.</p>
        </div>
        <div className="flex items-center space-x-2 bg-secondary p-2 rounded-lg text-sm font-medium">
          <CalendarIcon size={18} className="text-primary"/>
          <span>{currentMonth}</span>
        </div>
      </div>

      <div className="bg-card border border-border shadow-sm rounded-xl overflow-hidden">
        <div className="grid grid-cols-7 border-b border-border bg-secondary/50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="py-3 text-center text-sm font-semibold text-muted-foreground">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 auto-rows-[120px]">
          {[...Array(firstDay)].map((_, i) => (
            <div key={`empty-${i}`} className="border-b border-r border-border/50 bg-secondary/20 h-full"></div>
          ))}
          {[...Array(daysInMonth)].map((_, i) => {
            const dayEvents = getDayEvents(i + 1);
            return (
              <div key={i} className={`border-b border-r border-border/50 p-2 h-full hover:bg-secondary/10 transition-colors ${dayjs().date() === i+1 ? 'bg-primary/5' : ''}`}>
                <div className={`text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full mb-1 ${dayjs().date() === i+1 ? 'bg-primary text-white' : 'text-muted-foreground'}`}>
                  {i + 1}
                </div>
                <div className="space-y-1 overflow-y-auto">
                  {dayEvents.map(e => (
                    <div key={e.id} className={`text-[10px] px-1.5 py-1 rounded truncate flex items-center space-x-1 ${e.type === 'sowing' ? 'bg-green-500/10 text-green-600' : e.type === 'harvest' ? 'bg-orange-500/10 text-orange-600' : 'bg-blue-500/10 text-blue-600'}`}>
                      {e.icon}
                      <span>{e.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  );
};
