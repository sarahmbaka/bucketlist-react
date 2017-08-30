import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { browserHistory } from "react-router";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class NewBucketitem extends Component {
  constructor(props){
      super(props);
      // default state
      this.state = {
        "name": "",
        "description": "",
        "error": "",
        "open": false,
        "token": ""
      }
      /* by default in the function scope, this refers to the function scope
        we need to bind the this object to the function in order to change
        the value of inside the function scope
       */
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePassChange = this.handlePassChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleNameChange(event){
    // update the state with new value from input
    this.setState({
      name: event.target.value
    });

  }

  handlePassChange(event){
    // update the state with new value from input
    this.setState({
      description: event.target.value
    });
  }

  handleSubmit(event){
    // prevent the default browser action
    event.preventDefault();

    if (this.state.name === "" || this.state.description === "") {
        // error empty inputs
    }
    this.addbucketlist();
  }

  componentDidMount(){
    if(typeof(localStorage) !==  undefined){
      // store the token
      const token = localStorage.getItem("buckapi_token");
      if (token === null) {
        alert("token not found, please login again");
        // redirect to login
      }
      else {
        console.log("id ", this.props);
        this.setState({
            token: token,
        });
      }
    }
  }

  // make request to the api
  addbucketlist(){
  const _this = this;
  const bucket_id = this.props.bucket_id;
  const url = `https://buckapi.herokuapp.com/bucketlist/${bucket_id}/items/`
  fetch(url, {
      method: "POST",
      body: JSON.stringify(this.state),
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.state.token
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
          // store token in the browser localStorage


          browserHistory.push("/items");
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

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
      <a className="logo">
        <span className="symbol"><img src={process.env.PUBLIC_URL + "/images/add.svg"} onClick={this.handleOpen} className="App-logo" alt="Logo " /></span>
      </a>

        <Dialog
          title="New Bucketlist Item"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div>
              <form method="POST" action="">
                <div className="error">
               </div>
                <div>
                  <TextField
                      name="name"
                      hintText="Name"
                      onChange={this.handleNameChange} />
                </div>
                <div>
                  <TextField
                      type="Description"
                      name="description"
                      hintText="Description"
                      onChange={this.handlePassChange} />
                </div>
                <FlatButton
                    label="ADD"
                    type="submit"
                    onClick={this.handleSubmit} />
              </form>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default NewBucketitem
