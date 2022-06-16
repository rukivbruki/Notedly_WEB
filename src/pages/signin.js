import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from '../components/UserForm';
import { useNavigate, useLocation } from 'react-router-dom';

const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SignIn = () => {
  let location = useLocation();
  let navigate = useNavigate();
  let from = location.state?.from?.pathname || '/';
  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signIn);
      client.writeData({ data: { isLoggedIn: true } });
      navigate(from, { replace: true });
    },
  });

  useEffect(() => {
    document.title = 'Sign In — Notedly';
  });

  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signIn" />
      {loading && <p>Loading...</p>}
      {error && <p>Error signing in!</p>}
    </React.Fragment>
  );
};

export default SignIn;
