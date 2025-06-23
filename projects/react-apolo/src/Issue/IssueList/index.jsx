import { gql, ApolloConsumer } from "@apollo/client";
import ErrorMessage from "../../ErrorMessage";
import Loading from "../../Loading";
import { useState } from "react";
import Button from "../../Button";

const ISSUE_STATES = {
  NONE: "NONE",
  OPEN: "OPEN",
  CLOSED: "CLOSED",
};

const GET_ISSUES_OF_REPOSITORY = gql`
    query GetIssuesOfRepository($repositoryName: $String!, $repositoryOwner: $String!, $issueState: IssueState!) {
        repository(name: $repositoryName, owner: $repositoryOwner) {
            issues(first: 5, states: [$issueState]) {
                edges {
                    node {
                        id
                        number
                        state
                        title
                        url
                        bodyHTML
                    }
                }
            }
        }
    }
`;

const isShow = (issueState) => issueState !== ISSUE_STATES.NONE;

const TRANSITION_LABELS = {
  [ISSUE_STATES.NONE]: "Show Open Issues",
  [ISSUE_STATES.OPEN]: "Show Closed Issues",
  [ISSUE_STATES.CLOSED]: "Hide Issues",
};
const TRANSITION_STATE = {
  [ISSUE_STATES.NONE]: ISSUE_STATES.OPEN,
  [ISSUE_STATES.OPEN]: ISSUE_STATES.CLOSED,
  [ISSUE_STATES.CLOSED]: ISSUE_STATES.NONE,
};

const Issues = ({ repositoryName, repositoryOwner }) => {
  const [issueState, setIssueState] = useState(ISSUE_STATES.NONE);

  const { data, loading, error } = isShow(issueState)
    ? useQuery(GET_ISSUES_OF_REPOSITORY, {
        variables: {
          repositoryName,
          repositoryOwner,
          issueState,
        },
      })
    : {};

  if (error) return <ErrorMessage error={error} />;

  const { repository } = data;

  if (loading && !repository) return <Loading />;

  const filteredRepository = {
    issues: {
      edges: repository.issues.edges.filter(
        (issue) => issue.node.state === issueState
      ),
    },
  };

  if (!filteredRepository.issues.edges.length) return <div>No issues</div>;

  const onChangeIssueState = (nextIssueState) => setIssueState(nextIssueState);

  return (
    <div>
      <IssueFilter
        repositoryOwner={repositoryOwner}
        repositoryName={repositoryName}
        issueState={issueState}
        onChangeIssueState={onChangeIssueState}
      />
      <IssueList issues={filteredRepository.issues} />
    </div>
  );
};

const prefetchIssues = (
  client,
  repositoryOwner,
  repositoryName,
  issueState
) => {
  const nextIssueState = TRANSITION_STATE[issueState];

  if (isShow(nextIssueState)) {
    client.query({
      query: GET_ISSUES_OF_REPOSITORY,
      variables: {
        repositoryOwner,
        repositoryName,
        issueState: nextIssueState,
      },
    });
  }
};

const IssueFilter = ({
  issueState,
  onChangeIssueState,
  repositoryName,
  repositoryOwner,
}) => (
  <>
    <ApolloConsumer>
      {(client) => (
        <Button
          onClick={() => onChangeIssueState(TRANSITION_STATE[issueState])}
          onMouseOver={() =>
            prefetchIssues(client, repositoryOwner, repositoryName, issueState)
          }
        >
          {TRANSITION_LABELS[issueState]}
        </Button>
      )}
    </ApolloConsumer>
  </>
);

const IssueList = ({ issues }) => {
  <div className="IssueList">
    {issues.edges.map(({ node }) => (
      <IssueItem key={node.id} issue={node} />
    ))}
  </div>;
};

export default Issues;
