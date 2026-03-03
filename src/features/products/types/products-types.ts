import { ReactNode } from 'react'

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export type ProductCategory = {
  id: string
  label: string
}

export type ProductCardProps = {
  product: Product
  onPress: (product: Product) => void
  isFavorite?: boolean
  onFavoritePress?: (product: Product) => void
}
export type SearchBarProps = {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  onSearchPress?: () => void
}

export type ProductDetailsSheetProps = {
  product: Product | null
  visible: boolean
  onClose: () => void
}

export type SortBarProps = {
  onSortPress?: () => void
}

export type SignoutModalProps = {
  visible: boolean
  onClose: () => void
  onSignout: () => void
}

export type QuantitySelectorProps = {
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
}

export type ProductInfoProps = {
  title: string
  price: number
  category?: string
  description?: string
  rating?: { rate: number; count: number }
}

export type ProductImageViewerProps = {
  image: string
}

export type HeaderProps = {
  onMenuPress: () => void
  cartCount?: number
  onCartPress?: () => void
}

export type CollapsibleSectionProps = {
  title: string
  children: ReactNode
}

export type CategoryTabsProps = {
  categories: ProductCategory[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

export type AddToCartButtonProps = {
  onPress: () => void
}