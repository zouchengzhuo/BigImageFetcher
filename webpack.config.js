/**
 * Created by czzou on 2016/1/20.
 */
var webpack = require('webpack');
var path=require('path');
module.exports={
    entry: {
        popup:'./src/popup/popup.js',
        background:'./src/background/background.js',
        inject:'./src/inject/inject.js'
    },
    output:{
        path:path.resolve(__dirname, "./dist"),
        filename:'[name].js'
    }
}