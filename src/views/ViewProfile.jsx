import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit2 } from 'lucide-react';
import { fetchRegistryItem, clearCurrentItem } from '../store/registrySlice';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ViewProfile() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentItem, loading } = useSelector((state) => state.registry);

    useEffect(() => {
        dispatch(fetchRegistryItem(id));
        return () => {
            dispatch(clearCurrentItem());
        };
    }, [id, dispatch]);

    if (loading) return <LoadingSpinner message="Loading profile..." />;
    if (!currentItem) return (
        <div className="p-12 flex flex-col items-center justify-center text-slate-500 gap-4">
            <p className="text-lg font-medium">Item not found</p>
            <Link to="/registry" className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-2">
                <ArrowLeft size={16} /> Back to Registry
            </Link>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        to="/registry"
                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Product Details</h2>
                        <p className="text-sm text-slate-500">View detailed information.</p>
                    </div>
                </div>
                <Link
                    to={`/edit/${id}`}
                    className="flex items-center gap-2 bg-teal-50 hover:bg-teal-100 text-teal-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                    <Edit2 size={16} />
                    Edit
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {currentItem.image && (
                    <div className="w-full h-64 bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden">
                        <img
                            src={currentItem.image}
                            alt={currentItem.title}
                            className="h-full w-full object-contain p-4"
                        />
                    </div>
                )}

                <div className="p-6 md:p-8 space-y-6">
                    <div>
                        <div className="flex items-start justify-between gap-4">
                            <h3 className="text-xl font-bold text-slate-900">{currentItem.title}</h3>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-50 text-teal-700 border border-teal-100">
                                ${Number(currentItem.price).toFixed(2)}
                            </span>
                        </div>
                        <span className="inline-block mt-2 px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600 uppercase tracking-wide">
                            {currentItem.category}
                        </span>
                    </div>

                    <div className="prose prose-slate prose-sm max-w-none text-slate-600">
                        <h4 className="text-sm font-semibold text-slate-900 mb-2">Description</h4>
                        <p className="leading-relaxed">{currentItem.description || 'No description provided.'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
