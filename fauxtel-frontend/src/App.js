import React from 'react';
import logo from './fauxtellogo.svg';
import './App.css';
import { connect } from 'react-redux'
import Login from './components/Login.js'
import Logout from "./components/Logout.js"
import { getCurrentUser,  } from './actions/currentUser.js'

//function App() {
class App extends React.Component {

  componentDidMount =() => {
    this.props.getCurrentUser()
   

  }

  render(){
    const { loggedIn} = this.props
    const currentUser = this.state
    
  
    
   
  return (
    
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Edit <code>src/App.js</code> and save to reload.</p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
        </header>

        
        <Login />
        
        
        <h2>{ loggedIn ? <><p>Logged in as {currentUser}</p><Logout/></> : "Not logged in"}</h2>
      
      </div>

  );

  }
}

// const mapDispatchToProps = dispatch => ({
//   getCurrentUser: () => dispatch(getCurrentUser())
// })

const mapStateToProps = state => {
  console.log(state.currentUser)
  return ({
    
    loggedIn: !!state.currentUser
   
  })
}

export default connect(mapStateToProps, {getCurrentUser})(App);
