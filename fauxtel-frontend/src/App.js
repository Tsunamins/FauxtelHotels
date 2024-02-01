import React, { useEffect, useState } from 'react';

import './styles/BookNow.css';
import { useDispatch, useSelector } from 'react-redux'

import { getCurrentUser } from './actions/currentUser.js'
import { SignUp } from './components/SignUp.js';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login.js';
// import { UserReservationView } from './components/UserReservationView.js';
import { UserReservations } from './components/UserReservations.js';
import { LocationDesc } from './components/LocationDesc.js';
import { Rooms } from './components/Rooms.js';
import { Locations } from './components/Locations.js';
import { BookNow } from './components/BookNow.js';
import { FauxVenues } from './components/FauxVenues.js';
import { Header } from './containers/Header.js';
import { getLocs } from './actions/getLocations.js';
import { Welcome } from './containers/Welcome.js';
import { UserReservationView } from './components/UserReservationView.js';



function App() {
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch();
    const locations = useSelector(state => state.locations);
    const [isLoggedIn, setIsLoggedIn]  = useState(currentUser);
    const [userReservations, setUserReservations] = useState(currentUser && currentUser.attributes.reservations || [])
    useEffect(() => {
        dispatch(getLocs())
        dispatch(getCurrentUser())
    }, []);

    useEffect(() => {
        currentUser && setUserReservations(currentUser.attributes.reservations)
    }, [currentUser]);


    return (
        <div className="App">
            <Header />
            <Routes>
                <Route exact path='/' element={<Welcome />}/>
                <Route exact path='/signup' element={<SignUp />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/room-types' element={<Rooms />} />
                <Route exact path='/locations' element={<Locations />} />
                {locations.map((loc, i) =>
                    <Route key={`${loc.id}`} path={`/locations/${loc.id}`} element={<LocationDesc loc={loc} />} />
                )}
                <Route exact path='/venues' element={<FauxVenues />} />
                <Route exact path='/booknow' element={<BookNow flowType='new' />} />
                <Route exact path='/view-reservations' element={<UserReservations currentUser={currentUser} />} />
                {userReservations && userReservations.map((res, i) =>
                    <Route 
                        key={`${res.id}`} 
                        path={`/view-reservations/${res.id}`} 
                        element={<UserReservationView reservation={res} userReservations={userReservations}/>} 
                    />
                )}


            </Routes>
        </div>

    );

}

export default App;
