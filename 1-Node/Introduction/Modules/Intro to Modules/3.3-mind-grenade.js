const num1 = 2
const num2 = 3

function add(a,b){
  console.log(`the sum is ${a+b}`);
}

// now we are not exporting anything here, but if we
// require this module in another file/module then any 
// code which is invoking a function directly, will be run


add()