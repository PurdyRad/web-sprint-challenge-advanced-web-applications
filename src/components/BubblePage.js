import React, { useEffect, useState } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  //axios call to get bubble color data
  const bubbleColorSetter = () =>{
    axios.get('http://localhost:5000/api/colors', {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    .then(res => {
      console.log('resBP:', res)
      setColorList(res.data)
    })
    .catch(err =>{
      console.log({'err:': err})
    })
  }
 
  //setting into state on initial render
  useEffect(() => {
     bubbleColorSetter();
  }, [])

  //returning beautiful colors
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

//Task List:
//1. Make an axios call to retrieve all color data and push to state on mounting.
