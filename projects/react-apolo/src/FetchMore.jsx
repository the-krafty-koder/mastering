const FetchMore = ({ variables, updateQuery, fetchMore, children }) => (
  <div className="FetchMore">
    {loading ? (
      <Loading />
    ) : (
      hasNextPage && (
        <button
          type="button"
          className="FetchMore-button"
          onClick={() => fetchMore({ variables, updateQuery })}
        >
          More {children}
        </button>
      )
    )}
  </div>
);

export default FetchMore;
