import React, { Component } from 'react';
import { Link } from "react-router";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import "./menu.css";


class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div className="inner">


        <a className="logo"><img  src={process.env.PUBLIC_URL + "/images/logo.svg"} alt="" onClick={this.handleToggle}/></a>
        <Drawer docked={false} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
          <Link to="/dashboard" activeClassName="active"><MenuItem>Dashboard</MenuItem></Link>
          <Link to="/login" activeClassName="active"><MenuItem>Login</MenuItem></Link>
          <Link to="/register" activeClassName="active"><MenuItem>Register</MenuItem></Link>
        </Drawer>
      </div>
    );
  }
}

export default Menu;
