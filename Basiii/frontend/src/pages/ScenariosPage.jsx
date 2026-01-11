import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import { getArtifactById } from '../data/artifacts';
import { apiService } from '../services/api';

function ScenariosPage() {
  const { id } = useParams();
  const location = useLocation();
  const [artifact, setArtifact] = useState(null);
  const [question, setQuestion] = useState('');
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [regeneratingIndex, setRegeneratingIndex] = useState(null);

  useEffect(() => {
    const foundArtifact = location.state?.artifact || getArtifactById(id);
    const userQuestion = location.state?.question || '';
    
    if (foundArtifact) {
      setArtifact(foundArtifact);
    }
    
    if (userQuestion) {
      setQuestion(userQuestion);
      generateScenarios(id, userQuestion);
    }
  }, [id, location]);

  const generateScenarios = async (artid, userQuestion) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.askQuestion(artid, userQuestion);
      
      const scenariosData = [
        {
          title: response.answerTopic1 || 'Historical Context Scenario',
          category: getScenarioCategory(response.answerTopic1),
          content: response.answerDescription1 || 'No description available.'
        },
        {
          title: response.answerTopic2 || 'Functional Application Scenario',
          category: getScenarioCategory(response.answerTopic2),
          content: response.answerDescription2 || 'No description available.'
        },
        {
          title: response.answerTopic3 || 'Cultural Exchange Scenario',
          category: getScenarioCategory(response.answerTopic3),
          content: response.answerDescription3 || 'No description available.'
        }
      ].filter(s => s.content !== 'No description available.');
      
      setScenarios(scenariosData);
    } catch (err) {
      setError(err.message || 'Failed to generate scenarios. Please try again.');
      console.error('Error generating scenarios:', err);
    } finally {
      setLoading(false);
    }
  };

  const getScenarioCategory = (title) => {
    const titleLower = title?.toLowerCase() || '';
    if (titleLower.includes('ritual') || titleLower.includes('religious')) return 'Ancient Egyptian Society';
    if (titleLower.includes('colonial') || titleLower.includes('empire')) return 'Cross-Cultural Influence';
    if (titleLower.includes('cultural') || titleLower.includes('exchange')) return 'Cross-Cultural Influence';
    if (titleLower.includes('trade') || titleLower.includes('commerce')) return 'Practical Usage & Rituals';
    return 'Practical Usage & Rituals';
  };

  const regenerateScenario = async (index) => {
    setRegeneratingIndex(index);
    try {
      const response = await apiService.askQuestion(id, question);
      
      const newScenarios = [...scenarios];
      const scenarioKeys = ['answerTopic1', 'answerDescription1', 'answerTopic2', 'answerDescription2', 'answerTopic3', 'answerDescription3'];
      const topicKey = scenarioKeys[index * 2];
      const descKey = scenarioKeys[index * 2 + 1];
      
      newScenarios[index] = {
        title: response[topicKey] || newScenarios[index].title,
        category: getScenarioCategory(response[topicKey]),
        content: response[descKey] || newScenarios[index].content
      };
      
      setScenarios(newScenarios);
    } catch (err) {
      console.error('Error regenerating scenario:', err);
    } finally {
      setRegeneratingIndex(null);
    }
  };

  const regenerateAll = async () => {
    await generateScenarios(id, question);
  };

  const viewAIContext = () => {
    alert('AI Context:\n\n' + 
      `Artifact: ${artifact?.name}\n` +
      `Question: ${question}\n` +
      `Model: Fine-tuned GPT-4o-mini\n` +
      `Analysis: The AI analyzes historical context, cultural significance, and potential implications based on the artifact's metadata and historical knowledge.`
    );
  };

  if (!artifact) {
    return (
      <div className="min-h-screen bg-beige">
        <Header showDashboard />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600">Loading artifact...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige">
      <Header showDashboard />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to={`/artifact/${id}`}
          className="inline-flex items-center text-primary hover:text-primary-dark mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Details
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Artifact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <img
                src={artifact.image}
                alt={artifact.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/300x200/8B7355/ffffff?text=${encodeURIComponent(artifact.name.substring(0, 15))}`;
                }}
              />
              
              <h2 className="text-xl font-bold text-gray-800 mb-2">{artifact.name}</h2>
              
              <div className="space-y-2 text-sm mb-4">
                <p className="text-gray-600">
                  <span className="font-semibold">Category:</span><br />
                  {artifact.category}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Era:</span><br />
                  {artifact.period}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Origin:</span><br />
                  {artifact.origin}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">Function:</p>
                <p className="text-sm text-gray-600">{artifact.usage}</p>
              </div>

              <div className="pt-4 border-t border-gray-200 mt-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Symbolism:</p>
                <p className="text-sm text-gray-600">{artifact.significance || artifact.description}</p>
              </div>
            </div>
          </div>

          {/* Right Content - Generated Scenarios */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Generated Scenarios</h1>
              <p className="text-gray-600 mb-4">AI-generated What-If scenarios based on artifact context</p>
              
              {question && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Your Question:</p>
                  <p className="text-gray-800">{question}</p>
                </div>
              )}
            </div>

            {/* Loading State */}
            {loading && scenarios.length === 0 && (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Generating AI scenarios...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <p className="text-red-800">{error}</p>
                <button
                  onClick={() => generateScenarios(id, question)}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Scenarios List */}
            {scenarios.length > 0 && (
              <div className="space-y-6">
                {scenarios.map((scenario, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <svg className="w-6 h-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <h3 className="text-xl font-bold text-gray-800">{scenario.title}</h3>
                          </div>
                          <p className="text-sm text-gray-600">{scenario.category}</p>
                        </div>
                        <button
                          onClick={() => viewAIContext()}
                          className="text-gray-500 hover:text-gray-700"
                          title="View AI Context"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>

                      <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
                        {scenario.content}
                      </p>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => regenerateScenario(index)}
                          disabled={regeneratingIndex === index}
                          className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md transition-colors disabled:bg-gray-400"
                        >
                          <svg className={`w-4 h-4 ${regeneratingIndex === index ? 'animate-spin' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                          </svg>
                          <span>{regeneratingIndex === index ? 'Regenerating...' : 'Regenerate Scenario'}</span>
                        </button>

                        <button
                          onClick={viewAIContext}
                          className="flex items-center space-x-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          <span>View AI Context</span>
                        </button>

                        <button
                          className="flex items-center space-x-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md transition-colors"
                          title="Download Scenario"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Regenerate All Button */}
                <div className="flex justify-center mt-8">
                  <button
                    onClick={regenerateAll}
                    disabled={loading}
                    className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-md transition-colors disabled:bg-gray-400"
                  >
                    <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    <span>{loading ? 'Regenerating...' : 'Regenerate All Scenarios'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ScenariosPage;
