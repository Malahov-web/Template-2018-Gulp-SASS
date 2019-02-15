// 1. Requires 


var gulp = require('gulp'),

    uglify = require('gulp-uglify'),  // Подключаем Uglify

    sass = require('gulp-sass'),  // Подключаем Sass пакет  
    
    browserSync = require('browser-sync',;  // Подключаем Browser Sync
    
    concat = require('gulp-concat'), // Подключаем  Gulp Concat
    
    sourcemaps = require('gulp-sourcemaps'),  // Подключаем Gulp Sourcemaps  ( создает карту, чтобы в инспекторе браузера показывать строку стиля в sass-файле   )
    
    glob = require('glob'),
    
    //gulpicon = require('gulpicon/tasks/gulpicon');
    
    //svgSprite = require("gulp-svg-sprites");

    
    //minifyCSS = require('gulp-csso');  // CSS минификатор
    
    //htmlValidator = require gulp-htmlhint HTML валидатор
    //htmlHint = require('gulp-htmlhint');  // HTML валидатор
    
    //csslint = require('gulp-csslint');  //  CSS линтер
    
    plumber = require('gulp-plumber'),  // Преодхраняет остановку задачи из-за ошибки
    
    autoprefixer = require('gulp-autoprefixer'),
    
    csslint = require('gulp-csslint'),

    // fontgen = require('gulp-fontgen');  // Конвертирует шрифты из otf, ttf   

    iconfont = require('gulp-iconfont'),  // Собирает шрифты из SVG-иконок
    runTimestamp = Math.round(Date.now()/1000); 
    

// 2. Config 


var autoprefixerOptions = {
  browsers: ['last 15 versions', 'IE 10', 'IE 11']
};   
     
    

// 3. Tasks  
 

    // SASS - компиляция
    gulp.task('css', function(){ // Создаем таск "sass"
        
        //return gulp.src('app/sass/*.sass') // Берем все sass файлы из папки sass 
        return gulp.src('app/css/*.css') // Берем все sass файлы из папки sass      


            .pipe(autoprefixer())

            //.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
            //.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
    });


    // SCSS - компиляция
    gulp.task('scss', function(){ // Создаем таск "scss"        
        return gulp.src('app/sass/*.scss') // Берем все scss файлы из папки sass 

        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass()) // Преобразуем scss в CSS посредством gulp-sass
        .pipe(autoprefixer())
        // .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write())
        
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении            
    }); 

    


    // Browser-sync - автообновление старниц
    gulp.task('browser-sync', function() { // Создаем таск browser-sync
        browserSync({ // Выполняем browser Sync
            server: { // Определяем параметры сервера
                baseDir: 'app' // Директория для сервера - app
            },
            notify: false // Отключаем уведомления
        });
    });
    
    
    

    // Процесс разработки проекта
    gulp.task('watch', ['browser-sync', 'scss'], function() {
        
        //gulp.watch('app/sass/*.sass', ['build']);
        //gulp.watch('app/sass/*.sass', ['sass']);
        
        
        //gulp.watch('app/sass/*.+(sass|scss)', ['sass', 'scss']);  // 24.07
        gulp
            .watch('app/sass/*.+(scss|scss)', [ 'scss']); // Наблюдение за sass файлами в папке app/sass
        //gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
        
    });
    
    


    // Генерация шрифтов
/*    
    gulp.task('fontgen', function() {
        return gulp.src("./src/*.{ttf,otf}")
            .pipe(fontgen({
                dest: "./dest/"
            }));
    });
     
    gulp.task('default', ['fontgen']);*/


    // Сборка иконочных шрифтов из SVG
    gulp.task('Iconfont', function(){
        return gulp.src(['app/images/svg/*.svg'])
            .pipe(iconfont({
                fontName: 'myfont', // required
                prependUnicode: true, // recommended option
                formats: ['ttf', 'woff', 'woff2', 'svg'], // default, 'woff2' and 'svg' are available
                timestamp: runTimestamp, // recommended to get consistent builds when watching files
            }))
            .on('glyphs', function(glyphs, options) {
                // CSS templating, e.g.
                console.log(glyphs, options);
            })
            .pipe(gulp.dest('app/fonts'));
    });




    
/*  
    gulp.task('concatcss', function() {
        return gulp.src([ // Берем все необходимые библиотеки
            //'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
            //'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
            
            'app/css/reset.css',
            'app/css/grid_24_r6.css',
            // 'app/css/fonts.css',
            // 'app/css/ui.css'
            ])
            .pipe(concat('default.min.css')) // Собираем их в кучу в новом файле libs.min.js
            .pipe(gulp.dest('app/css')); // Выгружаем в папку app/js
    });
*/

/*
    gulp.task('common-js', function(){      
        return gulp.src([
                'app/js/common.js'
            ])
        .pipe(concat('common.min.js')
        .pipe(uglify())
        .pipe(gulp.dest('app/js/'));

    });

    gulp.task('js', ['common-js'], function() {
        return gulp.src([
                'app/libs/jquery/dist/jquery.min.js',
                // плагины
                'app/libs/jQuery.mmenu/dist/jquery.mmenu.all.js',
                'app/js/common.js', // Всегда в конце               
            ])
        .pipe(concat('scripts_2.min.js')
        .pipe(gulp.dest('app/js'))
        //.pipe(browserSync.reload({stream: true}));
    });
*/      


