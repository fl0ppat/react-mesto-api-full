import React from 'react';
import {
  withRouter, Link, Switch, Route,
} from 'react-router-dom';
import logo from '../images/header-logo.svg';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <a href="/" className="header__logo-link">
          <img src={logo} alt="Логотип" className="header__logo-img" />
        </a>
        <Switch>
          <Route path="/cards">
            <p className="header__usermail">
              {this.props.email}
              <Link onClick={() => this.props.onSignOut()} className="header__link" to="/sign-in">
                Выйти
              </Link>
            </p>
          </Route>
          <Route path="/sign-in">
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          </Route>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          </Route>
        </Switch>
      </header>
    );
  }
}

export default withRouter(Header);
