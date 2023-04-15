/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState } from 'react';
import PropTypes        from "prop-types";
import validators       from 'coreApp/utility/validators';
import "./style/input.scss";

function CustomInput(props){
  	const {
			className	=	"",
			id			=	"",
			name		=	"",
			inputValue	=	"",
			type		=	"text",
			placeholder	=	"",
			labelText   =   "",
			infoText    =   "",
			counter     =   "",
			counterText  =  "",
			maxInputLength=  0,
			autoComplete  = "",
			autoCorrect   = "",
			errorStatus   =  false,
			errorMsg      =  "",
			masked        =  "",
			validationType=  "",
			inputInfoLabel= "",
			disabled      = false,
			onChange,
			...rest 
		} = props;

	const [inputState, setInputState] = useState(
		{
			stateValue		: inputValue ,
			errorMsg		: errorMsg,
			counterNumber	: inputValue?.length
		}
	);

	useEffect(() => {       
        init();  
     },[errorMsg || inputValue || errorStatus]); 
     
     const init=()=>{
		setInputState({...inputState,
			errorMsg:errorMsg, 
			stateValue:inputValue,
			counterNumber:inputValue?.length || 0
		});
     }	

  	const onChangeHandler=(e)=>{ 
		const { value } = e.target;
		let changedValue = value.replace(/^\s+$/g, '');
		let error_Msg = validators[validationType](changedValue,name,maxInputLength);
		let error_Status = error_Msg && error_Msg != null ? false : true

		if (validationType === "pan") {
		  changedValue = changedValue.toUpperCase();
		}else if(validationType === 'date' || validationType === 'dob'){
		   changedValue = changedValue.replace(/^(\d\d)(\d)$/g,"$1-$2").replace(/^(\d\d\\-\d\d)(\d+)$/g,"$1-$2").replace(/[^\d\\-]/g,'')
		}else if(validationType !== 'email' || validationType !== 'password' || validationType !== 'unit' || validationType !== 'date'){
			changedValue = changedValue.replace(/[^\w\s]/gi, '');
		}
		
       // masked 
       if(masked){changedValue = validators['masking'](changedValue.replace(/-/gi, ""), masked)}
		
		setInputState({...inputState,errorMsg:error_Msg, stateValue: changedValue, counterNumber: value.length });

		onChange({name,changedValue,error_Msg,error_Status});
 	}
	const noEvent=(e)=>{
			e.preventDefault();
			return false;
		}

	return (
		<div className={`${id} ${className} ${infoText ? "infoTextContainer" : ""} ${disabled ? "disabled" : ""} inputContainer`}> 
			{labelText && <label className='labelControl' htmlFor={id}>{`${labelText}`}</label>}      
			<input 
				onChange	=	{(e)=>onChangeHandler(e)} 
				//onBlur      =   {(e)=>onChangeHandler(e)} 
				className	=	{`inputControls pb-input`} 
				type		=	{type}
				placeholder	=	{placeholder} 
				name		=	{name} 
				id			=	{id || name} 
				value		=	{inputState.stateValue} 
				maxLength   =   {maxInputLength? maxInputLength : 55}
				autoComplete=   {autoComplete || 'off'} 
				autoCorrect =   {autoCorrect || "off"}
				onPaste		=	{noEvent} 
				onCopy		=	{noEvent} 
				onCut		=	{noEvent} 
				onDrag		=	{noEvent} 
				onDrop		=	{noEvent} 
				disabled    =   {disabled}				
				{...rest}
			/>
			{inputInfoLabel && <div className="inputInfoLabel" >{inputInfoLabel}</div> }
			{(counter || counterText) && <span className='inputCounter'>{counter ? `${inputState.counterNumber} / ${maxInputLength}` : ""} {counterText} </span>}
			{infoText && <div className='infoText'>{infoText}</div>}
			{inputState.errorMsg  && <div className='errorMsg'>{inputState.errorMsg}</div>}
       </div>
	);
}

CustomInput.propTypes = {
	onChange   	:   PropTypes.func,
	type		:	PropTypes.string,
	className	:	PropTypes.string,
	id	        :	PropTypes.string,
	name		:	PropTypes.string,
	inputValue	:	PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
	placeholder :   PropTypes.string,
	labelText   :   PropTypes.string,
	infoText	:   PropTypes.string,
	autoComplete:   PropTypes.string,
	masked      :   PropTypes.string,
	errorMsg    :   PropTypes.oneOfType([ PropTypes.string, PropTypes.bool]),
	counter	    :   PropTypes.bool,
	validationType	:   PropTypes.string,
	counterText     :   PropTypes.string,
	maxInputLength	:   PropTypes.number,
};

export default CustomInput; 
