import React, { Component } from 'react';
import Homepage from './pages/homepage/homepage'
import Shop from './pages/shop/Shop'
import Header from './components/header/Header'
import SignInSignUpPage from './pages/sign_in_sign_up/SignInSignUp'
import { Switch, Route } from "react-router-dom";
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
          console.log(this.state)
        })

      } else {
        this.setState({ currentUser: userAuth })
      }

    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/shop' component={Shop} />
          <Route exact path='/signin' component={SignInSignUpPage} />
        </Switch>
      </div>
    )
  }
}

export default App;  
