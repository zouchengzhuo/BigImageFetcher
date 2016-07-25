/**
 * Created by czzou on 2016/1/18.
 */
var gulp=require("gulp");
var webpack=require("webpack");
var webpackConfig=require("./webpack.config.js");

/**
 * 使用正式配置打包
 */
gulp.task('webpack-build',['concat-lib'],function () {
    var config = Object.create(webpackConfig);
    webpack(config, function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString({}));
    });
});

gulp.task('pack',function(){
    gulp.src(['index.html','select.html','manifest.json',"icon.jpg",'./src/*','./dist/*','./css/*'])
        .pipe(gulp.dest('./BigImageFetcher'));

});

gulp.task("default",["webpack-build"]);
gulp.task("pack",['webpack-build','pack']);