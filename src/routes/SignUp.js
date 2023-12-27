import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [discord, setDiscord] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const checkLogin = () => {
    if (localStorage.getItem("cookies")) navigate("/dashboard");
  };

  const home = () => {
    navigate("/");
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (username == null || password == null || discord == null || username === "" || password === "") return;

    try {
      const response = await fetch(
        `/user?user_id=${discord}&user_name=${username}&password=${CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex)}`, { method: "POST" }
      );

      console.log(response.status);

      if (response.status === 201) {
        navigate("/");
      } else if (response.status === 409) {
        setSnackbarMessage("User with the same username or Discord ID already exists.");
      } else {
        console.error("Server responded with an error:", response.status);
      }
    } catch (error) {
      console.error("There was a network error!", error);
    }

    setUsername("");
    setPassword("");
    setDiscord("");
  };

  useEffect(() => {
    // This will be called when the component is mounted
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-black w-screen h-screen flex flex-row justify-around items-center">
      <button
        onClick={home}
        className="text-white absolute top-4 left-4 cursor-pointer"
      >
        🏠 Home
      </button>
      <form className="max-w-sm mx-auto border border-white rounded p-5 w-[100%]">
        <div className="mb-5">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
          <input onChange={(e) => setUsername(e.target.value)}
            value={username} type="username" id="username" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ex. cats_are_cute" required/>
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input onChange={(e) => setPassword(e.target.value)}
            value={password}type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="********" required/>
        </div>
        <div className="mb-5">
          <label htmlFor="discord" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discord User Id</label>
          <input onChange={(e) => setDiscord(e.target.value)}
            value={discord}type="discord" id="discord" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ex. 1188061854367498310" required/>
        </div>
        <button
          onClick={registerUser}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>
      </form>
      <h1 className="text-5xl text-white font-ele font-semibold mr-56">
        Create Account Page 📠
      </h1>

      {snackbarMessage && (
        <div className="fixed bottom-4 left-4 bg-red-500 text-white p-2.5 rounded-md">
          {snackbarMessage}
        </div>
      )}
    </div>
  );
}

export default SignUp;
