import {toast} from 'react-hot-toast';

const showToaster = {
    success: (message: string | string[] = 'Success', id?: string) => {
        if (Array.isArray(message)) {
            message = message.map((msg: string, index: number) => index + 1 + '. ' + msg);
            message = message.join('\n');
        }
        toast.success(message, {
            position: 'top-right',
            id: id,
            style: {
                minWidth: '250px',
                maxWidth: '350px',
                background: '#333',
                color: '#fff',
            },
        });
    },
    error: (message: string | string[] = 'Failed', id?: string) => {
        if (Array.isArray(message)) {
            message = message.map((msg: string, index: number) => index + 1 + '. ' + msg);
            message = message.join('\n');
        }
        toast.error(message, {
            position: 'top-right',
            id: id,
            style: {
                minWidth: '250px',
                maxWidth: '350px',
                background: '#333',
                color: '#fff',
            },
        });
    },
    loading: (message: string = 'Processing...', id?: string) => {
        toast.loading(message, {
            position: 'top-right',
            id: id,
            style: {
                minWidth: '250px',
                maxWidth: '350px',
                background: '#333',
                color: '#fff',
            },
        });
    },
    dismiss: () => {
        toast.dismiss();
    },
};

export default showToaster;
