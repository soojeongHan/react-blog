import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import create from 'src/redux/create';
import { Switch, Route } from 'react-router-dom';
import EditorPage from 'src/pages/EditorPage';
import ListPage from 'src/pages/ListPage';
import PostPage from 'src/pages/PostPage';
import NotFoundPage from 'src/pages/NotFoundPage';
import { history } from 'src/redux/create';
import { ConnectedRouter } from 'connected-react-router';
import Base from 'src/components/common/Base';

const store = create();
const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
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
          <Base />
        </ConnectedRouter>
      </BrowserRouter>
    </Provider>
  );
}

export default Root;
