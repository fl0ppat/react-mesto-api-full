import React from "react";
import InfoTooltip from "./InfoTooltip";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipIsOpen: false,
      password: "",
      email: "",
      text: "",
      status: true,
      path: "",
    };
    this.handleCloseTooltip = this.handleCloseTooltip.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleDataForTooltip = this.handleDataForTooltip.bind(this);
    this.handleCloseRedirect = this.handleCloseRedirect.bind(this);
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

  handleCloseRedirect() {
    this.props.onSignIn(this.state.status);
    this.handleCloseTooltip();
  }

  loginUser(e) {
    e.preventDefault();
    this.props
      .handleLogin(this.state.password, this.state.email)
      .then((res) => {
        this.handleDataForTooltip(true, "Добро пожаловать!");
        this.props.onLogin(res.token);
        this.setState({ path: "/" });
        this.openTooltip(true, res);
      })
      .catch(() => {
        this.handleDataForTooltip(false, "Что-то пошло не так! Попробуйте ещё раз.");
        this.setState({ path: "/sign-in" });
        this.openTooltip();
      });
  }

  render() {
    return (
      <>
        <InfoTooltip
          isOpen={this.state.tooltipIsOpen}
          onClose={this.handleCloseRedirect}
          status={this.state.status}
          text={this.state.text}
          path={this.state.path}
        />
        <form className="sign-form" onSubmit={(e) => this.loginUser(e)}>
          <h3 className="sign-form__title">Войти</h3>
          <input
            className="sign-form__input"
            onChange={this.handleEmailChange}
            value={this.state.email}
            type="email"
            placeholder="Почта"
            required
          />
          <input
            className="sign-form__input"
            onChange={this.handlePasswordChange}
            value={this.statepassword}
            type="password"
            placeholder="Пароль"
            required
          />
          <input className="sign-form__submit" type="submit" value="Войти" />
        </form>
      </>
    );
  }
}

export default Login;
