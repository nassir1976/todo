
import React,{useState} from 'react';
import { render,screen, fireEvent} from '@testing-library/react';
import App from '../../app.js';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'

test('test rendering functionality', async () => {
  render(<App />);

  let textField = screen.getByTestId('FORM')
  userEvent.type(textField, 'Take the kids to the park');
  let button = screen.getByText('Add Item');

  expect(button).toBeInTheDocument();

});