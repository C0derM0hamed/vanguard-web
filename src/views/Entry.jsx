import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { fetchRegistryItem, createRegistryItem, updateRegistryItem, clearCurrentItem } from '../store/registrySlice';
import InputField from '../components/InputField';

export default function Entry() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isEditing = Boolean(id);

    const { currentItem, loading } = useSelector((state) => state.registry);

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        if (isEditing) {
            dispatch(fetchRegistryItem(id));
        }
        return () => {
            dispatch(clearCurrentItem());
        };
    }, [id, isEditing, dispatch]);

    useEffect(() => {
        if (currentItem && isEditing) {
            setFormData(currentItem);
        }
    }, [currentItem, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await dispatch(updateRegistryItem({ id, itemData: formData })).unwrap();
            } else {
                await dispatch(createRegistryItem(formData)).unwrap();
            }
            navigate('/registry');
        } catch (error) {
            console.error(error);
            alert('Error saving entry');
        }
    };


    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link
                    to="/registry"
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {isEditing ? 'Edit Entry' : 'Create New Entry'}
                    </h2>
                    <p className="text-sm text-slate-500">Fill in the details below.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
                <div className="space-y-6">
                    <InputField
                        label="Item Title"
                        placeholder="e.g. Wireless Headphones"
                        required
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="Category"
                            placeholder="e.g. Electronics"
                            required
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        />
                        <InputField
                            label="Price ($)"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            required
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                        />
                    </div>

                    <InputField
                        label="Image URL (Optional)"
                        placeholder="https://..."
                        value={formData.image}
                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                    />

                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-slate-700">Description</label>
                        <textarea
                            className="block w-full rounded-lg border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition-all focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 outline-none min-h-[120px] resize-y"
                            placeholder="Enter a brief description..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Link
                        to="/registry"
                        className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <Save size={18} />
                        {loading ? 'Saving...' : 'Save Record'}
                    </button>
                </div>
            </form>
        </div>
    );
}
