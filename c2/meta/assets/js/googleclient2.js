var GOOGLE_CLIENT_ID = '230155975860-sm73anfsonu0nd0nudq2imkjfhemlrfg.apps.googleusercontent.com';
var PRODUCTION_GCLIENT_ID = '230155975860-j2rkja4th7spa16640ssnm75tksu3ufd.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly"
var SPREADSHEET_ID = '1ER9sSL_EiGTQ2bOZJOUXq3f4wvlAjCIt2Epwt5FWD0c'

class GoogleAPIClient {
  constructor() {
    this.isSignedIn = false
    this.init = this.init.bind(this)
    this.updateSigninStatus = this.updateSigninStatus.bind(this)
    this.getIsSignedIn = this.getIsSignedIn.bind(this)
    this.waitUntilSignedIn = this.waitUntilSignedIn.bind(this)
  }

  getIsSignedIn () {
    return this.isSignedIn
  }

  waitUntilSignedIn (skip, callback) {
    if (skip || this.isSignedIn) {
      callback()
    } else {
      this.signInCallback = callback
    }
  }

  updateSigninStatus (isSignedIn) {
    this.isSignedIn = isSignedIn
    if (isSignedIn) {
      if (!!this.signInCallback) {
        this.signInCallback()
        this.signInCallback = null
      }
    } else {
      gapi.auth2.getAuthInstance().signIn().then(function(result) {
        console.log(result);
      }, function(err) {
        console.log(err);
      })
      // self.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
    }
  }

  init () {
    const self = this
    var production = window.location.href.indexOf("github") > -1

    var env_id = (window.location.href.indexOf("github") > -1) ? PRODUCTION_GCLIENT_ID : GOOGLE_CLIENT_ID
    console.log("google api init, environment: " + production);
    console.log(env_id);
    console.log("spreadsheet:", "https://docs.google.com/spreadsheets/d/" + SPREADSHEET_ID)

    gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: env_id,
      scope: SCOPES
    }).then(function () {
      gapi.auth2.getAuthInstance().isSignedIn.listen(self.updateSigninStatus)
      self.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
    })
  }

  goFishingIn(water, callback) {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: water
    }).then(function(response) {
      var fish = response.result
      callback(
        // range.values
        fish
      )
    }, function(response) {
      console.log('Error: ' + response.result.error.message)
    })
  }


  getNounPhrases (callback) {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Noun Phrases!A:A',
    }).then(function(response) {
      var range = response.result
      callback(
        range.values
          .filter(row => !!row)
          .map(row => row[0])
      )
    }, function(response) {
      console.log('Error: ' + response.result.error.message)
    })
  }

  getRuns (callback) {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1ER9sSL_EiGTQ2bOZJOUXq3f4wvlAjCIt2Epwt5FWD0c',
      range: 'runs',
    }).then(function(response) {
      var range = response.result
      callback(
        range.values
      )
    }, function(response) {
      console.log('Error: ' + response.result.error.message)
    })
  }
}

const client = new GoogleAPIClient();
// window.client = client;
// console.log(client)

window.handleClientLoad = function() {
  gapi.load('client:auth2', client.init)
}
