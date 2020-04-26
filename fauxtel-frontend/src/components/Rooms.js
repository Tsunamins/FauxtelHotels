import React from 'react'
import {Route, Link} from 'react-router-dom' //enables link tags
import { connect } from 'react-redux'
import { getRooms } from '../actions/getRooms.js'

class Rooms extends React.Component {

    render() {
      return (
          <div>
            {this.props.rooms.rooms.map(room =>
              <li key={room.id}>{room.room_number}</li>
            )}
          </div>
        )
      }
    }
    
    export default connect(null, {getRooms})(Rooms)




// const Rooms = (props) => {

//     return (
//       <div>
//         {/* {props.rooms.map(room =>
//           <li key={room.id}>
//             {room.number}
//           </li> )} */}
//       </div>
     
  
//     )
//   }
  
//   export default Rooms