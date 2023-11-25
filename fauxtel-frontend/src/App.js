import React from 'react';
import './App.css';
import './styles/booknow.css'
import { connect } from 'react-redux'
import UserNav from './containers/UserNav.js'
import BookNav from './containers/BookNav.js'
import { getCurrentUser } from './actions/currentUser.js'
import HomeView from './containers/HomeView';
import SignUp from './components/SignUp.js';
import { Outlet, Route, Routes } from 'react-router-dom';
import Login from './components/Login.js';
import UserReservationView from './components/UserReservationView.js';
import UserReservations from './components/UserReservations.js';
import LocationDesc from './components/LocationDesc.js';
import Rooms from './components/Rooms.js';
import Locations from './components/Locations.js';
import FFVenues from './components/FFVenues.js';
import BookNow from './components/BookNow.js';



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
       console.log('process: ', process.env)


        return (
            <div className="App">
                <header className="App-header">
                    <img src='fauxtellogo2.svg' className="App-logo" alt="logo" />
                    <span className="UserNav"><UserNav /></span>
                </header>

                <Routes>
                    <Route index path="/" element={<HomeView />} />

                    <Route exact path='/signup' element={<SignUp />}/>
                    <Route exact path='/login' element={<Login />}/>

                    <Route exact path='/view-reservations' element={<UserReservations />}/>
                    <Route exact path='/view-reservations/:id' render={props => {
                            const res = allReservations.find(element => element.id.toString() === props.match.params.id)
                            // userReservations.find(res => console.log(typeof res.id))
                            // console.log(typeof props.match.params.id)
                            return <UserReservationView res={res} {...props}/>
                        }
                    }/>
                    <Route exact path='/room-types' element={<Rooms/>}/>
                    <Route exact path='/locations' component={<Locations/>}/>
                    <Route exact path='/locations/:id' render={props => {   
                            const loc = this.props.locations.find(element => element.id.toString() === props.match.params.id)
                            // userReservations.find(res => console.log(typeof res.id))
                            // console.log(typeof props.match.params.id)
                            
                            return <LocationDesc loc={loc} {...props}/>
                        }
                    }/>
                    <Route exact path='/venues' component={<FFVenues/>}/>
                    <Route exact path="/booknow" render={(routerProps) => <BookNow {...routerProps} reservations={this.props.reservations}  />} ></Route>        
                </Routes>

                <div className="BookNowWrapper">
                    <BookNav />
                </div>

                <div>
                    {/* <HomeView /> */}
                    <Outlet/>
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
