import { useState } from "react";
import CryptoJS from "crypto-js";

function AddRequest(props) {
  const [subject, setSubject] = useState("");
  const [code, setCode] = useState("");
  const [section, setSection] = useState("");
  const [campus, setCampus] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  var col = "shadow-cyan-400";

  var classNameMain = `hover: border-white w-[70%] h-32 rounded-md border bg-black flex flex-row items-center p-5 text-2xl opacity-80 shadow-lg hover:opacity-100 transition duration-300 my-5 ${col} justify-between`;
  const addRequest = async (e) => {
    e.preventDefault();
    if (subject == null || code == null || section == null || campus == null) {
      setSnackbarMessage("Please fill all the fields in the add form.");
      setSnackbarVisible(true);
      return;
    }

    if (campus.toUpperCase() !== "UBCO" && campus.toUpperCase() !== "UBCV") {
      setSnackbarMessage("Invalid Campus. We only support UBCO or UBCV");
      setSnackbarVisible(true);
      return;
    }

    if (props.amount >= 4) {
      setSnackbarMessage("Can't track more than 4 courses at once!");
      setSnackbarVisible(true);
      return;
    }

    const user = JSON.parse(localStorage.getItem("cookies"));
    try {
      const response = await fetch(
        `https://course-tracker-backend.onrender.com/request?user_name=${
          user["username"]
        }&password=${CryptoJS.SHA256(user["password"]).toString(
          CryptoJS.enc.Hex,
        )}&subject=${subject}&code=${code}&section=${section}&campus=${campus}`,
        { method: "POST" },
      );
      if (response.status === 201) {
        props.exe();
      } else if (response.status === 401) {
        setSnackbarMessage("Wrong username or password combination");
        setSnackbarVisible(true);
      } else if (response.status === 403) {
        setSnackbarMessage("Can't track more than 4 courses at once!");
        setSnackbarVisible(true);
      } else if (response.status === 406) {
        setSnackbarMessage(
          "Invalid Course. Please confirm the course creds again.",
        );
        setSnackbarVisible(true);
      } else {
        console.error("Server responded with an error:", response.status);
        setSnackbarMessage(
          "Server responded with an error. Please try back again in a while. If this continues, please report.",
        );
        setSnackbarVisible(true);
      }
    } catch (error) {
      setSnackbarMessage(
        "There was a network error! Please try back again in a while. If this continues, please report.",
      );
      setSnackbarVisible(true);
    }

    setSubject("");
    setCode("");
    setSection("");
    setCampus("");
  };

  return (
    <form className={classNameMain}>
      <div class="mb-0">
        <label
          for="subject"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Subject
        </label>
        <input
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
          id="subject"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="COSC"
          required
        />
      </div>

      <div class="mb-0">
        <label
          for="code"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Code
        </label>
        <input
          onChange={(e) => setCode(e.target.value)}
          value={code}
          id="code"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="111"
          required
        />
      </div>

      <div class="mb-0">
        <label
          for="section"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Section
        </label>
        <input
          onChange={(e) => setSection(e.target.value)}
          value={section}
          id="section"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="001"
          required
        />
      </div>

      <div class="mb-0">
        <label
          for="campus"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Campus
        </label>
        <input
          onChange={(e) => setCampus(e.target.value)}
          value={campus}
          id="campus"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="UBCO"
          required
        />
      </div>

      <div className="flex flex-row items-center justify-center space-x-2">
        <button
          onClick={addRequest}
          type="submit"
          class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-300 text-center me-2 mb-2"
        >
          Submit
        </button>
      </div>
      {snackbarVisible && (
        <div className="fixed bottom-0 right-0 p-4">
          <div className="bg-red-500 text-white p-2 rounded shadow-md">
            {snackbarMessage}
            <button
              className="ml-2"
              onClick={() => {
                setSnackbarVisible(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default AddRequest;

