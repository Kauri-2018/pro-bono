
// Find matter
// Reference ID: [         ]


import React from 'react'

import {getMatterById} from '../../actions/matters'

class FindMatterById extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      referenceNumber: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.searchMatter = this.searchMatter.bind(this)
  }

  handleChange (e) {
    this.setState({
      referenceNumber: e.target.value
    })
  }

  searchMatter (e) {
    e.preventDefault()
    getMatterById(this.state)
      .then((user) => this.props.dispatch(updateUser(user)))
  }

  render () {
    return (
      <div className='search-matter'>
        <form onSubmit={this.searchMatter}>
          <h2>Find a matter</h2>
          <h5>Reference number: </h5>
          <input type="number" onChange={this.handleChange} />
          <button className="btn btn-submit">Find</button>
        </form>
      </div>
    )
  }
}

export default FindMatterById
