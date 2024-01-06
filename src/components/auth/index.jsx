import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {gql, useMutation} from '@apollo/client';
import { isLoggedInVar, authVar } from '../../contexts/cache';
import AlertComponent from "../alert";



const Log_In = gql`
        mutation LogIn($email: String!, $password: String!, $type: String) {
            login(loginInput: {email: $email, password: $password, type: $type}) {
                token
                user {
                    id
                    email
                }
            }
        }
    `;

    const Forgot_Password = gql`
    mutation ForgotPassword($username: String) {
        forgotPassword(username: $username)
    }
`

export default function Auth() {
  
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [marg, setMarg] = useState(false);

    const [msg, setMsg] = useState('')

    const [login] = useMutation(Log_In, {
        onCompleted: ({login: {token}}) => {
            localStorage.setItem("token", token);
            isLoggedInVar(true); authVar({token});
            setMsg("Login Successful")
        }, onError: error => {
            setMsg(JSON.parse(error.message).err)
        }
    });

    const submitHandler = e =>{
        e.preventDefault();
        const [email, password] = [e.target.email.value, e.target.password.value];
        login({variables:{email, password, type:"admin"}});                       
      }


  

      const [forgotPassword] = useMutation(Forgot_Password, {
        onCompleted: data => {
            console.log(data)
        },
        onError: error => {
            console.log(error);
        }

    })


      const submitForgot = (e) =>{
        e.preventDefault();
        // setLoading(!loading);

        forgotPassword({variables:{
            username: e.target.username.value
        }})

    }

  return (
    <Form onSubmit={submitHandler}>
  
       {msg && <AlertComponent text={msg} variant={'danger'}/>}
   

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" />
      </Form.Group>
  
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
