export type galleryType = Array<string>

export type AttributeType = {
  displayValue: string
  value: string
  id: string
}
export type AttributeSetType = {
  id: string
  name: string
  type: string
  items: AttributeType
}
export type CurrencyType = {
  label: string
  symbol: string
}

export type PriceType = {
  currency: CurrencyType
  amount: number
}

export type ProductType = {
  id: string
  name: string
  inStock?: boolean
  gallery: galleryType
  description?: string
  category: string
  attributes?: Array<AttributeSetType>
  prices?: Array<PriceType>
  brand?: string
  amount?: number
}
export type CategoryType = {
  name?: string
  products: Array<ProductType>
  selectedCurrency: CurrencyType
}
export type Categories = Array<CategoryType>

export type SelectedProductType = {
  product: ProductType
  productMainPhoto: string
  currentItem: Record < string, AttributeType>
  attributeId: string
  amount: number
}

export type PartialSelectedProductType = Partial<SelectedProductType>