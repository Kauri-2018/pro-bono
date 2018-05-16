import React from 'react'
import Button from 'material-ui/Button'
import Card from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Menu, { MenuItem } from 'material-ui/Menu'
import Checkbox from 'material-ui/Checkbox'
import {FormControlLabel} from 'material-ui/Form'

import {editMatter, requestMatterById} from '../../apiClient'
import {categories} from '../../utils/data'

const styles = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
}

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
          'Consumer - credit contracts and repossession': matter.matter.subcategories.includes('Consumer - credit contracts and repossession'),
          'Employment': matter.matter.subcategories.includes('Employment'),
          'Financial - debt, insolvency': matter.matter.subcategories.includes('Financial - debt, insolvency'),
          'Tenancy': matter.matter.subcategories.includes('Tenancy'),
          'Human Rights': matter.matter.subcategories.includes('Human Rights'),
          'Care of Children': matter.matter.subcategories.includes('Care of Children'),
          'CYFS': matter.matter.subcategories.includes('CYFS'),
          'Domestic Violence': matter.matter.subcategories.includes('Domestic Violence'),
          'PPPR': matter.matter.subcategories.includes('PPPR'),
          'International relocation - urgent border alerts': matter.matter.subcategories.includes('International relocation - urgent border alerts'),
          'Education': matter.matter.subcategories.includes('Education'),
          'Board of Trustee hearings': matter.matter.subcategories.includes('Board of Trustee hearings'),
          'Immigration and refugee': matter.matter.subcategories.includes('Immigration and refugee'),
          'Welfare and social housing': matter.matter.subcategories.includes('Welfare and social housing'),
          'Health and disability provider complaints': matter.matter.subcategories.includes('Health and disability provider complaints'),
          'Disability Support Services entitlements': matter.matter.subcategories.includes('Disability Support Services entitlements'),
          'Crown Prosecutions - IRD, DOC, MAF': matter.matter.subcategories.includes('Crown Prosecutions - IRD, DOC, MAF'),
          'Police Prosecutions': matter.matter.subcategories.includes('Police Prosecutions'),
          'Youth Justice': matter.matter.subcategories.includes('Youth Justice'),
          'Tenure/Ownership': matter.matter.subcategories.includes('Tenure/Ownership'),
          'Waitangi Tribunal': matter.matter.subcategories.includes('Waitangi Tribunal')
        })
      })
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
              <MenuItem onClick={ e => { this.handleClose(e, 'Māori') }}>Māori</MenuItem>
            </Menu>
            <br />
            <br />

            <span className='submit-matter-headings'>Update subcategories</span>
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

            <TextField fullWidth={true} value={this.state.internalMatterNumber} multiline={true} name="internalMatterNumber" label="Internal matter number" className="text-input" onChange={this.handleChange} margin="normal" />
            <br />
            <br />
            <TextField fullWidth={true} value={this.state.details} multiline={true} name="details" label="Additional detail" className="text-input" onChange={this.handleChange} margin="normal" />
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
