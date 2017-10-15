import React, { Component } from 'react'
import Input from './Input'

const InputList = ({ counter }) => (
  <form>
    {
      Array.apply(null, {length: counter}).map( (_, index) => <Input key={index} /> ) 
  
    }
  </form>
) 

export default InputList;