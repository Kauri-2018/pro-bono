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
import Paper from '@material-ui/core/Paper'
import InputAdornment from '@material-ui/core/InputAdornment'

import {postNewMatter} from '../../actions/matters'
import {categories} from '../../utils/data'
import {showSnackbar} from '../../actions/snackbar'

const styles = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 0
  }
}

const ranges = [
  {
    value: '0-2',
    label: '0 to 2'
  },
  {
    value: '2-5',
    label: '2 to 5'
  },
  {
    value: '5-10',
    label: '5 to 10'
  },
  {
    value: '10-15',
    label: '10 to 15'
  },
  {
    value: '15-20',
    label: '15 to 20'
  },
  {
    value: '20-30',
    label: '20 to 30'
  },
  {
    value: '30-100',
    label: '30+'
  }
]

const initialiseState = (centreId) => {
  return {
    title: '',
    contactEmail: '',
    category: null,
    subcategories: [],
    internalMatterNumber: '',
    details: '',
    centreId: centreId,
    timeCommitment: '',
    workRemote: null,
    selectRemoteWork: null,
    anchorEl: null
  }
}

class NewMatter extends React.Component {
  constructor (props) {
    super(props)

    this.state = initialiseState(props.centreId)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleCategoryClose = this.handleCategoryClose.bind(this)
    this.handleWorkRemoteClose = this.handleWorkRemoteClose.bind(this)
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

  handleClick (e, attribute) {
    this.setState({
      [attribute]: e.currentTarget
    })
  }

  handleCategoryClose (e, category) {
    if (category === this.state.category) {
      return this.setState({
        anchorEl: null,
        category: category
      })
    }
    this.setState({
      anchorEl: null,
      category: category,
      subcategories: []
    })
  }

  handleWorkRemoteClose (e, workRemote) {
    this.setState({
      selectRemoteWork: null,
      workRemote: workRemote
    })
  }

  handleAdd (e) {
    const newMatter = {...this.state}
    this.props.dispatch(postNewMatter(newMatter))
    this.setState(initialiseState(this.props.centreId))
    this.props.dispatch(showSnackbar(`New matter added`))
  }

  render () {
    const anchorEl = this.state.anchorEl
    const category = this.state.category
    const selectRemoteWork = this.state.selectRemoteWork
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
            <Paper>
              <Button
                className='category-dropdown'
                fullWidth={true}
                required={true}
                aria-owns={anchorEl ? 'category-menu' : null}
                aria-haspopup="true"
                onClick={(e) => { this.handleClick(e, 'anchorEl') }}>
                {category ? `Category: ${category}` : 'Select category'}
              </Button>
            </Paper>
            <Menu
              id="category-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={e => { this.handleCategoryClose(e, category) }}>
              <MenuItem onClick={ e => { this.handleCategoryClose(e, 'Civil') }}>Civil</MenuItem>
              <MenuItem onClick={ e => { this.handleCategoryClose(e, 'Family') }}>Family</MenuItem>
              <MenuItem onClick={ e => { this.handleCategoryClose(e, 'Administrative') }}>Administrative</MenuItem>
              <MenuItem onClick={ e => { this.handleCategoryClose(e, 'Criminal') }}>Criminal</MenuItem>
              <MenuItem onClick={ e => { this.handleCategoryClose(e, 'Māori') }}>Māori</MenuItem>
            </Menu>
            <br />

            {this.state.category && <div>
              <span className='red-text title-text'>SELECT SUBCATEGORIES (OPTIONAL)</span>
              <br />
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
            </div>}
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
            CAN THIS MATTER BE COMPLETED REMOTELY?
            </span>
            <Paper>
              <Button
                className='remotework-dropdown'
                fullWidth={true}
                required={true}
                aria-owns={selectRemoteWork ? 'remotework-menu' : null}
                aria-haspopup="true"
                onClick={(e) => { this.handleClick(e, 'selectRemoteWork') }}>
                {this.state.workRemote !== null ? (this.state.workRemote ? `Yes` : `No`) : 'Select'}
              </Button>
            </Paper>
            <Menu
              id="workremote-menu"
              selectRemoteWork={selectRemoteWork}
              open={Boolean(selectRemoteWork)}
              onClose={e => { this.handleWorkRemoteClose(e, this.state.workRemote) }}>
              <MenuItem onClick={ e => { this.handleWorkRemoteClose(e, true) }}>Yes</MenuItem>
              <MenuItem onClick={ e => { this.handleWorkRemoteClose(e, false) }}>No</MenuItem>
            </Menu>
            <br />

            <span className='red-text title-text'>
            ESTIMATED TIME COMMITMENT?
            </span>
            <br />
            <TextField
              select
              name="timeCommitment"
              className="TextField-right register-title"
              value={this.state.timeCommitment}
              onChange={(e) => this.handleChange(e)}
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">Hours</InputAdornment>
              }}
            >
              {ranges.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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
