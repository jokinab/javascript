import React from 'react'
import moment from 'moment'

export default function Timeago (props) {
  const timeago = moment(props.date).fromNow()
  return (
    <div>Selected data is from {timeago}</div>
  )
}
