/*jshint node:true*/
module.exports = {
  framework: 'qunit',
  test_page: 'tests/index.html?dockcontainer&coverage',
  disable_watching: true,
  launch_in_ci: [
    'PhantomJS',
  ],
  launch_in_dev: [
    'Chrome',
    'PhantomJS',
  ],
};
