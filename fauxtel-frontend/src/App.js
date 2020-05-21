import React from 'react';
import logo from './fauxtellogo.svg';
import './App.css';
import { connect } from 'react-redux'
import UserNav from './containers/UserNav.js'
import BookNav from './containers/BookNav.js'
import { getCurrentUser } from './actions/currentUser.js'
import HomeView from './containers/HomeView';



//function App() {
class App extends React.Component {

  componentDidMount =() => {
    this.props.getCurrentUser()
  }

  render(){
    const { loggedIn} = this.props
    let currentUser = this.state

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="App-link"><UserNav /></p>  
        </header>

        <div>
          <HomeView />
        </div>

        <div>
          <BookNav />
        </div>      
      </div>

  );
  
  }
}

const mapStateToProps = state => {
  return ({
    
    loggedIn: !!state.currentUser
   
  })
}

export default connect(mapStateToProps, {getCurrentUser})(App);
