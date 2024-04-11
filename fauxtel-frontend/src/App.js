import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { SignUp } from './components/SignUp.js';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login.js';
import { UserReservations } from './components/UserReservations.js';
import { LocationDesc } from './components/LocationDesc.js';
import { Rooms } from './components/Rooms.js';
import { Locations } from './components/Locations.js';
import { BookNow } from './components/BookNow.js';
import { FauxVenues } from './components/FauxVenues.js';
import { Header } from './containers/Header.js';
import { Welcome } from './containers/Welcome.js';
import { UserReservationView } from './components/UserReservationView.js';
import './styles/BookNow.css';
import { fetchLocations, selectAllLocations } from './store/reducerSlices/locationsSlice.js';
import { fetchCurrentUser, selectCurrentUser } from './store/reducerSlices/currentUserSlice.js';



function App() {
    const dispatch = useDispatch();
    const locations = useSelector(selectAllLocations);
    const locationsStatus = useSelector((state) => state.locations.status)
    const currentUser = useSelector(selectCurrentUser);
    const currentUserStatus = useSelector((state) => state.currentUser.status)

    const [isLoggedIn, setIsLoggedIn]  = useState(currentUser);
    const [userReservations, setUserReservations] = useState(currentUser && currentUser.attributes.reservations || [])
    useEffect(() => {
        if (currentUserStatus === 'idle'){
            dispatch(fetchCurrentUser())
        }
    }, [currentUserStatus]);

    useEffect(() => {
        if (currentUserStatus === 'successful') {
            currentUser && setUserReservations(currentUser.attributes.reservations)
        }
    }, [currentUser, currentUserStatus]);

    useEffect(() => {
        if (locationsStatus === 'idle' && locations < 1) {
            dispatch(fetchLocations());
        }
    }, [locationsStatus, locations]);

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route exact path='/' element={<Welcome />}/>
                <Route exact path='/signup' element={<SignUp />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/room-types' element={<Rooms />} />
                <Route exact path='/locations' element={<Locations locations={locations} />} />
                {locationsStatus === 'successful' && locations.map((loc, i) => 
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
