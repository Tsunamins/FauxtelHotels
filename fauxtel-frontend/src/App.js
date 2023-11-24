import React from 'react';
// import logo from './fauxtellogo2.svg';
import './App.css';
import './styles/booknow.css'
import { connect } from 'react-redux'
import UserNav from './containers/UserNav.js'
import BookNav from './containers/BookNav.js'
import { getCurrentUser } from './actions/currentUser.js'
import HomeView from './containers/HomeView';
import SignUp from './components/SignUp.js';



class App extends React.Component {

    componentDidMount = () => {
        this.props.getCurrentUser()
    }

    render() {
        const { loggedIn } = this.props
        let currentUser = this.state

        return (
            <div className="App">
                <header className="App-header">
                    <img src='fauxtellogo2.svg' className="App-logo" alt="logo" />
                    <span className="UserNav"><UserNav /></span>
                </header>

                <div className="BookNowWrapper">
                    <BookNav />
                </div>

                <div>
                    <HomeView />
                </div>
                <div>Test section</div>
                <SignUp/>
            </div>

        );

    }
}

const mapStateToProps = state => {
    return ({

        loggedIn: !!state.currentUser

    })
}

export default connect(mapStateToProps, { getCurrentUser })(App);
