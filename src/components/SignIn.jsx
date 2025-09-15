import { Link } from "react-router-dom";

function Signin() {
  return (
    <div>
      <h2>Signin</h2>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
}

export default Signin;