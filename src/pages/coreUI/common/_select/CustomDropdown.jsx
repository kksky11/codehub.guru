/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/sort-comp */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/CustomDropdown.scss';
class CustomDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected_Value:""
    }
  }
  componentWillMount() {
    document.addEventListener('click', this.clickOutside, false)
  }


  componentWillUnmount() {
    document.removeEventListener('click', this.clickOutside, false)
  }

  selectList=(optionsListId, status = true) => {
    const _optionsList = document.getElementById(`${optionsListId}_optionsList`)
    const _dropdown = document.getElementById(`${optionsListId}_dropdown`)
    if (!status) {
      _optionsList ?  _optionsList.classList.remove('active') : null
      _dropdown ? _dropdown.classList.remove('active') : null
    } else {
      _optionsList ? _optionsList.classList.toggle('active') : null
      _dropdown ? _dropdown.classList.toggle('active') : null
    }
  }

  getSelectedLable =(selectedValue, options) => {
    return options.map((item, i) => (selectedValue === item.value && <span key={`${i}_label`} className="_selectedValue">{item.label}</span>))
  }


 onChangeHandler=(e, value) => {
    const { onChange } = this.props
    onChange("CustomDropdown",value);
    //this.setState({selected_Value:value});
    this.selectList('CustomDropdown')
  }

  clickOutside = (e) => {
    if (e.target.offsetParent && e.target.offsetParent.classList && e.target.offsetParent.classList['0'] != 'CustomDropdown') {
      this.selectList('CustomDropdown', false)
    }
  }

  render() {
    const {isActive, defaultLabel, id, selectedValue, options, className } = this.props
    const {selected_Value}=this.state;
    return (
      <div className={`CustomDropdown ${className} ${isActive ? "" : "hide"}`} id={id}>
         <div className="optionsList" id="CustomDropdown_optionsList">
          {options && <ul className="_optionslist">
            {options.map((item, i) => (
              <li className={`${selectedValue == item.value ? 'active' : ''} _list`} key={`${i}_optionsList`} onClick={e => this.onChangeHandler(e, item.value)}>
                <span className="option_label">{ item.label }</span>
                {selectedValue == item.value && <span className="option_selected"><img src="../images/_header/Selected.svg" alt="" /></span>}
               </li>))
            }
            </ul>}
        </div>
        <div className="_dropdown" onClick={() => this.selectList('CustomDropdown')} id="CustomDropdown">
          {/* <span className="_icon"><img src="../images/_header/language.svg" alt="" /></span> */}
         
          { defaultLabel ? defaultLabel : selectedValue && this.getSelectedLable(selectedValue, options)}
          <span className="_arrow"><img src="../images/_leftMenu/Arrow.svg" alt="" /></span>
        </div>
       
      </div>
    )
  }
}

CustomDropdown.propTypes = {
  id            : PropTypes.string.isRequired,
  className     : PropTypes.string.isRequired,
  options       : PropTypes.array.isRequired,
  defaultLabel  : PropTypes.string,
  onChange      : PropTypes.func,
  selectedValue : PropTypes.string,
}

export default CustomDropdown

