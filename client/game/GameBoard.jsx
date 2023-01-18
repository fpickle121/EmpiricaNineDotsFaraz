import React, { useState } from "react";

export default class GameBoard extends React.Component{

    constructor(props) {
        super(props);

        // creating the state
        const numOtherPlayers = (this.props.game.players.length);
        const newSocialExposureLineListList = new Array(numOtherPlayers).fill([]);
        this.state = { 
            x: 0, y: 0, 
            pointList: [],
            lineList: [],
            lastClickX: 0, lastClickY: 0,
            clickNumber: 0,
            isFirstClick: true,
            
            // we are implementing the social exposure right into the state
            socialExposureLineListList: newSocialExposureLineListList 

        };

        // binding update functions to state
        this.handleClick = this.handleClick.bind(this); // NECESSARY FOR FUNCTION 
        this.handleMouseMove = this.handleMouseMove.bind(this); // TO REFERENCE STATE
      }
    

    handleClick(event) {

        // retrieving consts for easy access later
        const clickNumber = this.state.clickNumber

        // getting the mouse positions
        const relMouseX = event.nativeEvent.offsetX; // THIS IS NOT IDEAL BECAUSE NATIVE EVENTS
        const relMouseY = event.nativeEvent.offsetY; // DO NOT WORK WELL ACROSS BROWSWERS
        // ^ a better solution would be to get a ref to the div and using getBoundingClientRect()
        
        // creating new arrays to be adjusted and then set as State
        const newPointList = [...this.state.pointList];
        const newLineList = [...this.state.lineList];

        // adding clicked mouse position to the list of points
        newPointList.push({
            id: clickNumber, 
            x: relMouseX, 
            y: relMouseY});

        // creating new line so long as there are enough points and not too many lines
        if (clickNumber>0&&clickNumber<5){

            newLineList.push({

                // setting index
                id: clickNumber-1,

                // getting the first coord by indexing to the last point in the point list
                x1: this.state.pointList[clickNumber-1].x,
                y1: this.state.pointList[clickNumber-1].y,
                x2: relMouseX,
                y2: relMouseY
    
            })

        }

        // database handling
        const { player } = this.props;
        player.round.set("lineList", newLineList);
        player.round.set("pointList", newPointList);

        // state handling
        this.setState({
            lastClickX: relMouseX,
            lastClickY: relMouseY,
            pointList: newPointList,
            lineList: newLineList,
            clickNumber: this.state.clickNumber+1,
            isFirstClick: false
        });

    }
 
    handleMouseMove(event){

        // declaring constants for later
        const relMouseX = event.nativeEvent.offsetX;
        const relMouseY = event.nativeEvent.offsetY;

        // console.log(relMouseX); console.log(relMouseY);
        this.setState({

            x: relMouseX,
            y: relMouseY

        });

        // SOCIAL EXPOSURE
        // the componentDidUpdate() and useEffect() functions were causing me issues
        // so I am goint to update social exposure here

        const { game, player } = this.props;
        const otherPlayers = _.reject(game.players, p => p._id === player._id);

        // runs when more than one player
        if (otherPlayers.length >0){

            // new list for proper state management 
            var newSocialExposureLineListList = [...this.state.socialExposureLineListList];

            // update list with players info
            otherPlayers.map((p, i) =>{
                const lineList = p.round.get("lineList");
                if (lineList != undefined){ newSocialExposureLineListList[i] = lineList; } 
            });
    
            // update state
            this.setState({ socialExposureLineListList: newSocialExposureLineListList }) 
        }

        

    }

    // SVG CONSTANTS
    color = "black";

    // function to generate colors in the render()

    colors = ["red", "green", "blue", "purple", "yellow"]
    other_colors(i, colors){ return colors[(i % colors.length)]; }

    // for other lines of other players
    socal_exposure_stroke_width = 1;

    // subject
    strokeWidth = 3;
    origin = 50;
    side = 400;
    far_pos = this.origin + this.side;
    near_pos = this.origin;

    // the nine dots
    radius = 10;

    // dot x positions
    x_positions = [
        this.origin + this.frac_dist_from_side()*this.side, 
        this.origin + (this.side/2), 
        this.origin + (1-this.frac_dist_from_side())*this.side];

    // dot y positions
    y_positions = [
        this.origin + this.frac_dist_from_side()*this.side, 
        this.origin + (this.side/2), 
        this.origin + (1-this.frac_dist_from_side())*this.side];

    // this oddly named variable is the fraction of the sidelength which is the 
    // space between any side and its nearest dot
    frac_dist_from_side(){
        const { game } = this.props;
        return game.treatment.fractionalDistanceDotFromSide;
    }

    render(){
        return(
            <div onClick={this.handleClick} onMouseMove = {this.handleMouseMove} style={{width: '800px', height: '650px'}}>   
                <p>X: {this.state.x}, Y: {this.state.y}</p>

                {/*DRAWING THE BOARD AND BOARD ELEMENTS*/}
                <svg width = {800} height = {600}> 

                    {/* LINES */}
                    <line id = "line" x1 = {this.near_pos} y1={this.near_pos} x2 = {this.far_pos} y2 = {this.near_pos} stroke = {this.color} strokeWidth={this.strokeWidth}/>
                    <line id = "line" x1 = {this.far_pos} y1={this.near_pos} x2 = {this.far_pos} y2 = {this.far_pos} stroke = {this.color} strokeWidth={this.strokeWidth}/>
                    <line id = "line" x1 = {this.far_pos} y1={this.far_pos} x2 = {this.near_pos} y2 = {this.far_pos} stroke = {this.color} strokeWidth={this.strokeWidth}/>
                    <line id = "line" x1 = {this.near_pos} y1={this.far_pos} x2 = {this.near_pos} y2 = {this.near_pos} stroke = {this.color} strokeWidth={this.strokeWidth}/>

                    {/* DOTS*/}
                    {this.x_positions.map((x, i) => {
                        return this.y_positions.map((y, j) => {
                            return <circle key = {"" + i.toString() + j.toString()} // to avoid the console warning
                                        cx={x} cy={y} r={this.radius} fill="true" />
                        })
                    })}

                    {/* SOCIAL EXPOSURE LINES go first so that they are below subject's lines */}
                    {this.state.socialExposureLineListList.map((l, i)=>{
                        return (l.map((o, j)=> {
                            return (<line id = "line" key = {""+i.toString()+j.toString()}
                                        x1 = {o.x1} y1={o.y1} 
                                        x2 = {o.x2} y2={o.y2} 
                                        stroke = {this.other_colors(i, this.colors)}
                                        strokeWidth={this.social_exposure_stroke_width}/>)
                        }))
                    })}

                    {/* PREVIEW LINE */}
                    {(this.state.clickNumber == 0 || (this.state.lineList.length>=4))? null : // using ternary operator that checks that this is not our fourth 
                        <line id = "line"                                                     // or greater than 5th click*/}
                            x1 = {this.state.lastClickX} 
                            y1 = {this.state.lastClickY} 
                            x2 = {this.state.x}
                            y2 = {this.state.y}
                            stroke = {this.color}
                            strokeWidth = {this.strokeWidth}/> 
                    }

                    {/* PLAYER LINES */}
                    {this.state.lineList.map((o, i)=>{
                        return <line id = "line" key = {i.toString()}
                                    x1 = {o.x1} y1={o.y1} 
                                    x2 = {o.x2} y2={o.y2} 
                                    stroke = {this.color}
                                    strokeWidth={this.strokeWidth}/>
                    })}

                </svg>
                    
            </div>

        );

    }

}