import {useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import { isLoggedInVar, authVar } from '../../contexts/cache';
import './style.css'
import {NavLink} from 'react-router-dom';
import Modal from '../../components/modal';
import { Input } from '../../components/input/input';
import Button from '../../components/button';
import { UserIcon, LockClosedIcon, ArrowPathIcon } from '@heroicons/react/24/solid'

const Log_In = gql`
        mutation LogIn($email: String!, $password: String!) {
            login(loginInput: {email: $email, password: $password}) {
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

const Login = (props) => {

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [marg, setMarg] = useState(false);

    const [login] = useMutation(Log_In, {
        onCompleted: ({login: {token}}) => {
            localStorage.setItem("token", token);
            isLoggedInVar(true); authVar({token});
        }, onError: error => {
            console.log(error);
        }
    });

    const submitHandler = e =>{
        e.preventDefault();
        const [email, password] = [e.target.email.value, e.target.password.value];
        login({variables:{email, password}});                       
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
        <>
            {/* <form onSubmit={e => submitHandler(e) }>
                <input type="email" name="email" />
                <input type="password" name="password" />
                <button type="submit">Log In</button>
            </form> */}

            <div className="auth">   
            <div className={`auth-container ${marg ? '':'sign-up-mode'}`}>
                <div className="forms-container">
                    <div className="panels-container">
                        <div className="signin-signup">
                            <form className="sign-in-form" onSubmit={submitHandler}>
                                <h2 className="title">Sign In</h2>
                                
                                {/* <Input icon={"fa-user"} type={"email"} placeholder={"Username"} ref={this.emailElement} required={true} /> */}

                                <Input icon={<UserIcon />} type={"email"} placeholder={"Username"} name={"email"} required={true} />

                               
                                <Input icon={<LockClosedIcon />}  type={"password"} placeholder={"Password"} name={"password"} required={true} />


                                    <p className="forgot-password text-right" onClick={e=>setShowModal(!showModal)}> forgot password? </p>
                                    {/* <button type="submit" value="login" className="btn solid" onClick={e=>loading? null : loadingHandle()}> login {loading && <i className="fa fa-spin fa-spinner"></i>} </button> */}
                                   <Button icon={<ArrowPathIcon className='spin text-white'  />} content={"login"} class={"btn solid"} loading={loading} loadingHandle={setLoading} />

                                   
                                    {/* <Socials ctx={setContext} {...props} /> */}
                            </form>


                                {/* <Register Notify={Notify} setContext={setContext} loading={loading} loadingHandle={loadingHandle} {...props}/> */}
                     
                        </div>
                    </div>

                    <div className={marg?'panels-container marg':'panels-container'}>
                        <div className="panel left-panel">
                            <div className="content">
                                <h3>First time?</h3>

                                <p>get started with few clicks!</p>
                           
                                    <button className="btn transparent" id="sign-up-btn" onClick={e=>setMarg(!marg)}>
                                            Register
                                    </button>   
                            </div>

                            <img src ="" width="180" className="image" alt="" />
                        </div>

                        <div className="panel right-panel">
                            <div className="content">
                                {/* <h3>Been here before?</h3> */}


                                {/* <p>by clicking register, you agree to Brainballer's 
                                    <NavLink to="#" className="text-warning" onClick={props.toggle} rel="noopener noreferrer" data-pane={7} > terms & conditions
                  </NavLink>  and <NavLink to="#" className="text-warning" onClick={props.toggle} rel="noopener noreferrer" data-pane={9} > privacy policy
                  </NavLink>
                                    <br/>
                                    or
                                    </p> */}
                           
                                    <button className="btn transparent" id="sign-in-btn" onClick={e=>setMarg(!marg)}>
                                            Sign In
                                    </button>   
                            </div>

                            {/* <img src ={deskplay} className="image" alt="" /> */}
                        </div>
                    </div>

                </div>
            </div>
            </div>

            {showModal && <>
             <Modal
                  title = {'Forgot Password'}
                  closeModal = {(e)=>setShowModal(!showModal)}
                   hideClose
                   hideConfirm
                    content={
                         <form className="sign-in-form" onSubmit={submitForgot}>
                              <p>enter email address</p>
                                <div className="input-field">
                                    <i className="fa fa-envelope"></i>
                                    <input type="email" placeholder="email address" name="username" required/>
                                </div>

                                    <button type="submit" value="login" className="reg-btn forgot-btn solid bg-brightRed text-white"> submit {loading && <i className="fa fa-spin fa-circle-o-notch"></i>} </button>
                            </form>
                    }
                    /></>}

        </>
    )    

}

export default Login;

