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
          <h4 className="centertext">SUBMIT NEW MATTER</h4>

          <section className="form-field">
            <span className='submit-matter-headings'>
            TITLE
              <TextField
                fullWidth={true}
                required={true}
                placeholder="Title"
                name="title"
                className="text-input"
                onChange={this.handleChange}
                margin="normal"
              />
            </span>
            <br />
            <br />
            <span className='submit-matter-headings'>
            MATTER CONTACT EMAIL
              <TextField
                fullWidth={true}
                required={true}
                placeholder="Matter contact email"
                name="contactEmail"
                className="text-input"
                onChange={this.handleChange}
                margin="normal"
              />
            </span>
            <br />
            <br />
            <span className='submit-matter-headings'>SELECT A CATEGORY</span>
            <Button
              className='category-dropdown'
              fullWidth={true}
              required={true}
              aria-owns={anchorEl ? 'category-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}>
              {category ? `Category: ${category}` : 'Select category'}
            </Button>
            <Menu
              id="category-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={e => { this.handleClose(e, category) }}>
              <MenuItem onClick={ e => { this.handleClose(e, 'Civil') }}>Civil</MenuItem>
              <MenuItem onClick={ e => { this.handleClose(e, 'Family') }}>Family</MenuItem>
              <MenuItem onClick={ e => { this.handleClose(e, 'Administrative') }}>Administrative</MenuItem>
              <MenuItem onClick={ e => { this.handleClose(e, 'Criminal') }}>Criminal</MenuItem>
              <MenuItem onClick={ e => { this.handleClose(e, 'Maori') }}>Maori</MenuItem>
              <MenuItem onClick={ e => { this.handleClose(e, 'Specialist Services') }}>Specialist Services</MenuItem>
            </Menu>
            <br />
            <br />
            <span className='submit-matter-headings'>
            INTERNAL REFERENCE ID (OPTIONAL)
              <TextField
                fullWidth={true}
                required={true}
                placeholder="Internal reference ID (optional)"
                name="internalMatterNumber"
                className="text-input"
                onChange={this.handleChange}
                margin="normal"
              />
            </span>
            <br />
            <br />
            <span className='submit-matter-headings'>
            ADDITIONAL DETAILS
              <TextField
                fullWidth={true}
                required={true}
                placeholder="Add additional detail here"
                multiline={true}
                name="details"
                className="text-input"
                onChange={this.handleChange}
                margin="normal"
              />
            </span>
          </section>
          <section>
            <Button
              variant="raised"
              color="primary"
              className="btn-submit offset-by-four columns four columns"
              type="submit"
              onClick={this.handleAdd}>Submit
            </Button>
          </section>
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

export default connect(mapStateToProps)(NewMatter)
