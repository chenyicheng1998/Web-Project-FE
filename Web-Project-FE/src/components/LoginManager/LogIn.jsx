import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";

function Login() {
  const { login } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  // 检查URL中是否有Google登录成功的token
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      verifyGoogleToken(token);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Login attempt with data:', formData);

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers.entries()]);

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        login(data.user, data.token);
        console.log('Login successfully', data);
        navigate('/');
      } else {
        console.error('Login failed:', data);
        alert(data.message || 'Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Request Error:', error);
      alert(`Network error: ${error.message}`);
    }
  };

  const verifyGoogleToken = async (token) => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/verify-google-token', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        localStorage.setItem('authToken', token);
        login(data.user, token);
        alert('Google login successful');
        navigate('/');
      } else {
        alert('Google login failed');
      }
    } catch (error) {
      console.error('Token verification error:', error);
      alert('Google login failed');
    }
  };

  const handleGoogleLogin = () => {
    console.log('Redirecting to Google OAuth:', 'http://localhost:5001/api/auth/google');
    window.location.href = 'http://localhost:5001/api/auth/google';
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        {/* 返回按钮 */}
        <button
          onClick={handleGoBack}
          className="flex items-center text-gray-500 hover:text-gray-700 transition duration-200 mb-4"
          aria-label="Go back"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Login</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>

            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200"
            >
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signin"
              className="font-medium text-orange-600 hover:text-orange-500 transition duration-200"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;