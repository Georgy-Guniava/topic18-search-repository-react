import React, {Component} from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import Header from './components/header/header'
import Search from './components/search/search'
import MyList from "./components/myList/myList";

function CustomRoute(props) {
  const MyComponent = props.component;
  const { self } = props;
  return (
    <Route
      path={props.path}
      render={() => (
        <MyComponent
          myRepositories={self.state.myRepositories}
          displayType={self.state.displayType}
          addRepository={self.addRepository}
          removeRepository={self.removeRepository}
          changeDisplayType={self.changeDisplayType}
        />
      )}
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myRepositories: [],
      displayType: true
    };
  }

  changeDisplayType = () => {
    const displayType = !this.state.displayType;
    this.setState({displayType: displayType})
  };

  addRepository = (repo) => {
    let newMyRepos = [];
    newMyRepos.push(...this.state.myRepositories);
    newMyRepos.push(repo);
    this.setState({myRepositories: newMyRepos});
  };

  removeRepository = (id) => {
    let newMyRepos = [];
    newMyRepos.push(...this.state.myRepositories);
    const index = newMyRepos.findIndex(item => item.id === parseInt(id, 10));
    newMyRepos.splice(index, 1);
    this.setState({myRepositories: newMyRepos});
  };

  render() {
    return (
      <div className="app">
        <Header/>
        <div className="main">
          <Route exact path="/" render={() => <Redirect to="/search" />} />
          <CustomRoute path="/search" component={Search} self={this} />
          <CustomRoute path="/my-list" component={MyList} self={this} />
        </div>
        <div className='footer'>copyright @lodossteam 2018</div>
      </div>
    );
  }
}

export default App;
