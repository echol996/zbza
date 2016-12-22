var gulp = require("gulp"),
	less = require("gulp-less"),
	minCss = require("gulp-clean-css"),
	connect = require("gulp-connect"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat"),
	htmlmin = require("gulp-htmlmin"),
	autoprefixer = require("gulp-autoprefixer"),
 	px2rem = require('postcss-px2rem'),
 	postcss = require('gulp-postcss');

//配置监听
gulp.task("watch",function(){
	gulp.watch("src/less/*.less",["cssHandle","reload"]);
	//  gulp.watch("src/js/*.js",["scriptHandle","reload"]);
	// gulp.watch("src/html/*.html",["htmlHandle","reload"]);
});
gulp.task('rem', function() {
    var processors = [px2rem({remUnit: 75})];
    return gulp.src('src/less/*.less')
        .pipe(postcss(processors))
        .pipe(gulp.dest('dest/css'));
});
//本地web服务器
gulp.task("server",function(){
	connect.server({
		root:"dest",
		port:802,
		livereload:true
	});
});
//CSS处理
gulp.task("cssHandle",function(){
	var af = {
		browser:['last 2 versions','Android >= 4.0','iOS 7']
	};
	gulp.src("src/less/*.less").pipe(less()).pipe(autoprefixer(af)).pipe(minCss()).pipe(gulp.dest("dest/css"));
});
//JS处理
// gulp.task("scriptHandle",function(){
// 	gulp.src("src/js/*.js").pipe(uglify({
// 		mangle: {except:['require','exports','module','$']}
// 	})).pipe(gulp.dest("dest/js"));
// });
//html页面处理
// gulp.task("htmlHandle",function(){
// 	var options = {
// 		removeComments: true,//清除HTML注释
// 		collapseWhitespace: true,
// 		collapsBooleanAttributes: true,
// 		removeEmptyAttributes: true,
// 		removeScriptTypeAttributes:true,
// 		removeStyleLinkTypeAttributes:true,
// 		minifyJS:true,
// 		minifyCSS:true
// 	};
// 	gulp.src("src/html/*.html").pipe(htmlmin(options)).pipe(gulp.dest("dest/html"));
// });
// //图片处理
// gulp.task("imgHandle",function(){
// 	gulp.src("src/images/*.{jpg,png,gif,ico}").pipe(imagemin()).pipe(gulp.dest("dest/images"));
// 	gulp.src("src/images/user/*.{jpg,png,gif,icon}").pipe(gulp.dest("dest/images/user"));
// });
//刷新页面
gulp.task("reload",function(){
	gulp.src("dest/html/*.html").pipe(connect.reload());
});
gulp.task("default",["cssHandle","watch"]);