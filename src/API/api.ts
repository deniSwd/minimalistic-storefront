import { ApolloClient, gql, InMemoryCache } from '@apollo/client'


export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
})


export const productAPI = {
  async getAllProducts() {
    return client
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
                      prices{
                          currency{
                              label
                              symbol
                          }
                          amount
                      }
                  }
              }
          }
      `
    }).then(res => res.data.category)
  },
  async getProduct(idProduct: string) {
    return client
    .query({
      query: gql`
          query {
              product (id: "${idProduct}") {
                  id
                  name
                  gallery
                  category
                  description
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
      `
    }).then(res => res.data.product)
  }
}

