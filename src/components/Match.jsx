const Match = ({ match }) => {
  const formatDateTime = (dateString) => {
    if (!dateString) return ['Дата не указана', 'Время не указано'];
    
      const date = new Date(dateString);
    

    const formattedDate = date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).split('.').join('.'); 
    

    const formattedTime = date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    
    return [formattedDate, formattedTime];
  };
  const [matchDate, matchTime] = formatDateTime(match.utcDate);

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
    <div className="match-info-desktop d-none d-sm-flex align-items-center w-100" style={{ gap: '5px' }}>
      <span className="date" style={{ minWidth: '85px' }}>{matchDate}</span>
      <span style={{ minWidth: '50px' }}>{matchTime}</span>
      <span className="match-status text-nowrap" style={{ minWidth: '80px' }}>{getMatchStatus(match.status, match.utcDate)}</span>
      <span className="team-name flex-grow-1 text-start">
        {match.homeTeam?.name || 'Команда А'} - {match.awayTeam?.name || 'Команда Б'}
      </span>
      <span className="score text-end" style={{ minWidth: '80px' }}>{getScore(match.score)}</span>
    </div>
    
    <div className="match-info-mobile d-sm-none">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center" style={{ gap: '8px' }}>
          <span className="date">{matchDate}</span>
          <span>{matchTime}</span>
          <span className="match-status text-nowrap">{getMatchStatus(match.status, match.utcDate)}</span>
        </div>
        <span className="score">{getScore(match.score)}</span>
      </div>
      <div className="team-name text-center small" style={{ 
        wordBreak: 'break-word',
        lineHeight: '1.3'
      }}>
        {match.homeTeam?.name || 'Команда А'} — {match.awayTeam?.name || 'Команда Б'}
      </div>
    </div>
  </div>
);
};

export default Match;