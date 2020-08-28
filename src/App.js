import React, { useRef } from 'react'
import { useObjects } from "use-tensorflow"
import useCamera from "use-camera"
import './App.css';
function Box({left,top,width,height,label,color,score}){
  return(
  <div style={{
    position:"absolute",
    width:`${width}px`,
    height:`${height}px`,
    top:`${top}px`,
    left:`${left}px`,
    border:`solid 2px ${color}`,
    borderRadius:'5px'
  }}>{label}:{score.toFixed(2)}</div>
  )
}
function App() {
  // const ref = useRef(null);
  const ref = useCamera({ audio: false });
  // const objects = useObjects(ref);
  const objects = useObjects(ref, { modelUrl: "/objects/model.json" });
  let i = 0
  return (
    <div className="App">
      <header className="App-header">
        <div style={{
          position:"relative"
        }}>
          <video ref={ref} autoPlay width="640" height="480" />
          {/* <img ref={ref} src="/living-room.jpg" /> */}
          {objects ? objects.map(({ left, top, width, height, label, score }) => {
            i+=1
            return (
          <Box
            key={i}
            left={left}
            top={top}
            width={width}
            height={height}
            label={label}
            color={score > 0.6 ? "blue" : "red"}
            score={score}
          />
          )
          }) : 'Loading...'}
        </div>
      </header>
    </div>
  );
}

export default App;
