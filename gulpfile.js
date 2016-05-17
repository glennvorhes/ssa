"use strict";
const gulp = require('gulp');
const gulpHelpers = require('webmapsjs/lib/gulp-helpers');

function _ssa(production) {
    "use strict";

    let filesArr = [
        ['./app/ssa-create.js', './build/ssa-create.js'],
        ['./app/ssa-view.js', './build/ssa-view.js']
    ];

    return gulpHelpers.bundleEs2015Multiple(filesArr, production);
}




gulp.task('build-tests', function () {
    "use strict";

        let filesArr = [
        ['./test/ajaxGetter.spec.js', './test.build/ajaxGetter.js'],
        ['./test/selectBox.spec.js', './test.build/selectBox.js'],
        ['./test/makeMap.spec.js', './test.build/makeMap.js'],
        ['./test/layout.spec.js', './test.build/layout.js']
    ];

    return gulpHelpers.bundleEs2015Multiple(filesArr, false);

});

gulp.task('ssa', () => {
    return _ssa(false);
});

gulp.task('ssa-prod', () => {
    return _ssa(true);
});
//
// gulp.task('glrtoc', () => {
//     "use strict";
//
//     return _glrtoc(false);
// });
//
//
// gulp.task('tsmo', () => {
//     "use strict";
//
//     return _tsmo(false);
// });

//
// function _npmrds(doMinify) {
//     "use strict";
//
//     return processJsFile('./flaskApp/blueprints/npmrds/static/js/heatmap/main.js', './flaskApp/blueprints/npmrds/static/_build/heatmap-main.js', doMinify);
// }
//
// gulp.task('npmrds-dev', () => {
//     "use strict";
//
//     return _npmrds(false);
// });
//
// gulp.task('npmrds-prod', () => {
//     "use strict";
//
//     return _npmrds(true);
// });

//
// function _ssa(production) {
//     "use strict";
//     gulpHelpers.processLessFile('./flaskApp/blueprints/testing/static/css/ssa-corridor.less', './flaskApp/blueprints/testing/static/_build/ssa-corridor.css');
//
//     return gulpHelpers.bundleEs2015('./flaskApp/blueprints/testing/static/js/ssa-create.js', './flaskApp/blueprints/testing/static/_build/ssa-create.js', production);
// }
//
// gulp.task('ssa', () => {
//     "use strict";
//
//     return _ssa(false);
// });
//
//
// gulp.task('peerGroup', () => {
//     "use strict";
//
//     return processJsFile('./flaskApp/blueprints/peerGroup/static/js/main.js', './flaskApp/blueprints/peerGroup/static/_build/main.js', false);
// });
//
//
// function _buildTestApps() {
//     "use strict";
//     //processJsFile('./flaskApp/blueprints/testing/static/js/test-custom-build.js', './flaskApp/blueprints/testing/static/_build/test-custom-build.js', false);
//
//     return processJsFile('./flaskApp/blueprints/testing/static/js/test-corridor-layer.js', './flaskApp/blueprints/testing/static/_build/test-corridor-layer.js', false);
//
// }
//
// gulp.task('buildTestApps', () => {
//     "use strict";
//
//     return _buildTestApps(false);
// });
//
//
// gulp.task('test_test', () => {
//     "use strict";
//
//     return _buildTestApps(false);
// });
//
// gulp.task('test_build', () => {
//     "use strict";
//
//     return processJsFile('./src/test_import.js', './build/test_import.js', false);
// });
//
// gulp.task('build-prod', () => {
//     _glrtoc(true);
//     _tsmo(true);
//     _ssa(true);
// });
