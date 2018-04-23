import * as React from 'react';
import { Route, Router, Switch } from 'react-router';
import * as R from './routes';
import RouteError from './RouteError';
import history from './history';
import * as queryString from 'query-string';

import { ContextProvider } from '../context';

import Home from '../features/Home';
import Praise from '../features/Praise';

import * as styles from './style.less';

export default function App() {
  return (
    <div className={styles.main}>
      <ContextProvider>
         <Router history={history}>
           <Switch>
             <Route exact path={R.HOME} render={() => <Home />} />
             <Route exact path={R.PRAISE} render={({ location, history}) => (
               <Praise
                 recipientId={queryString.parse(location.search).recipientId}
                 updateRecipientId={(recipientId: string) => history.replace({ search: queryString.stringify({ recipientId}) })}
               />
             )} />
             <Route render={() => <RouteError errorCode={404} />} />
           </Switch>
         </Router>
      </ContextProvider>
    </div>
  );
}


