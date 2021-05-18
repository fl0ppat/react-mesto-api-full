import React from 'react';
import { Link } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipIsOpen: false,
      password: '',
      email: '',
      text: '',
      status: '',
      path: '',
    };
    this.handleCloseTooltip = this.handleCloseTooltip.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleDataForTooltip = this.handleDataForTooltip.bind(this);
  }

  openTooltip() {
    this.setState({ tooltipIsOpen: true });
  }

  handleCloseTooltip() {
    this.setState({ tooltipIsOpen: false });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleDataForTooltip(cond, content) {
    this.setState({ status: cond, text: content });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  registerUser(e) {
    e.preventDefault();
    this.props
      .handleRegister(this.state.password, this.state.email)
      .then((res) => {
        this.handleDataForTooltip(true, 'Вы успешно зарегистрировались!');
        this.setState({ path: '/sign-in' });
        this.openTooltip(true, res);
      })
      .catch(() => {
        this.handleDataForTooltip(false, 'Что-то пошло не так! Попробуйте ещё раз.');
        this.setState({ path: '/sign-up' });
        this.openTooltip();
      });
  }

  render() {
    return (
      <>
        <InfoTooltip
          isOpen={this.state.tooltipIsOpen}
          onClose={this.handleCloseTooltip}
          status={this.state.status}
          text={this.state.text}
          path={this.state.path}
        />
        <form onSubmit={(e) => this.registerUser(e)} className="sign-form">
          <h3 className="sign-form__title">Регистрация</h3>
          <input
            className="sign-form__input"
            onChange={this.handleEmailChange}
            value={this.state.email}
            type="email"
            placeholder="Почта"
          />
          <input
            className="sign-form__input"
            onChange={this.handlePasswordChange}
            value={this.state.password}
            type="password"
            placeholder="Пароль"
          />
          <input className="sign-form__submit" type="submit" value="Зарегистрироваться" />
          <Link className="sign-form__link" to="/sign-in">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </>
    );
  }
}

export default Register;
