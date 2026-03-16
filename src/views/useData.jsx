// hooks/useFootballData.js
import { useState, useEffect } from 'react';
import { soccerApi } from '../services/Api';

const DATA_TYPE = {
  leagues: {
    endpoint: 'getLeagues',
    dataPath: 'competitions',
    transform: (item) => ({
      id: item.id,
      name: item.name,
      area: item.area?.name,
      image: item.emblem,
    })
  },
  teams: {
    endpoint: 'getTeams',
    dataPath: 'teams',
    transform: (item) => ({
      id: item.id,
      name: item.name,
      image: item.crest,
    })
  }
};

export function useData(type) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const config = DATA_TYPE[type];
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); 
        
        const rawData = await soccerApi[config.endpoint]();
        const items = config.dataPath ? rawData[config.dataPath] : rawData;
        
        setData(items.map(config.transform));
      } catch (err) {
        console.error(`Ошибка загрузки ${type}:`, err);
        setError(err.message || 'Произошла ошибка при загрузке');
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [type]);

  return { data, loading, error };
}