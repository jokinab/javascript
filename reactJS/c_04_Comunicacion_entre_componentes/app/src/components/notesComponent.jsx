import React from 'react'
import PropTypes from 'prop-types'

export default function Notes (props) {
  const hasNotes = props.notes.length > 0
  return (
    <div className='notes-wrap'>
      <h2 className='notes-title'>{props.title}</h2>
      { hasNotes &&
        <ul className='notes-list'>
          {props.notes.map((note, index) => {
            return <li key={index}>{note}</li>
          })}
        </ul>
      }
      { !hasNotes && <strong>Doesn't have notes</strong> }
    </div>
  )
}

Notes.PropTypes = {
  title: PropTypes.string.isRequired,
  notes: PropTypes.array.isRequired
}
