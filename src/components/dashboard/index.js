import React, {Component} from "react";
import {browserHistory} from "react-router";
import Search from 'react-search'
import Pagination from 'material-ui-pagination';
import BucketlistCard from "../card/BucketListCard";
import "./search.css";
import "./dashboard.css";
import NewBucket from '../new_bucket'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bucketlists: [],
      token: "",
      error: "",
      open: false,
      total: 5,
      display: 2,
      page: 1
    }

    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    if (typeof(localStorage) !== undefined) {
      const token = localStorage.getItem("buckapi_token");
      if (token === null) {
        this.setState({error: "token not found, please login again", open: true})
      } else {
        this.setState({
          token: token
        }, () => {
          this.fetchBucketlist();
        });
      }
    }
  }
  handleClose = () => {
    this.setState({open: false});
  };

  redirectTo(event, bucket_id, bucket_title) {
    browserHistory.push({
      pathname: "/bucketlists/" + bucket_id,
      state: {
        title: bucket_title
      }
    });
  }

  HiItems(items) {
    console.log(items)
  }

  handlePageChange(number) {
    const _this = this;
    _this.setState({page: number}
      , () => {
        this.fetchBucketlist();
      });
  }

  getItemsAsync(searchValue, cb) {
    const _this = this;
    if (searchValue === '') {
      searchValue = ' '
    }
    let url = `https://buckapi.herokuapp.com/bucketlist/?q=${searchValue}`
    fetch(url, {
      method: "GET",
      mode: 'cors',
      headers: new Headers({'Content-Type': 'application/json', 'Authorization': this.state.token})
    }).then((resp) => resp.json()).then(function(results) {

      if (results != undefined) {
        console.log("res", results);
        let items = results.map((res, i) => {
          return {id: res.id, title: res.title, description: res.description}
        })
        _this.setState({"bucketlists": items})

      }
    });
  }

  fetchBucketlist() {
    const _this = this;

    const url = `https://buckapi.herokuapp.com/bucketlist/?limit=3&page=${_this.state.page}`
    fetch(url, {
      method: "GET",
      mode: 'cors',
      headers: new Headers({'Content-Type': 'application/json', 'Authorization': this.state.token})
    }).then((resp) => resp.json()). // Transform the data into json
    then(function(data) {
      console.log(data);
      _this.setState(
        {
          "bucketlists": data.bucketlists,
          "total": data.total
        }
      );
    }).catch((err) => {
      console.error(err)
    })
  }

  render() {
    const actions = [< FlatButton label = "Discard" primary = {
        true
      }
      onTouchTap = {
        this.handleClose
      } />];
    return (

      <div id="main">
        <Search items={this.state.repos} multiple={true} getItemsAsync={this.getItemsAsync.bind(this)} placeholder='Search your bucketlists'/>
        <div className="inner">
          <header id="header">
            <h1 >Welcome, {this.props.location.state.username}</h1>
          </header>
          <Dialog actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}>
            {this.state.error !== "" && this.state.error}
          </Dialog>
          <div>
            <NewBucket/>
            <BucketlistCard redirect={this.redirectTo} bucketlists={this.state.bucketlists}/>
            <Pagination
          total = { this.state.total }
          current = { this.state.number }
          display = { this.state.display }
          onChange = { this.handlePageChange }
        />
          </div>
        </div>
      </div>

    )
  }
}

export default Dashboard;
