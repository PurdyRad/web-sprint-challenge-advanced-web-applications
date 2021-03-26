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
  const {id} = useParams();
  const {push} = useHistory();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();

    axiosWithAuth()
    .put(`/api/colors/${id}`, colorToEdit)
    .then(res =>{
      console.log('ColorList res:', res)
      setColorToEdit({ ...colorToEdit, colors: res.data })
      push(`/protected/bubblePage/colors-edit/`)
    })
    .catch(err => {
      console.log({'ColorList err': err})
    })
  };

  //currently not updating state with new colors
  //deleteColor is grabbing undefines, unable to find "id" value,

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`/api/colors/${id}`)
    .then( res => {
      console.log('Deleteres:', res)
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