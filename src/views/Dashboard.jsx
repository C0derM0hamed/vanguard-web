import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Package, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';
import { fetchRegistry } from '../store/registrySlice';
import StatCard from '../components/StatCard';

export default function Dashboard() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.registry);

    const count = items.length;
    const totalValue = items.reduce((acc, item) => acc + Number(item.price), 0);

    useEffect(() => {
        dispatch(fetchRegistry());
    }, [dispatch]);


    return (
        <div className="space-y-8 animate-fade-in">
            <header>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h2>
                <p className="text-slate-500">Welcome back. Here is what's happening.</p>
            </header>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-32 bg-slate-100 rounded-xl animate-pulse"></div>
                    <div className="h-32 bg-slate-100 rounded-xl animate-pulse"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard
                        label="Total Records"
                        value={count}
                        icon={Package}
                        color="bg-blue-500"
                        subtext="Items currently in registry"
                    />
                    <StatCard
                        label="Total Value"
                        value={`$${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                        icon={TrendingUp}
                        color="bg-teal-500"
                        subtext="Aggregate price of all items"
                    />
                    <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                        <div className="p-3 bg-white rounded-full mb-3 shadow-sm">
                            <AlertCircle size={20} className="text-slate-300" />
                        </div>
                        <p className="text-sm font-medium text-slate-500">More metrics coming soon</p>
                    </div>
                </div>
            )}

            <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 text-white shadow-lg overflow-hidden relative">
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold">Manage your Registry</h3>
                        <p className="text-teal-100 mt-1 max-w-lg">
                            Keep your records up to date. Add new items, edit existing details, or audit your inventory.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/registry" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-lg font-medium transition flex items-center gap-2">
                            View All
                        </Link>
                        <Link to="/create" className="bg-white text-teal-700 hover:bg-teal-50 px-5 py-2.5 rounded-lg font-medium shadow-sm transition flex items-center gap-2">
                            Add New
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
