export default function Header({ onAddClick, totalCount }) {
  return (
    <header className="header">
      <div className="header__inner container">
        <div className="header__brand">
          <span className="header__logo" aria-hidden="true">
            🏘️
          </span>
          <div>
            <h1 className="header__title">Palm Grove Directory</h1>
            <p className="header__subtitle">
              {totalCount} local businesses serving our community
            </p>
          </div>
        </div>
        <button className="btn btn--primary" onClick={onAddClick}>
          <span aria-hidden="true">＋</span> List your business
        </button>
      </div>
    </header>
  );
}
