import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router";
import { gql, useMutation } from "@apollo/client";

const SignUpExistingAccount = () => {
  const { setCurrentUser, setErrorsList } = useAuth();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [userdata, setUserData] = useState({
    username: "",
    password: "",
  });
  const [userErrors, setUserErrors] = useState({
    username: false,
    password: false,
    otherError: false,
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      localStorage.setItem("jwtToken", userData.token);
      setCurrentUser(userData);
      history.push("/");
    },
    onError(err) {
      setErrorsList(err.graphQLErrors[0].extensions.exception.errors);
      setUserErrors((userErrors) => ({
        ...userErrors,
        otherError: err.message,
      }));
    },
    variables: userdata,
  });

  function loginUserCallback() {
    let isValid = true;
    if (userdata.username.trim() === "") {
      setUserErrors((userErrors) => ({ ...userErrors, username: true }));
      isValid = false;
    }
    if (userdata.password.trim() === "") {
      setUserErrors((userErrors) => ({ ...userErrors, password: true }));
      isValid = false;
    }
    if (isValid) loginUser();
  }
  return (
    <div className="container mx-auto">
      <div className="container mx-auto grid-cols-2   ">
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Log In to and Existing account.
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                This is a social platform where you can uplode status.
              </p>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Use{" "}
                <span className="font-semibold text-gray-700">
                  Username: test
                </span>{" "}
                &{" "}
                <span className="font-semibold text-gray-700">
                  Password: test
                </span>{" "}
                for testing
              </p>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-col justify-center mx-auto items-center">
                <div className="p-2 w-full md:w-1/2 mx-auto">
                  <div className="relative">
                    <label
                      htmlFor="username"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Username
                    </label>
                    <input
                      onFocus={() =>
                        setUserErrors((userErrors) => ({
                          ...userErrors,
                          otherError: false,
                          username: false,
                        }))
                      }
                      type="text"
                      value={userdata.username}
                      autoComplete="username"
                      name="username"
                      onChange={(e) => {
                        setUserData((userData) => ({
                          ...userData,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                      className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${
                        userErrors.username && "border-red-400"
                      }`}
                    />
                    {userErrors.username && (
                      <span className="text-red-800">
                        Username can't be empty
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-2 w-full md:w-1/2 mx-auto relative">
                  <div className="relative mb-3 w-full flex flex-wrap items-stretch">
                    <label htmlFor="password">Password</label>
                    <input
                      className={`w-full relative bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${
                        userErrors.password && "border-red-400"
                      }`}
                      onFocus={() =>
                        setUserErrors((userErrors) => ({
                          ...userErrors,
                          otherError: false,
                          password: false,
                        }))
                      }
                      type={showPassword ? "text" : "password"}
                      value={userdata.password}
                      autoComplete="password"
                      name="password"
                      onChange={(e) => {
                        setUserData((userData) => ({
                          ...userData,
                          [e.target.name]: e.target.value,
                        }));
                      }}
                      placeholder="password.."
                    />
                    <span className="absolute right-0 z-10 mt-2 pr-2 w-8 h-full leading-snug bg-transparent rounded text-base font-normal text-gray-400 text-center flex items-center justify-center">
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 cursor-pointer"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          onClick={() => setShowPassword(false)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 cursor-pointer "
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          onClick={() => setShowPassword(true)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                  {userErrors.password && (
                    <span className="text-red-800">
                      Password can't be empty
                    </span>
                  )}
                </div>

                {userErrors.otherError && (
                  <span className="text-red-800 mx-auto">
                    {userErrors.otherError}
                  </span>
                )}
                <div className="p-2 w-full">
                  <button
                    onClick={loginUserCallback}
                    className={`flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg  ${
                      loading
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }`}
                  >
                    {loading ? (
                      <span>
                        Loading...
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 animate-spin inline items-center"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </span>
                    ) : (
                      "Log In"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
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
