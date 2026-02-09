import React from 'react';

const UserNotRegisteredError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="max-w-md w-full border border-border bg-background">
        {/* Terminal header */}
        <div className="bg-background border-b border-border px-4 py-2">
          <span className="text-sm text-primary">ACCESS_DENIED.SYS</span>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 border border-destructive">
              <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-4">ACCESS RESTRICTED</h1>
            <p className="text-foreground/80 mb-8 text-sm">
              You are not registered to use this application. Please contact the app administrator to request access.
            </p>
            <div className="p-4 bg-background border border-border text-sm text-muted-foreground">
              <p className="mb-2 text-primary">If you believe this is an error:</p>
              <ul className="list-none space-y-1 text-left">
                <li>> Verify you are logged in with the correct account</li>
                <li>> Contact the app administrator for access</li>
                <li>> Try logging out and back in again</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Terminal footer */}
        <div className="bg-background border-t border-border px-4 py-1.5 text-xs text-muted-foreground">
          ERROR CODE: 403
        </div>
      </div>
    </div>
  );
};

export default UserNotRegisteredError;
