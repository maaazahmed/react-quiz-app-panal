import React, { Component } from 'react';
import './index.css';
import Button from '@material-ui/core/Button';
import history from "../../History"




class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            email: "",
            password: "",
            ConfermPass: ""
        }
        // this.changeHandler.bind(this)
    }

    changeHandler(eve) {
        this.setState({
            [eve.target.name]: eve.target.value
        })
    }

    submitFormHeandler(e) {
        e.preventDefault();
        const {
            username,
            email,
            password,
            ConfermPass
        } = this.state;

        let obj = {
            username: username,
            email: email,
            password: password,
            confremPass: ConfermPass
        }
        if (username !== "" && email !== "" && password !== "" && ConfermPass !== "") {
            if (password !== ConfermPass) {
                alert("password did not match")
            }
            else {
                fetch('http://localhost:8000/createAdmin', {
                    method: 'POST',
                    body: JSON.stringify(obj),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }).then((a) => {
                    if (a.status === 201) {
                        alert("Success")
                    }
                    else {
                        alert("Aouthtication failed try again")
                    }

                    console.log(a)
                }).catch((error) => {
                    console.log(error)
                    // alert("Aouthtication faildv----------")
                })
            }
        }
        else {
            alert("a")
        }
    }

    render() {
        const {
            username,
            email,
            password,
            ConfermPass
        } = this.state
        return (
            <div className="SignUpContainer">
                <Button className variant="contained" onClick={() => history.push("/LogIn")} >
                    Login
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="30" height="30" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" /></svg>
                </Button>
                <form method="post" onSubmit={this.submitFormHeandler.bind(this)} >
                    <div className="FormControl_container" >
                        <h3 className="h3" >QUIZ</h3>
                        <div>
                            <input
                                onChange={this.changeHandler.bind(this)}
                                name="username"
                                value={username}
                                type="text"
                                placeholder="Username" />
                        </div>
                        <br />
                        <br />
                        <div>
                            <input
                                onChange={this.changeHandler.bind(this)}
                                name="email"
                                value={email}
                                type="email"
                                placeholder="Email" />
                        </div>
                        <br />
                        <br />
                        <div>
                            <input
                                onChange={this.changeHandler.bind(this)}
                                name="password"
                                value={password}
                                type="password"
                                placeholder="Password" />
                        </div>
                        <br />
                        <br />
                        <div>
                            <input
                                onChange={this.changeHandler.bind(this)}
                                name="ConfermPass"
                                value={ConfermPass}
                                type="password"
                                placeholder="Conferm Password" />
                        </div>
                        <br />
                        <br />
                        <button className="signUpButon" >Sign Up</button>
                    </div>
                </form>

            </div>
        );
    }
}

export default SignUp;
