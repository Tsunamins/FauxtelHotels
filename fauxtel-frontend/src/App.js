import React from 'react';
import './App.css';
import './styles/booknow.css'
import { connect } from 'react-redux'

import BookNav from './containers/BookNav.js'
import { getCurrentUser } from './actions/currentUser.js'
import SignUp from './components/SignUp.js';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login.js';
import UserReservationView from './components/UserReservationView.js';
import UserReservations from './components/UserReservations.js';
import LocationDesc from './components/LocationDesc.js';
import { Rooms } from './components/Rooms.js';
import { Locations } from './components/Locations.js';
import BookNow from './components/BookNow.js';
import FauxVenues from './components/FauxVenues.js';
import { Header } from './containers/Header.js';



class App extends React.Component {

    componentDidMount = () => {
        this.props.getCurrentUser()
    }

//     <Routes>
//     {/* todo error page isn't working in this setup */}
//     <Route path="*" errorElement={<ErrorPage />} />
//     <Route index path="/" element={<HeroSection />}/>
//     <Route path="/about" element={<About isLoading={isLoading}/>}/>
//     <Route path="/connect" element={<Connect isLoading={isLoading}/>}/>
//     <Route path="/projects" element={<Projects isLoading={isLoading}/>}/>
//     <Route path="/live-demos" element={<GameDemo pointerType={pointerType}/>}/>
//     <Route path="/resume" element={<Resume isLoading={isLoading}/>}/>
//     <Route path="/blog" element={<Blog posts={CurrentBlogPosts}/>}/>
//     {CurrentBlogPosts && CurrentBlogPosts.map((p, i) => 
//         <Route key={`${i}-${p.blogURL}`} path={`/${p.blogURL}`} element={<BlogRead title={p.title} blogContent={p.content}/>}/>
//     )}
//   </Routes>



    render() {
        const { loggedIn } = this.props
        let currentUser = this.state
       const allReservations = this.props.reservations
    //    console.log('process: ', process.env)


        return (
            <div className="App"> 
                <Header/>

                <Routes>
                    <Route exact path='/signup' element={<SignUp />}/>
                    <Route exact path='/login' element={<Login />}/>

                    <Route exact path='/view-reservations' element={<UserReservations />}/>
                    <Route exact path='/view-reservations/:id' render={props => {
                            const res = allReservations.find(element => element.id.toString() === props.match.params.id)
                            return <UserReservationView res={res} {...props}/>
                        }
                    }/>
                    <Route exact path='/room-types' element={<Rooms/>}/>
                    <Route exact path='/locations' element={<Locations />}/>
                    <Route exact path='/locations/:id' render={props => {   
                            const loc = this.props.locations.find(element => element.id.toString() === props.match.params.id)
                            return <LocationDesc loc={loc} {...props}/>
                        }
                    }/>
                    <Route exact path='/venues' element={<FauxVenues />}/>
                    <Route exact path="/booknow" render={(routerProps) => <BookNow {...routerProps} reservations={this.props.reservations}  />} ></Route>        
                </Routes>

                <div className="BookNowWrapper">
                    <BookNav />
                </div>

                {/* <div>Test section</div>
                <SignUp /> */}
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
