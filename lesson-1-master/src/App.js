import React, { Component } from 'react';
import Homepage from './pages/homepage/homepage'
import Shop from './pages/shop/Shop'
import Checkout from './pages/checkout/Checkout'
import Header from './components/header/Header'
import SignInSignUpPage from './pages/sign_in_sign_up/SignInSignUp'
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user_actions'
import { selectCurrentUser } from './redux/user/user_selector';
import './App.css';


class App extends Component {


  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({

            id: snapShot.id,
            ...snapShot.data()

          })

        })


      }
      setCurrentUser(userAuth);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={Shop} />
          <Route exact path='/checkout' component={Checkout} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (
            <Redirect to='/' />
          ) : (<SignInSignUpPage />)} />
        </Switch>
      </div>
    )
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);  
