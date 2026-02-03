export default function InputField({ label, type = "text", ...props }) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">{label}</label>
            <input
                type={type}
                className="block w-full rounded-lg border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition-all focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/20 outline-none"
                {...props}
            />
        </div>
    );
}
