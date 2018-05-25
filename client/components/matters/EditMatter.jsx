import React from 'react'
import {connect} from 'react-redux'

// Material UI Components
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputAdornment from '@material-ui/core/InputAdornment'

import {editMatter, requestMatterById} from '../../apiClient'
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

class EditMatter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      referenceNumber: 0,
      title: '',
      contactEmail: '',
      category: '',
      subcategories: [],
      internalMatterNumber: 0,
      details: '',
      centreId: 0,
      timeCommitment: '',
      workRemote: null,
      selectRemoteWork: null,
      anchorEl: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleCategoryClose = this.handleCategoryClose.bind(this)
    this.handleWorkRemoteClose = this.handleWorkRemoteClose.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.updateCheck = this.updateCheck.bind(this)
  }

  componentDidMount () {
    requestMatterById(this.props.match.params.id)
      .then(matter => {
        this.setState({
          referenceNumber: matter.matter.referenceNumber,
          title: matter.matter.title,
          contactEmail: matter.matter.contactEmail,
          category: matter.matter.category,
          subcategories: matter.matter.subcategories,
          internalMatterNumber: matter.matter.internalMatterNumber,
          details: matter.matter.details,
          centreId: matter.matter.centreId,
          timeCommitment: matter.matter.timeCommitment,
          workRemote: matter.matter.workRemote
        })
      })
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
    this.setState({
      anchorEl: null,
      category: category
    })
  }

  handleWorkRemoteClose (e, workRemote) {
    this.setState({
      selectRemoteWork: null,
      workRemote: workRemote
    })
  }

  handleAdd (e) {
    const matter = {...this.state}
    editMatter(matter)
      .then(() => {
        this.props.history.push('/member')
        this.props.dispatch(showSnackbar(`Matter #${this.state.referenceNumber} has been edited`))
      })
  }

  render () {
    const anchorEl = this.state.anchorEl
    const category = this.state.category
    const subcategories = this.state.subcategories
    const selectRemoteWork = this.state.selectRemoteWork
    return (
      <div className='new-matter-wrapper min480'>
        <Card position="static" color="default" className="new-matter">
          <h1 className="title-text center-text red-text">Edit Matter</h1>

          <section className="form-field">
            <TextField
              fullWidth={true}
              required={true}
              value={this.state.title}
              name="title"
              label="Title" className="text-input"
              onChange={this.handleChange}
              margin="normal"
            />
            <br />
            <TextField
              fullWidth={true}
              required={true}
              value={this.state.contactEmail}
              name="contactEmail"
              label="Matter contact email"
              className="text-input"
              onChange={this.handleChange}
              margin="normal"
            />
            <br />
            <Paper>
              <Button
                fullWidth={true}
                required={true}
                aria-owns={anchorEl ? 'category-menu' : null}
                aria-haspopup="true"
                onClick={(e) => { this.handleClick(e, 'anchorEl') }}
              >
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
            <Paper className='padded-interior'>
              <span className='fontsize075'>Subcategories</span>
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
                      checked={subcategories.includes(subcategory)}
                      onChange={ () => {
                        this.updateCheck(subcategory)
                      }}
                      style={styles.checkbox}
                    />
                  }
                  label={subcategory}
                />
              ))
              }
            </Paper>

            <TextField
              fullWidth={true}
              value={this.state.internalMatterNumber}
              name="internalMatterNumber"
              label="Internal matter number"
              className="text-input"
              onChange={this.handleChange}
              margin="normal" />
            <br />
            <br />
            {/* <span className='red-text title-text'>
            CAN THIS MATTER BE COMPLETED REMOTELY?
            </span> */}
            <span className='fontsize075'>Can matter be completed remotely?</span>
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

            {/* <span className='red-text title-text'>
            ESTIMATED TIME COMMITMENT?
            </span> */}
            <TextField
              select
              fullWidth={true}
              required={true}
              label="Estimated time commitment"
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

            <TextField
              fullWidth={true}
              value={this.state.details}
              multiline={true}
              name="details"
              label="Additional detail"
              className="text-input"
              onChange={this.handleChange}
              margin="normal" />
          </section>
          <section>
            <Button variant="raised"
              color="primary"
              className="btn-submit offset-by-four columns four columns"
              type="submit"
              onClick={this.handleAdd}>
                Submit
            </Button>
          </section>
        </Card>
      </div>
    )
  }
}

export default connect()(EditMatter)
