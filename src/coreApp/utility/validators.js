/* eslint-disable no-dupe-class-members */
/* eslint-disable new-parens */
/* eslint-disable import/no-anonymous-default-export */
class Validators {
    required (value, name) {
        if (!value || !value.toString().trim().length) {
            return `${name} is required`;
        }

        return null;
    }

    maxlen (value, name, maxlength) {
        if (value && value.toString().trim().length > maxlength) {
            return `${name} should be less than equal to ${maxlength}`;
        }

        return null;
    }

    minlen (value, name, minlength) {
        if (value && value.toString().trim().length < minlength) {
            return `${name} length should be atleast ${minlength}`;
        }
        return null;
    }

    nameMinLen (value, name, minlength) {
        let fullName    = value.toString().trim().split(" ");
        let firstName   = fullName[0];
        let middleName  = fullName.length === 3 ? fullName[1] : ((fullName.length === 4) ? (fullName[1] + ' ' + fullName[2]) : '');
        let lastName    = fullName.length === 2 ? fullName[1] : ((fullName.length === 3) ? fullName[2] : ((fullName.length === 4) ? fullName[3] : ''));
        let middleNameArr = middleName.trim().split(" ");
        if(firstName && firstName.toString().trim().length < minlength ) {
            return `Please enter at least ${minlength} letters in your first name `;
        } else if(lastName && lastName.toString().trim().length < minlength) {
            return `Please enter at least ${minlength} letters in your last name`;
        } else if (middleName && middleNameArr.length > 0 && middleNameArr.length === 1 && middleNameArr[0].toString().trim().length < minlength) {
            return `Please enter at least ${minlength} letters in your middle name`;
        } else if (middleName && middleNameArr.length > 0 && middleNameArr.length === 2 && (middleNameArr[0].toString().trim().length < minlength || middleNameArr[1].toString().trim().length < minlength)) {
            return `Please enter at least ${minlength} letters in your middle name`;
        }
        return null;
    }

    nameMaxLen (value, name, maxlength) {
        let fullName    = value?.toString()?.trim()?.split(" ") || value;
        let firstName   = fullName[0];
        let middleName  = "";
        let lastName    = "";
       
        if(fullName?.length === 3){
            middleName = fullName[1]
        }else if(fullName?.length === 4){
            middleName = `${fullName[1]} ${fullName[2]}`
        }

        if(fullName?.length === 2){
            lastName = fullName[1];
        }else if(fullName?.length === 3){
            lastName = fullName[2];
        }else if(fullName?.length === 4){
            lastName = fullName[3];
        }

        let middleNameArr = middleName?.trim().split(" ");


        if(firstName && firstName.toString().trim().length > maxlength ) {
            return `Please do not enter more than ${maxlength} letters in your first name`;
        } else if(lastName && lastName.toString().trim().length > maxlength) {
            return ` Please do not enter more than ${maxlength} letters in your last name`;
        } else if (middleName && middleNameArr.length > 0 && middleNameArr.length === 1 && middleNameArr[0].toString().trim().length > maxlength) {
            return ` Please do not enter more than ${maxlength} letters in your middle name`;
        } else if (middleName && middleNameArr.length > 0 && middleNameArr.length === 2 && (middleNameArr[0].toString().trim().length > maxlength || middleNameArr[1].toString().trim().length > maxlength)) {
            return ` Please do not enter more than ${maxlength} letters in your middle name`;
        }
        return null;
    }

    fullName (value,name) { 
        let re  = /^[a-zA-Z]{1,25}[ ]{1}[a-zA-Z]{0,25}[ ]{0,1}[a-zA-Z]{0,25}[ ]{0,1}[a-zA-Z]{1,25}$/;
        let fullName    =  value?.toString()?.trim()?.split(" ") || value;
        let error = null; 
        if(fullName.length === 4 && (fullName[2].length === 0 || fullName[1].length === 0)){
            error = `${name} should be valid name`; 
        }
        if(fullName.length === 3 && fullName[1].length === 0){
            error =  `${name} should be valid name`; 
        }
        error = value && re.test(value.trim()) ? null : `${name} should be valid`;
        return  error;
    }

    uniqueName(value, name) {               
        let fullName    = value?.toString()?.trim()?.split(" ") || value;
        let firstName   = fullName[0];
        let lastName    = "";
        if(fullName?.length === 2){
            lastName = fullName[1];
        }else if(fullName?.length === 3){
            lastName = fullName[2];
        }else if(fullName?.length === 4){
            lastName = fullName[3];
        }
        if(firstName?.toLowerCase() === lastName?.toLowerCase()) {
            return "Please enter a different last name";
        } 
        return null;
    }



    name(value, name) {
        let re = /^[ a-zA-Z]{2,30}[ ]{1}[a-zA-Z]*[ ]*[a-zA-Z ]{2,30}$/;
        return false === re.test(value) ? `${name} should be valid name` : null;
    }

    max(value, name, max) {
        value   = parseFloat(value);
        max     = parseFloat(max);
        return value > max ? `${name} should be less than ${max}` : null;
    }

    min(value, name, min) {
        value   = parseFloat(value);
        min     = parseFloat(min);
        return value < min ? `${name} should be greater than ${min}` : null;
    }

    name(value, name) {
        let re  = /^[ a-zA-Z]{2,30}[ ]{1}[a-zA-Z]*[ ]*[a-zA-Z ]{2,30}$/;
        return value && (false === re.test(value) || value.length > 64) ? `${name} should be valid name` : null;
    }

    mobile(value, name) { 
        let error = null;
        const regMobile = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
        if (value.length === 10 && regMobile.test(value)) {
            error = null;
        }else{
            error = `Enter valid mobile number`;
        }
        return error;
    }

    amount(value, name) {
        return (value && value.toString() === "0") ? `Enter valid amount` : null;
    }

    pan(value, name) {
        let re = /^[A-Za-z]{3}[pP][A-Za-z]{1}\d{4}[A-Za-z]{1}$/;
        return false === re.test(value) ? `Enter valid pan` : null;
    }

    pincode(value, name, validPincodeCity = 'true') {
       return value.toString().length < 6 || validPincodeCity === 'false' ? `Enter valid pincode` : null;
    }

     date(value, name) { 
        let dateArray = value.split("-");

        let maxAge = new Date().getFullYear() - 150;
        let minAge = new Date().getFullYear() - 18;

        let error = false;

        if(dateArray[0] && dateArray[1] && dateArray[2] && dateArray[2] <= minAge && dateArray[2] >= maxAge ) {
            const day = dateArray[0];
            const month = dateArray[1];
            const year = dateArray[2];
            if (isNaN(parseInt(day)) === false && isNaN(parseInt(month)) === false && isNaN(parseInt(year)) === false) {

                let isleapYear = (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0); 
                if ((month < 1) || (month > 12) || (day < 1) || (day > 31) || year < maxAge || year > minAge ) error = true;
                else if(((month === 4) || (month === 6) || (month === 9) || (month === 11)) && (day > 30))  error = true;
                else if((month === 2) && (isleapYear === true) && (day > 29)) error = true;
                else if((month === 2) && (isleapYear === false) && (day > 28)) error = true;

            } else{
                error = true;
            }
        }else{
            error = true;
        }
         return error === true ? `Enter valid date` : null;
    }

    masking(value, mask ){
          let i=0;
          let lastReplacedIndex = -1;
          const filledMask= mask.replace(/#/g,(_,j)=>{
            if(i >= value.length){ return '#';}
            lastReplacedIndex = j;
            return value[i++];
          });
          return filledMask.substring(0,lastReplacedIndex + 1);
    }
}

export default (new Validators);
