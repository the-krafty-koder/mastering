# GraphQL Operation: Query

Used to make requests to a GQL API
Objects - hold data about an entity.
Fields - used to ask for specific properties in objects.

Named query

```
query OrganizationForLearningReact {
    organization(login: "the-road-to-learn-react") {
        name
        url
    }
}
```

Unnamed query

```
query ($organization : String!) {
    organization (login: $organization) {
        name
        url
    }
}
```

# Passing an argument to fields

```
query {
    organization(login: "the road to react") {
        name
        url
    }
}

```

# Aliases

You can use aliases to request data about multiple objects using a similar query

```

query {
    learn: organization(login: "the-road-to-learn-react") {
        name
        url
    }
    facebook: organization(login: "facebook") {
        name
        url
    }
}

```

# Fragments

Use them to creat reusable parts of a query. You have to specify the type of object the fragment should be used.

```

query {
    learn: organization(login: "the-road-to-learn-react") {
        ...sharedOrgFields
    }
    facebook: organization(login: "facebook") {
        ...sharedOrgFields
    }
}

fragment sharedOrgFields on Organization {
    name
    url
}

```

# Variables

Allows arguments to be extracted as variables from queries.

```

query ($organization: String!) {
    organization(login: $organization){
        name
        url
    }
}

```

It defines the organization argument as a variable using the $ sign. Also, the argument’s type is defined as a String. Since the argument is required to fulfil the query, the String type has an exclamation point.

# Directives

Used to query data from the API in a more powerful way, and can be applied to fields and objects.
Include directive -> includes the field when the Boolean type is set to true.
Skip directive -> excludes it instead.

```
query OrganizationForLearningReact (
    $organization: String!,
    $repository: String!,
    $withFork: Boolean!
) {
  organization (login: $organization) {
    name
    url
    repository (name: $repository){
      name
      forkCount @include(if: $withFork)
    }
  }
}

// variables
{
  "organization": "the-road-to-learn-react",
  "repository": "the-road-to-learn-react-chinese",
  "withFork": true
}
```

- You can use a skip directive in the above sample to achieve the opposite effect.

# Mutations

Used to write data and define the content of data you'd like returned after the write is successful.

```
mutation AddStar($repositoryId: ID!) {
  addStar(input: {starrableId: $repositoryId}){
    starrable {
      id
      viewerHasStarred
    }
  }
}
```

# Pagination

You can request paginated data by providing arguments to a list field, eg an
argument that says how many items you are expecting from the list.

```
query {
  organization(login: "the-road-to-learn-react"){
    name
    url
    repositories(first: 2){
    	edges {
        node{
          name
        }
        cursor
      }

    }
  }
}
```

- The edges and node structure is one of a few solutions to define paginated data structures and lists with GraphQL. Each edge comes with its own cursor field to identify its position in the list.

- You can use cursor as an after argument to retrieve all items after it

```
query {
  organization(login: "the-road-to-learn-react"){
    name
    url
    repositories(first: 2, after: "Y3Vyc29yOnYyOpHOA8awSw=="){
    	edges {
        node{
          name
        }
        cursor
      }

    }
  }
}
```

- Returning a cursor for every node can be verbose, so you can include a pageInfo object for every page ( pageInfo is a convention used in a lot of GQL APIs)

```
query FetchWithCursor($organization: String!, $number: Int, $cursor: String) {
  organization(login: $organization){
    name
    url
    repositories(first: $number, after: $cursor){
      totalCount
      edges {
        node{
          name
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }

    }
  }
}
```
