import { CalendarDays, Droplets, LeafyGreen, Tractor, Sprout } from 'lucide-react';

const scheduleEvents = [
  { day: 'Day 1', date: 'Oct 15, 2026', title: 'Sowing/Planting', desc: 'Sow wheat seeds at appropriate depth.', icon: Tractor, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  { day: 'Day 21', date: 'Nov 5, 2026', title: 'First Irrigation', desc: 'Crown Root Initiation stage. Crucial for tillering.', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { day: 'Day 25', date: 'Nov 9, 2026', title: 'Weed Control + Fertilizer', desc: 'Apply Urea and 2,4-D for broad-leaved weeds.', icon: Sprout, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { day: 'Day 45', date: 'Nov 29, 2026', title: 'Second Irrigation', desc: 'Tillering stage. Ensure proper soil moisture.', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { day: 'Day 65', date: 'Dec 19, 2026', title: 'Third Irrigation + Booting', desc: 'Late jointing stage. Check for diseases.', icon: LeafyGreen, color: 'text-primary', bg: 'bg-primary/20' },
];

export const Schedule = () => {
  return (
    <div className="space-y-6 animate-in fade-in max-w-5xl mx-auto">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-primary/10 rounded-xl">
          <CalendarDays className="text-primary w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Farming Schedule</h1>
          <p className="text-muted-foreground mt-1 text-lg">Smart life-cycle mapping for maximized yield.</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-6 mt-6">
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-lg font-semibold flex items-center">
              <span className="w-3 h-3 rounded-full bg-primary mr-2"></span>
              Current Crop: Wheat
            </h2>
            <p className="text-muted-foreground text-sm mt-1">Sown on Oct 15, 2026 • 2.5 Acres</p>
          </div>
          <div className="bg-secondary px-4 py-2 rounded-lg text-sm font-medium border border-border">
            Expected Harvest: <span className="text-foreground">April 2027</span>
          </div>
        </div>

        <div className="relative border-l-2 border-border ml-6 md:ml-10 space-y-12 pb-8">
          {scheduleEvents.map((event, i) => {
            const Icon = event.icon;
            return (
              <div key={i} className="relative pl-8 md:pl-12">
                <div className={`absolute -left-[21px] md:-left-[25px] top-1 ${event.bg} p-2 rounded-full border-4 border-card`}>
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${event.color}`} />
                </div>
                
                <div className="bg-background rounded-2xl border border-border p-5 shadow-sm hover:border-primary/50 transition-colors group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <h3 className="text-xl font-bold text-foreground flex items-center">
                      {event.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="font-semibold text-primary">{event.day}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground font-medium">{event.date}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{event.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
