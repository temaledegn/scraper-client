import React, { Component, useEffect, useState, useRef } from "react";
import axios from "axios";
// import { useState } from "react";
import {useHistory} from 'react-router-dom'

import insaLogo from "../../assets/img/logo.jpg";

import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import AuthService from "../../services/auth.service";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};



const LoginForm = (props) => {

    const form = useRef();
    const checkBtn = useRef();

    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        // form.current.validateAll();

        
            AuthService.login(username, password).then(
                () => {
                    history.push("/");
                    // window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
            
            setLoading(false);
        
    };


    return <div className='container'>

        <div className="row">
            <div className="col-md-6">
                <div className="row" style={{ marginTop: "40%" }}>
                    <img className="center" src={insaLogo} alt="logo" height={250}/>
                </div>
            </div>
            <div className="col-md-6">

                <div style={{ textAlign: "center", marginTop: "20%", marginLeft: "15%" }}>

                    <FontAwesomeIcon icon={faLock} size="7x" color="#f0ad4e" />
                </div>
                <div style={{ margin: "7% 5% 5% 15%" }}>
                    <Form onSubmit={handleLogin} ref={form}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>ID Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter ID Number"
                                name="username"
                                onChange={onChangeUsername}
                                validation={[required]}
                            />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={onChangePassword}
                                validation={[required]} />
                        </Form.Group>

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}


                        <div style={{ textAlign: "center", marginTop: "10%" }}>
                            <Button variant="warning" type="submit">
                                Login  &ensp; <FontAwesomeIcon icon={faArrowRight} color="grey" />
                            </Button>
                        </div>



                    </Form>
                </div>


            </div>
        </div>




    </div>
}

export default LoginForm;
