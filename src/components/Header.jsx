import { useNavigate } from 'react-router';
import './Header.css'


function Header() {
  const navigate = useNavigate();

  return (  
      <header className="header">
          <div className="logo">
            <svg viewBox="0 0 1e3 328" xmlns="http://www.w3.org/2000/svg">
            <path d="m283 0h104v327h-104m-283-327h253l-26 72h-123v66h99l-26 72h-73v118h-104m456-328h253l-26 72h-123v66h99l-26 72h-73v118h-104m319-328-119 328h101l13-43h116l13 43h101l-119-328m-53 87 39 133h-78" fill="#005591"/>
            </svg>
          </div> 
          <div className="d-flex gap-4">
    <button 
            className="bg-transparent border-0 px-1 position-relative text-black"
            style={{ fontSize: '18px' }}
            onClick={() => navigate('/leagues')}
          >
            Лиги
           {location.pathname.includes('leagues') && (
              <div 
                className="position-absolute start-0 w-100" 
                style={{ 
                  bottom: 0, 
                  height: '3px', 
                  backgroundColor: '#0d6efd',
                }}
              />
            )}
          </button>

          <button 
            className="bg-transparent border-0 px-1 position-relative text-black"
            style={{ fontSize: '18px' }}
            onClick={() => navigate('/teams')}
          >
            Команды
            {location.pathname.includes('teams') && (
              <div 
                className="position-absolute start-0 w-100" 
                style={{ 
                  bottom: 0, 
                  height: '3px', 
                  backgroundColor: '#0d6efd',
                }}
              />
            )}
          </button>
  </div>
      </header>
  )
}

export default Header
