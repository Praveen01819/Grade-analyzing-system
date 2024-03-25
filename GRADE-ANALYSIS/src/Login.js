import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import "./Login.css";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    function Onlogin() {
        console.log("login incoming");
        console.log(email.length);
        if (email.length === 0 || !password) { 
            setShow(true);
        } else {
            navigate("/home");
        }
    }

    function changeEmail(e) {
        setEmail(e.target.value);
    }

    function changePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <div className="login-container">
            <div id='main'>
                <div id='content'>
                <h1>Grade Analysis System</h1>
                    <Form>
                        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="name@gmail.com" required onChange={(e) => changeEmail(e)} />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your password" onChange={(e) => changePassword(e)} />
                        </Form.Group>
                        <Button id='btn' onClick={Onlogin} variant="primary">Login</Button>{' '}
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
