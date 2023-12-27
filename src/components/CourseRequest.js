import CryptoJS from 'crypto-js';

function CourseRequest(props) {
    var col = props.active ? "shadow-green-400" : "shadow-red-400";
    var beep = props.active ? "bg-green-500  shadow-green-400" : "bg-red-500 shadow-red-400";
    var classNameSub = `w-1 h-1 rounded-full shadow ${beep}`;
    var classNameMain = `hover: border-white w-[100%] h-24 rounded-md border bg-black flex flex-row items-center p-5 text-2xl opacity-80 shadow-lg hover:opacity-100 transition duration-300 my-5 ${col} justify-between cursor-cell`;

    const updateData = async () => {
        if (props.active) return;
        const user = JSON.parse(localStorage.getItem("cookies"));
        try {
            const response = await fetch(`https://course-tracker-backend.onrender.com/request?user_name=${user["username"]}&password=${CryptoJS.SHA256(user["password"]).toString(CryptoJS.enc.Hex)}&subject=${props.subject}&code=${props.code}&section=${props.section}&campus=${props.campus}`, { method: "POST" });
            if (response.status === 201) {
                props.exe();
            } else {
                console.error('Server responded with an error:', response.status);
            }
        } catch (error) {
            console.error('There was a network error!', error);
        }

    }

    const removeRequest = async () => {
        const user = JSON.parse(localStorage.getItem("cookies"));
        try {
            const response = await fetch(`https://course-tracker-backend.onrender.com/usersubscriptions?user_name=${user["username"]}&password=${CryptoJS.SHA256(user["password"]).toString(CryptoJS.enc.Hex)}&request_id=${props.requestId}`, { method: "DELETE" });
            if (response.status === 200) {
                props.exe();
            } else {
                console.error('Server responded with an error:', response.status);
            }
        } catch (error) {
            console.error('There was a network error!', error);
        }
    }

    return <div className='relative'>
        <div className={classNameMain} onClick={updateData}>
        <div>
            {props.subject} {props.code} {props.section}

        </div>
        <div className="flex flex-row items-center justify-center space-x-2">
            <div className={classNameSub}></div>
            <div className="text-sm font-ele">{props.active ? "Active" : "Fused"}</div>
            <div>{props.campus}</div>
        </div>
    </div>
    <button
        className="absolute top-0 right-[-2%] text-sm rounded-full bg-red-600 w-8 h-8 flex justify-center items-center text-center "
            onClick={removeRequest}
          >
           <div>x</div>
            
          </button>
        </div>;
}

export default CourseRequest;