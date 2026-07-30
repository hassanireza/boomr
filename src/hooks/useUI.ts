import { useSyncExternalStore } from 'react';
import { useServices } from './useServices';

export function useUI() {
  const { ui } = useServices();
  const active = useSyncExternalStore(ui.subscribe, () => ui.getActive());

  return {
    active,
    open: ui.open.bind(ui),
    close: ui.close.bind(ui),
  };
}
