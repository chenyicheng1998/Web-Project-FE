import { Outlet, Link } from "react-router-dom";
// import logo from '../assets/logo.svg';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          {/* <img src={logo} alt="Cook Ease Logo" /> */}
          <span className="text-2xl font-bold text-orange-500">CookEase</span>

        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-gray-700 hover:text-orange-500 transition duration-200">Home</Link>
          </li>
          <li>
            <Link to="/recipes" className="text-gray-700 hover:text-orange-500 transition duration-200">Recipes</Link>
          </li>
          <li>
            <Link to="/random" className="text-gray-700 hover:text-orange-500 transition duration-200">Random</Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-700 hover:text-orange-500 transition duration-200">About</Link>
          </li>
        </ul>
      </nav>
      <nav className="bg-gray-100">
        <div className="container mx-auto px-4 py-2">
          <ul className="flex space-x-4">
            <li>
              <Link to="/like" className="text-gray-600 hover:text-orange-500 transition duration-200">Like</Link>
            </li>
            <li>
              <Link to="/shoppinglist" className="text-gray-600 hover:text-orange-500 transition duration-200">Shopping List</Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>


      <footer className="bg-gray-800 text-white mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* 品牌信息 */}
            <div>
              <h2 className="text-2xl font-bold text-orange-400 mb-4">Cook Ease</h2>
              <h3 className="text-lg font-semibold mb-2">About us</h3>
              <p className="text-gray-300 mb-4">
                CookEase aims to make cooking enjoyable, as we believe it contributes to a healthy lifestyle for individuals, communities, and the environment. Our platform connects home cooks worldwide to share recipes and culinary ideas.
              </p>
            </div>

            {/* 链接区域 */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Blog</h4>
              <div className="mb-4">
                <p className="text-gray-300 hover:text-orange-400 cursor-pointer transition duration-200">Terms & Services</p>
                <p className="text-gray-300 hover:text-orange-400 cursor-pointer transition duration-200">Privacy Policy</p>
              </div>

              {/* 社交媒体链接 */}
              <div className="flex space-x-4">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-orange-500 text-white p-2 rounded-full transition duration-200">
                  Instagram
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-orange-500 text-white p-2 rounded-full transition duration-200">
                  Facebook
                </a>
                <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" className="bg-gray-700 hover:bg-orange-500 text-white p-2 rounded-full transition duration-200">
                  Twitter
                </a>
              </div>
            </div>
          </div>

          {/* 底部版权信息 */}
          <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400">
            <p>&copy; 2024 CookEase. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Layout;
