import { useState, useEffect } from 'react';
import { FileText, ArrowUpRight, Search, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

export const Schemes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [realschemes, setRealschemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post('http://localhost:8080/api/schemes')
      .then((r) => {
        console.log('Schemes:', r.data);
        setRealschemes(r.data);
      })
      .catch((err) => {
        console.error('Error fetching schemes:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredSchemes = realschemes.filter(
    (scheme) =>
      scheme.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.card?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <ShieldCheck className="text-primary w-8 h-8" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Government Schemes
            </h1>

            <p className="text-muted-foreground mt-1 text-lg">
              Browse and explore agricultural support schemes.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />

          <input
            type="text"
            placeholder="Search schemes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-72 pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-10 text-muted-foreground">
          Loading schemes...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {filteredSchemes.map((scheme, i) => (
            <motion.div
              key={scheme._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card hover:bg-muted/10 border border-border p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              {/* Source Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                  {scheme.source || 'Government'}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-foreground mb-4">
                {scheme.title}
              </h2>

              {/* Description */}
              <div className="bg-background/80 p-4 rounded-xl border border-border/50 mb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {scheme.card}
                </p>
              </div>

              {/* Date */}
              <p className="text-xs text-muted-foreground mb-5">
                Updated:{' '}
                {scheme.scrapedAt
                  ? new Date(scheme.scrapedAt).toLocaleDateString('en-IN')
                  : 'N/A'}
              </p>

              {/* View Details Button */}
              <a
                href={scheme.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 bg-foreground text-background font-semibold py-3 px-6 rounded-xl hover:scale-105 active:scale-95 transition-all"
              >
                <span>View Details</span>
                <ArrowUpRight size={18} />
              </a>
            </motion.div>
          ))}

          {filteredSchemes.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground bg-card border border-border border-dashed rounded-3xl">
              <ShieldCheck className="w-16 h-16 mx-auto mb-4 opacity-50 text-primary" />

              <p className="text-lg font-medium text-foreground">
                No schemes found matching "{searchTerm}"
              </p>

              <p className="text-sm mt-1">
                Try searching for NFSM, insurance, subsidy, etc.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Schemes;