import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  test('renders loading state initially', () => {
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('redirects to login when not authenticated', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    // You'll need to mock the auth service response
    // and wait for the redirect
  });

  test('shows error message when auth check fails', async () => {
    // Mock the validateToken to reject
    // Then verify error message appears
  });
});