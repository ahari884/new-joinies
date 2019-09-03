import React from 'react';
import './SideBar.css';

class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: "view-map",
            options: ["view-map", "report", "timeline"]
        }
        this.optionChanged = this.optionChanged.bind(this);
    }

    optionChanged(option) {
        let vm = this;
        this.setState({
            active: option
        }, function(){
            vm.props.optionChanged(option);
        })
    }

    render() {
        return (
            <div className="sidebar">
                <h1>Dashboard</h1>
                <div className="divider"></div>
                <br />
                {this.state.options.map((option, optionIndex) => {
                    let optionClass = option == this.state.active ?
                        "option-active" : "option";
                    return (
                        <div onClick={(e)=> this.optionChanged(option)} className={optionClass} key={optionIndex}>
                            <h3>{option}</h3>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default SideBar;