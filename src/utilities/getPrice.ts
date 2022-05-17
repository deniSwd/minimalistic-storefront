import { PriceType } from '../MainTypes'

export const getPrice = (prices: Array<PriceType>, selectedCurrencySymbol: string ): PriceType | undefined => {
    return prices.find(
      (u: PriceType) => u.currency.symbol === selectedCurrencySymbol)
}