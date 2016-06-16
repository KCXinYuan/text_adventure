const gulp = require('gulp');
const webpack = require('webpack-stream');
const clean = require('gulp-clean');

// gulp.task('clean', ()=> {
//   return gulp.src('build/**/**/**/*',{read:false})
//   .pipe(clean());
// });

gulp.task('copy', ()=> {
  gulp.src('./app/**/**/**/*')
  .pipe(gulp.dest('build/'));
});

gulp.task('bundle', ()=> {
  return gulp.src('./app/js/client.js')
  .pipe(webpack({
    output:{
      filename:'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('build', ['copy', 'bundle']);
gulp.task('default', ['build']);
gulp.watch(['app/*'],['build']);
