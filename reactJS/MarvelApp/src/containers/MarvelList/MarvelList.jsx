import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMarvelItems } from './../../actions/marvelList'
import PropTypes from 'prop-types'
import MarvelCard from './../../components/MarvelCard/MarvelCard'
import ListPagination from './../../components/ListPagination/ListPagination'
import { IsLoading } from './../../components/IsLoading/IsLoading'

class MarvelListComponent extends Component {
  componentDidMount () {
    this.props.onFetchMarvelItems(this.props.match.params.PageMarvel)
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.PageMarvel !== prevProps.PageMarvel) {
      this.props.onFetchMarvelItems(this.props.PageMarvel)
    }
  }

  render () {
    return (
      <div className="todocontent">
        <div className="container-body">

          <div className="container-pagination">
            { !this.props.isFetching && this.props.marvelItems.length > 0 &&
              <ListPagination baseLink={'/characters/'}
                currentPage={this.props.match.params.PageMarvel}
                totalPages={Math.floor(parseInt(this.props.totalItems) / 20)} /> }
          </div>

          <div className="cards-list">
            { this.props.isFetching && <IsLoading /> }

            { !this.props.isFetching && this.props.marvelItems.length > 0 &&
              this.props.marvelItems.map((item, index) => <MarvelCard key={index} marvelItem={item} />)
            }
          </div>

        </div>
      </div>
    )
  }
}

// Hacemos el tipado de las propiedades del Compnonente.
MarvelListComponent.propTypes = {
  marvelItems: PropTypes.array,
  isFetching: PropTypes.bool,
  isFecthErr: PropTypes.bool,
  totalItems: PropTypes.number,
  onFetchMarvelItems: PropTypes.func
}

// Mapeamos el estado a las propiedades.
const mapStateToProps = (state, ownProps) => {
  return {
    ...state.fetchMarvelItems,
    ...ownProps.match.params
  }
}

// Mapeamos las acciones a las propiedades.
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMarvelItems: (page) => dispatch(fetchMarvelItems(page))
  }
}

// Conectamos el Componente al storage
const MarvelList = connect(mapStateToProps, mapDispatchToProps)(MarvelListComponent)

// Exportamos el Container
export default MarvelList
