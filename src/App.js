import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Homepage from './components/pages/Homepage';
import Search from './components/pages/Search';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/search/:site_url" component={Search} />

          <Route path="*" component={Error} status={404} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
