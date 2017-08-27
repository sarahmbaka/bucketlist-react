import React, { Component } from "react";
import "./dashboard.css";
import BuckItems from '../itemsview';
import NewBucketitem from '../new_bucketitem';
import EditBucket from '../editbucket'
import DeleteBucket from '../deleteBucket'

class Items extends Component{
  constructor(props){
    super(props);
    this.state = {
      items: [],
      token: "",
      name: ""
    }
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
        console.log("token", this.props);
        this.setState({
            token: token,
        },() => {
          //console.log(this.props);
          this.fetchBucketlistitems();
        });
      }
    }
  }

  fetchBucketlistitems(){
    console.log(this.props);
    const _this = this;
    const bucket_id = this.props.params.id;
    const url = `https://buckapi.herokuapp.com/bucketlist/${bucket_id}/items/`
    fetch(url, {
      method: "GET",
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.state.token
      })
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        // Create and append the li's to the ul\
        console.log(data.items);
        _this.setState({
            "items": data.items
        });
      }).catch((err) => {
        console.error(err)
      })
  }

  render(){
      return(
        <div id="main">
          <div className="inner">
            <header id="header">
              <h1 >Welcome, Mbaka</h1>
                <h1 >{this.props.location.state.title}</h1>
            </header>
            <div>
                <NewBucketitem bucket_id={this.props.params.id}/>

                  <ul className="icons">
                    <li><EditBucket bucket_id={this.props.params.id} /></li>
                    <li><DeleteBucket bucket_id={this.props.params.id}/></li>
                  </ul>
  
                <BuckItems items={this.state.items} bucket_id={this.props.params.id}/>
            </div>
          </div>
        </div>
      )
    }
}

export default Items;
