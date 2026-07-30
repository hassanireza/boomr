export type ProductBadge = 'sale' | 'new' | 'hot' | null;

export interface ProductSpecs {
  [label: string]: string;
}

export interface ProductRecord {
  id: number;
  name: string;
  category: string;
  catSlug: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  badge: ProductBadge;
  description: string;
  specs: ProductSpecs;
  colors: string[];
  sizes: string[];
  inStock: boolean;
  sku: string;
  imageKey: string;
  featured: boolean;
  tags: string[];
}

/**
 * Product is the core domain entity of the catalog. It wraps a plain
 * data record with behaviour: discount math, display formatting and
 * image resolution all live here instead of being scattered across
 * components.
 */
export class Product {
  readonly id: number;
  readonly name: string;
  readonly category: string;
  readonly catSlug: string;
  readonly price: number;
  readonly originalPrice: number | null;
  readonly rating: number;
  readonly reviews: number;
  readonly badge: ProductBadge;
  readonly description: string;
  readonly specs: ProductSpecs;
  readonly colors: string[];
  readonly sizes: string[];
  readonly inStock: boolean;
  readonly sku: string;
  readonly imageKey: string;
  readonly featured: boolean;
  readonly tags: string[];

  constructor(record: ProductRecord) {
    this.id = record.id;
    this.name = record.name;
    this.category = record.category;
    this.catSlug = record.catSlug;
    this.price = record.price;
    this.originalPrice = record.originalPrice;
    this.rating = record.rating;
    this.reviews = record.reviews;
    this.badge = record.badge;
    this.description = record.description;
    this.specs = record.specs;
    this.colors = record.colors;
    this.sizes = record.sizes;
    this.inStock = record.inStock;
    this.sku = record.sku;
    this.imageKey = record.imageKey;
    this.featured = record.featured;
    this.tags = record.tags;
  }

  static fromRecord(record: ProductRecord): Product {
    return new Product(record);
  }

  get isOnSale(): boolean {
    return this.originalPrice !== null && this.originalPrice > this.price;
  }

  get discountPercent(): number {
    if (!this.isOnSale || this.originalPrice === null) return 0;
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }

  get formattedPrice(): string {
    return `$${this.price.toFixed(2)}`;
  }

  get formattedOriginalPrice(): string | null {
    return this.originalPrice !== null ? `$${this.originalPrice.toFixed(2)}` : null;
  }

  get primaryImage(): string {
    return `images/products/${this.imageKey}-main.webp`;
  }

  get secondaryImage(): string {
    return `images/products/${this.imageKey}-detail.webp`;
  }

  /** Case-insensitive match against a free text search query. */
  matchesQuery(query: string): boolean {
    const q = query.trim().toLowerCase();
    if (q.length === 0) return true;
    return (
      this.name.toLowerCase().includes(q) ||
      this.category.toLowerCase().includes(q) ||
      this.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }
}
