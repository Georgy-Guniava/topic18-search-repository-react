import React, {Component} from 'react';
import './lineView.css';
import star from '../../images/star.svg';

class LineView extends Component {

  clickOnCheckbox = (event) => {
    this.props.clickOnCheckbox(event.currentTarget.value)
  };

  render() {
    return (
      <div className="repositories-list">
        <div className="strings">
          {
            this.props.repositories.map((item, index) => {
              return (
                <div key={index} className="string-item">
                  <button value={item.id} className="check" onClick={this.clickOnCheckbox}>
                    <div className={item.checked ? 'my-repo' : ''}>{}</div>
                  </button>
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
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default LineView;