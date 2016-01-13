var keyMirror = require('keymirror');

var APIRoot = "http://localhost:3000";

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/api/v1/sessions",
    REGISTRATION:   APIRoot + "/api/v1/users",
    MEALS:        APIRoot + "/api/v1/meals"
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Session
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,
    LOGOUT_REQUEST: null,
    LOGOUT_RESPONSE: null,
    EDIT_CALORIES: null,
    RECEIVE_EDIT_CALORIES: null,

    // Routes
    REDIRECT: null,

    LOAD_MEALS: null,
    RECEIVE_MEALS: null,
    LOAD_MEAL: null,
    RECEIVE_MEAL: null,
    CREATE_MEAL: null,
    RECEIVE_CREATED_MEAL: null,
    EDIT_MEAL: null,
    RECEIVE_EDITED_MEAL: null,
    DELETE_MEAL: null,
    RECEIVE_DELETE_MEAL: null
  })

};
