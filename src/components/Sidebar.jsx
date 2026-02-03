import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Database, Plus, Command } from 'lucide-react';

export default function Sidebar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const NavItem = ({ to, icon: Icon, label }) => (
        <Link
            to={to}
            className={`
        group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
        ${isActive(to)
                    ? 'bg-teal-50 text-teal-700 shadow-sm ring-1 ring-teal-200'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
             `}
        >
            <Icon
                size={18}
                className={`transition-colors ${isActive(to) ? 'text-teal-600' : 'text-slate-400 group-hover:text-slate-500'}`}
            />
            {label}
        </Link>
    );

    return (
        <aside className="fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-slate-100">
                <div className="flex items-center gap-2.5 text-slate-900">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm">
                        <Command size={18} />
                    </div>
                    <span className="font-semibold tracking-tight">Vanguard</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                <div className="px-3 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Menu
                </div>
                <NavItem to="/" icon={LayoutDashboard} label="Overview" />
                <NavItem to="/registry" icon={Database} label="Registry" />
            </nav>

            <div className="p-4 border-t border-slate-100">
                <Link
                    to="/create"
                    className="flex w-full items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm shadow-teal-200 transition-all active:scale-[0.98]"
                >
                    <Plus size={18} />
                    New Entry
                </Link>
            </div>
        </aside>
    );
}
