const gulp = require('gulp');
const webpack = require('webpack-stream');
const clean = require('gulp-clean');

// gulp.task('clean', ()=> {
//   return gulp.src('build/**/**/**/*',{read:false})
//   .pipe(clean());
// });

gulp.task('copy', ()=> {
  gulp.src('./app/**/*.html')
  .pipe(gulp.dest('build/'));
});

gulp.task('bundle', ()=> {
  return gulp.src('./app/client.js')
  .pipe(webpack({
    output:{
      filename:'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('bundle:test', ()=> {
  return gulp.src(__dirname + '/test/*_test.js')
  .pipe(webpack({
    output: {
      filename: 'test_bundle.js'
    }
  }))
  .pipe(gulp.dest(__dirname + '/test'));
});

gulp.task('build', ['copy', 'bundle']);
gulp.task('default', ['build']);
