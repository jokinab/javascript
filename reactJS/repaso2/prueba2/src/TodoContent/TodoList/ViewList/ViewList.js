import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListRow from './ListRow/ListRow';

export default class ViewList extends Component {
  constructor (...args) {
    super (...args);
    this.state = {
      filterType: '',
      orderBy: ''      
    }
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick (e) {
    this.setState({orderBy: e.target.value})
  }

  render() {
    return (
      <div className="viewlist">
        <table className="table-marvel">
          <thead className="table-head">
            <tr className="head-row">
              {
                Object.keys(this.props.todoListItems[0]).map( (headKey, index) => {
                  return (
                    <th className="head-cell" key={index}><button className="head-button" value={headKey} onClick={ e => this.handleButtonClick(e) }>{headKey}</button></th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              this.props.todoListItems.map( (bodyRow, index) => {
                return (
                  <ListRow itemContent={bodyRow} key={index} />
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

ViewList.propTypes = {
  todoListItems: PropTypes.array
}
