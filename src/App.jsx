import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './ui/Layout';
import Dashboard from './views/Dashboard';
import Registry from './views/Registry';
import Entry from './views/Entry';
import ViewProfile from './views/ViewProfile';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="registry" element={<Registry />} />
                    <Route path="create" element={<Entry />} />
                    <Route path="edit/:id" element={<Entry />} />
                    <Route path="view/:id" element={<ViewProfile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
