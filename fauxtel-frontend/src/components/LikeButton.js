import React from 'react';


class LikeButton extends React.Component {

    state = {
        likes: false

    }

    // this.setState((prevstate, props) => {
    //     return {counter: state.counter + props.step};
    //   });

    handleOnClick = () => {
       console.log("Like room button clicked")
     
            // this.setState({
            //     likes: !this.state.likes
            // })

            this.setState((prevState) => {
                return {likes: !prevState.likes}
            } )
      
      

    }

    render(){
        return(
            <div>
                <button onClick={this.handleOnClick}>
                    {this.state.likes ? "I like this Room" : "Like Room" }
                </button>
            </div>

           


        )
    }






}


export default LikeButton