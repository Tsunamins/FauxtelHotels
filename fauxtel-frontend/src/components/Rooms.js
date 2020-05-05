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
    console.log(this.props.rooms.rooms[0])
    return (
        <div>
          {this.props.rooms.rooms.map(room =>
            <li key={room.attributes.id}>{room.attributes.room_number}</li>
          )}
        </div>
      )
    }
  }
  
  export default connect(null, {getRooms})(Rooms)