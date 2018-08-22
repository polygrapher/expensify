import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <h3>Details: {props.info}</h3>
    </div>
);

const requireAuthentication = (WrappedComponent) => {
    return (props) => {
        return props.isAuthenticated && <WrappedComponent {...props}/>;
    };
};

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={false} info="HOC helps us to share code" />, document.getElementById('app'));