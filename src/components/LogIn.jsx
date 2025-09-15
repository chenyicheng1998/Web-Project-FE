import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("登录数据:", formData);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://your-backend-url/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Save the token or other authentication information
        localStorage.setItem('authToken', data.token);
        console.log('login successfully', data);
        // Jump to the homepage
        navigate('/');
      } else {
        console.error('login failure');
        // Handle error situations
        alert(errorData.message || 'Login failed. Please check your email and password and try again.');
      }
    } catch (error) {
      console.error('Request Error:', error);
    }
  };




  const handleGoogleLogin = () => {
    console.log("google button clicked!")
    // window.location.href = 'http://your-backend-url/auth/google';
  };

  return (
    <div>
      <h2>Login</h2>


      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>


      <div>
        <hr />
        <p>Or</p>
        <hr />
      </div>

      <button type="button" onClick={handleGoogleLogin}>
        Sign in with Google
      </button>

      <p>Don't have an account? <Link to="/signin">Create account</Link></p>
    </div>
  );
}

export default Login;