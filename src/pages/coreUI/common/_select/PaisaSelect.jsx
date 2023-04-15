import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import underscore from 'utils/paisabazaarUnderscore';

const defaultProps = {
    name            : '',
    type            : 'text',
    onChange        :  null,
    onInputChange   : null,
    onBlur          : null,
    noResultsText   : "",
    placeholder     : "",
    helperText      : "values to continue",
    maxLength       : "50",
    className       : null,
    value           : "",
    onChangeMethod  : null,
    spanTitleClass  : "",
    containerClass  : "",
    elementClass    : "",
    customMessage   : "",
    required        : false,
    selectedValue   : 1,
    validationComplete : false,
    filterKey       : "",
    disabled        : false

};

const propTypes = {
    name                : PropTypes.string.isRequired,
    id                  : PropTypes.string.isRequired,
    type                : PropTypes.string.isRequired,
    className           : PropTypes.string.isRequired,
    placeholder         : PropTypes.string,
    noResultsText       : PropTypes.string,
    onChange            : PropTypes.func,
    onInputChange       : PropTypes.func,
    onBlur              : PropTypes.func,
    options             : PropTypes.array,
    Searchable          : PropTypes.bool,
    Multiselect         : PropTypes.bool,
    clearable           : PropTypes.bool,
    required            : PropTypes.bool,
    helperText          : PropTypes.string,
    filterKey           : PropTypes.string,
    disabled            : PropTypes.bool
};


class PaisaSelect extends React.Component {

    constructor(props) {
        super(props);
        this.errorMsg = "";
        this.value = this.props.value || null;
        this.error = false;
        this.firstTouch = false;
        this.validationComplete = false;
    }

    componentDidMount() {
        const {name} = this.props;
        if(this.state == undefined || this.state.error == undefined) {
            this.validationComplete = false;
            this.setState({
                error : false,
                validationComplete: false
            });
        }

    }

    /**
     * Handle SubComponent Click Event
     *
     * @param {object} event
     */
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }


    setErrorMsg = function(errorMsg) {
        this.errorMsg = errorMsg;
    }

    getErrorMsg = function() {
        return this.errorMsg;
    }

    setValue = function(value) {
        this.value = value;
    }

    getValue = function(){
        return this.value;
    }

    updateFilterComponents (elems) {
        if (elems.length !== 0) {
            // Unselect All
            elems.forEach(function(e){
                this.setState({
                    [`"${e.id}-${e.value}"`]: false
                });
            }.bind(this));
        }
    }

    validateSelect = function() {
        const {required, name, value} = this.props;
        if((required == true) && (value == "" || value == null)) {
            this.setState({
                error : true,
                validationComplete : false
            });
            this.validationComplete = false;
            this.error = true;
            this.setErrorMsg("");
        }else {
            this.setState({
                error : false,
                validationComplete: true
            });
            this.validationComplete = true;
            this.setErrorMsg("");
            this.error = false;
        }
        this.forceUpdate();
    }.bind(this);

    validate = function(value){
        const {required, name} = this.props;

        if(this.value == undefined){
            this.value = this.props.value;
        }
        this.value = value;
        if((required == true || required == '1') && (value == "" || value == null)) {
            this.setState({
                error : true,
                validationComplete: false
            });
            this.validationComplete = false;


            this.setErrorMsg("Please enter full name");
            this.error = true;
        } else {
            this.setState({
                error : false,
                validationComplete: true
                });
            this.validationComplete = true;
            this.setErrorMsg("");
            this.error = false;
        }
    }.bind(this);

    renderValue =  function(option) {
        return <strong style={{ color: option.color}}>{option.label}</strong>;
    }

    renderOption = function(option) {
        return (<div className="vMid">
                    <input
                        name = {`"${option.id}-${option.value}"`}
                        type = "checkbox"
                        className="_vitems"
                        checked = {this.state[`"${option.id}-${option.value}"`]}
                        onChange = {this.handleInputChange.bind(this)}
                    /> <label className="m-L-10 _vitems"> {option.label} </label>
                </div>);
    }

    onChangeHandler = function(e){
        const {onChange, name, type, filterKey} = this.props;
        let value = "";

        if (underscore.has(e, 'value') === true) {
            value = e.value;
        } else if (underscore.has(e, '0') === true) {
            value = e['0'].value;
        }


        this.validate(value);

        if(type == "filter"){
            // Change Checkbox state on click of container as well
            // State key is: `id-value`
            let state = !this.state[`"${e[0].id}-${e[0].value}"`];
            this.setState({
                [`"${e[0].id}-${e[0].value}"`]: state
            });
            onChange(e, filterKey, state);
        }else{
            onChange(e);
        }
    }

    onBlurHandler = function(e){
        if(this.props.onBlurHandler){
            const { onBlurHandler } = this.props;
            onBlurHandler(e);
        }

    }

    onFocusHandler = function(){
        this.firstTouch = true;
        this.forceUpdate();
    }

    render() {
        const {name, id, type, className, value, placeholder, onChange, onInputChange, onBlur, noResultsText, options, Searchable, Multiselect, clearable, selectedValue, required, helperText, disabled = false} = this.props;

        // To avoid shifting of UI

        let classNameMod = className;
        if(this.firstTouch == true) {
            if(classNameMod.indexOf(className) !== -1) {
                classNameMod = classNameMod + " _touched";
            }
        }

        let selectContainer = (
                    <Select
                            name            = {name}
                            id              = {id}
                            className       = {classNameMod}
                            value           = {value}
                            placeholder     = {placeholder}
                            onChange        = {this.onChangeHandler.bind(this)}
                            onBlur          = {this.onBlurHandler.bind(this)}
                            onFocus         = {this.onFocusHandler.bind(this)}
                            noResultsText   = {noResultsText}
                            onInputChange   = {onInputChange}
                            options         = {options}
                            searchable      = {Searchable}
                            clearable       = {clearable}
                            selectedValue   = {value}
                            disabled        = {disabled}
                            multi           = {Multiselect} />
                );

        if(type == "filter") {
                return (

                        <Select
                            name            = {name}
                            id              = {id}
                            className       = {classNameMod}
                            value           = {value}
                            placeholder     = {placeholder}
                            onChange        = {this.onChangeHandler.bind(this)}
                            onBlur          = {this.onBlurHandler.bind(this)}
                            onFocus         = {this.onFocusHandler.bind(this)}
                            onInputChange   = {onInputChange}
                            noResultsText   = {noResultsText}
                            options         = {options}
                            searchable      = {Searchable}
                            valueRenderer   = {this.renderValue}
                            optionRenderer  = {this.renderOption.bind(this)}
                            clearable       = {clearable}
                            selectedValue   = {value}
                            multi           = {Multiselect}
                            closeOnSelect   = {false}
                        />

                    );
        } else {
            if(this.error == true) {
                return (
                    <div >
                        {selectContainer}

                        <span className="-error p-A dB fs-10 noC clr-0 clr-red">Please select {helperText}  </span>
                    </div>
                    );
            } else{
                return (
                    <div >
                        {selectContainer}
                    </div>
                    );
            }
        }
    }
}

PaisaSelect.defaultProps   = defaultProps;
PaisaSelect.propTypes      = propTypes;

export default PaisaSelect;

