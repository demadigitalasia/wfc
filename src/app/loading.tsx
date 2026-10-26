export default function Loading() {
  return (
    <div className="loading-page" role="status" aria-label="Loading page">
      <div className="skeleton skeleton-title" />
      <div className="skeleton-grid">
        {[1, 2, 3, 4].map((n) => (
          <div key={n}>
            <div className="skeleton skeleton-image" />
            <div className="skeleton skeleton-text" />
          </div>
        ))}
      </div>
    </div>
  );
}
