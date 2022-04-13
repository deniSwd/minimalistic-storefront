export type GalleryType = Array<string>

export type AttributeType = {
  displayValue: string
  value: string
  id: string
}
export type AttributeSetType = {
  id: string
  name: string
  type: string
  items: Array<AttributeType>
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
  inStock: boolean
  gallery: GalleryType
  description: string
  category: string
  attributes: Array<AttributeSetType>
  prices: Array<PriceType>
  brand: string
  amount: number
}
export type CategoryType = {
  name: string
  products: Array<ProductType>
  selectedCurrency: CurrencyType
}
export type Categories = Array<CategoryType>

export type CurrentItemType = Record < string, AttributeType>


export type SelectedProductType = {
  product: ProductType | null
  productMainPhoto: string
  currentItem: CurrentItemType
  attributeId: string
  amount: number
  wasAdded: boolean
}

