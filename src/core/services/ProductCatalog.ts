import { Product, ProductRecord } from '../models/Product';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export interface CatalogFilters {
  category?: string;
  query?: string;
  sort?: SortOption;
}

/**
 * ProductCatalog wraps the immutable product list with query
 * behaviour: filtering by category, free text search and sorting.
 * Keeping this logic in one class means the Shop page, Search
 * overlay and Home page all filter identically.
 */
export class ProductCatalog {
  private readonly products: Product[];

  constructor(records: ProductRecord[]) {
    this.products = records.map(Product.fromRecord);
  }

  getAll(): Product[] {
    return this.products;
  }

  getById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  getFeatured(limit = 4): Product[] {
    return this.products.filter((product) => product.featured).slice(0, limit);
  }

  getCategories(): { slug: string; label: string; count: number }[] {
    const map = new Map<string, { label: string; count: number }>();
    this.products.forEach((product) => {
      const existing = map.get(product.catSlug);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(product.catSlug, { label: product.category, count: 1 });
      }
    });
    return Array.from(map.entries()).map(([slug, value]) => ({ slug, ...value }));
  }

  query(filters: CatalogFilters): Product[] {
    let result = this.products.slice();

    if (filters.category && filters.category !== 'all') {
      result = result.filter((product) => product.catSlug === filters.category);
    }

    if (filters.query) {
      result = result.filter((product) => product.matchesQuery(filters.query!));
    }

    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'featured':
      default:
        result.sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
    }

    return result;
  }

  search(query: string, limit = 6): Product[] {
    if (query.trim().length < 2) return [];
    return this.products.filter((product) => product.matchesQuery(query)).slice(0, limit);
  }
}
