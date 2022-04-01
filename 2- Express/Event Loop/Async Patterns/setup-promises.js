// we have a promisify function in the util module which converts simple functions to return promises
const util = require("util");
// here we are using .promises to return the functions which return promises directly from the fs module, so we don't need promisify from util module here.
const { readFile, writeFile } = require("fs").promises;
// const { readFile, writeFile } = require("fs");

const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile);


const start = async () => {
  try {
    const first = await readFile("./first-file.txt", "utf8");
    const second = await readFile("./second-file.txt", "utf8");
    await writeFile("./async-await-promisify-result.txt",`${first} ${second} still working yup. `,{flag: 'a'})
    // const first = await readFilePromise("./first-file.txt", "utf8");
    // const second = await readFilePromise("./second-file.txt", "utf8");
    // await writeFilePromise("./async-await-promisify-result.txt",`${first} ${second}`)
    console.log(first, second);
  } catch (error) {
    console.log(error);
  }
};

start();

// Now, if we see to write file we have create a new function of writeFile which return promise so that we can use async func on it to write to file.
// We use promises to deal with I/O operations
// asynchronously. we'll have a funciton which will return a promise.
// const getText = (path) => {
//   return new Promise((resolve, reject) => {
//     readFile(path,'utf8' , (err, data) => {
//       if(err) {
//         reject(err)
//       }
//       else {
//         resolve(data)
//       }
//     })
//   })
// }

// we'll change our promises to async await funciton
// we can also use try catch block for catching errors.

// const start = async () => {
//   try {
//     const first = await getText('./first-file.txt')
//     const second = await getText('./second-file.txt')
//     console.log(first, second);
//   } catch (error) {
//     console.log(error);
//   }
// }

// start()

// the promises can also lead to promise callback.
// getText('./first-file.txt')
//   .then(res => console.log(res))
//   .catch(err => console.log(err))
