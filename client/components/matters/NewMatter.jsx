import React from 'react'
import {connect} from 'react-redux'
import Button from 'material-ui/Button'
import Card from 'material-ui/Card'
import TextField from 'material-ui/TextField'

import {postNewMatter} from '../../actions/matters'

class NewMatter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      contactEmail: '',
      category: '',
      internalReferenceId: '',
      details: '',
      centreId: props.centreId
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleAdd (e) {
    const newMatter = { ...this.state }
    // alert('Submitted new matter: ' + newMatter.title)
    this.props.dispatch(postNewMatter(newMatter))
  }

  render () {
    return (
      <div className='new-matter-wrapper offset-by-two column eight columns'>
        <Card position="static" color="default" className="new-matter">
          <h1 className="offset-by-one columns">Submit New Matter</h1>

          <div className="form-field">
            <TextField fullWidth={true} required={true} placeholder="Title" multiline={true} name="title" label="Title" className="text-input" onChange={this.handleChange} margin="normal" />
            <br />
            <br />
            <TextField fullWidth={true} required={true} placeholder="Matter contact email" multiline={true} name="contactEmail" label="Matter contact email" className="text-input" onChange={this.handleChange} margin="normal" />
            <br />
            <br />
            <TextField fullWidth={true} required={true} placeholder="Category" multiline={true} name="category" label="Category" className="text-input" onChange={this.handleChange} margin="normal" />
            <br />
            <br />
            <TextField fullWidth={true} placeholder="Internal reference ID (optional)" multiline={true} name="internalMatterNumber" label="Internal reference ID (optional)" className="text-input" onChange={this.handleChange} margin="normal" />
            <br />
            <br />
            <TextField fullWidth={true} placeholder="Add additional detail here" multiline={true} name="details" label="Additional Detail" className="text-input" onChange={this.handleChange} margin="normal" />
          </div>
          <div>
            <Button variant="raised" color="primary" className="btn-submit offset-by-four columns four columns " type="submit" onClick={this.handleAdd}>Submit</Button>
          </div>
        </Card>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    currentUser: state.auth.user 
  }
}

export default connect()(NewMatter)
