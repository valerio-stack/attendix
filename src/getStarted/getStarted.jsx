import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import NProgress from 'nprogress'
import nProgress from "nprogress"


export default function SignUp_signIn(props) {
    let [isSignUp, set_isSignUp] = useState(true)
    let [showError, set_showError] = useState({fullname: false, email: false, password: false})
    let [errorFromServer, set_errorFromServer] = useState(null)

    let formRef = useRef(null)
    let fullnameInputRef = useRef(null)
    let emailInputRef = useRef(null)
    let passwordInputRef = useRef(null)
    let errorFromServerRef = useRef(null)
    const navigate = useNavigate()


    function handle_click(event) {
        nProgress
        event.preventDefault()

        let form = new FormData(formRef.current)
        let fullname = form.get('fullname_input').toLocaleLowerCase().trim()
        let email = form.get('email_input').toLocaleLowerCase().trim()
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        let password = form.get('password_input').trim()

        if (fullname.length <= 3) {
            fullnameInputRef.current.style.border = '1.1px solid rgb(255, 0, 0)'
            set_showError((prev) => ({...prev, fullname: true}))
        } 
        if (!emailPattern.test(email)) {
            emailInputRef.current.style.border = '1.1px solid rgb(255, 0, 0)'
            set_showError((prev) => ({...prev, email: true}))
        } 
        if (password.length <= 4) {
            passwordInputRef.current.style.border = '1.1px solid rgb(255, 0, 0)'
            set_showError((prev) => ({...prev, password: true}))
        }

        /* ------------------------------------------ */

        if (fullname.length >= 3 && emailPattern.test(email) && password.length >= 4) {
            NProgress.start()
            fetch(`http://localhost:3000/post${ isSignUp ? 'SignUpDatas' : "SignInDatas" }`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({fullname, email, password}),
                credentials: "include"
            })
                .then((res) => res.json())
                .then((res) => {
                    NProgress.done()
                    if (res.showError === true) {set_errorFromServer(res.message)} 
                    else {
                        set_errorFromServer(null)
                        props.set_cookie(document.cookie)
                        navigate('/')
                    }
                })
                .catch((err) => {
                    console.log(err);
                    set_errorFromServer('Server error! Try again later!')
                })
        }
    }


    function handle_change(event) {
        let form = new FormData(formRef.current)
        let fullname = form.get('fullname_input')
        let email = form.get('email_input')
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        let password = form.get('password_input')

        if (event.target === fullnameInputRef.current) {
            if (fullname.length >= 3) {
                fullnameInputRef.current.style.border = '1.4px solid white'
                set_showError((prev) => ({...prev, fullname: false}))
            } else { fullnameInputRef.current.style.border = '1.4px solid rgb(143, 143, 143)' }
        }

        if (event.target === emailInputRef.current) {
            if (emailPattern.test(email)) {
                emailInputRef.current.style.border = '1.4px solid white'
                set_showError((prev) => ({...prev, email: false}))
            } else { emailInputRef.current.style.border = '1.4px solid rgb(143, 143, 143)' }
        }

        if (event.target === passwordInputRef.current) {
            if (password.length >= 4) {
                passwordInputRef.current.style.border = '1.4px solid white'
                set_showError((prev) => ({...prev, password: false}))
            } else { passwordInputRef.current.style.border = '1.4px solid rgb(143, 143, 143)' }
        }
    }


    return (
        <>
            <div className="getStarted_page">
                <form 
                    className={
                        Object.values(showError).includes(false) ? "form_getStarted" : "form_getStartedWError"
                    } 
                    ref={formRef}
                >
                    <h1>{isSignUp ? "Sign up" : "Sign in"}</h1>
                    { errorFromServer !== null && 
                        <p ref={errorFromServerRef} className="errorFromServerText">{errorFromServer}</p>
                    }
                    
                    <div className="fullname_container">
                        <input type="text" placeholder="Fullname" name="fullname_input" ref={fullnameInputRef} onChange={handle_change} autoComplete="off"/>
                        { showError.fullname && 
                            <div className="error_container">
                                <i className="fa-solid fa-circle-exclamation"></i>
                                <p>Your name must at least be 4 characters long!</p>
                            </div>
                        }
                    </div>
                    
                    <div className="email_container">
                        <input type="text" placeholder="Email" name="email_input" ref={emailInputRef} onChange={handle_change} autoComplete="off"/>
                        { showError.email &&
                            <div className="error_container">
                                <i className="fa-solid fa-circle-exclamation"></i>
                                <p>Invalid email!</p>
                            </div>
                        }
                    </div>

                    <div className="password_container">
                        <input type={true ? "password" : "text"} placeholder="Password" name="password_input" ref={passwordInputRef} onChange={handle_change} autoComplete="off"/>
                        { showError.password &&
                            <div className="error_container">
                                <i className="fa-solid fa-circle-exclamation"></i>
                                <p>Your password must at least be 4 characters long!</p>
                            </div>
                        }
                    </div>

                    <button onClick={handle_click}>{isSignUp ? "Sign up" : "Sign in"}</button>
                    <p>{"Already has an account? "}
                        <a href="" 
                            onClick={() => {
                                event.preventDefault()
                                set_isSignUp((prev) => !prev)
                            }}
                        >{isSignUp ? "Sign in" : "Sign up"}</a>
                    </p>
                </form>
            </div>
        </>
    )
}