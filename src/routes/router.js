import * as React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter} from 'react-router-dom';

export default function Router(props) {
    const {children} = props;

    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    );
}

Router.propTypes = {
    children: PropTypes.node,
};
