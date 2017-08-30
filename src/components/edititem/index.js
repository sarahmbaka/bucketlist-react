import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { browserHistory } from "react-router";


/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class EditItem extends Component {
  constructor(props){
    super(props);
    // default state
    this.state = {
      "open": false,
      "erroropen": false,
      "token": "",
      "items": []
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatebucketlist = this.updatebucketlist.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen = (event) => {
    event.preventDefault()
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

  handleSubmit(event, bucket_id, item_id){
    // prevent the default browser action
    event.preventDefault();

    if (this.state.name === "" || this.state.description === "") {
        // error empty inputs
    }
    this.updatebucketlist(bucket_id, item_id);
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
    updatebucketlist(bucket_id, item_id){

      const _this = this;
      const url = `https://buckapi.herokuapp.com/bucketlist/${bucket_id}/items/${item_id}`;
      fetch(url, {
          method: "PUT",
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
        console.log(data);
          if(data.status === "success"){
            // login was successful
              _this.setState({
                item: data.items
              })
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
        label="Save"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Edit Bucketlist"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

          <form method="POST" action="">
            <div>
              <TextField
                  name="name"
                  hintText="name"
                  onChange={this.handleNameChange}/>
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
                onClick={(event) => this.handleSubmit(event, this.props.bucket_id, this.props.item_id)} />
          </form>


        </Dialog>
        <span className="symbol"><img src={process.env.PUBLIC_URL + "/images/edit.svg"} onClick={(event) => this.handleOpen(event)}  /></span>
      </div>
    );
  }
}

export default EditItem
