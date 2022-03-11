import { Routes, Route, Link } from 'react-router-dom'
import Stock from './pages/Stock'
import Group from './pages/Group'
import Expected from './pages/Expected'
import User from './pages/User'
import './App.css'

function App() {
  return (
    <div className="app">
      <nav>
        <button className= "theme">
          <Link to="/stock" className='none'>Stock</Link>
        </button>
        <button className="theme">
          <Link to="/group" className='none'>Group</Link>
        </button>
        <button className="theme">
          <Link to="/expected" className='none'>Expected</Link>
        </button>
        <button className="theme">
          <Link to="/user" className='none'>User</Link>
        </button>
      </nav>

      <Routes>
        <Route path="/stock" element={<Stock />} />
        <Route path="/group" element={<Group />} />
        <Route path="/expected" element={<Expected />} />
        <Route path="/user" element={<User />} />
      </Routes>

    </div>
  )
}

export default App;
