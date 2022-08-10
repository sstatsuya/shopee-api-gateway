import React from "react";
import "./App.css";
import Home from "./component/Home";
import Login from "./component/Login";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Cart from "./component/Cart";
import Product from "./component/Product";
import { hideWarning, LS } from "./common/helper";
import { GATEWAY_API, PATHNAME } from "./common/constant";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Loading from "./component/Loading";
import Order from "./component/Order";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  uri: GATEWAY_API,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

function App() {
  const routes = [
    {
      path: PATHNAME.LOGIN,
      exact: true,
      main: () => <Login />,
    },
    {
      path: PATHNAME.HOME,
      exact: true,
      main: () => <Home />,
    },
    {
      path: PATHNAME.ROOT,
      exact: true,
      main: () => <Home />,
    },
    {
      path: PATHNAME.CART,
      exact: true,
      main: () => <Cart />,
    },
    {
      path: PATHNAME.PRODUCT,
      exact: false,
      main: ({ match }) => <Product match={match} />,
    },
    {
      path: PATHNAME.ORDER,
      exact: false,
      main: ({ match }) => <Order match={match} />,
    },
  ];
  hideWarning();
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Loading />
          <Switch>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              );
            })}
          </Switch>
          {/* <Redirect exact  to="/cart" /> */}
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
