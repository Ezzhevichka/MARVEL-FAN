import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import styles from './Header.module.css';

const navs = [
  { path: '/characters', name: 'Characters', id: 1 },
  { path: '/comics', name: 'Comics', id: 2 },
  { path: '/favorites', name: 'Favorites', id: 3 },
];

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const setStickyClassName = () => setSticky(window.scrollY > sticky);
  useEffect(() => {
    window.addEventListener('scroll', setStickyClassName);

    return () => window.removeEventListener('scroll', setStickyClassName);
  });

  return (
    <header className={`${styles.header} ${sticky ? styles.sticky : null}`}>
      <NavLink exact to="/characters" className={styles.logo}>Marvel-FAN</NavLink>
      <div className={styles.hamburger}>
        <Hamburger toggled={isOpen} toggle={setOpen} rounded size={24} />
      </div>
      <nav className={styles.nav}>
        <ul className={`${styles.ul} ${isOpen ? styles.active : null}`}>
          {navs.map((navItem) => (
            <li key={navItem.id}>
              <NavLink
                exact
                to={navItem.path}
                activeClassName={styles.active__link}
                onClick={() => setOpen()}
              >
                {navItem.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
