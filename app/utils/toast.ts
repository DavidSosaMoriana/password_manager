import { toast } from "sonner";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    style: {
      backgroundColor: '#4ade80',
      color: 'white', 
      borderColor: '#22c55e',
    },
    icon: '✅',
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    style: {
      backgroundColor: '#f87171',
      color: 'white',
      borderColor: '#ef4444',
    },
    icon: '❌',
  });
};

export const showInfoToast = (message: string) => {
  toast.info(message, {
    style: {
      backgroundColor: '#60a5fa',
      color: 'white',
      borderColor: '#3b82f6',
    },
    icon: 'ℹ️',
  });
};