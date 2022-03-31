import { ApolloClient, ApolloQueryResult, gql, InMemoryCache } from '@apollo/client'
import { CategoryType, ProductType } from '../MainTypes'

export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
})

export const productAPI = {
  async getAllProducts(): Promise<CategoryType> {
    const resultGetAllProducts = await client
      .query({
        query: gql`
          query {
            category {
              name
              products {
                id
                name
                gallery
                description
                category
                brand
                prices {
                  currency {
                    label
                    symbol
                  }
                  amount
                }
              }
            }
          }
        `,
      })
      .then(res => res.data.category)
    if(!resultGetAllProducts) {
      throw new Error('Data not found')
    }
    return resultGetAllProducts
  },
  async getProduct(idProduct: string): Promise<ProductType> {
    const resultGetProduct = await client
      .query({
        query: gql`
          query {
              product (id: "${idProduct}") {
                  id
                  name
                  inStock
                  gallery
                  category
                  description
                  attributes{
                      id
                      name
                      type
                      items{
                          displayValue
                          value
                          id
                      }
                  }
                  brand
                  prices{
                      currency{
                          label
                          symbol
                      }
                      amount
                  }
              }
          }
      `,
      })
      .then(res => res.data.product)
    if(!resultGetProduct) {
      throw new Error('Data not found')
    }
    return resultGetProduct
  },
}
