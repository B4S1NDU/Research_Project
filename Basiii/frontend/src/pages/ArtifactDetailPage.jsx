import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { getArtifactById } from '../data/artifacts';
import { apiService } from '../services/api';

function ArtifactDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artifact, setArtifact] = useState(null);
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [loadingScenarios, setLoadingScenarios] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const foundArtifact = getArtifactById(id);
    if (foundArtifact) {
      setArtifact(foundArtifact);
      if (foundArtifact.images && foundArtifact.images.length > 0) {
        setSelectedImage(foundArtifact.images[0]);
      }
    }

    // Load available scenarios
    loadScenarios();
  }, [id]);

  const loadScenarios = async () => {
    try {
      const scenarioList = await apiService.getScenarios();
      setScenarios(scenarioList);
    } catch (error) {
      console.error('Failed to load scenarios:', error);
    } finally {
      setLoadingScenarios(false);
    }
  };

  const handleSelectScenario = (scenario) => {
    setSelectedScenario(scenario);
  };

  const handleGenerateAnalysis = () => {
    if (selectedScenario) {
      navigate(`/scenarios/${id}`, {
        state: {
          scenario: selectedScenario,
          artifact
        }
      });
    }
  };

  const getColorClass = (color) => {
    const colorMap = {
      'blue': 'border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300',
      'green': 'border-green-200 bg-green-50 hover:bg-green-100 hover:border-green-300',
      'purple': 'border-purple-200 bg-purple-50 hover:bg-purple-100 hover:border-purple-300',
      'orange': 'border-orange-200 bg-orange-50 hover:bg-orange-100 hover:border-orange-300',
      'red': 'border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-300',
      'teal': 'border-teal-200 bg-teal-50 hover:bg-teal-100 hover:border-teal-300',
      'amber': 'border-amber-200 bg-amber-50 hover:bg-amber-100 hover:border-amber-300',
      'indigo': 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-300'
    };
    return colorMap[color] || colorMap['blue'];
  };

  const getSelectedColorClass = (color) => {
    const colorMap = {
      'blue': 'border-blue-500 bg-blue-100',
      'green': 'border-green-500 bg-green-100',
      'purple': 'border-purple-500 bg-purple-100',
      'orange': 'border-orange-500 bg-orange-100',
      'red': 'border-red-500 bg-red-100',
      'teal': 'border-teal-500 bg-teal-100',
      'amber': 'border-amber-500 bg-amber-100',
      'indigo': 'border-indigo-500 bg-indigo-100'
    };
    return colorMap[color] || colorMap['blue'];
  };

  if (!artifact) {
    return (
      <div className="min-h-screen bg-beige">
        <Header showDashboard />
        <div className="max-w-full mx-auto px-6 lg:px-12 py-8">
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

      <main className="max-w-full mx-auto px-6 lg:px-12 py-8">
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
              <div className="bg-gradient-to-br from-amber-50 via-white to-gray-50 rounded-xl p-4 mb-6 border-2 border-amber-100 shadow-inner" style={{ minHeight: '256px' }}>
                <img
                  src={selectedImage || artifact.images[0]}
                  alt={artifact.name}
                  className="w-full max-h-64 object-contain rounded-lg drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x400/8B7355/ffffff?text=${encodeURIComponent(artifact.name.substring(0, 15))}`;
                  }}
                />
              </div>

              {/* Image Gallery Thumbnails */}
              {artifact.images && artifact.images.length > 1 && (
                <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                  {artifact.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${selectedImage === img
                        ? 'border-primary ring-2 ring-primary ring-opacity-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <img
                        src={img}
                        alt={`${artifact.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

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
                    <span className="font-semibold">Period</span>
                  </div>
                  <p className="text-gray-800 ml-6">{artifact.period}</p>
                </div>

                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Era</span>
                  </div>
                  <p className="text-gray-800 ml-6">{artifact.era}</p>
                </div>

                <div>
                  <div className="flex items-center text-gray-600 mb-1">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Location</span>
                  </div>
                  <p className="text-gray-800 ml-6">{artifact.location}</p>
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

          {/* Right Column - Scenario Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Choose Analysis Scenario
              </h3>
              <p className="text-gray-600 mb-6">
                Select an historical analysis scenario to explore this artifact from different academic perspectives.
              </p>

              {loadingScenarios ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="text-gray-600 mt-4">Loading scenarios...</p>
                </div>
              ) : (
                <>
                  {/* Scenario Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {scenarios.map((scenario) => (
                      <button
                        key={scenario.id}
                        onClick={() => handleSelectScenario(scenario)}
                        className={`text-left p-4 border-2 rounded-lg transition-all duration-200 ${selectedScenario?.id === scenario.id
                          ? getSelectedColorClass(scenario.color) + ' ring-2 ring-offset-2'
                          : getColorClass(scenario.color)
                          }`}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-3xl flex-shrink-0">{scenario.icon}</span>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-800 mb-1 text-sm">
                              {scenario.name}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {scenario.description}
                            </p>
                          </div>
                          {selectedScenario?.id === scenario.id && (
                            <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={handleGenerateAnalysis}
                    disabled={!selectedScenario}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                    </svg>
                    <span>
                      {selectedScenario
                        ? `Explore ${selectedScenario.name}`
                        : 'Select a Scenario to Continue'}
                    </span>
                  </button>

                  {/* Why Scenarios? Info Box */}
                  <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Why Predefined Scenarios?
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>✓ <strong>Higher Accuracy:</strong> Structured prompts ensure consistent, reliable results</li>
                      <li>✓ <strong>Academic Rigor:</strong> Each scenario follows established historical frameworks</li>
                      <li>✓ <strong>Comprehensive Coverage:</strong> Explore artifacts from multiple scholarly perspectives</li>
                      <li>✓ <strong>Reduced Ambiguity:</strong> Eliminates vague or unclear questions</li>
                    </ul>
                  </div>

                  {/* Research Applications */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Research Applications:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="px-3 py-2 bg-gray-100 rounded-lg text-xs text-gray-700">
                        📚 Academic Papers
                      </div>
                      <div className="px-3 py-2 bg-gray-100 rounded-lg text-xs text-gray-700">
                        🎓 Student Research
                      </div>
                      <div className="px-3 py-2 bg-gray-100 rounded-lg text-xs text-gray-700">
                        🏛️ Museum Curation
                      </div>
                      <div className="px-3 py-2 bg-gray-100 rounded-lg text-xs text-gray-700">
                        📖 Educational Content
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ArtifactDetailPage;
