import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SignIn from '../Pages/Authentification/SignIn';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

describe('SignIn Component', () => {
  const mockStore = configureStore([]);
  const initialState = {
    auth: {
      loading: false,
      userInfo: null,
      error: null,
    },
  };

  it('renders the component', () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </Provider>
    );
    const signInHeader = screen.getByText('Sign in to your account with');
    expect(signInHeader).toBeInTheDocument();
  });

  it('submits the form successfully', async () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign in');

    // Fill in form inputs
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Wait for the success message (adjust this based on your actual UI)
    await waitFor(() => {
      const successMessage = screen.getByText('Logged In');
      expect(successMessage).toBeInTheDocument();
    });
  });

  it('displays an error message if authentication fails', async () => {
    const store = mockStore({
      auth: {
        loading: false,
        userInfo: null,
        error: 'Authentication failed',
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign in');

    // Fill in form inputs
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Wait for the error message (adjust this based on your actual UI)
    await waitFor(() => {
      const errorMessage = screen.getByText('Authentication failed');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  // Add more test cases for user interactions, errors, etc.
});
