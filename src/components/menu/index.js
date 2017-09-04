import React, { Component } from 'react';
import { Link, browserHistory } from "react-router";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import "./menu.css";


class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};

    this.LogOut = this.LogOut.bind(this);
  }

  handleToggle = () => this.setState({open: !this.state.open});

  LogOut(){

    localStorage.removeItem("buckapi_token");
    browserHistory.push({
                       pathname: "/login"
                   });
  }
  render() {
    return (
      <div className="inner">


        <a className="logo"><img  src={process.env.PUBLIC_URL + "/images/menu.svg"} alt="" onClick={this.handleToggle}/></a>
        <Drawer docked={false} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
          <Link to="/dashboard" activeClassName="active"><MenuItem>Dashboard</MenuItem></Link>
          <Link to="/login" activeClassName="active"><MenuItem>Login</MenuItem></Link>
          <Link to="/register" activeClassName="active"><MenuItem>Register</MenuItem></Link>
          <MenuItem onClick={this.LogOut} >Log Out</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default Menu;
