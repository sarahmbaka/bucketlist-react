import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { hashHistory } from "react-router";


/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class DeleteBucket extends Component {
  constructor(props){
    super(props);
    // default state
    this.state = {
      "open": false,
      "erroropen": false,
      "token": "",
      "dialog_msg": "Are you sure you want to delete this Item?",
      "items": []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.deletebucketlist = this.deletebucketlist.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen = (event) => {
    event.preventDefault()
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSubmit(event, bucket_id){
    // prevent the default browser action
    event.preventDefault();

    if (this.state.name === "" || this.state.description === "") {
        // error empty inputs
    }
    this.deletebucketlist(bucket_id);
    this.setState({open: false});
  }
  componentDidMount(){
    if(typeof(localStorage) !==  undefined){
      // store the token
        const token = localStorage.getItem("buckapi_token");
        if (token === null) {
          alert("token not found, please login again");
        }
        else {
          //console.log("token", token);
          this.setState({
              token: token,
          });
        }
      }
    }

    // make request to the api
    deletebucketlist(bucket_id){

      const _this = this;
      const url = `https://buckapi.herokuapp.com/bucketlist/${bucket_id}`;
      fetch(url, {
          method: "DELETE",
          mode: 'cors',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.state.token
          })
       })
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
        // Create and append the li's to the ul
        console.log(data);
          if(data.status === "success"){
            // login was successful
            _this.setState({
              dialog_msg: data.message,
              open: true
            })

              hashHistory.push("/dashboard");
          }
          else{
            _this.setState({
              error: data.message,
              // open: true
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
        label="OK"
        primary={true}
        keyboardFocused={true}
        onClick={(event) => this.handleSubmit(event, this.props.bucket_id)} />

    ];

    return (
      <div>
        <span className="symbol"><img src={process.env.PUBLIC_URL + "/images/delete.svg"} onClick={(event) => this.handleOpen(event)}  /></span>

        <Dialog
          title="Edit Bucketlist"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >


        <p> {this.state.dialog_msg}  </p>


        </Dialog>

      </div>
    );
  }
}

export default DeleteBucket
