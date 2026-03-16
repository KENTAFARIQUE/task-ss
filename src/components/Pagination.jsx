const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 6;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 3);
      
      if (end - start + 1 < maxVisible) {
        if (start === 1) {
          end = Math.min(totalPages, start + maxVisible - 1);
        } else if (end === totalPages) {
          start = Math.max(1, end - maxVisible + 1);
        }
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (start > 1) {
        pages.unshift('...');
      }
      if (end < totalPages) {
        pages.push('...');
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Page navigation" className="d-flex justify-content-center mt-4">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button 
            className="page-link text-dark border-0 bg-transparent rounded-2"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous"
          >
            <span aria-hidden="true">&#060;</span>
          </button>
        </li>
        
        {getPageNumbers().map((page, index) => (
          <li 
            key={index} 
            className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
          >
            <button
              className={`page-link border-0 rounded-2 ${
                page === currentPage 
                  ? 'bg-primary text-white mx-2 fw-bold' 
                  : 'bg-transparent text-dark'
              }`}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              style={{ 
                width: '40px', 
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
              }}
            >
              {page}
            </button>
          </li>
        ))}
        
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}  border-0`}>
          <button 
            className="page-link text-dark border-0 bg-transparent rounded-2" 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next"
          >
            <span aria-hidden="true">&#062;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;