export default function LoadingSpinner({ message = "Loading..." }) {
    return (
        <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-100 border-t-teal-500"></div>
            <p className="text-sm font-medium">{message}</p>
        </div>
    );
}
