import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GridView from './views/GridView';
import CalendarView from './views/Calendar';
import Header from './components/Header'
import './App.css'

function App() {

  return (
     <Router>
      <div className="App">
        <Header />
        <main>
          <div style={{ marginTop: "4rem" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/leagues" replace />} />
            <Route path="/leagues" element={<GridView pageType="leagues" />} />
            <Route path="/teams" element={<GridView pageType="teams" />} />
            <Route path=":type/calendar/:id" element={<CalendarView />} />
          </Routes>
          </div>
        </main> 
      </div>
      
    </Router>
  )
}

export default App
