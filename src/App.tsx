import React from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Tags from 'views/Tags';
import Details from 'views/Details';
import Money from 'views/Money';
import NoMatch from 'views/NoMatch';
import styled from 'styled-components';
import {Tag} from './views/Tag';
import Statistics from './views/Statistics';

const AppWrapper = styled.div`
  color: #333;
  max-width: 520px;
  margin: 0 auto;
`;

function App() {
  return (
    <AppWrapper>
      <Router>
        <Switch>
          <Route exact path="/details">
            <Details/>
          </Route>
          <Route exact path="/money">
            <Money/>
          </Route>
          <Route exact path="/statistics">
            <Statistics/>
          </Route>
          <Route exact path="/tags/:category">
            <Tags/>
          </Route>
          <Route exact path="/tags/:category/new">
            <Tag/>
          </Route>
          <Redirect exact from="/" to="/money"/>
          <Route path="*">
            <NoMatch/>
          </Route>
        </Switch>
      </Router>
    </AppWrapper>
  );
}

export default App;
