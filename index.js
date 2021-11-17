// what is the job of this function? is it supposed to return a string, modify an array?

// each function needs a single, clear purpose...............................................

// what data/info does it need in order to do it's job? what arguments, parameters is necessary?

// what am i expecting as a return value? Should be pretty distinct

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(ary) {
    let record
    return record = { 
        firstName: ary[0],
        familyName: ary[1],
        title: ary[2],
        payPerHour: ary[3],
        timeInEvents: [], 
        timeOutEvents: []
    }
}

function createEmployeeRecords(arys) {
    // console.log(createEmployeeRecord)
    return arys.map(createEmployeeRecord)
}

function createTimeInEvent(dateStamp){
    this.timeInEvents.push(createDSObj("TimeIn", dateStamp))
    return this
}

function createDSObj(getType, dateStamp) {
    return {type: getType, date: dateStamp.slice(0,10), hour: parseInt(dateStamp.slice(-4))}
}

function createTimeOutEvent(dateStamp){
    this.timeOutEvents.push(createDSObj("TimeOut", dateStamp))
    return this
}

function hoursWorkedOnDate(dateYMD){
    // console.log(dateYMD)
    const timeIn = this.timeInEvents.find((e) => e.date === dateYMD).hour
    // console.log(timeIn)
    const timeOut = this.timeOutEvents.find((e) => e.date === dateYMD).hour
    // console.log(timeOut)
    // let hoursWorked = (timeOut - timeIn)/100
    // console.log(hoursWorked)
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(dateYMD){
    // console.log(dateYMD)
    // console.log(this)
    const hoursWorked = hoursWorkedOnDate.call(this, dateYMD) * this.payPerHour
    return parseFloat(hoursWorked)
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find((record) => record.firstName === firstName)
}

// accepts an array of employee record objects as parameters
// iterates through array, creating new array and passing each iteration of array as parameter to allWagesFor function
// 
function calculatePayroll(records){
    // console.log(records)
    // let allPay = records.reduce((acc, cv => acc + cv))
    const allPay = records.map((empl) => {return allWagesFor.call(empl)})
    // console.log(allPay)
    return allPay.reduce((acc, cv) => acc + cv)
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}