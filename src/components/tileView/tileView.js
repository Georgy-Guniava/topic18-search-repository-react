import React, {Component} from 'react';
import './tileView.css';
import star from '../../images/star.svg';

class TileView extends Component {

  clickOnCheckbox = (event) => {
    this.props.clickOnCheckbox(event.currentTarget.value)
  };

  render() {
    return (
      <div className="repositories-list">
        <div className="tiles">
          {
            this.props.repositories.map((item, index) => {
              const button = item.checked ?
                <button value={item.id} onClick={this.clickOnCheckbox} className="remove-repo">REMOVE FROM LIST</button>
                : <button value={item.id} onClick={this.clickOnCheckbox} className="add-repo">ADD TO LIST</button>;

              return (

                <div key={index} className="tile-item">
                  <div className=" item-info">
                    <a href={item.url} target=" _blank"><span className=" name">{item.full_name}</span></a>
                    <span className=" description">{item.description}</span>
                    <div className=" topics">
                      {item.topics.map((teg, i) => {
                        return <span key={index + i / 10} className="topic">{teg}</span>
                      })}
                    </div>
                  </div>
                  <div className=" language-name">{item.language}</div>
                  <div className=" rating">
                    <img src={star} alt="star"/>
                    <span>{item.stargazers_count}k</span>
                  </div>
                  {button}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default TileView;