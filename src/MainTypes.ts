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
  attributes?: AttributeSetType
  prices?: PriceType
  brand?: string
}
export type Category = {
  name: string
  products: ProductType
}
export type Categories = Array<Category>