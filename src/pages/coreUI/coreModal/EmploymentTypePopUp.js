import React        from 'react';
import CoreModal    from 'coreComponents/coreModal';
import Button       from 'coreComponents/common/_button';
import ModelHeading      from 'coreComponents/heading/ModelHeading';
import "./styles/BlPostClick.scss";
const propTypes = {}

class EmploymentTypePopUp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            employmentType: '',
            employmentTypeErrorMsg: ''
        }
    }

    setEmploymentType = (e) => {
        if (e && e.currentTarget && e.currentTarget.value) {
            this.setState({
                employmentTypeErrorMsg: '',
                employmentType: e.currentTarget.value
            })
        }
    }

    closeEmploymentTypePopUp = () => {
        this.setState({
            employmentTypeErrorMsg: '',
            employmentType: ''
        }, () => { this.props.closeEmploymentTypePopUp() })
    }

    employmentTypeProceed = () => {
        const { employmentType, employmentTypeErrorMsg } = this.state
        if (employmentType && !employmentTypeErrorMsg) {
            this.props.proceedEmploymentTypePopUp(employmentType)
        } else {
            this.setState({
                employmentTypeErrorMsg: 'Please select employment type'
            })
        }
    }

    render() {
        const { isEmploymentTypePopUp } = this.props;
        const {employmentTypeErrorMsg} = this.state;
        const {employmentTypeProceed} = this;
       
        return (
            <CoreModal
                isActive         = {isEmploymentTypePopUp}
                actionHandler    = {this.closeEmploymentTypePopUp}
                closeIcon        = {true}
                modalWrapperClass= {"common_modal_v2_container common_info_modal bl_modal EmploymentTypePopUp"}
                contentLabel     = 'Disclaimer'
                componentData={
                        <div className='modal-body'>
                            <ModelHeading 
                                stepTitle = "You are just 1 step away from"
                                title     = "Find the Business Loan that's right for you!"
                            />                     
                            <div className='_form_container'>
                                <div className='clear wow fadeInDown form-group'>
                                    <label className='dB name radio'>How are you currently employed ?</label>
                                    <div className='radio dB'>
                                        <input type='radio' id='1' value='3' name='currently_employed' onChange={this.setEmploymentType} />
                                        <label htmlFor='1' className='radio-label'>Self Employed Business</label>
                                    </div>
                                    <div className='radio dB'>
                                        <input type='radio' id='2' value='2' name='currently_employed' onChange={this.setEmploymentType} />
                                        <label htmlFor='2' className='radio-label'>Self Employed Professional</label>
                                    </div>
                                    <p className="error">{employmentTypeErrorMsg}</p>
                                </div>
                                <div className='cta_parent'>
                                    <Button 
                                        className       = "btn btn-primary v1" 
                                        btnClickHandler = {()=>employmentTypeProceed()}                   
                                        buttonText      = {"Proceed"}
                                    />
                                </div>
                            </div>
                        </div>
                }
           /> 
        );

    }
}

EmploymentTypePopUp.propTypes = propTypes

export default EmploymentTypePopUp
