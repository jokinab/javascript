import React, { Component } from 'react';
import { SearchFilter, TeacherList } from './../components';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { filterTeachers } from './../actions/searcher';

class Searcher extends Component {
  render () {
    return (
      <div className="App">
        <SearchFilter onFilter={this.props.onFilter}/>
        <TeacherList teachers={this.props.teachers} />
      </div>
    );
  }
}

Proptypes.Searcher = {
  onFilter: Proptypes.func,
  teachers: Proptypes.arrayOf(Proptypes.shape({
    name: Proptypes.string,
    avatar: Proptypes.string,
    description: Proptypes.string,
    id: Proptypes.string
  }))
};

const mapStateToProps = (state) => {
  return {
    ...state.searcher
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFilter: (filter) => dispatch(filterTeachers(filter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Searcher);
