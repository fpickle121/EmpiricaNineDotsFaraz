import React from "react";
import Slider from "meteor/empirica:slider";
import GameBoard from "./GameBoard";

export default class TaskResponse extends React.Component {
  
  
  handleChange = num => {
    const { player } = this.props;
    const value = Math.round(num * 100) / 100;
    player.round.set("value", value);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.player.stage.submit();
  };

  renderSubmitted() {
    return (
      <div className="task-response">
        <div className="response-submitted">
          <h5>Waiting on other players...</h5>
          Please wait until all players are ready
        </div>
      </div>
    );
  }

  renderGameBoard(){

    return(
      // passes in all the props to the GameBoard Component so that it can access the database
      <GameBoard {...this.props}/>
    );

  }

  render() {
    const { player } = this.props;

    // If the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }

    return (
      <div className="task-response">
        <form onSubmit={this.handleSubmit}>
          {this.renderGameBoard()}

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
