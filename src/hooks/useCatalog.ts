import { useServices } from './useServices';

/** Thin accessor for the static ProductCatalog instance. */
export function useCatalog() {
  const { catalog } = useServices();
  return catalog;
}
