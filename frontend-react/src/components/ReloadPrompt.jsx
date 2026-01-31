import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, X } from 'lucide-react';

export default function ReloadPrompt() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            // eslint-disable-next-line no-console
            console.log('SW Registered: ' + r);
        },
        onRegisterError(error) {
            // eslint-disable-next-line no-console
            console.log('SW registration error', error);
        },
    });

    const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    return (
        <div className="fixed bottom-0 right-0 p-4 z-50">
            {(offlineReady || needRefresh) && (
                <div className="bg-slate-800 text-white p-4 rounded-lg shadow-lg flex items-center space-x-4 max-w-md animate-in slide-in-from-bottom duration-300">
                    <div className="flex-1">
                        {offlineReady ? (
                            <span>App ready to work offline</span>
                        ) : (
                            <span>New content available, click on reload button to update.</span>
                        )}
                    </div>
                    {needRefresh && (
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                            onClick={() => updateServiceWorker(true)}
                        >
                            Reload
                        </button>
                    )}
                    <button
                        className="text-slate-400 hover:text-white transition-colors"
                        onClick={close}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
