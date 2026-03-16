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
        padding: '12px',
        backgroundColor: '#f9f9f9',
        width: "100%"
        }}>
      
      <div className="match-info d-flex align-items-center w-100" style={{ gap: '5px' }}>
  <span className="date" style={{ minWidth: '85px' }}>{matchDate}</span>
  <span style={{ minWidth: '50px' }}>{matchTime}</span>
  <span className="match-status text-nowrap" style={{ minWidth: '80px' }}>{getMatchStatus(match.status, match.utcDate)}</span>
  <span className="team-name flex-grow-1 text-start">
    {match.homeTeam?.name || 'Команда А'} - {match.awayTeam?.name || 'Команда Б'}
  </span>
  <span className="score text-end" style={{ minWidth: '80px' }}>{getScore(match.score)}</span>
</div>
    </div>
  );
};

export default Match;