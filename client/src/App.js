import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Router >
              <Switch>
              <Route exact={true} path="/lgin" render={() => (
                    <>
                      <Layout stateChange={this.stateChange} />
                    	<Task history={history} showMenu={this.state.showMenu} />
					          </>
                  )}
                />
              </Switch>
        </Router>
    );
  }
}

export default App;