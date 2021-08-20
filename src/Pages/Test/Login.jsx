// Library
import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../../utils/Common';
// import { useForm } from "react-hook-form";
// import { uploadimage } from "./httpService";

const Login = (props) => {

    document.title = "Login - Blog";

    const [loading, setLoading] = useState(false);
    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);

    // const { register, handleSubmit } = useForm();
    // const formData = new FormData();


    // const onSubmit = (data) => {
    //     console.log(data);
    //     alert(JSON.stringify(data));
    //     formData.append('image', data.image.files[0]);
    //     fetch("http://localhost:3001/uploadImage", {
    //         mode: 'no-cors',
    //         method: "POST",
    //         body: formData
    //     }).then(function (res) {
    //         if (res.ok) {
    //             alert("Perfect! ");
    //         } else if (res.status === 401) {
    //             alert("Oops! ");
    //         }
    //     }, function (e) {
    //         alert("Error submitting form!");
    //     });
    // };

    // handle button click of login form
    const handleLogin = () => {
        if (!username.blank && !password.blank) {
            setError(null);
            setLoading(true);
            axios.post('http://localhost:4000/users/signin', { username: username.value, password: password.value }).then(response => {
                setLoading(false);
                setUserSession(response.data.token, response.data.user);
                props.history.push('/content');
            }).catch(error => {
                setLoading(false);
                if (error.response.status === 401) setError(error.response.data.message);
                else setError("Something went wrong. Please try again later.");
            });
        }
    }

    return (
        <div className={`bg-gray-800 font-patrick flex justify-center items-center w-screen min-h-screen absolute top-0 left-0 overflow-hidden`}>
            <div className="bg-white md:w-4/12 sm:w-6/12 w-full container shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                {error &&
                    <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
                        <span>username atau password salah</span>
                    </div>
                }

                <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input {...username} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Username" />
                    {username.blank && <p className="text-red-900 text-xs italic">Username wajib ada.</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-grey-darker text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input {...password} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************" />
                    {password.blank && <p className="text-red-900 text-xs italic">Password wajib ada</p>}
                </div>
                <div className="flex items-center justify-center">
                    <input type="button" value={loading ? 'Loading...' : 'Login'} className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded" onClick={handleLogin} disabled={loading} /><br />
                </div>
            </div>
        </div>
    );
};

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
    const [isBlank, setIsBlank] = useState(false);

    const handleChange = e => {
        setValue(e.target.value);
        if (e.target.value === "") setIsBlank(true);
        else setIsBlank(false);
    }

    const handleBlur = e => {
        if (e.target.value === "") setIsBlank(true);
        else setIsBlank(false);
    }

    return {
        value,
        onChange: handleChange,
        onBlur: handleBlur,
        blank: isBlank,
        changeValue: (x) => {
            setValue(x);
        }
    }
}

export default Login