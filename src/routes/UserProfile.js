import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../index.css'
import CourseRequest from '../components/CourseRequest';
import AddRequest from '../components/AddRequest';
import CryptoJS from 'crypto-js';

function UserProfile() {
    const navigate = useNavigate();
    const [courseRequest, setCourseRequest] = useState();
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const loadData = async () => {
        const user = JSON.parse(localStorage.getItem("cookies"));
        if (!user) navigate("/");
        try {
            const response = await fetch(`https://course-tracker-backend.onrender.com/user/subscriptions?user_name=${user["username"]}&password=${CryptoJS.SHA256(user["password"]).toString(CryptoJS.enc.Hex)}`);
            if (response.status === 200) {
                const jsonData = await response.json();
                setCourseRequest(jsonData);
                console.log(jsonData)
            } else if (response.status === 401) {
                setSnackbarMessage("Wrong username or password combination");
                setSnackbarVisible(true);
            } else if (response.status === 403) {
                setSnackbarMessage("Can't track more than 4 courses at once!");
                setSnackbarVisible(true);
            } else if (response.status === 406) {
                setSnackbarMessage("Invalid Course. Please confirm the course creds again.");
                setSnackbarVisible(true);
            } else {
                console.error('Server responded with an error:', response.status);
                setSnackbarMessage("Server responded with an error. Please try back again in a while. If this continues, please report.");
                setSnackbarVisible(true);
            }
        } catch (error) {
            setSnackbarMessage("There was a network error! Please try back again in a while. If this continues, please report.");
            setSnackbarVisible(true);
        }
    };

   

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = () => {
        localStorage.removeItem("cookies");
        navigate("/");
    };

    return <div className="w-screen h-screen bg-black  text-white">

        <h1 className="text-5xl font-ele font-semibold text-center p-10">Your Subscriptions</h1>
        <div className='flex justify-center'>


            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button type="button" class="cursor-not-allowed inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                    <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    Edit Profile
                </button>
                <button type="button" class="cursor-not-allowed inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                    <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                    </svg>
                    Report Issue
                </button>
                <button onClick={logout} type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                    <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                        <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                    </svg>
                    Logout
                </button>
            </div>

        </div>
        
        <p className='mt-10'>{courseRequest == null ?
            <div role="status" className='flex justify-center items-center'>
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
            : <div className='flex justify-center items-center w-full'>
                <div className='grid grid-cols-2 gap-4 w-[70%]'>
                {courseRequest.map((e) => <CourseRequest subject={e.subject} code={e.code} section={e.section} campus={e.campus} active={e.is_active} exe={loadData} requestId = {e.request_id}/>)}
                </div>
                </div>}</p>
            {courseRequest == null ? <></> : <div className='flex justify-center items-center mt-10'>
            <AddRequest amount={courseRequest.length} exe={loadData}/>
            </div>
            }

{snackbarVisible && (
        <div className="fixed bottom-0 right-0 p-4">
          <div className="bg-red-500 text-white p-2 rounded shadow-md">
            {snackbarMessage}
            <button className="ml-2" onClick={() => {setSnackbarVisible(false)}}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
}

export default UserProfile;