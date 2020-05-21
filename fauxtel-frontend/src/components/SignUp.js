import React from 'react'
import {connect} from 'react-redux'
import { signup } from '../actions/currentUser.js'

class SignUp extends React.Component {
    state = {
        first_name: "",
        last_name: "",  
        email: "",
        password: "",
      
    }
  
    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  
    handleSubmit = event => {
      event.preventDefault()

      this.props.signup(this.state)
      this.setState({
            first_name: "",
            last_name: "",
            email: "",
            password: ""
            
      })
    }

    render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <input type="text" name="first_name"  placeholder="first_name" value={this.state.first_name} onChange={this.handleChange}></input>
            <input type="text" name="last_name"  placeholder="last_name" value={this.state.last_name} onChange={this.handleChange}></input>
            <input type="text" name="email"  placeholder="email" value={this.state.email} onChange={this.handleChange}></input>
            <input type="password" name="password"  placeholder="password" value={this.state.password} onChange={this.handleChange}></input>
            <input type="submit" value="Sign Up"></input>

        </form>
    )
}
}

export default connect(null, {signup})(SignUp)




