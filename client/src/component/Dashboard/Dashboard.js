import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import SearchBox from '../SearchBox/searchBox';
import './Dashboard.css';
import Navbar from '../Navbar/Navbar';
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    let shouldRedirect = false;
    if (localStorage.getItem('userTokenTime')) {
      // Check if user holds token which is valid in accordance to time
      const data = JSON.parse(localStorage.getItem('userTokenTime'));
      if (new Date().getTime() - data.time > (1 * 60 * 60 * 1000)) {
        // It's been more than hour since you have visited dashboard
        localStorage.removeItem('userTokenTime');
        shouldRedirect = true;
      }
    } else {
      shouldRedirect = true;
    }

    this.state = {
      redirect: shouldRedirect,
      videoList: [],
      searchField: ''
    }
  }

  onSearchChange =(event) => {
    this.setState({searchField: event.target.value});   
  }

  componentDidMount() {
    if (localStorage.getItem('userTokenTime')) {
      axios.get('http://127.0.0.1:3333/api/videoList', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
        }
      }).then(res => {
        this.setState({
          videoList: res.data
        });
      });
    }
  }

  render() {
    if (this.state.redirect) return <Redirect to="/signIn" />

    const filteredVideos = this.state.videoList.filter(videoList =>{      
      return videoList.upload_title.toLowerCase().includes(this.state.searchField.toLowerCase());
    });
    console.log(filteredVideos);

    const videos2 = filteredVideos.map(video => {
      return (
        <div className="video col-xs-12 col-sm-12 col-md-3 col-lg-4" key={video._id}>
          <Link to={'/video/' + video.upload_title}>
            <div className="video-thumbnail">
              <img src={video.thumbnail_path} alt="video thubmnail" />
            </div>
          </Link>
          <span className="username">
            <Link to={'/api/videos/' + video.upload_title}>
              {video.uploader_name}
            </Link>
          </span>
          <span className="video-title">{video.upload_title.replace(/_/g, ' ')}</span>
        </div>
      );
    });



    return (
      <React.Fragment>  
        <Navbar />      
        <div className="container mt-5">
          <SearchBox searchChange={this.onSearchChange}/>        
          <br/>
          <br/>
          <div className="streams row">
            {videos2}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;