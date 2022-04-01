# Packages
 * packages are folders which contains some code, it could be just a `console.log()` or it could be complete projects or components.
 * packages / modules / dependencies are the different names for the same thing.
 * In our project we should have package.json file which have different attributes which defines our project.
 * There is a dependencies array in this package.json file, this contains the details of the external packages / modules / dependencies which we have installed.
 * the external packages are installed in the **node_modules** folder
 * we can create our folder a package by running following commands:
    >`npm init` this will ask for diff values
    
    > `npm init -y` this will create package with default values
 * the package.json file should be in the root of director

# Why do we need package.json
 * We need package.json file because we have all of our dependencies installed in node_modules folder.
    * we don't push the external packages to github repo, it'll be huge size and there is not point in pushing the same code in every project we push.
    * So, when we clone a repo from github we run npm install and it'll look at dependencies inside package.json file and install all the necessary packages. 
