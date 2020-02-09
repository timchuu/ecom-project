import React from 'react'
import SignIn from '../../components/sign_in/SignIn'
import SignUp from '../../components/sign_up/SignUp'
import './sign_in_sign_up.scss'

const SignInSignUpPage = () => {
    return (
        <div className='sign-in-and-sign-up'>
            <SignIn />
            <SignUp />
        </div>
    )
}

export default SignInSignUpPage

