import { useLocation } from 'react-router-dom';


export default function PageNotFound() {
    const location = useLocation();
    const pageName = location.pathname.substring(1);

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
            <div className="max-w-md w-full border border-border bg-background">
                {/* Terminal header */}
                <div className="bg-background border-b border-border px-4 py-2">
                    <span className="text-sm text-primary">ERROR_404.SYS</span>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    {/* 404 Error Code */}
                    <div className="space-y-2 text-center">
                        <h1 className="text-7xl font-light text-primary/40">404</h1>
                        <div className="h-px w-16 bg-border mx-auto"></div>
                    </div>

                    {/* Main Message */}
                    <div className="space-y-3 text-center">
                        <h2 className="text-2xl font-medium text-primary">
                            PAGE NOT FOUND
                        </h2>
                        <p className="text-foreground/80 leading-relaxed text-sm">
                            The page <span className="font-medium text-primary">"{pageName}"</span> could not be found.
                        </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-6 text-center">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="inline-flex items-center px-6 py-2 text-sm font-medium text-primary bg-background border border-primary hover:bg-primary hover:text-background transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            GO HOME
                        </button>
                    </div>
                </div>

                {/* Terminal footer */}
                <div className="bg-background border-t border-border px-4 py-1.5 text-xs text-muted-foreground">
                    PRESS GO HOME TO CONTINUE
                </div>
            </div>
        </div>
    )
}