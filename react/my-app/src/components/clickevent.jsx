import React from 'react'

function ClickButton() {
    const handleClick = () => {
        alert('Button clicked!')
    }

    return (
        <div id ="clickButtonContainer">
            <button id ="clickButton" onClick={handleClick}>Click Me</button>
        </div>

    );
}
export default ClickButton;