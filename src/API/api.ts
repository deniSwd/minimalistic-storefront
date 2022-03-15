import {
  ApolloClient, gql,
  InMemoryCache
} from '@apollo/client'
import { CategoryType } from '../MainTypes'


export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});


export const productAPI = {
  async getAllProducts() {
    return client
    .query ({
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
                  }
              }
          }
      `
    }).then(res => res.data.category)
  },
  async getProduct() {
    return client
    .query ({
      query: gql`
          query {
              product (id: "xbox-series-s") {
                  id
                  name
                  gallery
                  category

              }
          }
      `
    }).then(res => res.data.product)
  }
}

