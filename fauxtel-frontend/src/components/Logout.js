import React from 'react'
import { connect } from 'react-redux'
import { logout } from "../actions/currentUser.js"


const Logout = ({logout}) => {
    return (
        <div className="Logout">
            <form onSubmit={logout}>
                <input className="button" type="submit" value="Logout" />
            </form>
        </div>
    )
}

export default connect(null, { logout })(Logout)