import React, {Component} from 'react';
import './header.css';
import path4534 from '../../images/path4534.svg'
import path2 from '../../images/path2.svg'
import { Link } from "react-router-dom";


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFlag: true,
    };
  }

  search = () => {
    !this.state.searchFlag && this.setState({searchFlag: true})
  };

  myList = () => {
    this.state.searchFlag && this.setState({searchFlag: false})
  };


  render() {
    return (
      <div className="background">
        <div className="header">
          <div className="logo">
            <div className="logo__img">
              <img className="github-logo" src={path2} alt="path2"/>
              <img className="magnifier-handle" src={path4534} alt="path4534"/>
            </div>
            <div className="logo__text">
              <h4>GitHub</h4>
              <p>search</p>
            </div>
          </div>
          <div className="nav-bar">
            <div className="nav__search">
              <Link to="/search" onClick={this.search}><span className={this.state.searchFlag? 'active': ''}>Search</span></Link>
            </div>
            <div className=" nav__my-list">
              <Link to="/my-list" onClick={this.myList}><span className={!this.state.searchFlag? 'active': ''}>My List</span></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header