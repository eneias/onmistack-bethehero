import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './Auth';

console.log(Auth.getAuth());
console.log(Auth.getRule());

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Auth.getAuth() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/"
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;