import React from 'react';
import ReactDOM from 'react-dom';
import transaction from '../MVCstructure/Controller/transactionAction';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<transaction />, div);
});