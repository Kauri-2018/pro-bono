import React from 'react'
import {connect} from 'react-redux'
import Button from 'material-ui/Button'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'

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
      [e.target.id]: e.target.value
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
      <div className='new-matter-wrapper offset-by-two column eight columns'>
        <AppBar position="static" color="default" className="new-matter">
          <h1 className="offset-by-one columns">Submit New Matter</h1>
          <div className="form-field">
            <TextField fullWidth={true} required={true} placeholder="Title" multiline={true} id="title" label="Title" className="text-input" onChange={this.handleChange} margin="normal" />
            <br />
            <br />
            <TextField fullWidth={true} required={true} placeholder="Matter contact email" multiline={true} id="contactEmail" label="Matter contact email" className="text-input" onChange={this.handleChange} margin="normal" />
            <br />
            <br />
            <TextField fullWidth={true} required={true} placeholder="Category" multiline={true} id="category" label="Category" className="text-input" onChange={this.handleChange} margin="normal" />
            <br />
            <br />
            <TextField fullWidth={true} placeholder="Internal reference ID (optional)" multiline={true} id="internalReferenceId" label="Internal reference ID (optional)" className="text-input" onChange={this.handleChange} margin="normal" />
            <br />
            <br />
            <TextField fullWidth={true} placeholder="Add additional detail here" multiline={true} id="details" label="Additional Detail" className="text-input" onChange={this.handleChange} margin="normal" />
          </div>
          <div>
            <Button variant="raised" color="primary" className="btn-submit offset-by-four columns four columns " onClick={this.submitNewMatter}>Submit</Button>
          </div>
        </AppBar>
      </div>
    )
  }
}

export default connect()(NewMatter)
