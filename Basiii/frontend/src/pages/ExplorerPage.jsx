import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ArtifactCard from '../components/ArtifactCard';
import Pagination from '../components/Pagination';
import { artifacts, getCategories, getEras, getOrigins } from '../data/artifacts';

function ExplorerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedEra, setSelectedEra] = useState('All Eras');
  const [selectedOrigin, setSelectedOrigin] = useState('All Origins');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = ['All Categories', ...getCategories()];
  const eras = ['All Eras', ...getEras()];
  const origins = ['All Origins', ...getOrigins()];

  // Filter artifacts
  const filteredArtifacts = artifacts.filter(artifact => {
    const matchesSearch = artifact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artifact.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artifact.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || artifact.category === selectedCategory;
    const matchesEra = selectedEra === 'All Eras' || artifact.era === selectedEra;
    const matchesOrigin = selectedOrigin === 'All Origins' || artifact.origin === selectedOrigin;
    
    return matchesSearch && matchesCategory && matchesEra && matchesOrigin;
  });

  // Pagination
  const totalPages = Math.ceil(filteredArtifacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArtifacts = filteredArtifacts.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedEra, selectedOrigin]);

  return (
    <div className="min-h-screen bg-beige">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Bar */}
            <div className="md:col-span-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search artifacts by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10"
                />
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select-field w-full"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Era Filter */}
            <div>
              <select
                value={selectedEra}
                onChange={(e) => setSelectedEra(e.target.value)}
                className="select-field w-full"
              >
                {eras.map(era => (
                  <option key={era} value={era}>{era}</option>
                ))}
              </select>
            </div>

            {/* Origin Filter */}
            <div>
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                className="select-field w-full"
              >
                {origins.map(origin => (
                  <option key={origin} value={origin}>{origin}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Available Artifacts Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Available Artifacts</h2>
          <p className="text-gray-600">{filteredArtifacts.length} artifacts found</p>
        </div>

        {/* Artifacts Grid */}
        {paginatedArtifacts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginatedArtifacts.map(artifact => (
                <ArtifactCard key={artifact.id} artifact={artifact} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No artifacts found matching your criteria.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-12">
        <p className="text-sm">© 2023 AI Artifact Scenario Explorer. Advancing archaeological understanding through AI.</p>
      </footer>
    </div>
  );
}

export default ExplorerPage;
