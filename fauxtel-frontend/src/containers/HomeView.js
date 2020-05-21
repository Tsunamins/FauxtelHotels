import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, Route, Switch, withRouter } from 'react-router-dom'
import HomeNavLinks from '../links/HomeNavLinks.js'
import { getRooms } from '../actions/getRooms.js'
import { getLocs } from '../actions/getLocations.js'
import RoomDesc from '../components/RoomDescriptions.js'
import LocationDesc from '../components/LocationDescriptions.js'
import FFVenues from '../components/FFVenues.js'



class HomeView extends React.Component {
    componentDidMount(){
        this.props.getRooms()
        this.props.getLocs()
    }

     
    render(){
    
     

    
   
      return (
        <div className="Home">
            Home Page View Goals:
            <br></br>
            Room Types, Locations (some coming soon), and Hopefully something else like amenities page or restaurants/nightlife page
            <HomeNavLinks />
          <Switch>
             <Route exact path='/room-types' component={RoomDesc}/>
             <Route exact path='/locations' component={LocationDesc}/>
             <Route exact path='/venues' component={FFVenues}/>
         
       
            
          </Switch>
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
  
  
  export default withRouter(connect(mapStateToProps, {getRooms, getLocs})(HomeView))