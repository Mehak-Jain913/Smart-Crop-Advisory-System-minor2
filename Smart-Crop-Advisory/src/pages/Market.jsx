import { useMemo } from 'react';
import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table';
import { useMarket } from '../hooks/useMarket';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Crown, Target, AlertCircle } from 'lucide-react';

export const Market = () => {
  const { data, loading, error } = useMarket();

  const columns = useMemo(() => [
    { header: 'Crop', accessorKey: 'crop' },
    { header: 'Price (₹/Qtl)', accessorKey: 'price' },
    { header: 'Location', accessorKey: 'location' },
    {
      header: 'Change',
      accessorKey: 'change',
      cell: ({ row }) => {
        const change = row.original.change || '0.0%';
        const isUp = change.startsWith('+');
        const isDown = change.startsWith('-');
        return (
          <span className={`text-sm font-semibold ${isUp ? 'text-green-500' : isDown ? 'text-red-500' : 'text-gray-400'}`}>
            {change}
          </span>
        );
      }
    },
    { 
      header: 'Trend', 
      accessorKey: 'trend',
      cell: ({ row }) => {
        const trend = row.getValue('trend');
        return (
          <div className="flex items-center space-x-1 font-medium">
            {trend === 'up' && <TrendingUp size={16} className="text-green-500" />}
            {trend === 'down' && <TrendingDown size={16} className="text-destructive" />}
            {trend === 'stable' && <Minus size={16} className="text-gray-500 dark:text-gray-400" />}
            <span className={`text-sm ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-destructive' : 'text-gray-500 dark:text-gray-400'}`}>
              {trend.charAt(0).toUpperCase() + trend.slice(1)}
            </span>
          </div>
        )
      }
    },
  ], []);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading market data...</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Market Intelligence</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-lg">Real-time Mandi rates and AI-driven market insights.</p>
      </div>

      {/* Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-50 dark:bg-gray-900 border border-green-200 dark:border-gray-800 p-5 rounded-2xl flex items-start space-x-4 shadow-sm">
          <div className="p-3 bg-green-100 dark:bg-gray-800 rounded-xl text-green-600 dark:text-green-400">
            <Crown size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-green-700 dark:text-green-400/80 uppercase tracking-wider mb-1">Best to Sell Now</p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Cotton</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Price up by 8% this week. High demand in Gujarat.</p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-gray-900 border border-blue-200 dark:border-gray-800 p-5 rounded-2xl flex items-start space-x-4 shadow-sm">
          <div className="p-3 bg-blue-100 dark:bg-gray-800 rounded-xl text-blue-600 dark:text-blue-400">
            <Target size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-400/80 uppercase tracking-wider mb-1">High Demand Alert</p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Mustard</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Expected to hit ₹5,800/Qtl by next month.</p>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-gray-900 border border-amber-200 dark:border-gray-800 p-5 rounded-2xl flex items-start space-x-4 shadow-sm">
          <div className="p-3 bg-amber-100 dark:bg-gray-800 rounded-xl text-amber-600 dark:text-amber-400">
             <AlertCircle size={24} />
          </div>
          <div>
             <p className="text-sm font-semibold text-amber-700 dark:text-amber-400/80 uppercase tracking-wider mb-1">Hold Inventory</p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Maize</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Prices dipping temporarily. Hold for 2 weeks.</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden mt-8">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900 dark:text-white">Live Mandi Prices</h2>
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Auto-refresh every 5 min</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
              {(!data || data.length === 0) && (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-8 text-center bg-white dark:bg-gray-900">No matching market rates found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};
