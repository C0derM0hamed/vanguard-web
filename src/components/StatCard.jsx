export default function StatCard({ label, value, icon: Icon, color, subtext }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{label}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
                </div>
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon size={24} className="text-white" />
                </div>
            </div>
            {subtext && <p className="mt-4 text-xs text-slate-400">{subtext}</p>}
        </div>
    );
}
