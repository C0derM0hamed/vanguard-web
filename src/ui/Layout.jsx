import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function Layout() {
    return (
        <div className="min-h-screen bg-slate-50/50 flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
                <div className="flex-1 max-w-5xl mx-auto p-6 md:p-10 w-full">
                    <Outlet />
                </div>

                {/* Footer */}
                <Footer />
            </main>
        </div>
    );
}
