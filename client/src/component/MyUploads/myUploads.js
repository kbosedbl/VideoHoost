import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Button from '../Button';
import './myUploads.css';
import Navbar from '../Navbar/Navbar';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    //this.onSubmitHandler = this.onSubmitHandler.bind(this);
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
      videoList: []
    }
    this.deletevideo = this.deletevideo.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('userTokenTime')) {
      axios.get('http://127.0.0.1:3333/api/myUploads', {
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

  deletevideo = (video) => {
    //console.log(video);
    axios.get('/api/delete' , {
        uploader_name: video.uploader_name,
        upload_title: video.upload_title
      }).then(res => {
        this.state.videoList = res.data;
      });
  }

  render() {
    if (this.state.redirect) return <Redirect to="/signIn" />

    const videos = this.state.videoList.map(video => {
      //console.log(video);
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
          <span className="video-titole">{video.upload_title.replace(/_/g, ' ')}</span>
          <Button upload_title={video.upload_title} uploader_name={video.uploader_name} />
        </div>
      );
    });

    return (
      <React.Fragment>  
        <Navbar />      
        <div className="container mt-5">          
          <h4>Videos</h4>
          <hr className="my-4" />
          <div className="streams row">
            {videos}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
