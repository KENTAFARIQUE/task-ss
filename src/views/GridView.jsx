import React, { useState, useMemo  } from 'react';
import { useNavigate } from 'react-router';
import { useData } from './useData';
import Pagination from '../components/Pagination';
import './GridView.css'

const GridView = ({ pageType }) => {
  const navigate = useNavigate();
  const { data, loading, error } = useData(pageType);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const filteredData = useMemo(() => {
    if (!data) return [];
    
    return data.filter(data => {
      const searchLower = searchTerm.toLowerCase();
      return (
        data.name?.toLowerCase().includes(searchLower) ||
        data.area?.toLowerCase().includes(searchLower) ||
        data.code?.toLowerCase().includes(searchLower)
      );
    });
  }, [data, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); 
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  if (loading) return <div>Загрузка</div>;
  if (error) return <div>Ошибка: {error}</div>;

  const handleCardClick = (item) => {
    const path = `./calendar/${item.id}`
    
    navigate(path, {
      state: { 
        [pageType === 'leagues' ? 'leagueName' : 'teamName']: item.name 
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return <div>No data found</div>;

  return (
    <div className="container">
      <div className="row justify-content-center">
            <div className="search-section">
              <div className="input-group">
          <span className="input-group-text bg-white border-0 ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </span>
          <input
            type="text"
            className="form-control border-0 p-0"
            placeholder={`Search`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          </div>
        </div>
    </div>
    <div className="cards-section mt-5">
      <div className="row g-3">
        {currentItems.map(item => (
          <div key={item.id} onClick={() => handleCardClick(item)} className="
                  col-6      
                  col-sm-6  
                  col-md-3  
                  col-lg-3  
                  col-xl-3">            
        <div className="card h-100 border-0 p-0 d-flex flex-column" style={{ minHeight: '280px' }}>
  {/* Контейнер для картинки - 60% высоты */}
  <div className="d-flex align-items-center justify-content-center" style={{ height: '40%', minHeight: '160px' }}>
    <img 
      src={item.image} 
      className="img-fluid" 
      alt={item.name}
      style={{ 
        objectFit: 'contain',
        maxWidth: '80%',
        maxHeight: '90%'
      }}
    />
  </div>
  
  {/* Контейнер для текста - 40% высоты */}
   <div className="d-flex flex-column text-center align-end">
    <div className="fw">{item.name}</div>
    {item.area && <div className="text-muted small">{item.area}</div>}
  </div>
</div>
          </div>
        ))}
      </div>
    </div>
      <div className="pagination">
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default GridView;