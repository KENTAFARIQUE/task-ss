const DatePicker = ({ dateFrom, dateTo, onDateFromChange, onDateToChange }) => {
  return (
    <div className="d-flex align-items-center gap-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  <label style={{ lineHeight: '1', marginTop: '-15px' }}>Матчи с</label>
  <input
    type="date"
    value={dateFrom}
    onChange={(e) => onDateFromChange(e.target.value)}
    max={dateTo}
    placeholder=" "
  />
</div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  <label style={{ lineHeight: '1', marginTop: '-15px' }}>по</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            min={dateFrom}
            placeholder=" "
          />
        </div>
    </div>
  );
};


export default DatePicker;