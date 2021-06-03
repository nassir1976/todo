
import React,{useState} from 'react';
import { render, waitFor, screen, fireEvent} from '@testing-library/react';
import Form from '../todo/form.js';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'


test('test rendering functionality', async () => {
  let handleUpdate = jest.fn();
  render(<Form  addItem={handleUpdate} />);



  let textField = screen.getByTestId('FORM')
  userEvent.type(textField, 'Take the kids to the park');
  let button = screen.getByText('Add Item');

  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  await waitFor(() => expect(handleUpdate).toHaveBeenCalled())
});