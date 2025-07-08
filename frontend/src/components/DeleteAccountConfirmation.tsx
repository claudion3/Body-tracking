import React from 'react';

interface DeleteAccountConfirmationProps {
    onCancel: () => void;
    onConfirm: () => void;
}

const DeleteAccountConfirmation: React.FC<DeleteAccountConfirmationProps> = ({
                                                                                 onCancel,
                                                                                 onConfirm,
                                                                             }) => {
    return (
        <div>
            <p className="mb-4 text-red-300">Are you sure you want to delete your account? This action cannot be undone.</p>
            <p className="mb-4 text-gray-400 text-sm">All your data will be permanently removed.</p>
            <div className="flex justify-end gap-4">
                <button
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-600/90 hover:bg-red-700 rounded-lg transition"
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default DeleteAccountConfirmation;