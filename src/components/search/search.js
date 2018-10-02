import React, {Component} from 'react';
import './search.css';
import tile from '../../images/tile.svg';
import lineDark from '../../images/line-dark.svg';
import tileDark from '../../images/tile-dark.svg';
import line from '../../images/line.svg';
import axios from 'axios'
import LineView from '../lineView/lineView'
import TileView from '../tileView/tileView'

class Search extends Component {
  type = 'Repositories';
  searchText = '';
  language = 'JavaScript';

  constructor(props) {
    super(props);
    this.state = {
      repositories: [],
      notFoundFlag: true,
      errorFlag: false
    };
  }

  parsToRepo = (items) => {
    return items.map(item => {
      return {
        id: item.id,
        full_name: item.full_name,
        description: item.description,
        stargazers_count: Math.floor(item.stargazers_count / 1000),
        language: item.language,
        topics: item.topics,
        url: item.html_url,
        checked: !!this.props.myRepositories.find((element) => element.id === item.id)
      };
    });
  };

  createReqUrl = () => {
    return `https://api.github.com/search/${this.type.toLowerCase()}?q=${this.searchText}`
      + `language:${this.language.toLowerCase()}&sort=stars&order=desc`;
  };

  clickOnCheckbox = (id) => {
    const newReps = this.state.repositories.map((item) => {
      if (item.id === parseInt(id, 10)) {
        item.checked = !item.checked;
        if (item.checked) {
          this.props.addRepository(item);
        } else {
          this.props.removeRepository(item.id);
        }
      }
      return item;
    });
    this.setState({repositories: newReps})
  };

  searchRepositories = () => {
    if (!this.searchText.length) {
      this.setState({errorFlag: true});
      return false;
    }
    const url = this.createReqUrl();
    const options = {
      method: 'get',
      headers: {'Accept': 'application/vnd.github.mercy-preview+json'},
      url,
    };

    axios(options)
      .then((res) => {
        this.setState({
          repositories: this.parsToRepo(res.data.items),
          notFoundFlag: !res.data.items.length
        })
      })
      .catch((error) => {
        console.log('err', error);
      });
  };

  changeDT = (event) => {
    this.props.changeDisplayType();
  };

  changeLanguage = (event) => {
    this.language = event.target.value;
  };

  changeSearchText = (event) => {
    this.searchText = event.target.value;
  };

  removeError = () => {
    this.setState({errorFlag: false});
  };

  render() {
    const lineElem = <div className="mapping-type">
      <img className="pointer" onClick={this.changeDT} src={tile} alt="tile"/>
      <img src={lineDark} alt="lineDark"/>
    </div>;

    const tileElem = <div className="mapping-type">
      <img src={tileDark} alt="tileDark"/>
      <img className="pointer" onClick={this.changeDT} src={line} alt="line"/>
    </div>;

    const lineView = <LineView
      repositories={this.state.repositories}
      clickOnCheckbox={this.clickOnCheckbox}
    />;

    const tileView = <TileView
      repositories={this.state.repositories}
      clickOnCheckbox={this.clickOnCheckbox}
    />;

    let mappingType = this.props.displayType ? lineElem : tileElem;
    let viewType = this.props.displayType ? lineView : tileView;

    return (
      <div>
        <div className="search">
          <div className="filter">
            <div className="type">
              <select>
                <option>Repositories</option>
              </select>
            </div>
            <div className="language" onChange={this.changeLanguage}>
              <select>
                <option>JavaScript</option>
                <option>css</option>
                <option>html</option>
                <option>php</option>
                <option>ruby</option>
                <option>c++</option>
                <option>python</option>
                <option>c#</option>
                <option>java</option>
                <option>go</option>
                <option>haskel</option>
              </select>
            </div>
            <div className="search-input">
              <label form="search-input">Type here for search</label>
              <input className={this.state.errorFlag ? 'reb-border' : ''} id="search-input" type="text"
                     onChange={this.changeSearchText}
                     onFocus={this.removeError}
              />
              <div style={this.state.errorFlag ? {} : {display: 'none'}} className="error search-error">
                <span>Please fill out the form completely!</span>
              </div>
            </div>
            <button className="search-btn" type="submit" onClick={this.searchRepositories}>SEARCH</button>
          </div>
          {mappingType}
          <div style={!this.state.notFoundFlag ? {display: 'none'} : {}} className="without-repository">
            <h4>NO RESULTS FOUND</h4>
            <p>select other parameters and try again</p>
          </div>
          {viewType}
        </div>
      </div>
    );
  }
}

export default Search