import React, { Component } from 'react';

export default class DinamicChildrenDemo extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      show: Boolean(this.props.initialshow),
      images: [
        'https://unsplash.it/150?image=0',
        'https://unsplash.it/150?image=1',
        'https://unsplash.it/150?image=2',
        'https://unsplash.it/150?image=3',
        'https://unsplash.it/150?image=4'
      ]
    };
    this.toggleImages = this.toggleImages.bind(this);
  }

  toggleImages () {
    this.setState({show: !this.state.show});
  }

  render () {
    return (
      <div className='dinamicchildrendemo'>
        <h2 className='dinamiTit'>DinamicChildrenDemo</h2>
        <button onClick={this.toggleImages}>Show / Hide images</button>
        <ul>
          { (!this.state.show) &&
            this.state.images.map((img, index) => {
              return <li key={index}><img src={img} alt='exampleimage'/></li>
            })
          }
        </ul>
      </div>
    )
  }
}
