import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LanguageDropdown extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    document.addEventListener('click', this.clickOutside, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickOutside, false)
  }

  selectLanguage=(optionsListId, status = true) => {
    const _optionsList = document.getElementById(`${optionsListId}_optionsList`)
    const _dropdown = document.getElementById(`${optionsListId}_dropdown`)
    if (!status) {
      _optionsList.classList.remove('active')
      _dropdown.classList.remove('active')
    } else {
      _optionsList.classList.toggle('active')
      _dropdown.classList.toggle('active')
    }
  }

  getSelectedLable =(value, options) => {
    return options.map((item, i) => (value === item.value && <span key={`${i}_label`} className="_selectedValue">{item.label}</span>))
  }
  getsubLable=(value)=>{
    let subLabel = "";
    switch(value){
      case 'en': subLabel =""; break;
      case 'hindi': subLabel ="Hindi"; break;   
  }
  return subLabel;
}

  languageOnChange=(e, value) => {
    const { onChange } = this.props
    const language = { value }
    onChange(language)
    this.selectLanguage('language')
  }
  clickOutside = (e) => {
    if (e.target.offsetParent && e.target.offsetParent.classList && e.target.offsetParent.classList['0'] != 'language_dropdown') {
      this.selectLanguage('language', false)
    }
  }

  render() {
    const { id, value, options, className } = this.props

    return (
      <div className={`language_dropdown ${className}`} id={id}>
        <div className="_dropdown" onClick={() => this.selectLanguage('language')} id="language_dropdown">
          <span className="_icon"><img src="../images/_header/language.svg" alt="" /></span>
          {value && this.getSelectedLable(value, options)}
          <span className="_arrow"><img src="../images/_leftMenu/Arrow.svg" alt="" /></span>
        </div>
        <div className="optionsList" id="language_optionsList">
          {options && <ul className="_optionslist">
            {options.map((item, i) => (
              <li className={`${value === item.value ? 'active' : ''} _list`} key={`${i}_optionsList`} onClick={e => this.languageOnChange(e, item.value)}>
                <span className="option_label">{ item.label }</span>
                <span className="option_sublabel">{item.value && this.getsubLable(item.value)}</span>
                {value === item.value && <span className="option_selected"><img src="../images/_header/Selected.svg" alt="" /></span>}
               </li>))
            }
            </ul>}

        </div>

      </div>
    )
  }
}

LanguageDropdown.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  options: PropTypes.array,
}

export default LanguageDropdown

