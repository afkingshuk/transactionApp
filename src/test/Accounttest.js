import React from 'react';
import ReactDOM from 'react-dom';
import Account from '../MVCstructure/View/Account';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Account />, div);
});