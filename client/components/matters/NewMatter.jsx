import React from 'react'
import {connect} from 'react-redux'

// Material UI Components
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import {postNewMatter} from '../../actions/matters'
import {categories} from '../../utils/data'

import {showSnackbar} from '../../actions/snackbar'

const styles = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
}

const blankState = (centreId) => {
  return {
    title: '',
    contactEmail: '',
    category: null,
    subcategories: [],
    internalMatterNumber: '',
    details: '',
    centreId: centreId,
    anchorEl: null
  }
}

class NewMatter extends React.Component {
  constructor (props) {
    super(props)

    this.state = blankState(props.centreId)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.updateCheck = this.updateCheck.bind(this)
  }

  updateCheck (subcategory) {
    this.state.subcategories.includes(subcategory)
      ? this.setState({
        subcategories: this.state.subcategories.filter(subcat => subcat !== subcategory)
      })
      : this.setState({
        subcategories: [...this.state.subcategories, subcategory]
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
    const newMatter = {...this.state}
    this.props.dispatch(postNewMatter(newMatter))
    this.setState(blankState(this.props.centreId))
    this.props.dispatch(showSnackbar(`New matter added`))
  }

  render () {
    const anchorEl = this.state.anchorEl
    const category = this.state.category
    return (
      <div className='new-matter-wrapper'>
        <Card position="static" color="default" className="new-matter">
          <h4 className="center-text title-text">SUBMIT NEW MATTER</h4>

          <section className="form-field">
            <span className='red-text title-text'>
              TITLE
            </span>
            <TextField
              fullWidth={true}
              required={true}
              placeholder="Title"
              name="title"
              className="text-input"
              onChange={this.handleChange}
              margin="normal"
              value={this.state.title}
            />
            <br />
            <br />
            <span className='red-text title-text'>
            MATTER CONTACT EMAIL
            </span>
            <TextField
              fullWidth={true}
              required={true}
              placeholder="Matter contact email"
              name="contactEmail"
              className="text-input"
              onChange={this.handleChange}
              margin="normal"
              value={this.state.contactEmail}
            />
            <br />
            <br />
            <span className='red-text title-text'>SELECT A CATEGORY</span>
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
              <MenuItem onClick={ e => { this.handleClose(e, 'Māori') }}>Māori</MenuItem>
            </Menu>
            <br />
            <br />

            <span className='red-text title-text'>SELECT SUBCATEGORIES (OPTIONAL)</span>
            {this.state.category && categories.filter(cat => {
              return (cat.category === this.state.category)
            })[0].subcategories.map(subcategory => (
              <FormControlLabel
                key={subcategory}
                control={
                  <Checkbox
                    key={subcategory}
                    label={subcategory}
                    onChange={() => {
                      this.updateCheck(subcategory)
                    }}
                    style={styles.checkbox}
                  />
                }
                label={subcategory}
              />
            ))
            }
            <br/>
            <br/>
            <span className='red-text title-text'>
            INTERNAL MATTER NUMBER (OPTIONAL)
            </span>
            <TextField
              fullWidth={true}
              required={true}
              placeholder="Internal reference ID (optional)"
              name="internalMatterNumber"
              className="text-input"
              onChange={this.handleChange}
              margin="normal"
              value={this.state.internalMatterNumber}
            />
            <br />
            <br />
            <span className='red-text title-text'>
            MATTER DETAILS
            </span>
            <TextField
              fullWidth={true}
              required={true}
              placeholder="Add additional detail here"
              multiline={true}
              name="details"
              className="text-input"
              onChange={this.handleChange}
              margin="normal"
              value={this.state.details}
            />
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
