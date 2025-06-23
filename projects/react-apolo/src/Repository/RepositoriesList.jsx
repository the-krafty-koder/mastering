import { Fragment } from "react";
import RepositoryItem from "./RepositoryItem";
import { REPOSITORY_FRAGMENT } from "./fragments";
import Loading from "../Loading";
import FetchMore from "../FetchMore";

export { REPOSITORY_FRAGMENT };

const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    viewer: {
      ...previousResult.viewer,
      repositories: {
        ...previousResult.viewer.repositories,
        ...fetchMoreResult.viewer.repositories,
        edges: [
          ...previousResult.viewer.repositories.edges,
          ...fetchMoreResult.viewer.repositories.edges,
        ],
      },
    },
  };
};

const getUpdateQuery =
  (entry) =>
  (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult) {
      return previousResult;
    }
    return {
      ...previousResult,
      [entry]: {
        ...previousResult[entry],
        repositories: {
          ...previousResult[entry].repositories,
          ...fetchMoreResult[entry].repositories,
          edges: [
            ...previousResult[entry].repositories.edges,
            ...fetchMoreResult[entry].repositories.edges,
          ],
        },
      },
    };
  };
const RepositoriesList = ({ loading, repositories, fetchMore, entry }) => (
  <Fragment>
    {loading ? (
      <Loading />
    ) : (
      <>
        {repositories.edges.map(({ node }) => (
          <div key={node.id} className="RepositoryItem">
            <RepositoryItem {...node} />
            <Issues
              repositoryName={node.name}
              repositoryOwner={node.owner.login}
            />
          </div>
        ))}
        <FetchMore
          loading={loading}
          hasNextPage={repositories.pageInfo.hasNextPage}
          variables={{
            cursor: repositories.pageInfo.endCursor,
          }}
          updateQuery={() => getUpdateQuery(entry)}
          fetchMore={fetchMore}
        >
          Repositories
        </FetchMore>
      </>
    )}
  </Fragment>
);

export default RepositoriesList;
