import React from "react";

export default class TaskStimulus extends React.Component {
  render() {
    const { round, stage, player } = this.props;

    return (
      <div className="task-stimulus">
        Welcome to Empirica! Look at these 9 dots.
      </div>
    );
  }
}
