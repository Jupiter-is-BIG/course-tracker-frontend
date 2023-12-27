import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';

function App() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const checkLogin = () => {
    if (localStorage.getItem("cookies")) navigate("/dashboard");
  };

  useEffect(() => {
    // This will be called when the component is mounted
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    try {
      const response = await fetch(
        `/user/login?user_name=${userData.username}&password=${CryptoJS.SHA256(userData.password).toString(CryptoJS.enc.Hex)}`
      );
      console.log(response.status);
      if (response.status === 200) {
        localStorage.setItem("cookies", JSON.stringify(userData));
        navigate("/dashboard");
      } else {
        console.error("Server responded with an error:", response.status);
        setSnackbarMessage("Wrong username or password combination");
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.error("There was a network error!", error);
    }

    setUsername("");
    setPassword("");
  };

  const closeSnackbar = () => {
    setSnackbarVisible(false);
  };

  const handleCreateAccount = () => {
    // Handle the logic for displaying the create account form
    // For simplicity, let's just navigate to a "/create-account" route
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex flex-row items-center justify-around bg-black bg-gradient-to-br from-black to-white">
      <h1 className="text-5xl text-white font-ele font-semibold text-center p-10">
        Course Tracker 🔭
      </h1>
      <form className="bg-gray-950 p-8 rounded">
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Username"
          className="mb-4 p-2 w-full border border-white rounded  bg-black text-white"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          className="mb-4 p-2 w-full border rounded border-white bg-black text-white"
        />
        <button
          type="submit"
          onClick={login}
          className="bg-gray-800 text-white hover:bg-gray-600 p-2 rounded w-full"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleCreateAccount}
          className="mt-4 bg-gray-900 hover:shadow-md transition duration-300 hover:bg-gray-600 text-white p-2 rounded w-full"
        >
          Create Account
        </button>
      </form>
      {snackbarVisible && (
        <div className="fixed bottom-0 right-0 p-4">
          <div className="bg-red-500 text-white p-2 rounded shadow-md">
            {snackbarMessage}
            <button className="ml-2" onClick={closeSnackbar}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
