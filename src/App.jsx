import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GridView from './views/GridView';
import CalendarView from './views/Calendar';
import Header from './components/Header'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
     <Router>
      <div className="App">
        <Header />
        <main className="content container-fluid container-md container-lg container-xl mt-header">
          <Routes>
            <Route path="/leagues" element={<GridView pageType="leagues" />} />
            <Route path="/teams" element={<GridView pageType="teams" />} />
            <Route path=":type/calendar/:id" element={<CalendarView />} />
          </Routes>
        </main> 
      </div>
    </Router>
  )
}

export default App
