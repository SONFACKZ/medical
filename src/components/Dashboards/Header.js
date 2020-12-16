import React from 'react'

// function onToggleMenu() {
//     console.log("toggle");
// }

function Header(props){
    return(
        <div className = "ui top inverted attached menu">
            <span className = "item link grey" onClick = {props.onToggleMenu}>Medical</span>
        </div>
    );
}

export default Header;