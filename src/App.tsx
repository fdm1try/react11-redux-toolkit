import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Search as SearchPage } from './pages/Search';
import { Movie as MoviePage } from './pages/Movie';
import { Favourites as FavouritesPage } from './pages/Favourites';

function App() {
  const navLinkClassName = ({ isActive } : { isActive: boolean }) => isActive ? 'nav__link active' : 'nav__link';

  return (
    <>
      <header>
        <nav className='nav'>
          <NavLink className={navLinkClassName} to='/'>Поиск</NavLink>
          <NavLink className={navLinkClassName} to='/favourites'>Избранное</NavLink>
        </nav>
      </header>
      <main className="App">
        <Routes>
          <Route path='/' index Component={SearchPage} />
          <Route path='/movie/:id' Component={MoviePage} />
          <Route path='/favourites' Component={FavouritesPage} />
        </Routes>
      </main>
    </>
  );
}

export default App;
