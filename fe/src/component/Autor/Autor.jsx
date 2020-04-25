import React from 'react'
import head_img from '../../assets/image/avatar.jpg'
import './autor.css'
export default class Autor extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="autor">
        <div id="img">
          <img src={head_img} alt='暂时不管了'/>
        </div>
        <div id='autor_name'>暂时不管了</div>
      </div>
    )
  }
}