import React from "react";
import "./App.css";
import Home from "./component/Home";
import Login from "./component/Login";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Cart from "./component/Cart";
import Product from "./component/Product";
import { encryptAES256, hideWarning, LS } from "./common/helper";
import {
  AES_KEY,
  GATEWAY_API,
  LOCALSTORAGE,
  PATHNAME,
} from "./common/constant";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Loading from "./component/Loading";
import Order from "./component/Order";
import Manage from "./component/Manage";
import Error from "./component/Error";

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

const httpLink = createHttpLink({
  uri: GATEWAY_API,
});

const authLink = setContext((_, { headers }) => {
  const token = LS.getItem(LOCALSTORAGE.TOKEN) || "";
  return {
    headers: {
      ...headers,
      authorization: encryptAES256(AES_KEY, `${token}`),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
    {
      path: PATHNAME.MANAGE,
      exact: true,
      main: ({ match }) => <Manage match={match} />,
    },
    {
      path: PATHNAME.ERROR,
      exact: true,
      main: ({ match }) => <Error match={match} />,
    },
  ];
  hideWarning();
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router base="/shopee-api-gateway/#/">
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
