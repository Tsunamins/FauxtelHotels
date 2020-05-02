import React from 'react'
import { connect } from 'react-redux'
import {Route, Link} from 'react-router-dom' //enables link tags
import { getRooms } from '../actions/getRooms.js'


    class BookRoomsData extends React.Component {
       
       
        render() {
            const allRooms = this.props.rooms.rooms

            const locationOne = []
            for (let i = 0; i < allRooms.length; i++){
                if(allRooms[i].location_id === 1)
                locationOne.push(allRooms[i])
            }
            let locationTotal = locationOne.length
            console.log(locationTotal)
          return (
              <div>
                {this.props.rooms.rooms.map(room =>
                  <li key={room.id}>{room.room_number}</li>
                )}
              </div>
            )
          }
        }
        
        export default connect(null, {getRooms})(BookRoomsData)

