import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import loadble from '@loadable/component';

import create from 'src/redux/create';
import { history } from 'src/redux/create';
import Base from 'src/components/common/Base';

const Editor = loadble(() => import(/* webpackChunkName: "Header" */ 'src/pages/EditorPage'));
const List = loadble(() => import(/* webpackChunkName: "List" */ 'src/pages/ListPage'));
const Post = loadble(() => import(/* webpackChunkName: "Post" */ 'src/pages/PostPage'));
const Error = loadble(() => import(/* webpackChunkName: "Error" */ 'src/pages/ErrorPage'));

const store = create();
const Root: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path={["/tag/:tag", "/search/:search",
                "/category/:category"]}
              component={List} />
            <Route path="/post/:id" component={Post} />
            <Route path="/editor" component={Editor} />
            <Route path="/editor/:id" component={Editor} />
            <Route exact path="/" component={List} />
            <Route component={Error} />
          </Switch>
          <Base />
        </ConnectedRouter>
      </BrowserRouter>
    </Provider>
  );
}

export default Root;
