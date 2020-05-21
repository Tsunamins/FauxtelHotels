import React from 'react'
import {connect} from 'react-redux'
import { login, getCurrentUser } from '../actions/currentUser.js'

class Login extends React.Component {
    state = {
      email: "",
      password: ""
    }
  
    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  
    handleSubmit = event => {
      event.preventDefault()

      this.props.login(this.state)
      this.setState({
            email: "",
            password: ""
      })
    }
    

    render() {
     
    return (
        <form onSubmit={this.handleSubmit}>
            <input type="text" name="email"  placeholder="email" value={this.state.email} onChange={this.handleChange}></input>
            <input type="password" name="password"  placeholder="password" value={this.state.password} onChange={this.handleChange}></input>
            <input type="submit" value="Log In"></input>

        </form>
    )
}
}

export default connect(null, {login})(Login)




