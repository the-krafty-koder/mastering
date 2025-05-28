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
```

- You can use a skip directive in the above sample to achieve the opposite effect.
