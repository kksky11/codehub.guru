import React from 'react'
import CoreModal from 'coreComponents/coreModal';
import * as ApiConstants from 'constants/ApiConstants';
import Button from 'coreComponents/common/_button';
import ModelHeading from 'coreComponents/heading/ModelHeading';
import httpRequest from 'utils/httpRequest';
import "./styles/BlPostClick.scss";
import Converter    from 'number-to-words';
const propTypes = {}

class PlblPostClickJourneyForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isdropdownApiCall: true,
            annualTurnOverData: [],
            employmentTypeDropdownSelected: false,
            turnOverDropdownSelected: false,
            emplymentDropdownError: '',
            turnOverDropdownError: '',
            netMonthlyIncomeError: '',
            netMonthlyIncome: 0,
            isNetMonthlyIncomeInputShow: true,
            selectedEmploymentType: {
                employment: '',
                key: ''
            },
            selectedAnnualTurnOver: {
                amount: '',
                key: '',
                value: ''
            }
        }
    }

    getAnnualTurnoveRange() {
        const { isdropdownApiCall } = this.state
        const { isPlblPostClickJourneyForm } = this.props
        const API_URL = `${ApiConstants.SITE_PLATEFORM_URL}${ApiConstants.GET_ANNUAL_TURNOVER_DATA}`
        if (isPlblPostClickJourneyForm && isdropdownApiCall) {
            this.setState({ isdropdownApiCall: false })
            httpRequest.call('GET', API_URL, {}, {}, '', function (error, result, body) {
                if (body &&
                    body.status &&
                    body.response &&
                    body.response.annualTurnOverData) {
                    this.setState({
                        annualTurnOverData: body.response.annualTurnOverData
                    })
                }
            }.bind(this))
        }
    }

    getEmploymentTypeMainClass = () => {
        const { employmentTypeDropdownSelected } = this.state
        if (employmentTypeDropdownSelected) {
            return 'clear common_select active'
        }
        return 'clear common_select'
    }

    getAnnualTurnOverMainClass = () => {
        const { turnOverDropdownSelected } = this.state
        if (turnOverDropdownSelected) {
            return 'clear common_select active'
        }
        return 'clear common_select'
    }

    getSelectedEmploymentType = () => {
        const { selectedEmploymentType } = this.state
        if (selectedEmploymentType && selectedEmploymentType.employment) {
            return selectedEmploymentType.employment
        }
        return 'Select type'
    }

    getSelectedTurnOver = () => {
        const { selectedAnnualTurnOver } = this.state
        if (selectedAnnualTurnOver && selectedAnnualTurnOver.amount) {
            return selectedAnnualTurnOver.amount
        }
        return 'Select your turnover'
    }

    updateEmploymentTypeDropdownSelected = () => {
        const { employmentTypeDropdownSelected } = this.state
        this.setState({
            employmentTypeDropdownSelected: !employmentTypeDropdownSelected,
            turnOverDropdownSelected: false
        })
    }

    updateTurnOverDropdownSelected = () => {
        const { turnOverDropdownSelected } = this.state
        this.setState({
            turnOverDropdownSelected: !turnOverDropdownSelected,
            employmentTypeDropdownSelected: false
        })
    }

    updateSelectedAnnualTurnOver = (event, data) => {
        event.preventDefault()
        this.setState({
            selectedAnnualTurnOver: data,
            turnOverDropdownError: '',
            turnOverDropdownSelected: false
        })
    }

    updateSelectedEmploymentType = (event, data) => {
        event.preventDefault()
        this.setState({
            selectedEmploymentType: data,
            emplymentDropdownError: '',
            employmentTypeDropdownSelected: false
        })
        if (data && data.key && data.key != 1) {
            this.setState({
                isNetMonthlyIncomeInputShow: false
            })
        } else {
            this.setState({
                isNetMonthlyIncomeInputShow: true
            })
        }
    }

    updateNetMonthlyIncome = (event) => {
        if (event.target.value.toString().length < 16) {
            this.setState({
                netMonthlyIncome: event.target.value,
                netMonthlyIncomeError: ''
            })
        } else {
            this.setState({
                netMonthlyIncomeError: 'Enter valid monthly income'
            })
        }
    }

    unlockBestOffersClick = () => {
        const {
            selectedEmploymentType,
            netMonthlyIncome,
            selectedAnnualTurnOver
        } = this.state
        const { PlblPostClickJourney } = this.props
        const employmentType = selectedEmploymentType && selectedEmploymentType.key || 0
        const annualTurnOver = selectedAnnualTurnOver && selectedAnnualTurnOver.value || 0
        if (employmentType) {
            if (employmentType == 1) {
                if (netMonthlyIncome && netMonthlyIncome > 1000) {
                    PlblPostClickJourney(employmentType, netMonthlyIncome, null)
                } else {
                    this.setState({
                        netMonthlyIncomeError: 'Enter valid monthly income'
                    })
                }
            }
            if ((employmentType == 2) || (employmentType == 3)) {
                if (annualTurnOver) {
                    PlblPostClickJourney(employmentType, null, selectedAnnualTurnOver)
                } else {
                    this.setState({
                        turnOverDropdownError: 'Please select turnover'
                    })
                }
            }
        } else {
            this.setState({
                emplymentDropdownError: 'Please select employment type'
            })
            if (!netMonthlyIncome) {
                this.setState({
                    netMonthlyIncomeError: 'Enter valid monthly income'
                })
            }
            if (!annualTurnOver) {
                this.setState({
                    turnOverDropdownError: 'Please select turnover'
                })
            }
        }
    }

    renderDownArrowDropdown = () => {
        return <span className='action_icon'>
            <img src='/images/arrow_right_blue_v2.svg' alt="" className='down_arrow' />
        </span>
    }

    renderEmploymentTypeDropdownData = () => {
        if (ApiConstants.EMPOYMENT_TYPE_DATA && ApiConstants.EMPOYMENT_TYPE_DATA.length) {
            let employmentTypeHtml = []
            ApiConstants.EMPOYMENT_TYPE_DATA.map((data, index) => {
                if (data && data.employment && data.key) {
                    employmentTypeHtml.push(<li key={data.key} onClick={(event) => { this.updateSelectedEmploymentType(event, data) }}>{data.employment}</li>)
                }
            })
            return employmentTypeHtml
        }
        return null
    }

    renderEmplymentDropdown = () => {
        const { emplymentDropdownError } = this.state
        if (ApiConstants.EMPOYMENT_TYPE_DATA && ApiConstants.EMPOYMENT_TYPE_DATA.length) {
            return <div className='clear form-group'>
                <label className='dB name v2' htmlFor='EmploymentType'>Employment type</label>
                <div onClick={this.updateEmploymentTypeDropdownSelected} id='EmploymentType' name='EmploymentType' className={this.getEmploymentTypeMainClass()}>
                    <span className='select_txt'>{this.getSelectedEmploymentType()}</span>
                    {this.renderDownArrowDropdown()}
                </div>
                <div className='_cmn_list_menu_container'>
                    <ul className='_cmn_list_menu_parent'>
                        {this.renderEmploymentTypeDropdownData()}
                    </ul>
                </div>
                <div className='error'>{emplymentDropdownError}</div>
            </div>
        }
        return null
    }

    renderNetMonthlySalary = () => {
        const { netMonthlyIncome, netMonthlyIncomeError } = this.state
        const annualSalaryDigit = netMonthlyIncome ? parseInt(netMonthlyIncome*12) : 0
        const netMonthlyIncomeWord = netMonthlyIncome ? Converter.toWords(netMonthlyIncome) : ''
        return <div className='clear form-group monthlyIncome'>
            <label className='dB name v2' htmlFor='monthlyIncome'>Net Monthly Income</label>
            <span className='rupees'>₹</span>
            <input type="number"
                name="monthlyIncome"
                placeholder="Enter your income"
                className="custom_form-control fullCon amountInput"
                onChange={(event) => { this.updateNetMonthlyIncome(event) }}
                value={netMonthlyIncome ? netMonthlyIncome : ''}
            />
            {annualSalaryDigit ? <span className='inputInfo'>Annualy Approx : {annualSalaryDigit}</span>  : null}
            {netMonthlyIncomeWord && netMonthlyIncomeWord != 'zero' ? <span className='inputInfoTextLabel'>{netMonthlyIncomeWord}</span>  : null}
            <div className='error'>{netMonthlyIncomeError}</div>
        </div>
    }

    renderAnnualTurnOverDropdown = () => {
        const { turnOverDropdownError, annualTurnOverData } = this.state
        if (annualTurnOverData && annualTurnOverData.length) {
            return <div className='clear form-group'>
                <label className='dB name v2' htmlFor='turnover'>Your gross annual Sales/Turnover?
                </label>
                <div onClick={this.updateTurnOverDropdownSelected} id='turnover' name='turnover' className={this.getAnnualTurnOverMainClass()}>
                    <span className='select_txt'>{this.getSelectedTurnOver()}</span>
                    {this.renderDownArrowDropdown()}
                </div>
                <div className='_cmn_list_menu_container'>
                    <ul className='_cmn_list_menu_parent'>
                        {this.renderAnnualTurnOverDropdownData()}
                    </ul>
                </div>
                <div className='error'>{turnOverDropdownError}</div>
            </div>
        }
        return null
    }

    renderAnnualTurnOverDropdownData = () => {
        const { annualTurnOverData } = this.state
        if (annualTurnOverData && annualTurnOverData.length) {
            let annualTurnOverHtml = []
            annualTurnOverData.map((data, index) => {
                if (data && data.amount) {
                    annualTurnOverHtml.push(<li key={index} onClick={(event) => { this.updateSelectedAnnualTurnOver(event, data) }}>{data.amount}</li>)
                }
            })
            return annualTurnOverHtml
        }
        return null
    }

    renderPlblPostClickJourneyForm = () => {
        const { isPlblPostClickJourneyFormClicked } = this.props;
        const { isNetMonthlyIncomeInputShow } = this.state
        const { unlockBestOffersClick } = this;
        return (
            <div className='modal-body'>
                <ModelHeading
                    stepTitle="You are just 1 step away from"
                    title="Getting the best Loan Transfer Offer!"
                    imgIcon="/images/plbt_offer_form.svg"
                />
                <div className='_form_container'>
                    {this.renderEmplymentDropdown()}
                    {isNetMonthlyIncomeInputShow ? this.renderNetMonthlySalary() : null}
                    {!isNetMonthlyIncomeInputShow ? this.renderAnnualTurnOverDropdown() : false}
                    <div className='cta_parent'>
                        <Button
                            className="btn btn-primary v1"
                            btnClickHandler={() => unlockBestOffersClick()}
                            buttonText={"Proceed"}
                            disabled={isPlblPostClickJourneyFormClicked}
                            isLoading={isPlblPostClickJourneyFormClicked}
                        />
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { isPlblPostClickJourneyForm, closePlblPostClickJourneyForm } = this.props
        this.getAnnualTurnoveRange()
        return (
            <CoreModal
                isActive={isPlblPostClickJourneyForm}
                actionHandler={closePlblPostClickJourneyForm}
                modalWrapperClass={`BlPostClickJourneyForm common_modal_v2_container common_info_modal bl_modal`}
                contentLabel='Disclaimer'
                shouldCloseOnOverlayClick={true}
                closeIcon={true}
                componentData={this.renderPlblPostClickJourneyForm()}
            />
        )
    }
}

PlblPostClickJourneyForm.propTypes = propTypes

export default PlblPostClickJourneyForm
