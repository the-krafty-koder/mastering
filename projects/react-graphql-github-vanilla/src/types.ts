export type Organization = {
  url: string;
  name: string;
  repository: Repository;
};

export type Repository = {
  id: string;
  url: string;
  name: string;
  stargazers: {
    totalCount: number;
  };
  viewerHasStarred: boolean;
  issues: {
    edges: {
      node: Issue;
    }[];
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
  };
};

export type Reaction = {
  id: string;
  content: string;
};

export type Issue = {
  id: string;
  title: string;
  url: string;
  reactions: {
    edges: {
      node: Reaction;
    }[];
  };
};

export type Error = {
  message: string;
};
