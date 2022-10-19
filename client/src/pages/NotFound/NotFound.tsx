import './NotFound.scss';

const NotFoundPage = () => {
  return (
    <div className="content">
      <h1>404</h1>
      <p>
        <span>Opps!</span> Page not found.
      </p>
      <p>The page you’re looking for doesn’t exist.</p>
      <a
        href="."
        className="button"
      >
        Go back to the previous screen
      </a>
    </div>
  );
};

export default NotFoundPage;
