import { Link } from 'react-router-dom';

function Header({ showDashboard = false }) {
  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <h1 className="text-2xl font-bold">AI Artifact Scenario Explorer</h1>
          </Link>
          {showDashboard && (
            <Link 
              to="/"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
