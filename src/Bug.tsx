import React, {useState} from 'react'
import image from './assets/bug.png'
import flipFlop from './assets/flip_flop.png'

const Bug = () => {
const [alive, setAlive] = useState(true);
const toggleAlive = (event: React.MouseEvent) => {
  event.preventDefault();
  setAlive(false) 
}
     
    return  (
      <div onClick={toggleAlive}  >
      {alive ?
        <img  src={image}  />
      : 
        <img src={flipFlop} style={{width: '200px'}} />
      }
      </div>
      )
}

export default Bug;
