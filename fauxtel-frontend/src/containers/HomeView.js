import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import HomeNavLinks from '../links/HomeNavLinks.js'
import { getRooms } from '../actions/getRooms.js'
import { getLocs } from '../actions/getLocations.js'
import RoomDesc from '../components/RoomDescriptions.js'
import Rooms from '../components/Rooms.js'
import Locations from '../components/Locations.js'
import LocationDesc from '../components/LocationDesc.js'
import FFVenues from '../components/FFVenues.js'
import '../styles/home.css'



class HomeView extends React.Component {
    componentDidMount(){
        this.props.getRooms()
        this.props.getLocs()
    }

     
    render(){
        console.log(this.props)
     

    
   
      return (
        <div className="Home">
         
            <HomeNavLinks />

        </div>
      );
  
    }
  }

  const mapStateToProps = state => {
  
      return({
          rooms: state.rooms,
          locations: state.locations
      })
  }
  
  
  export default connect(mapStateToProps, {getRooms, getLocs})(HomeView);