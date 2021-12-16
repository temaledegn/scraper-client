import React, { Component, useEffect, useState, useRef } from "react";
import { useHistory } from 'react-router-dom'

import insaLogo from "../../assets/img/logo.jpg";

import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { faUserCircle } from '@fortawesome/free-solid-svg-icons'


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



const RegisterForm = (props) => {

    const form = useRef();
    const checkBtn = useRef();

    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [alertType, setAlertType] = useState("alert-danger");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };


    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        // form.current.validateAll();


        AuthService.register(username, email, password).then(
            (response) => {
                setAlertType('alert-success');
                setMessage(response.data.message);
                setPassword("");
                setUsername("");
                setEmail("");
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setAlertType('alert-danger');
                setMessage(resMessage);
            }
        );

        setLoading(false);

    };


    return <div className='container'>

        <div className="row">
            <div className="col-md-6">
                <div className="row" style={{ marginTop: "40%" }}>
                    <img className="center" src={insaLogo} alt="logo" height={250} />
                </div>
            </div>
            <div className="col-md-6">

                <div style={{ textAlign: "center", marginTop: "10%", marginLeft: "10%" }}>

                    <FontAwesomeIcon icon={faUserCircle} size="7x" color="green" />
                </div>
                <div style={{ margin: "7% 5% 5% 15%" }}>
                    <Form onSubmit={handleRegister} ref={form}>
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

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email Address"
                                name="email"
                                onChange={onChangeEmail}
                                validation={[required]}
                            />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                onChange={onChangePassword}
                                validation={[required]} />
                        </Form.Group>

                        {message && (
                            <div className="form-group">
                                <div className={"alert " + alertType} role="alert">
                                    {message}
                                </div>
                            </div>
                        )}


                        <div style={{ textAlign: "center", marginTop: "10%" }}>
                            <Button variant="success" type="submit">
                                Register  &ensp; <FontAwesomeIcon icon={faArrowRight} color="white" />
                            </Button>
                        </div>
                    </Form>
                </div>


            </div>
        </div>




    </div>
}

export default RegisterForm;