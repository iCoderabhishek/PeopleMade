import { Product, ProductCategory } from '../types/products-types'

export function filterBySearch(products: Product[], query: string): Product[] {
  if (!query.trim()) return products
  const lower = query.toLowerCase()
  return products.filter((p) => p.title.toLowerCase().includes(lower))
}

export function filterByCategory(
  products: Product[],
  category: string,
): Product[] {
  if (category === 'all') return products
  return products.filter((p) => p.category === category)
}

export function getUniqueCategories(products: Product[]): ProductCategory[] {
  const seen = new Set<string>()
  const categories: ProductCategory[] = [{ id: 'all', label: 'All' }]

  for (const p of products) {
    if (!seen.has(p.category)) {
      seen.add(p.category)
      categories.push({ id: p.category, label: p.category })
    }
  }

  return categories
}
