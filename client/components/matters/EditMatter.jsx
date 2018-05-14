import React from 'react'
import Button from 'material-ui/Button'
import Card from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Menu, { MenuItem } from 'material-ui/Menu'

import {editMatter, requestMatterById} from '../../apiClient'

class EditMatter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      referenceNumber: 0,
      title: '',
      contactEmail: '',
      category: '',
      internalMatterNumber: 0,
      details: '',
      centreId: 0,
      anchorEl: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  componentDidMount () {
    requestMatterById(this.props.match.params.id)
      .then(matter => {
        this.setState({
          referenceNumber: matter.matter.referenceNumber,
          title: matter.matter.title,
          contactEmail: matter.matter.contactEmail,
          category: matter.matter.category,
          internalMatterNumber: matter.matter.internalMatterNumber,
          details: matter.matter.details,
          centreId: matter.matter.centreId
        })
      })
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
    const matter = {...this.state}
    editMatter(matter)
      .then(() => {
        this.props.history.push('/member')
      })
  }

  render () {
    const anchorEl = this.state.anchorEl
    const category = this.state.category
    return (
      <div className='new-matter-wrapper offset-by-two column eight columns'>
        <Card position="static" color="default" className="new-matter">
          <h1 className="offset-by-one columns">Edit Matter</h1>

          <section className="form-field">
            <TextField fullWidth={true} required={true} value={this.state.title} multiline={true} name="title" label="Title" className="text-input" onChange={this.handleChange} margin="normal" />
            <br />
            <br />
            <TextField fullWidth={true} required={true} value={this.state.contactEmail} multiline={true} name="contactEmail" label="Matter contact email" className="text-input" onChange={this.handleChange} margin="normal" />
            <br />
            <br />
            <Button fullWidth={true} required={true} aria-owns={anchorEl ? 'category-menu' : null} aria-haspopup="true" onClick={this.handleClick}>{category ? `Category: ${category}` : 'Select category'}</Button>
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
            <TextField fullWidth={true} value={this.state.internalMatterNumber} multiline={true} name="internalMatterNumber" label="Internal matter number" className="text-input" onChange={this.handleChange} margin="normal" />
            <br />
            <br />
            <TextField fullWidth={true} value={this.state.details} multiline={true} name="details" label="Additional Detail" className="text-input" onChange={this.handleChange} margin="normal" />
          </section>
          <section>
            <Button variant="raised" color="primary" className="btn-submit offset-by-four columns four columns " type="submit" onClick={this.handleAdd}>Submit</Button>
          </section>
        </Card>
      </div>
    )
  }
}

export default EditMatter
