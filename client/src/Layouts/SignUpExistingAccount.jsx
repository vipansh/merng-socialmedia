import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router";
import { gql, useMutation } from "@apollo/client";

const SignUpExistingAccount = () => {
  const { setCurrentUser, setErrorsList } = useAuth();
  const history = useHistory();

  const [userdata, setUserData] = useState({
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      localStorage.setItem("jwtToken", userData.token);
      setCurrentUser(userData);
      history.push("/");
    },
    onError(err) {
      setErrorsList(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: userdata,
  });

  function loginUserCallback() {
    loginUser();
  }
  if (loading) return <div>Loading...</div>;
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center font-semibold  px-2">
        <label htmlFor="username">Username</label>{" "}
        <input
          className="bg-gray-200 m-4 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          value={userdata.username}
          name="username"
          onChange={(e) => {
            setUserData((userdata) => ({
              ...userdata,
              [e.target.name]: e.target.value,
            }));
          }}
        />
      </div>
      <div className="flex justify-center items-center font-semibold  px-2">
        <label htmlFor="username">Password</label>
        <input
          className="bg-gray-200 m-4 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          value={userdata.password}
          name="password"
          onChange={(e) => {
            setUserData((userdata) => ({
              ...userdata,
              [e.target.name]: e.target.value,
            }));
          }}
        />
      </div>
      <button onClick={loginUserCallback}>Log In</button>
    </div>
  );
};

export default SignUpExistingAccount;

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(logInInput: { username: $username, password: $password }) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
