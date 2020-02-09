import React, { Component } from 'react'
import FormInput from '../form_input/FormInput'
import CustomButton from '../custom_button/CustomButton'
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import './sign_in.scss'

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }
    handleChange = e => {
        const { value, name } = e.target;

        this.setState({
            [name]: value
        })
    }

    handleSubmit = async e => {
        e.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password)
        } catch (error) {

        }

        this.setState({
            email: '',
            password: ''
        })
    }
    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span> Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput name='email' type='email' label='Email' value={this.state.email} handleChange={this.handleChange} required />

                    <FormInput name='password' type='password' label='Password' value={this.state.password} handleChange={this.handleChange} required />
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn
