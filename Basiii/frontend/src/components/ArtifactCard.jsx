import { Link } from 'react-router-dom';

function ArtifactCard({ artifact }) {
  return (
    <div className="card hover:scale-105">
      <div className="aspect-w-4 aspect-h-3 bg-gray-200">
        <img
          src={artifact.image}
          alt={artifact.name}
          className="w-full h-48 object-cover"
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
          Ask a Question
        </Link>
      </div>
    </div>
  );
}

export default ArtifactCard;
