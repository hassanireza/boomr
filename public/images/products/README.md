# Product image naming

Drop files directly in this folder (`public/images/products/`). Exactly 2 files
per product, both **.webp**, named `{imageKey}-main.webp` and `{imageKey}-detail.webp`.

`imageKey` comes straight from `src/data/products.ts` — don't invent new keys.

| Product                     | imageKey        | Files to add                                      |
|------------------------------|-----------------|----------------------------------------------------|
| Classic V-Wing Pro           | v-shape         | `v-shape-main.webp`, `v-shape-detail.webp`         |
| Hawk Hook Elite               | hook            | `hook-main.webp`, `hook-detail.webp`               |
| Riddle Curve QM               | question-mark   | `question-mark-main.webp`, `question-mark-detail.webp` |
| Tri-Blade Vortex               | tri-blade       | `tri-blade-main.webp`, `tri-blade-detail.webp`     |
| Cross Phantom X4               | four-wing       | `four-wing-main.webp`, `four-wing-detail.webp`     |
| Pentagram Spinner M5           | five-wing       | `five-wing-main.webp`, `five-wing-detail.webp`     |
| Halo Ring Glider               | ring            | `ring-main.webp`, `ring-detail.webp`               |
| Delta Storm TR                 | delta           | `delta-main.webp`, `delta-detail.webp`             |
| Serpent Curve S1                | s-shape         | `s-shape-main.webp`, `s-shape-detail.webp`         |
| Nightwing Bat Edition           | bat             | `bat-main.webp`, `bat-detail.webp`                 |
| Eagle Spirit Animal             | eagle           | `eagle-main.webp`, `eagle-detail.webp`             |
| Indoor Micro Float              | indoor          | `indoor-main.webp`, `indoor-detail.webp`           |

**Recommended source size:** 900×900px minimum (or 1536×1536 downscaled), transparent
or clean background, exported to `.webp` at quality ~85.

No code changes are needed when you drop these in — `Product.ts` already resolves
`primaryImage`/`secondaryImage` to this exact naming pattern, and every image tag
across the site (`ProductCard`, `ProductPage`) falls back to
`images/ui/placeholder-product.svg` automatically until a file is present.
