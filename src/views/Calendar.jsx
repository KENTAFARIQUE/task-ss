import React, { useState, useMemo, useEffect  } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router';
import { useMatches } from './useMatches';
import Match from '../components/Match';
import DatePicker from '../components/DatePicker';
import Pagination from '../components/Pagination';

const CalendarView = () => {
  const { type, id } = useParams();
  const { matches, loading, error } = useMatches(type, id);
  const [path, setPath] = useState([]);
  const location = useLocation();

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const navigate = useNavigate();

  useEffect(() => {
    const sectionName = type === 'leagues' ? 'Лиги' : 'Команды';
    const itemName = location.state?.[type === 'leagues' ? 'leagueName' : 'teamName'];
    setPath([sectionName, itemName]); 
  }, [type, location.state, id]);

  const filteredMatches = useMemo(() => {
    if (!matches.length) return [];
    
    if (!dateFrom && !dateTo) {
      return matches;
    }
    
    const startDate = dateFrom ? new Date(dateFrom) : null;
    if (startDate) startDate.setHours(0, 0, 0, 0);
    
    const endDate = dateTo ? new Date(dateTo) : null;
    if (endDate) endDate.setHours(23, 59, 59, 999);
    
    return matches.filter(match => {
      const matchDate = new Date(match.utcDate);
      
      if (startDate && endDate) {
        return matchDate >= startDate && matchDate <= endDate;
      } else if (startDate) {
        return matchDate >= startDate;
      } else if (endDate) {
        return matchDate <= endDate;
      }
      
      return true;
    });
    
  }, [matches, dateFrom, dateTo]);

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
          <h4>Ошибка загрузки матчей</h4>
          <p>{error}</p>
        </div>
      </div>
      </div>
      </div>
    );
  }

  const handleClick = () => {
      navigate(path[0] === ('Лиги') ? '/leagues': '/teams'); 
  };

  

  const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMatches = filteredMatches.slice(startIndex, endIndex);

  return (
    <>
    <div className='breadcrumbs px-3 py-2'>
        <span onClick={handleClick}>{path[0]}</span> &#62; {path[1]}
      </div>
<div className="content container-fluid container-md mb-6 container-lg container-xl mt-3 mt-sm-4 mt-md-5 mt-lg-5 mt-xl-5">
      <DatePicker 
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
      />
      {filteredMatches.length === 0 ? (
        <div>
          Нет матчей за выбранный период
        </div>
      ) : (
        <div style={{ marginTop: "1.5rem"}}>
          {currentMatches.map(match => (
            <Match key={match.id} match={match} />
          ))}
        </div>
      )}
      {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
    </div>
    </>
  );
};

export default CalendarView;