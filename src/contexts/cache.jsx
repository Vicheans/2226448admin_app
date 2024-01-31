import {gql, InMemoryCache, makeVar} from '@apollo/client';


export const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
    }
`;

export const isLoggedInVar = makeVar(!!localStorage.getItem("token"));
export const authVar = makeVar(localStorage.getItem("token"));
export const cache = new InMemoryCache({
    addTypename: false,
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read() {
                        console.log("isLoggedInVar", isLoggedInVar());
                        return isLoggedInVar();
                    }
                },
                auth: {
                    read() {
                        return authVar();
                    }
                },

            }
        }
    }
});