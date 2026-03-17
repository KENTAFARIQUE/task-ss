import { useState, useEffect } from 'react';
import { soccerApi } from '../services/Api';

export function useMatches(type, id) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data;
        if (type === 'leagues') {
          data = await soccerApi.getLeagueMatches(id);
        } else if (type === 'teams') {
          data = await soccerApi.getTeamMatches(id);
        } else {
          throw new Error('Неверный тип матчей');
        }
        
        setMatches(data.matches || []);
      } catch (err) {
        setError(err.message || 'Произошла ошибка при загрузке матчей');
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMatches();
    }
  }, [type, id]);

  return { matches, loading, error };
}