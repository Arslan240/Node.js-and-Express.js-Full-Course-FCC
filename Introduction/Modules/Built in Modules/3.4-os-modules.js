// OS module
const os = require('os')

// info about current user
const user = os.userInfo()
console.log(user);

// info about system uptime
const uptime = os.uptime()
console.log('Uptime:', uptime);

// using multiple properties 
const currentOS = {
        name: os.type(),
        release: os.release(),
        totalMem: os.totalmem(),
        freeMem: os.freemem()
}
console.log(currentOS);