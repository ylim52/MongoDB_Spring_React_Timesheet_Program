import React, { Component } from 'react';

class Select extends Component {
    
    change=(event)=>{
        console.log("here changed select");
        console.log(event.target.value);
        console.log(this.props.index);
        this.props.changed(this.props.index, event.target.value);
        //this.setState({value: event.target.value});
    }
    
    render () {
        console.log("dddd");
        console.log(this.props.value);
        return (
            <div>
                <select
                    value={this.props.value}
                    onChange={this.change}>
                    {this.props.options.map((option,index) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
}

export default Select;