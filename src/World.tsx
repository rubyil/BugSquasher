import React, {useState, memo, useEffect, useRef} from 'react'
import Bug from './Bug'


function dice(d: number): number { // accepts number of sides as a parameter
  return Math.floor(Math.random() * d) + 1
}

function startingPoint (side: number): [number, number] { // accepts origin side as a parameter and returns tupple [x,y] of the starting point
  let x: number;
  let y: number;
  switch(side) {
    case 1:
    default:
      x = Math.round(400 / dice(6) + 25);
      y = 25;
      break;
    case 2:
      x = 25;
      y = Math.round(400 / dice(6) + 25);
      break;
    case 3:
      x = Math.round(400 / dice(6) + 25);
      y = 400;
      break;
    case 4:
      x = 400;
      y = Math.round(400 / dice(6) + 25);
      break;
    }
    return [x, y]
}

interface Props {
  startingPoint: [number, number];
}

const BugFactory = (props: Props) => {// Accepts starting point as props and produces a bug with x y coordinates of it's starting point
  return <div className='bug' style={{left: `${props.startingPoint[0]}px`, top: `${props.startingPoint[1]}px`}}><Bug /> </div>
}

const World = () => {
  const [bugs, setBugs] = useState<number[]>([]) 
  const [counter, setCounter] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const gameInterval = useRef<ReturnType<typeof setInterval>>()
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  useEffect(() => {
    return (clearInterval(gameInterval.current))
  }, [])
  useEffect(() => {
    if(counter === 60) {
      clearInterval(gameInterval.current)
      gameInterval.current = undefined
      setGameOver(true)
      setBugs([])
    }
  }, [counter])
  useEffect(() => {
    if(isRunning) {
      gameInterval.current = setInterval(
        () => {
	  setCounter((counter) => counter + 1);
	  setBugs([...bugs, counter])
	}, 1000);
      } else {
        clearInterval(gameInterval.current)
	gameInterval.current = undefined
      }
    }, [isRunning]
  );

  function incrementScore() {
    setScore((score) => score + 1)
  }
  
  function start() {
    setIsRunning(true);
  }

  function reset() {
    clearInterval(gameInterval.current);
    gameInterval.current = undefined;
    setCounter(0);
    setScore(0);
    setIsRunning(false);
    setGameOver(false);
  }

  

    return (
    <div className='world'>
      {!gameOver ? 
      <div>
        {!isRunning ?
        <button onClick={start}>"Start"</button>
	:
	<div/>
	}
        <p>{counter}</p> 
        {bugs.map((bug) => 
          <div onClick={incrementScore}>
            <BugFactory  startingPoint={startingPoint(dice(4))}  key={counter} />
          </div>
        )}
      </div> 
      :
      <div>
	<h1>Game Over</h1>
        <p>Final score: {score}</p>
        <button onClick={reset}>Reset</button>
      </div>
      }
      </div>
    )
}

export default World;
