import React from 'react'
import CoreModal from 'coreComponents/coreModal';
import * as ApiConstants from 'constants/ApiConstants';
import Button from 'coreComponents/common/_button';
import ModelHeading from 'coreComponents/heading/ModelHeading';
import httpRequest from 'utils/httpRequest';
import "./styles/BlPostClick.scss";
const propTypes = {}

class BlPostClickJourneyForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isBankAccountInputShow: false,
            turnOverDropdownSelected: false,
            residingCityDropdownSelected: false,
            otherBankNameDropdownSelected: false,
            cityList: [],
            filterCityList: [],
            cityApiError: '',
            bankList: [],
            filterBankList: [],
            bankApiError: '',
            searchData: '',
            searchCloseButton: false,
            turnOverDropdownError: '',
            residingCityDropdownError: '',
            bankDropdownError: '',
            selectedAnnualTurnOver: {
                amount: '',
                key: ''
            },
            selectedResidingCity: {
                cityName: '',
                key: ''
            },
            selectedOtherBankName: {
                bankName: '',
                key: ''
            },
            topCityList: [],
            topBankList: [],
            annualTurnOverData: [],
            specialAnnualTurnOverKeys: [],
            isdropdownApiCall: true
        }
    }

    getCityAndBankData = (isBlPostClickJourneyForm) => {
        const { isdropdownApiCall } = this.state
        if (isBlPostClickJourneyForm && isdropdownApiCall) {
            this.getCityList()
            this.getBankList()
            this.getTopCityList()
            this.getTopBankList()
            this.getAnnualTurnoveRange()
        }
    }

    updateTurnOverDropdownSelected = () => {
        const { turnOverDropdownSelected } = this.state
        this.setState({
            turnOverDropdownSelected: !turnOverDropdownSelected
        })
    }

    updateSelectedAnnualTurnOver = (event, data) => {
        event.preventDefault()
        const { specialAnnualTurnOverKeys } = this.state
        if (data && data.key && specialAnnualTurnOverKeys.includes(data.key)) {
            this.setState({
                isBankAccountInputShow: true,
                selectedAnnualTurnOver: data,
                turnOverDropdownSelected: false,
                turnOverDropdownError: ''
            })
        } else {
            this.setState({
                isBankAccountInputShow: false,
                selectedAnnualTurnOver: data,
                turnOverDropdownSelected: false,
                turnOverDropdownError: ''
            })
        }
    }

    getSelectedTurnOver = () => {
        const { selectedAnnualTurnOver } = this.state
        if (selectedAnnualTurnOver && selectedAnnualTurnOver.amount) {
            return selectedAnnualTurnOver.amount
        }
        return 'Select your turnover'
    }

    getAnnualTurnOverMainClass = () => {
        const { turnOverDropdownSelected } = this.state
        if (turnOverDropdownSelected) {
            return 'clear common_select active'
        }
        return 'clear common_select'
    }

    getSelectedResidingCity = () => {
        const { selectedResidingCity } = this.state
        if (selectedResidingCity && selectedResidingCity.cityName) {
            return selectedResidingCity.cityName
        }
        return 'Select your city'
    }

    updateResidingCityDropdownSelected = () => {
        const { residingCityDropdownSelected } = this.state
        this.setState({
            residingCityDropdownSelected: !residingCityDropdownSelected,
            searchCloseButton: false,
            searchData: '',
            residingCityDropdownError: ''
        })
    }

    getSelectedOtherBankName = () => {
        const { selectedOtherBankName } = this.state
        if (selectedOtherBankName && selectedOtherBankName.bankName) {
            return selectedOtherBankName.bankName
        }
        return 'Select other banks'
    }

    updateOtherBankNameDropdownSelected = () => {
        const { otherBankNameDropdownSelected } = this.state
        this.setState({
            otherBankNameDropdownSelected: !otherBankNameDropdownSelected,
            searchCloseButton: false,
            searchData: '',
            bankDropdownError: ''
        })
    }

    backToForm = () => {
        this.setState({
            residingCityDropdownSelected: false,
            otherBankNameDropdownSelected: false,
            searchData: ''
        })
    }

    stopSearch = () => {
        const { cityList, bankList } = this.state
        this.setState({
            searchData: '',
            searchCloseButton: false,
            filterCityList: cityList,
            filterBankList: bankList
        })
    }

    getCityList() {
        this.setState({ isdropdownApiCall: false })
        let API_URL = `${ApiConstants.SITE_PLATEFORM_URL}${ApiConstants.GET_CITY_LIST}`
        httpRequest.call('GET', API_URL, {}, {}, '', function (error, result, body) {
            if (error) {
                this.setState({
                    cityApiError: 'Some error occurred.. Please try again',
                    cityList: [],
                    filterCityList: []
                })
            }
            if (body &&
                body.status &&
                body.response &&
                body.response.length) {
                // body.response = body.response.filter((city) => !topCityList.toLowerCase().includes(city.label.toLowerCase()));
                this.setState({
                    cityList: body.response,
                    filterCityList: body.response,
                    cityApiError: ''
                })
            }
        }.bind(this))
    }

    getBankList() {
        let API_URL = `${ApiConstants.SITE_PLATEFORM_URL}${ApiConstants.GET_BANK_LIST}`
        httpRequest.call('GET', API_URL, {}, {}, '', function (error, result, body) {
            if (error) {
                this.setState({
                    bankApiError: 'Some error occurred.. Please try again',
                    bankList: [],
                    filterBankList: []
                })
            }
            if (body &&
                body.status &&
                body.response &&
                body.response.length) {
                this.setState({
                    bankList: body.response,
                    filterBankList: body.response,
                    bankApiError: ''
                })
            }
        }.bind(this))
    }

    getTopCityList() {
        let API_URL = `${ApiConstants.SITE_PLATEFORM_URL}${ApiConstants.GET_TOP_CITY_LIST}`
        httpRequest.call('GET', API_URL, {}, {}, '', function (error, result, body) {
            if (error) {
                this.setState({
                    cityApiError: 'Some error occurred.. Please try again',
                    topCityList: []
                })
            }
            if (body &&
                body.status &&
                body.response &&
                body.response.length) {
                this.setState({
                    topCityList: body.response,
                    cityApiError: ''
                })
            }
        }.bind(this))
    }

    getTopBankList() {
        let API_URL = `${ApiConstants.SITE_PLATEFORM_URL}${ApiConstants.GET_TOP_INSTITUTION_LIST}`
        httpRequest.call('GET', API_URL, {}, {}, '', function (error, result, body) {
            if (error) {
                this.setState({
                    bankApiError: 'Some error occurred.. Please try again',
                    topBankList: []
                })
            }
            if (body &&
                body.status &&
                body.response &&
                body.response.length) {
                this.setState({
                    topBankList: body.response,
                    bankApiError: ''
                })
            }
        }.bind(this))
    }

    getAnnualTurnoveRange() {
        let API_URL = `${ApiConstants.SITE_PLATEFORM_URL}${ApiConstants.GET_ANNUAL_TURNOVER_DATA}`
        httpRequest.call('GET', API_URL, {}, {}, '', function (error, result, body) {
            if (body &&
                body.status &&
                body.response &&
                body.response.annualTurnOverData && body.response.specialAnnualTurnOverKeys) {
                this.setState({
                    annualTurnOverData: body.response.annualTurnOverData,
                    specialAnnualTurnOverKeys: body.response.specialAnnualTurnOverKeys
                })
            }
        }.bind(this))
    }

    selectCityType = (event, cityId) => {
        this.setState({
            selectedResidingCity: {
                cityId,
                cityName: event.target.value,
                key: event.target.value.split(' ').join('').toLowerCase()
            }
        }, () => {
            this.setState({
                residingCityDropdownSelected: false,
                otherBankNameDropdownSelected: false,
                searchData: ''
            })
        })
    }

    selectTopCityType = (event, cityId) => {
        this.setState({
            selectedResidingCity: {
                cityId,
                cityName: event.target.value,
                key: event.target.value.toLowerCase(),
            }
        }, () => {
            this.setState({
                residingCityDropdownSelected: false,
                otherBankNameDropdownSelected: false,
                searchData: ''
            })
        })
    }

    selectOtherBankType = (event, institutionId) => {
        this.setState({
            selectedOtherBankName: {
                bankDropdownError: '',
                institutionId,
                bankName: event.target.value,
                key: event.target.value.split(' ').join('').toLowerCase()
            }
        }, () => {
            this.setState({
                residingCityDropdownSelected: false,
                otherBankNameDropdownSelected: false,
                searchData: ''
            })
        })
    }

    selectBankType = (event, institutionId) => {
        this.setState({
            selectedOtherBankName: {
                institutionId,
                bankName: event.target.value,
                key: event.target.value.toLowerCase()
            }
        }, () => {
            this.setState({
                bankDropdownError: '',
                residingCityDropdownSelected: false,
                otherBankNameDropdownSelected: false,
                searchData: ''
            })
        })
    }

    getCityAndOtherBankLabel = (type) => {
        const { residingCityDropdownSelected } = this.state
        switch (type) {
            case 'searchPlaceholder':
                return residingCityDropdownSelected ? 'Search your city' : 'Type here to search Bank Name'
            case 'top':
                return residingCityDropdownSelected ? 'Top City' : 'Top Banks'
            case 'all':
                return residingCityDropdownSelected ? 'All City' : 'All Banks'
        }
    }

    searchCityAndBank = (event) => {
        this.setState({
            searchData: event.target.value
        }, () => {
            const {
                searchData,
                cityList,
                bankList,
                residingCityDropdownSelected,
                otherBankNameDropdownSelected
            } = this.state
            if (!searchData) {
                this.setState({
                    filterCityList: cityList,
                    searchCloseButton: false
                })
            } else {
                this.setState({
                    searchCloseButton: true
                }, () => {
                    if (residingCityDropdownSelected) {
                        let filteredCityList = cityList.filter(function (city) {
                            return city.label.toLowerCase().indexOf(searchData.toLowerCase()) > -1;
                        })
                        if (filteredCityList && filteredCityList.length) {
                            this.setState({
                                filterCityList: filteredCityList
                            })
                        }
                    }
                    if (otherBankNameDropdownSelected) {
                        let filteredBankList = bankList.filter(function (bank) {
                            return bank.name.toLowerCase().indexOf(searchData.toLowerCase()) > -1;
                        })
                        if (filteredBankList && filteredBankList.length) {
                            this.setState({
                                filterBankList: filteredBankList
                            })
                        }
                    }
                })
            }
        })
    }

    unlockBestOffersClick = () => {
        const {
            selectedAnnualTurnOver,
            selectedResidingCity,
            selectedOtherBankName,
            isBankAccountInputShow
        } = this.state
        const { BlPostClickJourney } = this.props
        const annualTurnOverValue = selectedAnnualTurnOver && selectedAnnualTurnOver.value
        const institutionId = selectedOtherBankName && selectedOtherBankName.institutionId
        const cityId = selectedResidingCity && selectedResidingCity.cityId
        let institutionIdError = false
        if (!annualTurnOverValue) {
            this.setState({
                turnOverDropdownError: 'Please select annual sales/turnover'
            })
        }
        if (!cityId) {
            this.setState({
                residingCityDropdownError: 'Please select currently reside'
            })
        }
        if (!institutionId) {
            if (isBankAccountInputShow) {
                this.setState({
                    bankDropdownError: 'Please select bank account'
                })
            }
        }
        if (annualTurnOverValue == 7500000 || annualTurnOverValue == 10000000) {
            if (!institutionId) {
                institutionIdError = true
            }
        }
        if (annualTurnOverValue && cityId && !institutionIdError) {
            BlPostClickJourney(annualTurnOverValue, cityId, institutionId)
        }
    }

    renderDownArrowDropdown = () => {
        return <span className='action_icon'>
            <img src='../images/arrow_right_blue_v2.svg' className='down_arrow' />
        </span>
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

    renderResidingCityDropdown = () => {
        const { residingCityDropdownError } = this.state
        return <div className='clear form-group BLOffer'>
            <label className='dB name v2' htmlFor='city'>Where do you currently reside?
            </label>
            <div onClick={this.updateResidingCityDropdownSelected} id='city' name='city' className='clear common_select'>
                <span className='select_txt'>{this.getSelectedResidingCity()}</span>
                {this.renderDownArrowDropdown()}
            </div>
            <div className='error'>{residingCityDropdownError}</div>
        </div>
    }

    renderMainCityData = (type) => {
        const { selectedOtherBankName, topBankList } = this.state
        if (topBankList && topBankList.length) {
            let topBankHtml = []
            topBankList.map((data, index) => {
                if (data && data.key && data.bankName && data.image) {
                    const key = data.key
                    const bankName = data.bankName
                    if (type && type === 'main') {
                        topBankHtml.push(
                            <div key={index} className='radio bank'>
                                <input type='radio'
                                    id={key}
                                    name='bank'
                                    className='hide'
                                    value={bankName}
                                    onChange={(event) => { this.selectBankType(event, data.institutionId) }}
                                    checked={selectedOtherBankName && selectedOtherBankName.key && (selectedOtherBankName.key === key)}
                                />
                                <label htmlFor={key} className='radio-label'>
                                    <div className='_content_parent'>
                                        <img src={data.image} alt='report' className='_bank_logo' />
                                        <span className='_bank_name'>{bankName}</span>
                                    </div>
                                </label>
                            </div>
                        )
                    } else {
                        topBankHtml.push(
                            <li key={index}>
                                <div className='radio dB'>
                                    <input type='radio'
                                        id={key}
                                        name='bank'
                                        className='hide'
                                        value={bankName}
                                        onChange={(event) => { this.selectBankType(event, data.institutionId) }}
                                        checked={selectedOtherBankName && selectedOtherBankName.key && (selectedOtherBankName.key === key)}
                                    />
                                    <label htmlFor={key} className='radio-label'>{bankName}</label>
                                </div>
                            </li>
                        )
                    }
                }
            })
            return topBankHtml
        }
        return null
    }

    renderMainBank = () => {
        return <div className='clear form-group'>
            <label className='dB name v2' htmlFor='city'>Your bank account is with?
            </label>
            <div id='bank' name='bank' className='clear bank_button_parent'>
                {this.renderMainCityData('main')}
            </div>
        </div>
    }

    renderOtherBankDropdown = () => {
        const { bankDropdownError } = this.state
        return <div className='clear form-group'>
            <label className='dB name v2' htmlFor='city'>Other Banks
            </label>
            <div onClick={this.updateOtherBankNameDropdownSelected} id='otherBank' name='otherBank' className='clear common_select'>
                <span className='select_txt'>{this.getSelectedOtherBankName()}</span>
                {this.renderDownArrowDropdown()}
            </div>
            <div className='error'>{bankDropdownError}</div>
        </div>
    }

    renderBlPostClickJourneyForm = () => {
        const { closeBlPostClickJourneyForm, isBlPostClickJourneyFormClicked } = this.props;
        const { isBankAccountInputShow } = this.state;
        const { unlockBestOffersClick } = this;
        return (
            <div className='modal-body'>
                <ModelHeading
                    stepTitle="You are just 1 step away from"
                    title="Getting the best Business Loan Offers"
                />
                <div className='_form_container'>
                    {this.renderAnnualTurnOverDropdown()}
                    {this.renderResidingCityDropdown()}
                    {isBankAccountInputShow ? this.renderMainBank() : null}
                    {isBankAccountInputShow ? this.renderOtherBankDropdown() : null}
                    <div className='cta_parent'>
                        <Button
                            className="btn btn-primary v1"
                            btnClickHandler={() => unlockBestOffersClick()}
                            buttonText={"Unlock Best Offers"}
                            disabled={isBlPostClickJourneyFormClicked}
                            isLoading={isBlPostClickJourneyFormClicked}
                        />
                    </div>
                </div>
            </div>
        )
    }

    renderTopCityDropdownData = () => {
        const { selectedResidingCity, topCityList } = this.state
        if (topCityList && topCityList.length) {
            let topCityHtml = []
            topCityList.map((data, index) => {
                if (data && data.cityId && data.label) {
                    const cityId = data.cityId
                    const label = data.label.toLowerCase()
                    topCityHtml.push(
                        <li key={index}>
                            <div className='radio dB'>
                                <input type='radio'
                                    id={label}
                                    name='city'
                                    className='hide'
                                    value={label}
                                    onChange={(event) => { this.selectTopCityType(event, cityId) }}
                                    checked={selectedResidingCity && selectedResidingCity.key && (selectedResidingCity.key === label)}
                                />
                                <label htmlFor={label} className='radio-label'>{data.label}</label>
                            </div>
                        </li>
                    )
                }
            })
            return topCityHtml
        }
        return null
    }

    renderAllCityDropdownData = () => {
        const { filterCityList, cityApiError, selectedResidingCity } = this.state
        if (filterCityList && filterCityList.length) {
            let allCityHtml = []
            filterCityList.map((data, index) => {
                if (data && data.label) {
                    const cityId = data.label.split(' ').join('').toLowerCase()
                    allCityHtml.push(
                        <li key={index}>
                            <div className='radio dB'>
                                <input type='radio'
                                    id={cityId}
                                    name='city'
                                    className='hide'
                                    value={data.label}
                                    onChange={(event) => { this.selectCityType(event, data.value) }}
                                    checked={selectedResidingCity && selectedResidingCity.key && (selectedResidingCity.key === cityId)}
                                />
                                <label htmlFor={cityId} className='radio-label'>{data.label}</label>
                            </div>
                        </li>
                    )
                }
            })
            return allCityHtml
        }
        if (cityApiError) {
            return <p className="noDataFound BLOffer"> {cityApiError} </p>
        }
        return null
    }

    renderAllBankDropdownData = () => {
        const { filterBankList, bankApiError, selectedOtherBankName } = this.state
        if (filterBankList && filterBankList.length) {
            let allBankHtml = []
            filterBankList.map((data, index) => {
                if (data && data.name) {
                    const bankId = data.name.split(' ').join('').toLowerCase()
                    allBankHtml.push(
                        <li key={index}>
                            <div className='radio dB'>
                                <input type='radio'
                                    id={bankId}
                                    name='bank'
                                    className='hide'
                                    value={data.name}
                                    onChange={(event) => { this.selectOtherBankType(event, data.institutionId) }}
                                    checked={selectedOtherBankName && selectedOtherBankName.key && (selectedOtherBankName.key === bankId)}
                                />
                                <label htmlFor={bankId} className='radio-label'>{data.name}</label>
                            </div>
                        </li>
                    )
                }
            })
            return allBankHtml
        }
        if (bankApiError) {
            return <p className="noDataFound BLOffer"> {bankApiError} </p>
        }
        return null
    }

    renderCityAndOtherBankDropdownContent = () => {
        const { residingCityDropdownSelected } = this.state
        return <div className='clear form-group'>
            <div className='_cmn_list_menu_container'>
                <ul className='_cmn_list_menu_parent'>
                    <li className='_heading'>{this.getCityAndOtherBankLabel('top')}</li>
                    {residingCityDropdownSelected ? this.renderTopCityDropdownData() : this.renderMainCityData('dropdown')}
                    <li className='_heading'>{this.getCityAndOtherBankLabel('all')}</li>
                    {residingCityDropdownSelected ? this.renderAllCityDropdownData() : this.renderAllBankDropdownData()}
                </ul>
            </div>
        </div>
    }

    getSearchClass = () => {
        const { searchCloseButton } = this.state
        if (searchCloseButton) {
            return 'input-group search _close'
        }
        return 'input-group search'
    }

    renderSearchForCityAndBank = () => {
        const { searchData, searchCloseButton } = this.state
        return <div className='clear form-group search_parent'>
            <div className='input-group search'>
                <input id='search'
                    type='text'
                    className='form-control'
                    value={searchData}
                    placeholder={this.getCityAndOtherBankLabel('searchPlaceholder')}
                    onChange={(event => { this.searchCityAndBank(event) })}
                />
            </div>
            {searchCloseButton ? <div onClick={() => this.stopSearch()} className="inputCloseIcon">X</div> : null}
        </div>
    }

    renderCityAndOtherBankDropdown = () => {
        return <div className='modal-body'>
            <div className="backIcon" onClick={this.backToForm}><img src="/images/icons/left-arrow.svg" /></div>
            <div className='_form_container'>
                {this.renderSearchForCityAndBank()}
                {this.renderCityAndOtherBankDropdownContent()}
            </div>
        </div>
    }

    render() {
        const { isBlPostClickJourneyForm, closeBlPostClickJourneyForm } = this.props
        const { residingCityDropdownSelected, otherBankNameDropdownSelected } = this.state
        this.getCityAndBankData(isBlPostClickJourneyForm)
        return (
            <CoreModal
                isActive={isBlPostClickJourneyForm}
                actionHandler={closeBlPostClickJourneyForm}
                modalWrapperClass={`BlPostClickJourneyForm common_modal_v2_container common_info_modal bl_modal ${residingCityDropdownSelected || otherBankNameDropdownSelected ? '_filter_container' : ''}`}
                contentLabel='Disclaimer'
                shouldCloseOnOverlayClick={true}
                closeIcon={(residingCityDropdownSelected || otherBankNameDropdownSelected) ? false : true}
                componentData={
                    (residingCityDropdownSelected || otherBankNameDropdownSelected)
                        ? this.renderCityAndOtherBankDropdown()
                        : this.renderBlPostClickJourneyForm()
                }
            />
        )
    }
}

BlPostClickJourneyForm.propTypes = propTypes

export default BlPostClickJourneyForm
