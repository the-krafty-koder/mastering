import { useQuery, gql } from "@apollo/client";
import Loading from "../Loading";
import RepositoriesList, {
  REPOSITORY_FRAGMENT,
} from "../Repository/RepositoriesList";
import ErrorMessage from "../ErrorMessage";

const GET_CURRENT_USER = gql`
  query GetUser {
    viewer {
      login
      name
    }
  }
`;

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query ($cursor: String) {
    viewer {
      repositories(
        first: 5
        orderBy: { direction: DESC, field: STARGAZERS }
        after: $cursor
      ) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;
const Profile = () => {
  const { data, loading, error, fetchMore } = useQuery(
    GET_REPOSITORIES_OF_CURRENT_USER,
    { notifyOnNetworkStatusChange: true }
  );

  if (loading) return <Loading />;
  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { viewer } = data;

  if (loading && !viewer) return <Loading />;

  return (
    <RepositoriesList
      loading={loading}
      repositories={viewer.repositories}
      fetchMore={fetchMore}
      entry={"viewer"}
    />
  );
};

export default Profile;
