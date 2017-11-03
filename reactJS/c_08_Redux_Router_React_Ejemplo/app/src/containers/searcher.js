import React, { Component } from 'react';
import { SearchFilter, TeacherList } from './../components';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { filterTeachers } from './../actions/searcher';

class Searcher extends Component {
  componentDidMount () {
    if (this.props.filter) {
      this.props.onFilter({
        text: this.props.filter
      });
    }
  }
  render () {
    return (
      <div className="App">
        <SearchFilter onFilter={this.props.onFilter} filter={this.props.filter}/>
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

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps.match.params,
    ...state.searcher
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFilter: (filter) => dispatch(filterTeachers(filter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Searcher);
