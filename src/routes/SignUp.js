import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [discord, setDiscord] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [showModal, setShowModal] = useState(true); // State for modal visibility
  const [currentPage, setCurrentPage] = useState(1); // State for tracking the current page of the modal

  const allowPath = require("../asset/allow.png");
  const useridPath = require("../asset/userid.png");

  const checkLogin = () => {
    if (localStorage.getItem("cookies")) navigate("/dashboard");
  };

  const home = () => {
    navigate("/");
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (
      username == null ||
      password == null ||
      discord == null ||
      username === "" ||
      password === ""
    ) {
      setSnackbarMessage("Please provide all the details c:");
      setSnackbarVisible(true);
      return;
    }

    try {
      const response = await fetch(
        `https://course-tracker-backend.onrender.com/user?user_id=${discord}&user_name=${username}&password=${CryptoJS.SHA256(
          password,
        ).toString(CryptoJS.enc.Hex)}`,
        { method: "POST" },
      );

      console.log(response.status);

      if (response.status === 201) {
        navigate("/");
      } else if (response.status === 409) {
        setSnackbarMessage(
          "User with the same username or Discord ID already exists.",
        );
        setSnackbarVisible(true);
      } else if (response.status === 406) {
        setSnackbarMessage("Invalid Discord User Id");
        setSnackbarVisible(true);
      } else {
        console.error("Server responded with an error:", response.status);
        setSnackbarMessage(
          "Server responded with an error. Please try back again in a while. If this continues, please report.",
        );
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.error("There was a network error!", error);
      setSnackbarMessage(
        "There was a network error! Please try back again in a while. If this continues, please report.",
      );
      setSnackbarVisible(true);
    }

    setUsername("");
    setPassword("");
    setDiscord("");
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // This will be called when the component is mounted
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-black w-screen h-screen flex flex-row justify-around items-center">
      {showModal && (
        <div className="absolute w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-40 backdrop-blur-md z-10">
          <div className="relative text-white p-6 bg-black rounded-lg shadow-md w-[50%] h-[60%]">
            {currentPage === 1 && (
              <>
                <div className="flex flex-row justify-between">
                  <h2 className="text-2xl font-bold mb-4">Important</h2>
                  <h3 className="text-2xl">Join Discord Server</h3>
                </div>
                <div className="flex flex-row space-x-5 mt-6">
                  <div className="flex flex-col justify-around">
                    <p className="text-gray-300 text-justify">
                      We're excited to have you. Before registering an account,
                      please join our discord server. This is crucial to ensure
                      you receive notifications about course availability.
                    </p>
                    <a
                      href="https://discord.gg/295MtevYzQ"
                      className="w-full flex justify-center mr-2 mt-10"
                    >
                      {" "}
                      <div className="bg-discord p-2 rounded">Join Server</div>
                    </a>
                  </div>
                  <iframe
                    src="https://discord.com/widget?id=1188065440820383744&theme=dark"
                    title="discord-widget"
                    width="300"
                    height="350"
                    allowtransparency="true"
                    frameBorder="0"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  ></iframe>
                </div>

                <button
                  className="absolute right-0 bottom-0 text-white hover:text-black hover:bg-gray-300 transition duration-200 bg-discord p-1 rounded my-5 mx-8 px-4"
                  onClick={goToNextPage}
                >
                  Next
                </button>
              </>
            )}

            {currentPage === 2 && (
              <>
                <div className="flex flex-row justify-between">
                  <h2 className="text-2xl font-bold mb-4">Important</h2>
                  <h3 className="text-2xl">Enable DM Messages</h3>
                </div>
                <div className="flex flex-col mt-6 space-y-10">
                  <div className="flex flex-col justify-around">
                    <p className="text-gray-300 text-justify">
                      To be able to recive notifcations about course
                      availability, make sure Allow direct messages from server
                      members is turned on in your{" "}
                      <b>
                        Discord {">"} User Settings {">"} Privacy & Safety
                      </b>
                    </p>
                  </div>
                  <img src={allowPath} alt="Discord Settings" />
                </div>

                <button
                  className="absolute right-0 bottom-0 text-white hover:text-black hover:bg-gray-300 transition duration-200 bg-discord p-1 rounded my-5 mx-8 px-4"
                  onClick={goToNextPage}
                >
                  Next
                </button>
                <button
                  className="absolute left-0 bottom-0 text-white hover:text-black hover:bg-gray-300 transition duration-200 bg-discord p-1 rounded my-5 mx-8 px-4"
                  onClick={goToPreviousPage}
                >
                  Previous
                </button>
              </>
            )}

            {currentPage === 3 && (
              <>
                <div className="flex flex-row justify-between">
                  <h2 className="text-2xl font-bold mb-4">Important</h2>
                  <h3 className="text-2xl">Get Your Discord ID</h3>
                </div>
                <div className="flex flex-col mt-1 space-y-2">
                  <div className="flex flex-col justify-around">
                    <p className="text-gray-300 text-justify">
                      The sign up process requires your Discord ID. This is a
                      public id linked with your discord username. To get your
                      discord id, follow the steps mentioned in{" "}
                      <a
                        href="https://discord.com/channels/1188065440820383744/1190461384341852200/1190465831046500375"
                        className="text-discord hover:text-indigo-300 hover:underline"
                      >
                        user-id
                      </a>{" "}
                      channel on discord.
                    </p>
                  </div>
                  <img src={useridPath} alt="Discord User ID" />
                </div>

                <button
                  className="absolute right-0 bottom-0 text-white hover:text-black hover:bg-gray-300 transition duration-200 bg-discord p-1 rounded my-5 mx-8 px-4"
                  onClick={closeModal}
                >
                  Done
                </button>
                <button
                  className="absolute left-0 bottom-0 text-white hover:text-black hover:bg-gray-300 transition duration-200 bg-discord p-1 rounded my-5 mx-8 px-4"
                  onClick={goToPreviousPage}
                >
                  Previous
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <button
        onClick={home}
        className="text-white absolute top-4 left-4 cursor-pointer"
      >
        🏠 Home
      </button>
      <form className="max-w-sm mx-auto border border-white rounded p-5 w-[100%]">
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="username"
            id="username"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Ex. cats_are_cute"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="********"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="discord"
            className="mb-2 text-sm font-medium text-gray-900 dark:text-white flex flex-row items-center space-x-2"
          >
            <div>Discord User Id</div>
            <div
              onClick={() => {
                setShowModal(true);
                setCurrentPage(3);
              }}
              className="text-black flex justify-center items-center bg-gray-200 hover:bg-white transition duration-500 hover:opacity-100 opacity-50 w-5 h-5 rounded-full"
            >
              ?
            </div>
          </label>
          <input
            onChange={(e) => setDiscord(e.target.value)}
            value={discord}
            type="discord"
            id="discord"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Ex. 1188061854367498310"
            required
          />
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

      {snackbarVisible && (
        <div className="fixed top-0 right-0 p-4">
          <div className="bg-red-500 text-sm text-white p-2 rounded shadow-md">
            {snackbarMessage}
            <button
              className="ml-2"
              onClick={() => {
                setSnackbarVisible(false);
              }}
            >
              ⤫
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
