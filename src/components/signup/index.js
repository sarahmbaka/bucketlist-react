import React, { Component } from "react";
import { hashHistory } from "react-router";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import "./signup.css"

class SignUp extends Component{
  constructor(props){
      super(props);
      // default state
      this.state = {
        "username": "",
        "password": "",
        "error": "",
        "email": "",
        "open": false
      }
      /* by default in the function scope, this refers to the function scope
        we need to bind the this object to the function in order to change
        the value of inside the function scope
       */
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePassChange = this.handlePassChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleNameChange(event){
    // update the state with new value from input
    this.setState({
      username: event.target.value
    });

  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleEmailChange(event){
    // update the state with new value from input
    this.setState({
      email: event.target.value
    });

  };

  handlePassChange(event){
    // update the state with new value from input
    this.setState({
      password: event.target.value
    });
  };

  handleSubmit(event){
    // prevent the default browser action
    event.preventDefault();

    if (this.state.username === "" || this.state.password === "" || this.state.email) {
        // error empty inputs
    this.signup();
    this.state.open = false;
    }
  };

    // make request to the api
    signup(){
    const _this = this;
    const url = "https://buckapi.herokuapp.com/auth/register"
    fetch(url, {
        method: "POST",
        body: JSON.stringify(this.state),
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
     })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
      // Create and append the li's to the ul
        // _this.setState({
        //     "response": data
        // })
        console.log(data);
        if(data.status === "success"){
          // login was successful
            alert(data.message);
            _this.setState({
              error: ""
            })
              hashHistory.push("/login");
            // store token in the browser localStorage

            if(typeof(localStorage) !==  undefined){
              // store the token
                localStorage.setItem("buckapi_token", data.auth_token)
            }
            // redirect to dashboard

        }
        else{
          _this.setState({
            error: data.message,
            open: true
          })
        }
    }).catch((err) =>{
        console.error(err)
    })
  }

  render(){
    const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="Discard"
            primary={true}
            onTouchTap={this.handleClose}
          />,
        ];
    return(
      <div>
          <section className="tiles">
              <article className="style7">
                <span className="image">
                  <img src={ process.env.PUBLIC_URL + "/images/pic13.jpg"} alt="" />
                </span>
                <a>
                <h2> BucketList </h2>
                <div className="content">
                  <h4> Sign Up</h4>
                      <form method="POST" action="">
                        <div className="error">
                          <Dialog
                            actions={actions}
                            modal={false}
                            open={this.state.open}
                            onRequestClose={this.handleClose}
                          >
                            {this.state.error !== "" && this.state.error}
                          </Dialog>
                       </div>
                        <div>
                          <TextField
                              name="username"
                              hintText="username"
                              onChange={this.handleNameChange} />
                        </div>
                        <div>
                          <TextField
                              name="email"
                              hintText="Email"
                              onChange={this.handleEmailChange} />
                        </div>
                        <div>
                          <TextField
                              type="password"
                              name="password"
                              hintText="password"
                              onChange={this.handlePassChange} />
                        </div>
                        <FlatButton
                            label="Sign Up"
                            type="submit"
                            onClick={this.handleSubmit} />
                      </form>
                </div>
              </a>
              </article>
            </section>
      </div>
    );
  }
}

export default SignUp;
