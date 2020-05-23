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
      this.props.history.push("/")
      this.setState({
            first_name: "",
            last_name: "",
            email: "",
            password: ""
            
      })
    }

    render() {
    return (
      <div className="SignUp">
        <form onSubmit={this.handleSubmit}>
            <input className="form" type="text" name="first_name"  placeholder="first_name" value={this.state.first_name} onChange={this.handleChange}></input>
            <input className="form" type="text" name="last_name"  placeholder="last_name" value={this.state.last_name} onChange={this.handleChange}></input>
            <br></br>
            <input className="form" type="text" name="email"  placeholder="email" value={this.state.email} onChange={this.handleChange}></input>
            <input className="form" type="password" name="password"  placeholder="password" value={this.state.password} onChange={this.handleChange}></input>
            <br></br>
            <input className="button" type="submit" value="Sign Up"></input>

        </form>
        </div>
    )
}
}

export default connect(null, {signup})(SignUp)




