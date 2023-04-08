import {useState, useEffect} from "react";

function Square({value, onClick}) {
    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
}

function Board({currentSquares, xIsNext, onPlay}) {
    function clickHandler(i) {
        if (!checkWinner(currentSquares) && !currentSquares[i]) {
            let nextSquares = currentSquares.slice()
            nextSquares[i] = (xIsNext ? "X" : "O");
            onPlay(nextSquares);
        }
    }

    let gameStatus = (xIsNext ? "X" : "O") + "'s Turn"


    let winner = checkWinner(currentSquares)
    if (winner === "X") {
        gameStatus = "X WON!"
    } else if (winner === "O") {
        gameStatus = "O WON"
    }

    return (
        <div className="board">
            <h3 className="status">{gameStatus}</h3>
            <div className="row">
                <Square value={currentSquares[0]} onClick={() => clickHandler(0)}/>
                <Square value={currentSquares[1]} onClick={() => clickHandler(1)}/>
                <Square value={currentSquares[2]} onClick={() => clickHandler(2)}/>
            </div>
            <div className="row">
                <Square value={currentSquares[3]} onClick={() => clickHandler(3)}/>
                <Square value={currentSquares[4]} onClick={() => clickHandler(4)}/>
                <Square value={currentSquares[5]} onClick={() => clickHandler(5)}/>
            </div>
            <div className="row">
                <Square value={currentSquares[6]} onClick={() => clickHandler(6)}/>
                <Square value={currentSquares[7]} onClick={() => clickHandler(7)}/>
                <Square value={currentSquares[8]} onClick={() => clickHandler(8)}/>
            </div>
        </div>
    );
}

export default function Game() {
    let [history, setHistory] = useState([Array(9).fill("")]);
    const [currentMove, setCurrentMove] = useState(0)

    const xIsNext = currentMove % 2 === 0


    function onPlay(nextSquares) {
        setHistory([...history.slice(0, currentMove + 1), nextSquares])
        setCurrentMove(currentMove + 1)
    }

    const historyListItems = history.map((item, index) => {
        let buttonTitle = "Go to game start";
        if (index > 0) {
            buttonTitle = "Go to move #" + index
        }
        return (
            <li key={index}>
                <button onClick={() => {
                    setCurrentMove(index)
                    // setHistory([...history.slice(0, currentMove + 1)])
                }}>
                    {buttonTitle}
                </button>
            </li>
        );
    })

    return (
        <div className="game">
            <Board currentSquares={history[currentMove]} xIsNext={xIsNext} onPlay={onPlay}/>
            <div className="history">
                <ol>{historyListItems}</ol>
            </div>
        </div>
    );
}

function checkWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}