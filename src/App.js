import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Nav from './components/Nav';
import Movies from './pages/Movies';
import Movie from './pages/Movie';

function App() {
  return (
    <div className='App'>
      <Nav />

      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/search' element={<Movies />} />
        <Route path='/search/:id' element={<Movie />} />
        <Route path='*' element={<Navigate to='/home' />} />
      </Routes>
    </div>
  );
}

export default App;
