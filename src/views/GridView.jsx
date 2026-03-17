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

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);


    const handleSearch = (e) => {
  setSearchTerm(e.target.value);  
  setCurrentPage(1); 
};

  const handleCardClick = (item) => {
    const path = `./calendar/${item.id}`
    
    navigate(path, {
      state: { 
        [pageType === 'leagues' ? 'leagueName' : 'teamName']: item.name 
      }
    });
  };

  if (loading) return (
    <div className="container mt-5">
      <div className="text-center">Загрузка...</div>
    </div>
  );

  if (error) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="alert alert-danger text-center shadow-sm" role="alert">
              <h4 className="alert-heading mb-3">
                {pageType === 'leagues' ? 'Ошибка загрузки лиг' : 'Ошибка загрузки команд'}
              </h4>
              <p className="mb-3">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!data.length) return <div>No data found</div>;

  return (
    <div className="content container-fluid container-md mb-6 container-lg container-xl mt-header">
      <div className="container pt-1 pt-2 pt-sm-3">
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
              onChange={handleSearch}
            />
            </div>
          </div>
      </div>
      <div className="cards-section mb-5 mb-3 mt-3 mb-l-6">
        <div className="row g-3">
          {currentItems.map(item => (
            <div key={item.id} onClick={() => handleCardClick(item)} className="
                    col-6      
                    col-sm-6  
                    col-md-3  
                    col-lg-3  
                    col-xl-3" style={{ width: '156', height: '213', minHeight: '200px' }} >
                                
          <div className="card h-100 border-0 p-0 d-flex flex-column justify-content-between">
    <div className="d-flex align-items-center justify-content-center" style={{ height: '40%', minHeight: '160px' }}>
      <img 
        src={item.image} 
        className="img-fluid" 
        alt={item.name}
        style={{ 
          width: '100px',
          height: '100px',
          objectFit: 'contain',
          maxWidth: '80%',
          maxHeight: '90%'
        }}
      />
    </div>
    
    <div className="d-flex flex-column text-center align-end p-2">
      <div className="fw lh-1">{item.name}</div>
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
    </div>
  );
};

export default GridView;