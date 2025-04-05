import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="unauthorized-page">
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <p>
        Please <Link to="/login">log in</Link> or <Link to="/register">register</Link> to continue.
      </p>
    </div>
  );
};

export default Unauthorized;