import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [discord, setDiscord] = useState("");
    
    const checkLogin = () => {
        if (localStorage.getItem("cookies")) navigate("/dashboard");
      };

      const home = () => {
        navigate("/");
      }

    const registerUser = async (e) => {
        e.preventDefault();
        if (username == null || password == null || discord == null || username === "" || password === "" || discord.length !== 18) return;
        try {
            const response = await fetch(
              `https://course-tracker-backend.onrender.com/user?user_id=${discord}&user_name=${username}&password=${password}`, {method: "POST"}
            );
            console.log(response.status);
            if (response.status === 201) {
              navigate("/");
            } else {
              console.error("Server responded with an error:", response.status);
            }
          } catch (error) {
            console.error("There was a network error!", error);
          }
      
          setUsername("");
          setPassword("");
          setDiscord("");
    }
    
      useEffect(() => {
        // This will be called when the component is mounted
        checkLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return <div className="bg-black w-screen h-screen flex flex-row justify-around items-center">
        <button
        onClick={home}
        className="text-white absolute top-4 left-4 cursor-pointer"
      >
        🏠 Home
      </button>
        <form class="max-w-sm mx-auto border border-white rounded p-5 w-[100%]">
      <div class="mb-5">
        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
        <input onChange={(e) => setUsername(e.target.value)}
          value={username} type="username" id="username" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ex. cats_are_cute" required/>
      </div>
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input onChange={(e) => setPassword(e.target.value)}
          value={password}type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="********" required/>
      </div>
      <div class="mb-5">
        <label for="discord" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discord User Id</label>
        <input onChange={(e) => setDiscord(e.target.value)}
          value={discord}type="discord" id="discord" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Ex. 1188061854367498310" required/>
      </div>
      {/* <div class="flex items-start mb-5">
        <div class="flex items-center h-5">
          <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
        </div>
        <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
      </div> */}
      <button onClick={registerUser} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
    </form>
    <h1 className="text-5xl text-white font-ele font-semibold mr-56">
        Create Account Page 📠
      </h1>
    </div> ;
    
    
}

export default SignUp;