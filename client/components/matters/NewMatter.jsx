import React from 'react'
import {connect} from 'react-redux'
import Button from 'material-ui/Button'
import Card from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Menu, { MenuItem } from 'material-ui/Menu'
import Checkbox from 'material-ui/Checkbox'
import {postNewMatter} from '../../actions/matters'
import {categories} from '../../utils/data'
import {FormControlLabel} from 'material-ui/Form'

const styles = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
}

class NewMatter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      contactEmail: '',
      category: null,
      subcategories: [],
      internalMatterNumber: '',
      details: '',
      centreId: props.centreId,
      anchorEl: null,
      'Consumer - credit contracts and repossession': false,
      'Employment': false,
      'Financial - debt, insolvency': false,
      'Tenancy': false,
      'Human Rights': false,
      'Care of Children': false,
      'CYFS': false,
      'Domestic Violence': false,
      'PPPR': false,
      'International relocation - urgent border alerts': false,
      'Education': false,
      'Board of Trustee hearings': false,
      'Immigration and refugee': false,
      'Welfare and social housing': false,
      'Health and disability provider complaints': false,
      'Disability Support Services entitlements': false,
      'Crown Prosecutions - IRD, DOC, MAF': false,
      'Police Prosecutions': false,
      'Youth Justice': false,
      'Tenure/Ownership': false,
      'Waitangi Tribunal': false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.updateCheck = this.updateCheck.bind(this)
  }

  updateCheck (subcategory) {
    const newSubValue = !this.state[subcategory]
    this.setState({
      [subcategory]: newSubValue
    })
    newSubValue
      ? this.setState({
        subcategories: [...this.state.subcategories, subcategory]
      })
      : this.setState({
        subcategories: this.state.subcategories.filter(subcat => subcat !== subcategory)
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
              <MenuItem onClick={ e => { this.handleClose(e, 'Māori') }}>Māori</MenuItem>
            </Menu>
            <br />
            <br />

            <span className='submit-matter-headings'>SELECT SUBCATEGORIES (OPTIONAL)</span>
            {this.state.category && categories.filter(cat => {
              return (cat.category === this.state.category)
            })[0].subcategories.map(subcategory => (
              <FormControlLabel
                key={subcategory}
                control={
                  <Checkbox
                    key={subcategory}
                    label={subcategory}
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
            <br/>
            <br/>
            <span className='submit-matter-headings'>
            INTERNAL MATTER NUMBER (OPTIONAL)
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
            MATTER DETAILS
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
