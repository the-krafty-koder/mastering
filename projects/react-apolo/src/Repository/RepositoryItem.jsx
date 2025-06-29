import React from "react";
import Link from "../Link";
import Button from "../Button";
import { gql, useMutation } from "@apollo/client";
import "../style.css";
import { REPOSITORY_FRAGMENT } from "./RepositoriesList";

const STAR_REPOSITORY = gql`
  mutation StarRepository($id: ID!) {
    addStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const WATCH_REPOSITORY = gql`
  mutation watchRepository($id: ID!, $viewerSubscription: SubscriptionState!) {
    updateSubscription(
      input: { state: $viewerSubscription, subscribableId: $id }
    ) {
      subscribable {
        id
        viewerSubscription
      }
    }
  }
`;

const VIEWER_SUBSCRIPTIONS = {
  SUBSCRIBED: "SUBSCRIBED",
  UNSUBSCRIBED: "UNSUBSCRIBED",
};

const isWatch = (viewerSubscription) =>
  viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED;

const updateWatch = (
  client,
  {
    data: {
      updateSubscription: {
        subscribable: { id, viewerSubscription },
      },
    },
  }
) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });
  let { totalCount } = repository.watchers;
  totalCount =
    viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED
      ? totalCount + 1
      : totalCount - 1;
  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      watchers: {
        ...repository.watchers,
        totalCount,
      },
    },
  });
};

const updateAddStar = (
  client,
  {
    data: {
      addStar: {
        starrable: { id },
      },
    },
  }
) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });

  const totalCount = repository.stargazers.totalCount + 1;

  client.writeFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
    data: {
      ...repository,
      stargazers: {
        ...repository.stargazers,
        totalCount,
      },
    },
  });
};
const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}) => {
  const [watchRepository, { data: watchData, loading, error }] = useMutation(
    WATCH_REPOSITORY,
    {
      variables: {
        id,
        viewerSubscription: isWatch(viewerSubscription)
          ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
          : VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
      },
      update: updateWatch,
    }
  );
  const [starRepository, { data: starData }] = useMutation(STAR_REPOSITORY, {
    variables: { id },
    update: updateAddStar,
    optimisticResponse: {
      updateSubscription: {
        __typename: "Mutation",
        subscribable: {
          __typename: "Repository",
          id,
          viewerSubscription: isWatch(viewerSubscription)
            ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
            : VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
        },
      },
    },
  });
  return (
    <div>
      <div className="RepositoryItem-title">
        <h2></h2>
        {!viewerHasStarred && (
          <Button onClick={starRepository}>{stargazers.totalCount} Star</Button>
        )}
        <Button onClick={watchRepository}>
          {watchers.totalCount}{" "}
          {isWatch(viewerSubscription) ? "Unwatch" : "Watch"}
        </Button>

        <Link href={url}>{name}</Link>
        <div className="RepositoryItem-title-action">
          {stargazers.totalCount} Stars
        </div>
      </div>
      <div className="RepositoryItem-description">
        <div
          className="RepositoryItem-description-info"
          dangerouslySetInnerHTML={{ __html: descriptionHTML }}
        />
        <div className="RepositoryItem-description-details">
          <div>
            {primaryLanguage && <span>Language: {primaryLanguage.name}</span>}
          </div>
          <div>
            {owner && (
              <span>
                Owner: <a href={owner.url}>{owner.login}</a>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RepositoryItem;
