import React from 'react'
import {connect} from 'react-redux'

class NewMatter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      contactEmail: '',
      category: '',
      internalReferenceId: '',
      details: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.submitNewMatter = this.submitNewMatter.bind(this)
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitNewMatter () {
    const newMatter = {
      title: this.state.title,
      contactEmail: this.state.contactEmail,
      category: this.state.category,
      internalReferenceId: this.state.internalReferenceId,
      details: this.state.details
    }
    alert('Submitted new matter: ' + newMatter.title)
    // Dispatch state data
    // this.props.dispatch(newMatter)
  }

  render () {
    return (
      <div className='new-matter-wrapper'>
        <h1>Create a new matter</h1>
        <span className='info'>Title: <input name='title' onChange={this.handleChange} /></span>
        <br />
        <span className='info'>Matter contact email: <input name='contactEmail' onChange={this.handleChange} /></span>
        <br />
        <span className='info'>Category: <input name='category' onChange={this.handleChange} /></span>
        <br />
        <span className='info'>Internal reference ID (optional): <input name='internalReferenceId' onChange={this.handleChange} /></span>
        <br />
        <span className='info'>Further details:</span>
        <br />
        <textarea name="details" cols="60" rows="10" onChange={this.handleChange} />
        <hr />
        <button onClick={this.submitNewMatter}>Submit</button>
      </div>
    )
  }
}

export default connect()(NewMatter)
