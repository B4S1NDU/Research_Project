import { Link } from 'react-router-dom';

function ArtifactCard({ artifact }) {
  return (
    <div className="card hover:scale-105">
      <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg p-3">
        <img
          src={artifact.images[0]}
          alt={artifact.name}
          className="w-full h-48 object-contain bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-2"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x300/8B7355/ffffff?text=${encodeURIComponent(artifact.name.substring(0, 20))}`;
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
          {artifact.name}
        </h3>
        <div className="space-y-1 mb-4">
          <p className="text-sm text-primary font-medium">{artifact.category}</p>
          <p className="text-sm text-gray-600">{artifact.era} • {artifact.period}</p>
        </div>
        <Link
          to={`/artifact/${artifact.id}`}
          className="block w-full text-center bg-primary hover:bg-primary-dark text-white py-2 rounded-md transition-colors duration-200 font-medium"
        >
          Explore Scenarios
        </Link>
      </div>
    </div>
  );
}

export default ArtifactCard;
