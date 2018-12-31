import React, {Component} from "react";
import "./Palette.css"

const Color = ({color, onSelect ,selected}) => {
    return (
        <span className={`palette-${color} color ${selected? "selected" :""}`} onClick={()=>{onSelect(color)}}></span>
    );
}

class Palette extends Component{
    
    render(){
        const {colors, selected, onSelect} = this.props;
        return(
            <div className="palette">
                {
                colors.map(color=>(
                    <Color 
                        color={color}
                        selected={selected} 
                        onSelect={onSelect} 
                        key={color}
                    />  
                ))
                }
            </div>
        );
    }    
}

export default Palette;