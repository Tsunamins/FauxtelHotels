import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, Route, Switch, withRouter } from 'react-router-dom'
import HomeNavLinks from '../links/HomeNavLinks.js'
import { getRooms } from '../actions/getRooms.js'
import { getLocs } from '../actions/getLocations.js'
import RoomDesc from '../components/RoomDescriptions.js'
import Rooms from '../components/Rooms.js'
import Locations from '../components/Locations.js'
import LocationDesc from '../components/LocationDesc.js'
import FFVenues from '../components/FFVenues.js'



class HomeView extends React.Component {
    componentDidMount(){
        this.props.getRooms()
        this.props.getLocs()
    }

     
    render(){
        console.log(this.props)
     

    
   
      return (
        <div className="Home">
            Home Page View Goals:
            <br></br>
            Room Types, Locations (some coming soon), and Hopefully something else like amenities page or restaurants/nightlife page
            <HomeNavLinks />
          <Switch>
             <Route exact path='/room-types' component={Rooms}/>
             <Route exact path='/locations' component={Locations}/>
             <Route exact path='/locations/:id' render={props => {
              
              const loc = this.props.locations.find(element => element.id.toString() === props.match.params.id)
              // userReservations.find(res => console.log(typeof res.id))
              // console.log(typeof props.match.params.id)
            
              return <LocationDesc loc={loc} {...props}/>
            }
          }/>
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