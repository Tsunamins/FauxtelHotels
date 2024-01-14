import React, { useEffect } from 'react';

import './styles/booknow.css'
import { useDispatch, useSelector } from 'react-redux'

import BookNav from './containers/BookNav.js'
import { getCurrentUser } from './actions/currentUser.js'
import { SignUp } from './components/SignUp.js';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login.js';
import UserReservationView from './components/UserReservationView.js';
import UserReservations from './components/UserReservations.js';
import { LocationDesc } from './components/LocationDesc.js';
import { Rooms } from './components/Rooms.js';
import { Locations } from './components/Locations.js';
import { BookNow } from './components/BookNow.js';
import FauxVenues from './components/FauxVenues.js';
import { Header } from './containers/Header.js';
import { getLocs } from './actions/getLocations.js';



function App(){
    const currentUser = useSelector(state => state.currentUser)
    console.log('current user from app: ', currentUser)

    const dispatch = useDispatch();
    const locations = useSelector(state => state.locations)

    useEffect(() => {
        dispatch(getLocs())
        dispatch(getCurrentUser())
        console.log('current user from use effect: ', currentUser)
    }, []);
    // componentDidMount = () => {
    //     this.props.getCurrentUser()
    // }

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


    // render() {
        // const { loggedIn } = this.props
        // let currentUser = this.state
    //    const allReservations = this.props.reservations

        return (
            <div className="App"> 
                <Header/>

                <Routes>
                    <Route exact path='/signup' element={<SignUp />}/>
                    <Route exact path='/login' element={<Login />}/>

                    {/* <Route exact path='/view-reservations' element={<UserReservations />}/>
                    <Route exact path='/view-reservations/:id' render={props => {
                            const res = allReservations.find(element => element.id.toString() === props.match.params.id)
                            return <UserReservationView res={res} {...props}/>
                        }
                    }/> */}
                    <Route exact path='/room-types' element={<Rooms/>}/>
                    <Route exact path='/locations' element={<Locations />}/>
                    {locations.map((loc, i) => 
                        <Route key={`${loc.id}`} path={`/locations/${loc.id}`} element={<LocationDesc loc={loc}/>}/>
                    )}
                    <Route exact path='/venues' element={<FauxVenues />}/>
                    <Route exact path='/booknow' element={<BookNow />}/>
                    <Route exact path='/view-reservations' element={<UserReservations />}/>
                    
                </Routes>


                {/* <div>Test section</div>
                <SignUp /> */}
            </div>

        );

    }
// }

// const mapStateToProps = state => {
//     return ({

//         loggedIn: !!state.currentUser

//     })
// }

export default App;
