import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';
import { Users, Leaf, AlertTriangle } from 'lucide-react';

const analyticsData = [
  { name: 'Jan', requests: 400 },
  { name: 'Feb', requests: 600 },
  { name: 'Mar', requests: 800 },
  { name: 'Apr', requests: 500 },
  { name: 'May', requests: 1200 },
];

const userData = [
  { id: 1, name: 'Ramesh Singh', location: 'UP', farmSize: '10 Acres', joined: '2023-01-10', status: 'Active' },
  { id: 2, name: 'Suresh Kumar', location: 'Haryana', farmSize: '15 Acres', joined: '2023-02-14', status: 'Active' },
  { id: 3, name: 'Amit Patel', location: 'Gujarat', farmSize: '8 Acres', joined: '2023-03-22', status: 'Inactive' },
  { id: 4, name: 'Raj Patil', location: 'Maharashtra', farmSize: '5 Acres', joined: '2023-05-01', status: 'Active' },
];

export const Admin = () => {
  const columns = useMemo(() => [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Location', accessorKey: 'location' },
    { header: 'Farm Size', accessorKey: 'farmSize' },
    { header: 'Joined', accessorKey: 'joined' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.getValue('status');
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
            {status}
          </span>
        )
      }
    },
  ], []);

  const table = useReactTable({
    data: userData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Admin Portal</h1>
        <p className="text-muted-foreground mt-1">System overview and farmer management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminCard title="Total Farmers" value="1,248" icon={<Users className="text-blue-500" />} />
        <AdminCard title="Recommendations" value="8,590" icon={<Leaf className="text-primary" />} />
        <AdminCard title="System Alerts" value="3" icon={<AlertTriangle className="text-red-500" />} bg="bg-red-500/5" border="border-red-500/20" />
      </div>

      <div className="bg-card border border-border rounded-xl p-5 shadow-sm mt-8">
        <h3 className="text-lg font-semibold mb-4 text-card-foreground">Platform Usage (API Requests)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
              <XAxis dataKey="name" tick={{fill: '#888'}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill: '#888'}} axisLine={false} tickLine={false} />
              <ChartTooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="requests" stroke="#16a34a" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden mt-8">
        <div className="p-5 border-b border-border bg-secondary/20">
          <h3 className="text-lg font-semibold text-card-foreground flex items-center space-x-2">
            <Users size={20} className="text-primary" />
            <span>Registered Farmers</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-muted-foreground">
            <thead className="bg-secondary/50 text-foreground border-b border-border">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

const AdminCard = ({ title, value, icon, bg = 'bg-card', border = 'border-border' }) => (
  <div className={`${bg} border ${border} p-6 rounded-2xl shadow-sm flex items-center justify-between group hover:-translate-y-1 transition-transform cursor-default`}>
    <div>
      <h4 className="text-muted-foreground text-sm font-medium">{title}</h4>
      <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
    </div>
    <div className="p-4 bg-secondary/80 rounded-full group-hover:scale-110 transition-transform">
      {icon}
    </div>
  </div>
);
