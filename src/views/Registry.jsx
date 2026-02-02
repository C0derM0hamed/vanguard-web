import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Search, Plus, Eye } from 'lucide-react';
import { fetchRegistry, deleteRegistryItem } from '../store/registrySlice';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Registry() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.registry);
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(fetchRegistry());
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to remove this item?')) {
            dispatch(deleteRegistryItem(id));
        }
    };

    const filteredItems = items.filter(item =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Registry</h2>
                    <p className="text-slate-500">Database of all registered items.</p>
                </div>

                <div className="flex gap-3">
                    <div className="relative group">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search items..."
                            className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 w-full sm:w-64 transition-all shadow-sm"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <Link
                        to="/create"
                        className="hidden sm:flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-all active:scale-95"
                    >
                        <Plus size={18} />
                        Add Item
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {loading ? (
                    <LoadingSpinner message="Loading records..." />
                ) : filteredItems.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-100">
                                    <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">Item Name</th>
                                    <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs">Category</th>
                                    <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs text-right">Price</th>
                                    <th className="px-6 py-4 font-semibold text-slate-500 uppercase tracking-wider text-xs text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredItems.map(item => (
                                    <tr key={item.id} className="group hover:bg-slate-50 transition-colors duration-150">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{item.title}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="font-mono text-slate-600">${Number(item.price).toFixed(2)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    to={`/view/${item.id}`}
                                                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                                                    title="View"
                                                >
                                                    <Eye size={16} />
                                                </Link>
                                                <Link
                                                    to={`/edit/${item.id}`}
                                                    className="p-2 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors border border-transparent hover:border-teal-100"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-16 text-center text-slate-500 flex flex-col items-center">
                        <div className="bg-slate-50 p-4 rounded-full mb-4">
                            <Search size={24} className="text-slate-300" />
                        </div>
                        <p className="font-medium text-slate-900">No items found</p>
                        <p className="text-sm mt-1">Try adjusting your search query.</p>
                    </div>
                )}
            </div>

            {/* Mobile-only FAB */}
            <Link
                to="/create"
                className="fixed bottom-6 right-6 h-12 w-12 bg-teal-600 text-white rounded-full shadow-lg flex items-center justify-center sm:hidden hover:bg-teal-700 transition"
            >
                <Plus size={24} />
            </Link>
        </div>
    );
}
