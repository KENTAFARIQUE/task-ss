import React, { useState, useMemo, useEffect  } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router';
import { soccerApi } from '../services/Api';
import Match from '../components/Match';
import DatePicker from '../components/DatePicker';
import Pagination from '../components/Pagination';

const CalendarView = () => {
  const { type, id } = useParams();
  const location = useLocation();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [path, setPath] = useState([]);

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const navigate = useNavigate();


  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        let data;
        
        if (type === 'leagues') {
          data = await soccerApi.getLeagueMatches(id);
          const leagueName = location.state?.leagueName;
          setPath(['Лиги', leagueName]);
        } else if (type === 'teams') {
          data = await soccerApi.getTeamMatches(id);
          const teamName = location.state?.teamName;
          setPath(['Команды', teamName]);
        }
        
        setMatches(data.matches || []);
      } catch (error) {
        setError(error)
        console.error('Ошибка загрузки матчей:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [type, id, location.state]);

  console.log(path[0])
  const handleClick = () => {
  if (path[0] === ('Лиги')) {
    navigate('/leagues'); 
  } else {
    navigate('/teams');  
  }
  };

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

  const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMatches = filteredMatches.slice(startIndex, endIndex);


  if (loading) return <div>Загрузка матчей...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div style={{ marginTop: "4rem" }}>
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
    </div>
  );
};

export default CalendarView;