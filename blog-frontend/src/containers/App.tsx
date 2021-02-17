import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EditorPage from 'src/pages/EditorPage';
import ListPage from 'src/pages/ListPage';
import PostPage from 'src/pages/PostPage';
import NotFoundPage from 'src/pages/NotFoundPage';
import { history } from 'src/redux/create';
import { ConnectedRouter } from 'connected-react-router';

const App = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/page/:page" component={ListPage} />
        <Route path="/tag/:tag/:page?" component={ListPage} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/editor" component={EditorPage} />
        <Route path="/editor/:id" component={EditorPage} />
        <Route exact path="/" component={ListPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
