import { useContext } from 'react';
import { ServicesReactContext, Services } from '../core/servicesContextInstance';

export function useServices(): Services {
  const ctx = useContext(ServicesReactContext);
  if (!ctx) throw new Error('useServices must be used within a ServicesProvider');
  return ctx;
}
