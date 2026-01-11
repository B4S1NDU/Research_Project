import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { getArtifactById } from '../data/artifacts';

function ArtifactDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artifact, setArtifact] = useState(null);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    const foundArtifact = getArtifactById(id);
    if (foundArtifact) {
      setArtifact(foundArtifact);
    }
  }, [id]);

  const handleGenerateScenarios = () => {
    if (question.trim()) {
      navigate(`/scenarios/${id}`, { state: { question, artifact } });
    }
  };

  const exampleQuestions = [
    'What if this was found in ancient Egypt?',
    'What if it contained medicine instead?',
    'What if it survived until medieval times?'
  ];

  const exploreThemes = [
    'Trade and commerce',
    'Cultural exchange',
    'Daily life and society'
  ];

  if (!artifact) {
    return (
      <div className="min-h-screen bg-beige">
        <Header showDashboard />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600">Artifact not found.</p>
          <Link to="/" className="block text-center text-primary hover:underline mt-4">
            Back to Explorer
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige">
      <Header showDashboard />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/" className="hover:text-primary">Artifacts</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800">{artifact.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Artifact Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <img
                src={artifact.image}
                alt={artifact.name}
                className="w-full h-64 object-cover rounded-lg mb-6"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/400x400/8B7355/ffffff?text=${encodeURIComponent(artifact.name.substring(0, 15))}`;
                }}
              />
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{artifact.name}</h2>
              
              <div className="space-y-3 text-sm">
                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Category</span>
                  </div>
                  <p className="text-gray-800 ml-6">{artifact.category}</p>
                </div>

                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Era</span>
                  </div>
                  <p className="text-gray-800 ml-6">{artifact.period}</p>
                </div>

                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Origin</span>
                  </div>
                  <p className="text-gray-800 ml-6">{artifact.origin}</p>
                </div>

                {artifact.dimensions && (
                  <div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                      <span className="font-semibold">Dimensions</span>
                    </div>
                    <p className="text-gray-800 ml-6">{artifact.dimensions}</p>
                  </div>
                )}

                {artifact.material && (
                  <div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">Material</span>
                    </div>
                    <p className="text-gray-800 ml-6">{artifact.material}</p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {artifact.usage}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Ask a Question */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Ask a What-If Question
              </h3>
              <p className="text-gray-600 mb-6">
                Explore hypothetical scenarios about this artifact and discover new perspectives on history.
              </p>

              {/* Question Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your What-If Question
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What if this amphora was used in a different era? What if it contained something other than wine? What if it was discovered in a different location?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows="5"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateScenarios}
                disabled={!question.trim()}
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <span>Generate Scenarios</span>
              </button>

              {/* How it Works */}
              <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  How it works:
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• AI analyzes your question in context of the artifact</li>
                  <li>• Generates multiple plausible historical scenarios</li>
                  <li>• Provides insights backed by historical knowledge</li>
                  <li>• Explores cultural and societal implications</li>
                </ul>
              </div>

              {/* Example Questions */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">Example Questions:</h4>
                <div className="space-y-2">
                  {exampleQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuestion(q)}
                      className="block w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
                    >
                      • {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Explore Themes */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">Explore Themes:</h4>
                <div className="flex flex-wrap gap-2">
                  {exploreThemes.map((theme, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary text-white text-sm rounded-full"
                    >
                      • {theme}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ArtifactDetailPage;
