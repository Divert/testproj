var gulp = require('gulp');
var   sass = require('gulp-sass');
var    browserSync = require('browser-sync'); 
var    concat      = require('gulp-concat'); 
var    uglify      = require('gulp-uglifyjs'); 
var    cssnano     = require('gulp-cssnano'); 
var    rename      = require('gulp-rename'); 
var    del         = require('del'); 
var    imagemin    = require('gulp-imagemin'); 
var    pngquant    = require('imagemin-pngquant'); 
var    cache       = require('gulp-cache'); 
var    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){ 
    return gulp.src('app/sass/**/*.scss') 
        .pipe(sass()) 
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) 
        .pipe(gulp.dest('app/css')) 
        .pipe(browserSync.reload({stream: true})) 
});


gulp.task('browser-sync', function() { 
    browserSync({ 
        server: { 
            baseDir: 'app' 
        },
        notify: false 
    });
});

gulp.task('scripts', function() {
    return gulp.src([  
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/slick-carousel/slick/slick.min.js'
        ])
        .pipe(concat('libs.min.js')) 
        .pipe(uglify()) 
        .pipe(gulp.dest('app/js')); 
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/libs.css') 
        .pipe(cssnano()) 
        .pipe(rename({suffix: '.min'})) 
        .pipe(gulp.dest('app/css')); 
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*') 
        .pipe(cache(imagemin({  
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); 
});



gulp.task('clean', function() {
    return del.sync('dist'); 
});

gulp.task('build', ['clean', 'img', 'sass', 'css-libs', 'scripts'], function() {

    var buildCss = gulp.src([ 
        'app/css/style.css',
        'app/css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') 
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') 
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') 
    .pipe(gulp.dest('dist'));

});


gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']); 
    gulp.watch('app/*.html', browserSync.reload); 
    gulp.watch('app/js/**/*.js', browserSync.reload); 
    
});

