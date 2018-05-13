import React from 'react'
import {connect} from 'react-redux'
import Button from 'material-ui/Button'
import Card from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Menu, { MenuItem } from 'material-ui/Menu'

import {postNewMatter} from '../../actions/matters'

class NewMatter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      contactEmail: '',
      category: null,
      internalReferenceId: '',
      details: '',
      centreId: props.centreId,
      anchorEl: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick (e) {
    this.setState({
      anchorEl: e.currentTarget
    })
  }

  handleClose (e, category) {
    this.setState({
      anchorEl: null,
      category: category
    })
  }

  handleAdd (e) {
    const newMatter = {...this.state}
    // alert('Submitted new matter: ' + newMatter.title)
    this.props.dispatch(postNewMatter(newMatter))
  }

  render () {
    const anchorEl = this.state.anchorEl
    const category = this.state.category
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
            <Button fullWidth={true} required={true} aria-owns={anchorEl ? 'category-menu' : null} aria-haspopup="true" onClick={this.handleClick}>Categories</Button>
            <Menu id="category-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={e => { this.handleClose(e, category) }}>
              <MenuItem onClick={ e => { this.handleClose(e, 'Civil') }}>Civil</MenuItem>
              <MenuItem onClick={ e => { this.handleClose(e, 'Family') }}>Family</MenuItem>
              <MenuItem onClick={ e => { this.handleClose(e, 'Administrative') }}>Administrative</MenuItem>
              <MenuItem onClick={ e => { this.handleClose(e, 'Criminal') }}>Criminal</MenuItem>
              <MenuItem onClick={ e => { this.handleClose(e, 'Maori') }}>Maori</MenuItem>
              <MenuItem onClick={ e => { this.handleClose(e, 'Specialist Services') }}>Specialist Services</MenuItem>
            </Menu>
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
    currentUser: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(NewMatter)
