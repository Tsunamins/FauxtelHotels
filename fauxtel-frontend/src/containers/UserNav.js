import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, Route, Switch, withRouter } from 'react-router-dom'
import UserNavLinks from '../links/UserNavLinks.js'
import UserAuthLinks from '../links/UserAuthLinks.js'
import Logout from '../components/Logout.js'
import SignUp from '../components/SignUp.js'
import Login from '../components/Login.js'
import UserResv from '../components/UserReservations.js'
import UserResvView from '../components/UserReservationView.js'
import { getUserReservations } from '../actions/buildReservation.js'
import { getCurrentUser } from '../actions/currentUser.js'
import ModifyResv from '../components/ModifyReservation.js'



class UserNav extends React.Component {

    componentDidMount() {
      this.props.getCurrentUser()
    }
  
    render(){
    
      const { loggedIn, currentUser} = this.props

      //current serializer can either get all reservations.rooms passed to next component
     
       const allReservations = this.props.reservations.reservations
  

      const userReservations = loggedIn ? currentUser.attributes.reservations : []

    
   
      return (
        <div className="App">
          { loggedIn ? <UserNavLinks userReservations={this.props.currentUser.attributes.reservations}/> : <UserAuthLinks/> }
          <Switch>
            <Route exact path='/signup' component={SignUp}/>
            <Route exact path='/login' component={Login}/>

            <Route exact path='/view-reservations' component={UserResv}/>
            <Route exact path='/view-reservations/:id' render={props => {
              
                const res = allReservations.find(element => element.id.toString() === props.match.params.id)
                // userReservations.find(res => console.log(typeof res.id))
                // console.log(typeof props.match.params.id)
              
                return <UserResvView res={res} {...props}/>
              }
            }/>
            <Route exact path='/modify-reservation/:id/edit' render={props => {
            
            const res = allReservations.find(element => element.id.toString() === props.match.params.id)
         
                return <ModifyResv res={res} {...props}/>
              }
            }/>
       
            
          </Switch>
        </div>
      );
  
    }
  }
  
  const mapStateToProps = state => {
   
    return ({
        reservations: state.reservations,
        currentUser: state.currentUser,
      loggedIn: !!state.currentUser,
      //userReservations: state.currentUser.attributes.reservations
    })
  }
  
  export default withRouter(connect(mapStateToProps, { getCurrentUser })(UserNav));
























//style of navigation works, but does not get a match of url id with specific reservation id
// const UserNav = ({currentUser, loggedIn}) => {
 
//     return (
//         <div className="UserNav">
//             <Switch>
//                 <Route path="/login">
//                     <Login />
//                 </Route>
//                 <Route path="/signup">
//                     <SignUp />
//                 </Route>
//             </Switch>
            
//             <h2>{ loggedIn ? 
//                     <>
//                         <p>Logged in as {currentUser.attributes.first_name}</p>
//                         <Logout />
//                         <div>
//                             <UserNavLinks />
//                         </div>
//                         <Switch>  
//                             {/* <Route exact path='/view-reservations/:id' render={currentUser => {
//                                 const res = currentUser.attributes.reservations.find(res => res.id === currentUser.match.params.id)
//                                 return <UserResvView res={res} {...currentUser}/>
//                             }
//                             }/> */}

//                             <Route path="/view-reservations/:id"><UserResvView /></Route> 
//                             <Route path="/view-reservations" > <UserResv /> </Route>
//                         </Switch>   
                      
//                     </> 
//                 : 
//                     "Not logged in"}</h2>    
//         </div>
//     )
// }


// const mapStateToProps = ({currentUser}) => {
//     return ({
//         currentUser,
//       loggedIn: !!currentUser
//     })
//   }
// export default connect(mapStateToProps)(UserNav);

