// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"
import fetch from "isomorphic-fetch"

import AppRouter from './router/router.js'
import seedDB from './setup/seed.js'


console.log("=======")

// seedDB()
var app = new AppRouter()