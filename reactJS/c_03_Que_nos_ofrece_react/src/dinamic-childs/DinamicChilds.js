import React, { Component } from 'react'

export class DinamicChildsDemo extends Component {
  constructor (...args) {
    super(...args)
    this.state = {
      show: this.props.initialshow,
      images: [
        'https://unsplash.it/150?image=0',
        'https://unsplash.it/150?image=1',
        'https://unsplash.it/150?image=2',
        'https://unsplash.it/150?image=3',
        'https://unsplash.it/150?image=4'
      ]
    }
    this.showImage = this.showImage.bind(this)
  }

  showImage () {
    const toogleShowState = !this.state.show
    this.setState({ show: toogleShowState })
  }

  render () {
    return (
      <div>
        <h1>Dynamic Children Demo</h1>
        { !this.state.show &&
          <button onClick = {this.showImage}>Show me a bunch of images!</button>
        }
        { this.state.show &&
          this.state.images.map(
            (img, index) => {
              return <img key={index} role='presentation' src={img} />
            }
          )
        }
        { this.state.show &&
          <button onClick = {this.showImage}>Hide me th images!</button>
        }
      </div>
    )
  }
}
