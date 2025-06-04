import axios from "axios";
import "./App.css";
import { useEffect, useState, type FormEvent } from "react";
import type { Organization, Repository } from "./types";

const TITLE = "React GraphQL Github Client";
const token = import.meta.env.VITE_GITHUB_PERSONAL_ACCESS_TOKEN;

const axiosGithubGraphql = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const GET_ORGANIZATION = `
  query GetOrganization {
    organization(login: "the-road-to-learn-react") {
      name
      url
    }
  }
`;

const GET_REPOSITORY_OF_ORGANIZATION = `
  query GetOrganization {
    organization(login: "the-road-to-learn-react") {
      name
      url
      repository(name: "the-road-to-learn-react") {
        name
        url
      }
    }
  }
`;

const GET_ISSUES_OF_REPOSITORY = `
  query GetOrganization($organization: String!, $repository: String!, $cursor: String ) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        id
        name
        url
        stargazers {
          totalCount
        }
        viewerHasStarred
        issues(first: 5, after: $cursor, states: [OPEN]) {
          edges {
            node {
              id
              title
              url
              reactions(last: 3){
                edges {
                  node {
                    id
                    content
                  }
                }
              }
            }
          }
          totalCount
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;

const ADD_STAR = `
  mutation($repositoryId: ID!) {
    addStar(input: { starrableId: $repositoryId }) {
      starrable {
        viewerHasStarred
      }
    }
  }
`;

const getIssuesOfRepository = (path: string, cursor: string | undefined) => {
  const [organization, repository] = path.split("/");
  return axiosGithubGraphql.post("", {
    query: GET_ISSUES_OF_REPOSITORY,
    variables: { organization, repository, cursor },
  });
};

const resolveQueryIssues =
  (
    queryResult: { data: { data: { organization: Organization }; errors: [] } },
    cursor: string | undefined
  ) =>
  (state: any) => {
    const { data, errors } = queryResult.data;
    const { totalCount } = state.organization.repository.stargazers;

    if (!cursor) {
      return {
        organization: data.organization,
        errors,
      };
    }
    const { edges: oldIssues } = state.organization.repository.issues;
    const { edges: newIssues } = data.organization.repository.issues;
    const updatedIssues = [...oldIssues, ...newIssues];
    return {
      organization: {
        ...data.organization,
        repository: {
          ...data.organization.repository,
          stargazers: {
            totalCount: totalCount + 1,
          },
          issues: {
            ...data.organization.repository.issues,
            edges: updatedIssues,
          },
        },
      },
      errors,
    };
  };

const resolveAddStarMutation = (mutationResult: any) => (state: any) => {
  const { viewerHasStarred } = mutationResult.data.data.addStar.starrable;
  return {
    ...state,
    organization: {
      ...state.organization,
      repository: {
        ...state.organization.repository,
        viewerHasStarred,
      },
    },
  };
};

const addStarRepository = (repositoryId: string) => {
  return axiosGithubGraphql.post("", {
    query: ADD_STAR,
    variables: { repositoryId },
  });
};
function App() {
  const [values, setValues] = useState({
    path: "the-road-to-learn-react/the-road-to-learn-react",
  });

  const [initialState, setInitialState] = useState<{
    organization: Organization | null;
    errors: { message: string }[];
  }>({
    organization: null,
    errors: [],
  });

  useEffect(() => {
    onFetchFromGithub(values.path, undefined);
  }, []);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const onFetchMoreIssues = () => {
    const { endCursor } =
      initialState.organization?.repository.issues?.pageInfo || {};

    onFetchFromGithub(values.path, endCursor);
  };

  const onFetchFromGithub = (path: string, cursor: string | undefined) => {
    // axiosGithubGraphql
    //   // .post("", { query: GET_REPOSITORY_OF_ORGANIZATION })
    //   .post("", { query: GET_ISSUES_OF_REPOSITORY })
    //   .then((res) =>
    //     setInitialState({
    //       organization: res.data.data.organization,
    //       errors: res.data.errors || [],
    //     })
    //   );

    getIssuesOfRepository(path, cursor).then((result) => {
      const res = resolveQueryIssues(result, cursor)(initialState);
      console.log(res);
      setInitialState(res);
    });
  };

  const onStarRepository = (
    repositoryId: string,
    viewerHasStarred: boolean
  ) => {
    addStarRepository(repositoryId).then((res) => {
      setInitialState(resolveAddStarMutation(res));
    });
  };

  return (
    <>
      <h1>{TITLE}</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="id">Show open issues for https://github.com/ </label>
        <input
          id="url"
          type="text"
          value={values.path}
          onChange={(event) => {
            setValues({ path: event.target.value });
          }}
          style={{ width: "300px" }}
        />
      </form>

      {initialState.organization && (
        <Organization
          organization={initialState.organization}
          onFetchMoreIssues={onFetchMoreIssues}
          onStarRepository={onStarRepository}
          errors={initialState.errors}
        />
      )}
    </>
  );
}

const Organization = ({
  organization,
  onFetchMoreIssues,
  onStarRepository,
  errors,
}: {
  organization: Organization;
  onFetchMoreIssues: () => void;
  onStarRepository: (repositoryId: string, viewerHasStarred: boolean) => void;
  errors: { message: string }[];
}) => (
  <div>
    {errors ? (
      <p>
        <strong>Something went wrong:</strong>
        {errors.map((error) => error.message).join(" ")}
      </p>
    ) : (
      <div>
        <strong>Issues from Organization: </strong>
        <a href={organization.url}>{organization.name}</a>
        <Repository
          repository={organization.repository}
          onFetchMoreIssues={onFetchMoreIssues}
          onStarRepository={onStarRepository}
        />
      </div>
    )}
  </div>
);

const Repository = ({
  repository,
  onFetchMoreIssues,
  onStarRepository,
}: {
  repository: Repository;
  onFetchMoreIssues: () => void;
  onStarRepository: (repositoryId: string, viewerHasStarred: boolean) => void;
}) => (
  <div>
    <p>
      <strong>In Repository:</strong>
      <a href={repository.url}>{repository.name}</a>
    </p>
    <button
      type="button"
      onClick={() =>
        onStarRepository(repository.id, repository.viewerHasStarred)
      }
    >
      {repository.stargazers.totalCount}
      {repository.viewerHasStarred ? "Unstar" : "Star"}
    </button>

    <ul>
      {repository.issues.edges.map((issue) => (
        <li key={issue.node.id}>
          <a href={issue.node.url}>{issue.node.title}</a>
          <ul>
            {issue.node.reactions.edges.map((reaction) => (
              <li key={reaction.node.id}>{reaction.node.content}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
    <hr />
    {repository.issues.pageInfo.hasNextPage && (
      <button onClick={onFetchMoreIssues}>More</button>
    )}
  </div>
);

export default App;
