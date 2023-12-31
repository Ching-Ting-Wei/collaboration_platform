import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../../context/AuthProvider";
import axios from '../../api/axios';
import styled from "styled-components";
const LOGIN_URL = '/auth';

const All = styled.div`
    margin-top: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SignInButton = styled.div`
    margin-top: 14px;
`;

const Line = styled.div`
    text-decoration: underline;

`;

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));
      
            // const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles;
            // setAuth({ user, pwd});
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            // errRef.current.focus();
        }
    }

    return (
        <All>
            {success ? (
                <section>
                    <h1>You are logged in! {user}</h1>
                    <br />
                    <p>
                        <a href="#/grouppage">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <SignInButton></SignInButton>
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <Line>
                            {/*put router link here*/}
                            <a href="#/register">Sign Up</a>
                        </Line>
                    </p>
                </section>
            )}
        </All>
    )
}

export default Login