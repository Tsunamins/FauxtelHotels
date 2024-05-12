import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { SignUp } from './components/SignUp.tsx';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login.tsx';
import { UserReservations } from './components/UserReservations.tsx';
import { LocationDesc } from './components/LocationDesc.tsx';
import { Rooms } from './components/Rooms.tsx';
import { Locations } from './components/Locations.tsx';
import { BookNow } from './components/BookNow.tsx';
import { FauxVenues } from './components/FauxVenues.tsx';
import { Header } from './containers/Header.tsx';
import { Welcome } from './containers/Welcome.tsx';
import { UserReservationView } from './components/UserReservationView.tsx';
import './styles/BookNow.css';
import { fetchLocations, selectAllLocations } from './store/reducerSlices/locationsSlice.ts';
import { fetchCurrentUser, selectCurrentUser } from './store/reducerSlices/currentUserSlice.ts';
import { AppDispatch } from './store/store.ts';


function App() {
    const dispatch = useDispatch<AppDispatch>();
    const locations = useSelector(selectAllLocations);
    const locationsStatus = useSelector((state) => state.locations.status);
    const currentUser = useSelector(selectCurrentUser);
    const currentUserStatus = useSelector((state) => state.currentUser.status)
    const [userReservations, setUserReservations] = useState(currentUser && currentUser.attributes.reservations || []);
    
    useEffect(() => {
        if (currentUserStatus === 'idle'){
            dispatch(fetchCurrentUser())
        }
    }, [currentUserStatus]);

    useEffect(() => {
        currentUser && setUserReservations(currentUser.attributes.reservations)
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
                <Route path='/' element={<Welcome />}/>
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<Login />} />
                <Route path='/room-types' element={<Rooms />} />
                <Route path='/locations' element={<Locations />} />
                {locations.length > 0 && locations.map((loc, i) => 
                    <Route key={`${loc.id}`} path={`/locations/${loc.id}`} element={<LocationDesc location={loc} />} />
                )}
                <Route path='/venues' element={<FauxVenues />} />
                <Route path='/booknow' element={<BookNow />} />
                <Route path='/view-reservations' element={<UserReservations currentUser={currentUser} />} />
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
