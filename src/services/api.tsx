import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const token = process.env.NEXT_PUBLIC_API_ACCESS_TOKEN;
const proxyCors = process.env.NEXT_PUBLIC_CORS_PROXY;

const endpoint = `${proxyCors}${process.env.NEXT_PUBLIC_API_URL}${token}`;

const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

const executeGraphQLQuery = async (query: string, variables: { id: any }) => {
  try {
    const response = await client.mutate({
      mutation: gql`
        ${query}
      `,
      variables,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getSessionEmails = async (id: string) => {
  const query = `
    query session($id: ID!) {
      session(id: $id) {
        mails {
          rawSize
          fromAddr
          toAddr
          downloadUrl
          text
          headerSubject
        }
      }
    }
  `;

  return executeGraphQLQuery(query, { id });
};

export const generateNewEmail = async () => {
  const query = `
    mutation {
      introduceSession {
        id
        expiresAt
        addresses {
          address
        }
      }
    }
  `;

  return executeGraphQLQuery(query, {
    id: undefined,
  });
};
