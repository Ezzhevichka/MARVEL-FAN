import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Characters, Comics, Favorites } from '../pages';
import styles from './Main.module.css';

const Main = () => (
  <main className={styles.main}>
    <Switch>
      <Route exact path="/">
        <Redirect to="/characters" />
      </Route>
      <Route exact path="/characters">
        <Characters />
      </Route>
      <Route exact path="/comics">
        <Comics />
      </Route>
      <Route exact path="/favorites">
        <Favorites />
      </Route>
    </Switch>
  </main>
);

export default Main;
