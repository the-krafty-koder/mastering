import { gql, useQuery } from "@apollo/client";
import { REPOSITORY_FRAGMENT } from "../Repository/fragments";
import Loading from "../Loading";
import RepositoriesList from "../Repository/RepositoriesList";

const GET_REPOSITORIES_OF_ORGANISATION = gql`
  query GetOrganisationRepositories(
    $organisationName: String!
    $cursor: String
  ) {
    organisation(login: $organisationName) {
      repositories(first: 5, after: $cursor) {
        edges {
          nodes {
            ...repository
          }
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;
const Organization = ({ organisationName }) => {
  const skip = organisationName === " ";
  const { data, loading, error, fetchMore } = useQuery(
    GET_REPOSITORIES_OF_ORGANISATION,
    {
      variables: {
        organisationName,
      },
      skip,
      notifyOnNetworkStatusChange: true,
    }
  );
  if (error) {
    return <ErrorMessage error={error} />;
  }
  const { organization } = data;
  if (loading && !organization) {
    return <Loading />;
  }
  return (
    <RepositoriesList
      loading={loading}
      repositories={organization.repositories}
      fetchMore={fetchMore}
      entry={"organisation"}
    />
  );
};

export default Organization;
