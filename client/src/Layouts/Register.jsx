import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router";
import { gql, useMutation } from "@apollo/client";

const Register = () => {
  // Register to existing account
  const { setCurrentUser, setErrorsList } = useAuth();
  const history = useHistory();

  const [userdata, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
    localStorage.setItem("jwtToken", userData.token)
      setCurrentUser(userData);
      history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrorsList(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: userdata,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="container mx-auto grid-cols-2   ">
      Create and new account
      <br />
      <label for="username">username</label>{" "}
      <input
        className="bg-gray-200 m-4 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        type="text"
        value={userdata.username}
        name="username"
        onChange={(e) => {
          setUserData((userData) => ({
            ...userData,
            [e.target.name]: e.target.value,
          }));
        }}
      />
      <label for="email">email</label>
      <input
        className="bg-gray-200 m-4 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        type="text"
        value={userdata.email}
        name="email"
        onChange={(e) => {
          setUserData((userData) => ({
            ...userData,
            [e.target.name]: e.target.value,
          }));
        }}
      />
      <label for="password">password</label>
      <input
        className="bg-gray-200 m-4 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        type="text"
        value={userdata.password}
        name="password"
        onChange={(e) => {
          setUserData((userData) => ({
            ...userData,
            [e.target.name]: e.target.value,
          }));
        }}
      />
      <label for="confirmPassword">confirm Password</label>
      <input
        className="bg-gray-200 m-4 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        type="text"
        value={userdata.confirmPassword}
        name="confirmPassword"
        onChange={(e) => {
          setUserData((userData) => ({
            ...userData,
            [e.target.name]: e.target.value,
          }));
        }}
      />
      <button onClick={registerUser}>Register</button>
    </div>
  );
};

export default Register;

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
