import {
  ApolloClient, gql,
  InMemoryCache
} from '@apollo/client'


export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

export const productAPI = {
  async getProducts() {
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
                      category
                  }
              }
          }
      `
    }).then(res => res.data.category.products)
  }
}

