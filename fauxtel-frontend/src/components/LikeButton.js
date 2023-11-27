import React from 'react';


class LikeButton extends React.Component {

    state = {
        likes: false

    }

    // this.setState((prevstate, props) => {
    //     return {counter: state.counter + props.step};
    //   });

    handleOnClick = () => {
     
            // this.setState({
            //     likes: !this.state.likes
            // })

            this.setState((prevState) => {
                return {likes: !prevState.likes}
            } )
      
      

    }

    render(){
        return(
                <button className='likeButton' onClick={this.handleOnClick}>
                    {this.state.likes ? "I like this Room" : "Like Room" }
                </button>
        )
    }






}


export default LikeButton