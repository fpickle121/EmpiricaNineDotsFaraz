import React from "react";
import Slider from "meteor/empirica:slider";

export default class SocialExposure extends React.Component {


  render() {
    const { game, player } = this.props;

    const otherPlayers = _.reject(game.players, p => p._id === player._id);

    if (otherPlayers.length === 0) {
      return null;
    }

    return (
      <div className="social-exposure">
        <p>
          <strong>There are {otherPlayers.length} other players:</strong>
        </p>
      </div>
    );
  }
}
