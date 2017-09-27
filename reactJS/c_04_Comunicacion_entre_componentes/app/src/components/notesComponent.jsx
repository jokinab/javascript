import React from 'react'
import PropTypes from 'prop-types'

export default function Notes (props) {
  return (
    <div className='notes-wrap'>
      <h2 className='notes-title'>{props.title}</h2>
      <ul className='notes-list'>
        {props.notes}
      </ul>
    </div>
  )
}

Notes.PropTypes = {
  title: PropTypes.string.isRequired,
  notes: PropTypes.array.isRequired
}
