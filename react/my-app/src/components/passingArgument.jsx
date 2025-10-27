function GreetUser(){
    const greet = (name) => {
        alert(`Hello, ${name}`);
    };
    return (
        <div id="greetUserContainer">
            <button id="greetUserButton" onClick={() => greet('Alice')}>Greet Alice</button>
            <button id="greetUserButtonBob" onClick={() => greet('Bob')}>Greet Bob</button>
        </div>
    );
}

export default GreetUser;