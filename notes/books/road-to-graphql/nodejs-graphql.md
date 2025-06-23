# Schema

The graphql schema is all the available data for reading and writing provided via GraphQL.

- The schema consists of type definitions, starting with a mandatory Query top level type for reading data. Fields in the query can either be object types or scalar types. Object types contains subfields, scalar types are like String and Int

```
const schema = gql`
type Query {
    me: User
}

type User {
    username: String!
}
`;
```

- Resolvers are functions that are used to return data for fields in the schema.

```
const resolvers = {
  Query: {
    me: () => {
      return { username: "Robin Weiruch" };
    },
  },
};
```

- Resolvers get access to arguments passed via the query in the second argument in the resolvers function signature.

```
const resolvers = {
  Query: {
    users: (parent, args) => {
      return { username: "Robin Weiruch" };
    },
  },
};
```

- Resolver function signatures contain the following arguments
  (parent, args, context, info)

- parent -> contain data of the fields parents
- args -> contain data passed via a query's arguments
- context -> used to inject dependencies from the outside into the resolver function.
- info -> gives you internal info about the GraphQL request.
