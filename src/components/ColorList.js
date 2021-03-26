import React, { useState } from "react";
import EditMenu from './EditMenu';
import {useParams, useHistory} from 'react-router-dom';

import {axiosWithAuth} from '../helpers/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  // const {id} = useParams();
  // const {push} = useHistory();

  console.log(' current id ', colorToEdit.id)
  console.log('updateColor', updateColors)
  console.log('colortoedit', colorToEdit)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    console.log(e)
    e.preventDefault();

    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res =>{
      console.log('colors id',colors[res.data.id].id)
      console.log('ColorList res:', res)
      updateColors([...colors, res.data])
      // push(`/protected/bubblePage/${colorToEdit.id}`)
    })
    .catch(err => {
      console.log({'ColorList err': err})
    })
  };


  const deleteColour =(id) => {
    updateColors(colors.filter(item => (item.id !== Number(id))))
  }
  //deleteColor is grabbing undefines, unable to find "id" value,
  const deleteColor = color => {
    console.log("color in DC:", color)
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then( res => {
      console.log('Deleteres:', res)
      deleteColour(res.data)
    })
    .catch(err => {
      console.log({'Deleteerr:': err})
    })
  };

  console.log('COLORS', colors)
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.