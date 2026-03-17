const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;
const API_BASE_URL = import.meta.env.VITE_FOOTBALL_API_URL;

const headers = {
  'X-Auth-Token': API_KEY,
  'Content-Type': 'application/json',
};

async function fetchApi(endpoint) {
  try {
    const response = await fetch(API_BASE_URL + endpoint, {
      headers: headers
    });

    if (!response.ok) {
      let errorText;
      try {
        errorText = await response.text();
      } catch (e) {
        errorText = 'Не удалось прочитать тело ошибки';
      }
      
      let errorMessage = `HTTP ${response.status}`;
      
      if (response.status === 400) {
        errorMessage = 'Неверный запрос. Проверьте параметры.';
      } else if (response.status === 403) {
        errorMessage = 'Доступ запрещен. Проверьте API ключ.';
      } else if (response.status === 404) {
        errorMessage = 'Ресурс не найден. Проверьте endpoint.';
      } else if (response.status === 429) {
        errorMessage = 'Слишком много запросов. Подождите минуту.';
      } else if (response.status >= 500) {
        errorMessage = 'Ошибка сервера. Попробуйте позже.';
      }
      
      throw new Error(errorMessage);
    }


    const data = await response.json();
    return data;

  } catch (error) {
    throw error;
  }
}

export const soccerApi = {
  get: (resource, id = null, relation = null) => 
    fetchApi(
      `/${resource}${id ? `/${id}` : ''}${relation ? `/${relation}` : ''}`
    ),

  getLeagues: () => soccerApi.get('competitions'),
  getTeams: () => soccerApi.get('teams'),
  getLeagueMatches: (leagueId) => soccerApi.get('competitions', leagueId, 'matches'),
  getTeamMatches: (teamId) => soccerApi.get('teams', teamId, 'matches'),
};

export default soccerApi;