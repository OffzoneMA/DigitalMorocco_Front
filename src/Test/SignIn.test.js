// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'; // Import user-event library
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import SignIn from '../Pages/Authentification/SignIn';

// const mockStore = configureStore([thunk]);

// describe('SignIn Component', () => {
//   const initialState = {
//     auth: {
//       loading: false,
//       userInfo: null,
//       error: null,
//     },
//   };

//   test('renders email and password input fields', () => {
//     const store = mockStore(initialState);

//     render(
//       <Provider store={store}>
//         <SignIn />
//       </Provider>
//     );

//     // Use getByLabelText to access input fields by their label text
//     const emailInput = screen.getByLabelText('Email address');
//     const passwordInput = screen.getByLabelText('Password');

//     // Simulate user typing in the email and password input fields
//     userEvent.type(emailInput, 'test@example.com');
//     userEvent.type(passwordInput, 'password123');

//     // Check if input values have been updated
//     expect(emailInput.value).toBe('test@example.com');
//     expect(passwordInput.value).toBe('password123');
//   });


// });
