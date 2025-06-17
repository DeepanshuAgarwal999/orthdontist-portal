import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="max-w-md mx-auto">
                    <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h1>
                    <p className="text-gray-600 mb-8">
                        Sorry, we couldn't find the page you're looking for.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link
                            href="/dashboard"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
                        >
                            <Home className="w-4 h-4" />
                            Go to Dashboard
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
