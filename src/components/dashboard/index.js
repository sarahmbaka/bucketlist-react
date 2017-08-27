import React, { Component } from "react";
import { hashHistory } from  "react-router";
import Search from 'react-search'
import BucketlistCard from "../card/BucketListCard";
import "./search.css";
import "./dashboard.css";
import NewBucket from '../new_bucket'


class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
      bucketlists: [],
      token: ""
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
        //console.log("token", token);
        this.setState({
            token: token,
        },() => {
          this.fetchBucketlist();
        });
      }
    }
  }

  redirectTo(event, bucket_id, bucket_title){
    // event.preventDefault();
    console.log("redirecting")
    hashHistory.push({
                       pathname: "/bucketlists/" + bucket_id,
                       state: { title: bucket_title }
                   });
  }

  HiItems(items) {
     console.log(items)
   }


  getItemsAsync(searchValue, cb) {
    const _this = this;
    let url = `https://buckapi.herokuapp.com/bucketlist/?q=${searchValue}`
    fetch(url,{
      method: "GET",
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.state.token
      })
    }).then((resp) => resp.json())
    .then(function(results) {

      if(results != undefined){
        console.log("res", results);
        let items = results.map( (res, i) => { return { id: res.id, title: res.title ,description: res.description} })
        console.log("state", _this.state);
        _this.setState({ "bucketlists" : items })

      }
    });
  }

  fetchBucketlist(){
    const _this = this;

    const url = "https://buckapi.herokuapp.com/bucketlist/"
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
        console.log(data);
        _this.setState({
            "bucketlists": data.bucketlists
        });
      }).catch((err) => {
        console.error(err)
      })
  }

  render(){
      return(



        <div id="main">
          <Search items={this.state.repos}
              multiple={true}
              getItemsAsync={this.getItemsAsync.bind(this)}
              placeholder='Search your bucketlists' />
        <div className="inner">
          <header id="header">
            <h1 >Welcome, {this.props.location.state.username}</h1>
          </header>

            <div>
              <NewBucket />
                <BucketlistCard redirect={this.redirectTo} bucketlists={this.state.bucketlists}/>
            </div>
          </div>
        </div>
    
      )
    }
}

export default Dashboard;
