## .env file
  * .env file allows us to store our environment variables secretly when we push our repo to github.
  * for this purpose we need to have a dependency called dotenv which access the passwords and other stuff in .env file.
  * To use .env variables we need to use this require
  >`require('dotenv').config()` 

   and then whereever we want to use our variables we use this

  >`process.env.<variableName>`