import { useEffect } from 'react';

type ConfirmAlertProps = {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function AlertMessage({ message, onConfirm, onCancel }: ConfirmAlertProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onCancel();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onCancel]);

    return (
        <div className="fixed top-4 right-4 z-50 bg-white border border-gray-300 shadow-lg rounded-md p-4 w-80 animate-fade-in">
            <p className="text-sm text-gray-800 mb-4">{message}</p>
            <div className="flex justify-end space-x-2">
                <button
                    onClick={onConfirm}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-500"
                >
                    Sí
                </button>
                <button
                    onClick={onCancel}
                    className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                    No
                </button>
            </div>
        </div>
    );
}