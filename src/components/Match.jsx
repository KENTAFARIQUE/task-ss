const Match = ({ match }) => {
  // Функция для форматирования времени
  const formatDateTime = (dateString) => {
    if (!dateString) return ['Дата не указана', 'Время не указано'];
    
      const date = new Date(dateString);
    
    // Форматируем дату: ДД.ММ.ГГГГ
    const formattedDate = date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).split('.').join('.'); // Преобразуем ММ.ДД.ГГГГ в ДД.ММ.ГГГГ
    
    // Форматируем время: ЧЧ:ММ
    const formattedTime = date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    return [formattedDate, formattedTime];
  };
  const [matchDate, matchTime] = formatDateTime(match.utcDate);

  // Функция для статуса матча
  const getMatchStatus = (status) => {
    switch(status) {
      case 'FINISHED':
        return 'Завершен';
      case 'IN_PLAY':
        return 'В игре'
      case 'LIVE':
        return 'В прямом эфире';
      case 'PAUSED':
        return 'Пауза';
      case 'SCHEDULED':
        return `Запланирован`;
      case 'POSTPONED':
        return 'Отложен';
      case 'SUSPENDED':
        return 'Приостановлен';
      case 'CANCELLED':
        return 'Отменен';
      default:
        return status;
    }
  };

  const getScore = (score) => {
    if (!score || !score.fullTime) return '? : ?';
    
    const home = score.fullTime.home ?? score.halfTime.home ?? '?';
    const away = score.fullTime.away ?? score.halfTime.away ?? '?';
    
    return `${home} : ${away}`;
  };

  return (
    <div className="match-card" style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '12px',
        margin: '8px',
        backgroundColor: '#f9f9f9'
        }}>
      
      <div className="match-info" style={{ marginRight: '10px' }}>
        <span className="date">{matchDate} </span>
        <span>{matchTime} </span>
        <span className="match-status">{getMatchStatus(match.status, match.utcDate)} </span>
        <span className="team-name">{match.homeTeam?.name || 'Хозяева'} - {match.awayTeam?.name || 'Гости'} </span>
        <span className="score">{getScore(match.score)} </span>
      </div>
    </div>
  );
};

export default Match;