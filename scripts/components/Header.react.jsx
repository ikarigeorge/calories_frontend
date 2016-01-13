var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var SessionActionCreators = require('../actions/SessionActionCreators.react.jsx');
var Menu = require('react-menu');
var MenuTrigger = Menu.MenuTrigger;
var MenuOptions = Menu.MenuOptions;
var MenuOption = Menu.MenuOption;

var Header = React.createClass({

  propTypes: {
    isLoggedIn: ReactPropTypes.bool,
    email: ReactPropTypes.string
  },
  render: function() {
    var rightNav = this.props.isLoggedIn ? (
      <ul className="right">
        <Menu className='headerMenu'>
            <MenuTrigger>
              ⚙
            </MenuTrigger>
            <MenuOptions>

              <MenuOption>
                <Link to="logout">Logout</Link>
              </MenuOption>

            </MenuOptions>
          </Menu> 
      </ul>
    ) : (
      <ul className="right">
        <li><Link to="login">Login</Link></li>
        <li><Link to="signup">Sign up</Link></li>
      </ul>
    );

    var leftNav = this.props.isLoggedIn ? (
      <ul className="right">
        <li>
        <a href="#">{this.props.email}</a></li>
      </ul>
    ) : (
      <div></div>
    );

    return (
      <nav className="top-bar" data-topbar role="navigation">
        <ul className="title-area">
          <li className="name">
            <h1><a href="/"><strong>Calories App</strong></a></h1>
          </li>
          <li className="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
        </ul>

        <section className="top-bar-section">
          {rightNav}
          {leftNav}
        </section>
      </nav>
    );
  }
});

module.exports = Header;

