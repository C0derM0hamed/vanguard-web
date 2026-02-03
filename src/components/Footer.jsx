import { Command } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white py-6 px-6 md:px-10">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-slate-600">
                    <Command size={16} className="text-slate-400" />
                    <span className="text-sm font-medium">Vanguard</span>
                </div>
                <p className="text-sm text-slate-500">
                    © {new Date().getFullYear()} Vanguard. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                    <a href="#" className="text-sm text-slate-500 hover:text-teal-600 transition-colors">Privacy</a>
                    <a href="#" className="text-sm text-slate-500 hover:text-teal-600 transition-colors">Terms</a>
                    <a href="#" className="text-sm text-slate-500 hover:text-teal-600 transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
}
