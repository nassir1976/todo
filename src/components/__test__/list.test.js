import React,{useState} from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Output from '../todo/list.js';


describe('testing the list.js', () => {
  it('Should display two routine task', async () => {
    let handleComplete = jest.fn();
    render(<Output handleComplete={handleComplete} list={[{text: 'make a bed', _id: 1, assignee: 'Abegaz', complete:'false'}, {text: 'do laundary', _id: 2, assignee: 'Nassir', complete:'true'} ]} />);
    
    let completed = screen.getByText('make a bed', { exact: false });
    fireEvent.click(completed);
    
    await waitFor(() => expect(screen.getByText('make a bed', { exact: false })).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('do laundary', { exact: false })).toBeInTheDocument());
    await waitFor(() => expect(handleComplete).toHaveBeenCalled())
  });
});