var React = require('react');
var router = require('./stores/RouteStore.react.jsx').getRouter();

router.run(function (Handler, state) {
  React.render(<Handler/>, document.getElementById('content'));
});
