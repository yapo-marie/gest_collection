import PropTypes from 'prop-types';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function Stats({ totals, byType, byStatus }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 p-6 text-white shadow-lg ring-1 ring-primary-200/40">
        <div className="flex items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <div>
            <p className="text-sm font-medium text-primary-100">Total items</p>
            <p className="mt-1 text-3xl font-bold">{totals.items}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-primary-100">Collections: {totals.collections}</p>
      </div>
      <div className="glass-card rounded-2xl p-6 md:col-span-2 lg:col-span-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">Répartition par type</h3>
          <span className="pill bg-slate-100 text-slate-700">Vue globale</span>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byType} margin={{ top: 20, right: 20, left: -20, bottom: 5 }}>
              <XAxis dataKey="type" tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#818cf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass-card rounded-2xl p-6 md:col-span-2 lg:col-span-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">Statuts</h3>
          <span className="text-xs uppercase tracking-wide text-slate-400">Progression</span>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-5">
          {byStatus.map((status) => (
            <div
              key={status.status}
              className="min-w-[220px] rounded-xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow"
            >
              <p className="text-sm font-medium text-slate-500">{status.label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-800">{status.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Stats.propTypes = {
  totals: PropTypes.shape({
    items: PropTypes.number.isRequired,
    collections: PropTypes.number.isRequired
  }).isRequired,
  byType: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired,
  byStatus: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Stats;
