const DatePicker = ({ dateFrom, dateTo, onDateFromChange, onDateToChange }) => {
  return (
    <div>
      <div>
        <div>
          <label>С:</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            max={dateTo}
          />
        </div>
        
        <div>
          <label>По:</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            min={dateFrom}
          />
        </div>
      </div>
    </div>
  );
};


export default DatePicker;