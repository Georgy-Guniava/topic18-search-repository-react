import React, {Component} from 'react';
import './myList.css';
import tile from '../../images/tile.svg';
import lineDark from '../../images/line-dark.svg';
import tileDark from '../../images/tile-dark.svg';
import line from '../../images/line.svg';
import LineView from '../lineView/lineView'
import TileView from '../tileView/tileView'

class MyList extends Component {

  clickOnCheckbox = (id) => {
    this.props.removeRepository(id);
  };

  changeDT = (event) => {
    this.props.changeDisplayType();
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
      repositories={this.props.myRepositories}
      clickOnCheckbox={this.clickOnCheckbox}
    />;

    const tileView = <TileView
      repositories={this.props.myRepositories}
      clickOnCheckbox={this.clickOnCheckbox}
    />;

    let mappingType = this.props.displayType ? lineElem : tileElem;
    let viewType = this.props.displayType ? lineView : tileView;

    return (
      <div className="my-list">
        <div className="title">
          <span>My List</span>
        </div>
        {mappingType}
        <div style={this.props.myRepositories.length ? {display: 'none'} : {}} className="without-repository">
          <h4>YOU HAVE NO REPOSITORIES</h4>
          <p>you need to add a repository in the search</p>
        </div>
        {viewType}
      </div>
    )

  }

}

export default MyList