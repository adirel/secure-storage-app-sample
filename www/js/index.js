/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var ss;
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        console.log('Device ready, defining keys for secure storage');
        // Creating some MSMediaKeySession, first i'm defining app vault
        ss = new cordova.plugins.SecureStorage(
            function() {
              console.log("Success");
            },
            function(error) {
              console.log("Error " + error);
            },
            "mscapp"
          );
          ss.set(
            function(key) {
              console.log("Set " + key);
            },
            function(error) {
              console.log("Error " + error);
            },
            "msckey",
            "SecretKey! Dont't tell..."
          );
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

function revealKey(){
    var val =  ss.get(
        function(value) {
          console.log("Success, the key is found: " + value);
          alert(value);
        },
        function(error) {
          console.log("Error getting key" + error);
        },
        "msckey"
      );

}
function setStorageKey() {
    localStorage.setItem("key", "regular storage key!!!");
}
function setStorageKeySecure(){
    ss.set(
        function(key) {
          console.log("Set " + key);
          alert('key inserted ' + key)
        },
        function(error) {
          console.log("Error " + error);
        },
        "secret",
        "secret value"
      );
}
document.getElementById("decryptDevice").addEventListener("click", revealKey);
document.getElementById("setStorageKey").addEventListener("click", setStorageKey);
document.getElementById("setStorageKeySecure").addEventListener("click", setStorageKeySecure);
