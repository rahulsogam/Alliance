import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { loginSuccess } from '../slice/loginSlice';
import { useDispatch } from 'react-redux';
import { Axios } from '../AxiosConfig';
import {useNavigate } from 'react-router-dom';

export const Login = () => {
    const [details, setDetails] = useState({
        id: "",
        pass: "",
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async () => {
        console.log(details)
        await Axios.post("/EMP/login", details)
            .then(async (res) => {
                console.log(res)
                if(res.data.data.status){
                    await dispatch(loginSuccess(res.data.data));
                    navigate("/")
                }
                else{
                    console.log("loginFailed")
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="login-body">
            <div className="login-wrapper">
                <div className="login-panel">
                    <img src="assets/layout/images/logo-dark.svg" className="logo" alt="diamond-layout" />

                    <div className="login-form">
                        <h2>Login</h2>   
                        <InputText placeholder="Email" onChange={(e) => { setDetails({ ...details, id: e.target.value }) }} />
                        <Password placeholder="Password" onChange={(e) => { setDetails({ ...details, pass: e.target.value }) }} />
                        <Button label="CONTINUE" type="button" onClick={onSubmit}></Button>
                    </div>

                    <p>
                        A problem? <a href="/access">Click here</a> and let us help you.
                    </p>
                </div>
                <div className="login-image">
                    <div className="login-image-content">
                        <h1>Access to your</h1>
                        <h1>Employee</h1>
                        <h1>Account</h1>
                    </div>
                    <div className="image-footer">
                        <p>Powered by Aliance please give us 1:1 marks for this project</p>
                        <div className="icons">
                            <i className="pi pi-github"></i>
                            <i className="pi pi-twitter"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
