import React, { useEffect, useRef, useState } from 'react'
import * as strings from 'constants/Strings'
import Button from 'coreComponents/common/_button'
import CustomCoreModal from 'coreComponents/coreModal/CustomCoreModal'
import './styles/OtpModule.scss'

function OtpModal(props) {
    let timer = undefined
    const { isOtpModal, resendComdownTime = 59, autoSubmit, hitOnTap, actionHandler, consentMobileNumber, accountLinkingRefNumber, consentData, errorHandling } = props
    const [isEdit, setIsEdit] = useState(false)
    const [timeLeft, setTimeLeft] = useState(resendComdownTime)
    const [resend, setResend] = useState(false)
    const [isError, setIsError] = useState(false)
    let prev_Time = resendComdownTime
    let otp1 = useRef(null)
    let otp2 = useRef(null)
    let otp3 = useRef(null)
    let otp4 = useRef(null)
    let otp5 = useRef(null)
    let otp6 = useRef(null)

    useEffect(() => {
        createTimmer()
    }, [])

    // /** //  * Used to create the timer//  */
    const createTimmer = () => {
        timer = setInterval(function () {
            if (prev_Time == 0) { resendOtp() }
            setTimeLeft(prev_Time--)
        }, 1000)
    }

    /**
     * 
     * @param {ref} nextInputRef 
     * @param {e} e 
     * Called on otp input field change
     */
    const onOtpInput = (nextInputRef, e) => {
        if (/^[0-9\b]+$/.test(e.target.value)) {
            (e.target.value && nextInputRef) ? nextInputRef.current.focus() : null
        } else {
            e.target.value = ''
        }
    }

    /**
     * 
     * @param {ref} prevInputRef 
     * @param {e} e 
     * Called when user pressed the back press just to erase the data of otp input field 
     */
    const onKeyPress = (prevInputRef, e) => {
        if (errorHandling && errorHandling.incorrectAddBankOtp) {
            props.actionHandler('updateAddBankOtpError', { errorHandling })
        }
        isError ? setIsError(false) : null
        if (prevInputRef && e.keyCode == 8) {
            prevInputRef.current.focus()
            prevInputRef.current.value = ''
        }
    }

    /** * Resend the otp */
    const resendOtp = () => {
        prev_Time = resendComdownTime
        setResend(true)
        clearOtpFields()
        props.actionHandler('sendOtp', props.mobileNumber)
    }

    /*** Used to clear the otp fields and focus the first otp field*/
    const clearOtpFields = () => {
        otp1 && otp1.current && otp1.current.value ? otp1.current.value = '' : null
        otp2 && otp2.current && otp2.current.value ? otp2.current.value = '' : null
        otp3 && otp3.current && otp3.current.value ? otp3.current.value = '' : null
        otp4 && otp4.current && otp4.current.value ? otp4.current.value = '' : null
        otp5 && otp5.current && otp5.current.value ? otp5.current.value = '' : null
        otp6 && otp6.current && otp6.current.value ? otp6.current.value = '' : null
        otp1 && otp1.current ? otp1.current.focus() : (otp1 ? otp1.focus() : null)
    }

    /*** Used to hit the otp verification api*/
    const submitOtp = async (type) => {
        if (isOtpAvailable(getOtp())) {
            document.querySelector('body').classList.remove('CoreModalShow')
            props.actionHandler('verifyOtp', { accountLinkingRefNumber, token: getOtp(), consentData, errorHandling })
        } else {
            setIsError(true)
            clearOtpFields()
        }
    }

    /**
     * Cretes the otp string and returns the same
     */
    const getOtp = () => {
        let otp = ''
        otp = [otp1.current.value, otp2.current.value, otp3.current.value, otp4.current.value, otp5.current.value, otp6.current.value].join('')
        return otp
    }

    /**
     * 
     * @param {string} otp 
     * Used to check is otp is completely filled or not
     */
    const isOtpAvailable = (otp) => {
        if (otp && otp.length === 6) return true
        return false
    }

    const getMobileNumber = () => {
        if (consentMobileNumber) {
            return `+91 ${consentMobileNumber}`
        }
        return null
    }

    return (
        <CustomCoreModal
            isOpenModal={isOtpModal}
            customClassName={'fixedModal verifyOtp infoModal'}
            customIdName={'verifyOtp'}
            callBackAction={() => props.actionHandler('closeModal', false)}
            disableBodyScroll={true}
            modalBody={
                <div className={`verifyOtpContainer`}>
                    <h3 className='_title'>{strings.VERIFY_YOUR_MOBILE}</h3>
                    <h3 className='_infoText'>{strings.ENTER_YOUR_VERIFICATION_CODE}<strong> {getMobileNumber()}</strong></h3>
                    <div className='inputWrapper'>
                        {
                            isEdit
                                ? <div className={`inputBox mobileEield`}>
                                    <input onKeyUp={(e) => { onKeyPress(false, e) }} pattern='[0-9]*' className={`formControl`} type='tel' autoComplete='off' maxLength='10' placeholder='' required autoFocus={true} />
                                </div>
                                : <div className={`${((isError) || (errorHandling && errorHandling.incorrectAddBankOtp)) ? 'hasError' : ''} inputBox`}>
                                    <input ref={otp1} onKeyUp={(e) => { onKeyPress(false, e) }} onChange={(e) => { onOtpInput(otp2, e) }} pattern='[0-9]*' className={`formControl`} type='tel' autoComplete='off' maxLength='1' placeholder='•' required autoFocus={true} />
                                    <input ref={otp2} onKeyUp={(e) => { onKeyPress(otp1, e) }} onChange={(e) => { onOtpInput(otp3, e) }} pattern='[0-9]*' className={`formControl`} type='tel' autoComplete='off' maxLength='1' placeholder='•' required />
                                    <input ref={otp3} onKeyUp={(e) => { onKeyPress(otp2, e) }} onChange={(e) => { onOtpInput(otp4, e) }} pattern='[0-9]*' className={`formControl`} type='tel' autoComplete='off' maxLength='1' placeholder='•' required />
                                    <input ref={otp4} onKeyUp={(e) => { onKeyPress(otp3, e) }} onChange={(e) => { onOtpInput(otp5, e) }} pattern='[0-9]*' className={`formControl`} type='tel' autoComplete='off' maxLength='1' placeholder='•' required />
                                    <input ref={otp5} onKeyUp={(e) => { onKeyPress(otp4, e) }} onChange={(e) => { onOtpInput(otp6, e) }} pattern='[0-9]*' className={`formControl`} type='tel' autoComplete='off' maxLength='1' placeholder='•' required />
                                    <input ref={otp6} onKeyUp={(e) => { onKeyPress(otp5, e) }} onChange={(e) => { onOtpInput(false, e) }} pattern='[0-9]*' className={`formControl`} type='tel' autoComplete='off' maxLength='1' placeholder='•' required />
                                </div>
                        }
                        <p className={`otpError`}>{strings.INCORRECT_CODE_ENTERED_PLEASE_TRY_AGAIN}</p>
                    </div>
                    <div className='buttonContainer'>
                        <Button
                            className={'verifyCode'}
                            btnClickHandler={() => submitOtp()}
                            role='button'
                            type='button'
                            buttonText={strings.VERIFY_CODE}
                        />
                    </div>
                </div>
            }
        />

    )
}

export default OtpModal