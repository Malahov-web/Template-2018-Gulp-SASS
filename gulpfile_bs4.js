
var gulp = require('gulp');

	uglify = require('gulp-uglify');  // Подключаем Uglify

    sass = require('gulp-sass');  // Подключаем Sass пакет	
	
	browserSync = require('browser-sync');  // Подключаем Browser Sync
	
	concat = require('gulp-concat'); // Подключаем  Gulp Concat
	
	sourcemaps = require('gulp-sourcemaps');  // Подключаем Gulp Sourcemaps  ( создает карту, чтобы в инспекторе браузера показывать строку стиля в sass-файле   )
	
	glob = require('glob');
	
	//gulpicon = require('gulpicon/tasks/gulpicon');
	
	//svgSprite = require("gulp-svg-sprites");

	
	//minifyCSS = require('gulp-csso');  // CSS минификатор
	
	//htmlValidator = require gulp-htmlhint HTML валидатор
	//htmlHint = require('gulp-htmlhint');  // HTML валидатор
	
	//csslint = require('gulp-csslint');  //  CSS линтер
	
	plumber = require('gulp-plumber');  // Преодхраняет остановку задачи из-за ошибки
	
	autoprefixer = require('gulp-autoprefixer');
	
	csslint = require('gulp-csslint');
	
	
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
	
