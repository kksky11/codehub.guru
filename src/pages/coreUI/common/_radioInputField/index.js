import React, { Component } from 'react';
import PropTypes            from "prop-types";
import './RadioInputField.scss';
{/* 
  <RadioInputField
      radioHeading    = {String}
      name            = {String}
      data            = {Object}
      radioColor      = {"primary"}
      selectedValue   = {typeOfBankAccount}
      changeHandle    = {Function}
      errorStatus     = {Boolean}
      errorMSG        = {String}
      isActive        = {true}
      customClass     = {"column"}   // row / column     
   /> 
*/}

export default class RadioInputField extends Component {
  constructor(props) {
    super(props);
    const { selectedValue, errorStatus } = this.props;
    this.state = {
      selectedValue: selectedValue ? selectedValue : "",
      errorStatus: errorStatus ? errorStatus : false,
    };
  }

  handleChange=(e)=> {
    const selectedValue = e.target.value;
    const selectedLabel = e.target.getAttribute('label');
    this.setState({ selectedValue: selectedValue, errorStatus: false });
    const {changeHandle, name } = this.props;
    changeHandle(e, selectedValue, false);
  }

  componentDidUpdate = (prevProps) => {
    const { selectedValue, errorStatus } = this.props;
    if(prevProps.selectedValue !== selectedValue) {
      this.setState({ selectedValue: selectedValue });
    }
    if(prevProps.errorStatus !== errorStatus) {
      this.setState({ errorStatus: errorStatus });
    }
  }

  render() {
    const { selectedValue, errorStatus } = this.state;
    const { isActive, customClass, radioHeading, name, id, radioColor, data , errorMSG, disabled } = this.props;
    

    return (
      <div className={isActive ? errorStatus ? `RadioInputField error ${customClass} ${radioColor}` : `RadioInputField ${customClass} ${radioColor}` : "hide"} >
        {radioHeading && <h2 className="RadioInputFieldTitle"> {radioHeading}</h2>}
          <div className="labelGroup">
             { 
               data.map((item, index) => (
                 <label className={`radioLabel commonCheckbox ${radioColor}`} htmlFor={`${name}${index}`}  key={index}>
                  <input
                      type       = "radio"
                      label      = {item.label}
                      value      = {item.value}
                      name       = {name}
                      id         = {`${id ? id : name}${index}`}
                      onChange   = {this.handleChange}
                      checked    = {selectedValue === item.value ? true : false }
                      disabled   = {disabled ? disabled : false }
                    />
                   <span className="labelText">{item.label}</span>
                 </label>
             ))
           }
         </div>
        {errorMSG && <p className={errorStatus ? "errorTextMsg" : "hide"}>{errorMSG}</p>}
      </div>
    );
  }
}

RadioInputField.propTypes = {
  selectedValue     : PropTypes.oneOfType([ PropTypes.bool, PropTypes.string, PropTypes.number ]),
  errorStatus       : PropTypes.oneOfType([ PropTypes.bool, PropTypes.string ]),
  changeHandle      : PropTypes.func,
  name              : PropTypes.string,
  id                : PropTypes.string,
  isActive          : PropTypes.bool,
  customClass       : PropTypes.string,
  radioHeading      : PropTypes.string,
  radioColor        : PropTypes.string,
  data              : PropTypes.array,
  errorMSG          : PropTypes.string,
  disabled          : PropTypes.bool
};


