import React from 'react'
import {Route, Link} from 'react-router-dom' //enables link tags
import { connect } from 'react-redux'
import { getRooms } from '../actions/getRooms.js'




// const Rooms = (props) => {
//   console.log(props)

//   return (
//     <div>
//       {props.rooms.rooms.map(room =>
//         <li key={room.id}>
//           {room.room_number}
//         </li> )}
//     </div>

//   )
// }

// // const mapStateToProps = state => {
// //   return {
// //     rooms: state.rooms
// //   }
// // }

// export default connect(null, {getRooms})(Rooms)


//previous
class Rooms extends React.Component {

  render() {
    // new
      const allRooms = this.props.rooms.rooms
      const locationOne = []
      for (let i=0; i < allRooms.length; i++){
        if(allRooms[i].attributes.location_id === 1){
          locationOne.push(allRooms[i])
        }
      }
      let locationTotal = locationOne.length
      console.log(locationOne)


    console.log(this.props.rooms.rooms[0])
    return (
      // previous
        <div>
          {this.props.rooms.rooms.map(room =>
              <li key={room.attributes.id}>{room.attributes.room_number}</li>
          )}
        </div>
      )
    }
  }
  
  export default connect(null, {getRooms})(Rooms)