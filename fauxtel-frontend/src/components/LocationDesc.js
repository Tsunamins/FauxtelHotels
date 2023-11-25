import React from 'react';
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'


function LocationDesc(props) {

    //  console.log(loc)
    const { loc } = useParams();


    return (
        loc ?
            <div>
                <p>{loc.attributes.name} </p>
                <p>{loc.attributes.city}, {loc.attributes.state}   </p>
                <p>{loc.attributes.description}  </p>
                <p>Number of Rooms: {loc.attributes.rooms.length} </p>
            </div> :
            <div>Loc display issue</div>
    )


}

const mapStateToProps = state => {
    return ({
        locations: state.locations
    })
}


export default connect(mapStateToProps)(LocationDesc)