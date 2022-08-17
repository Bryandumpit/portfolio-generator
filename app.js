const profileDataArgs = process.argv.slice(2,process.argv.length);
console.log(profileDataArgs);


const printProfileData = profileDataArr => {
    for (let i=0; i<profileDataArr.length; i+=1){
        console.log(profileDataArr[i]);
    }

    console.log('======================================')

    profileDataArr.forEach(profileItem=>
        console.log(profileItem))
}




//this is the same as
// const printProfileData = function (profileDataArr){ console.log(profileDataArr)};
//if only one parameter, can omit parenthesis e.g. const printProfileData = profileDataArr => {console.log(profileDataArr)};
//if only one action, can omit curly braces e.g. const printProfileData = profileDataArr => console.log(profileDataArr);
//const addNums = (numONe, numTwo) => numOne + numTwo;
//const sum = addNums(5,3);

printProfileData(profileDataArgs);

