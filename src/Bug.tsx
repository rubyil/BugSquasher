import React, {useState} from 'react'
import image from './assets/bug.png'

function calculateAngle(x: number,y: number): number { // accepts object's x and y and returns degrees
  // The object's position can be considered at apex near accute angle of right angle triangle with window's center at opposite appex near right angle. To to determine the value of accute angle that the object has to be turned in order to face window's center we utilize the tangent of accute angle near the object and convert radians to degrees.
  // x and y of window's center
  const Ox = window.innerWidth / 2;
  const Oy = window.innerHeight / 2;
  // in order to utilize tangent we have to find out the length of both cats
  let a: number; // the near cat
  let b: number; // the far cat
  // object can be top left, top right, bottom left, or bottom right of the window's center therefor it's cats would have to be calculated differently
  // top left
  if(x <= Ox && y <= Oy) {
    a = Ox - x;
    b = Oy - y;
    return catToDeg(a,b);
  }
  // top right
  if(x > Ox && y <= Oy) {
    a = x - Ox;
    b = Oy - y;
    return 180 - catToDeg(a,b);
  }
  // bottom left
  if(x < Ox && y > Oy) {
    a = Ox - x;
    b = y - Oy;
    return -1 * catToDeg(a,b);
  }
  // bottom right
  if(x > Ox && y > Oy) {
    a = x - Ox;
    b = y - Oy;
    return 180 + catToDeg(a,b);
  }
  function catToDeg(a: number,b: number): number { //accepts cats lengths and returns degrees of the closest angle
    return (Math.tan(b / a) * 180) / Math.PI; 
  }
  return 0; 
}

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
      <span >dead</span>}
      </div>
      )
}

export default React.memo(Bug);
