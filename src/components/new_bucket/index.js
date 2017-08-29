import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';



class NewBucket extends Component {
  constructor(props){
      super(props);
      this.state = {
        "name": "",
        "description": "",
        "error": "",
        "open": false,
        "_open": false,
        "token": ""
      }
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleDescChange = this.handleDescChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {

    this.setState({open: false});
    this.setState({_open: false});
  };

  handleNameChange(event){

    this.setState({
      name: event.target.value
    });

  }

  handleDescChange(event){

    this.setState({
      description: event.target.value
    });
  }

  handleSubmit(event){

    event.preventDefault();
    this.setState({
      open: false
    });
    if (this.state.name === "" || this.state.description === "") {

    }
    this.addbucketlist();
  }

  componentDidMount(){
    if(typeof(localStorage) !==  undefined){
      // store the token
      const token = localStorage.getItem("buckapi_token");
      if (token === null) {
        alert("token not found, please login again");
      }
      else {
        console.log("token", token);
        this.setState({
            token: token,
        });
      }
    }
  }


  addbucketlist(){
  const _this = this;
  const url = "https://buckapi.herokuapp.com/bucketlist/"
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
      if(data.status === "fail"){
          _this.setState({
            error: data.message,
            _open: true
          });
      }
      else{
        _this.setState({
          error: data.message,
          _open: true
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
        onClick={this.handleSubmit}
      />,
    ];
    const action = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
      <a className="logo">
        <span className="symbol"><img src={process.env.PUBLIC_URL + "/images/add.svg"} onClick={this.handleOpen} className="App-logo" alt="Logo " /></span><span className="title"></span>
      </a>
      <Dialog
        actions={action}
        modal={false}
        open={this.state._open}
        onRequestClose={this.handleClose}
      >
        {this.state.error !== "" && this.state.error}
      </Dialog>
        <Dialog
          title="New Bucketlist"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
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
          </form>
        </Dialog>
      </div>
    );
  }
}

export default NewBucket
