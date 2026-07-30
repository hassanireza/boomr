import { useSyncExternalStore } from 'react';
import { useServices } from './useServices';

export function useToast() {
  const { toast } = useServices();
  const toasts = useSyncExternalStore(toast.subscribe, () => toast.getToasts());

  return {
    toasts,
    show: toast.show.bind(toast),
    dismiss: toast.dismiss.bind(toast),
  };
}
