/*
 *  index.js
 *
 *  David Janes
 *  IOTDB.org
 *  2015-06-22
 *
 *  Copyright [2013-2015] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

var mdns = require('mdns');
var iotdb = require('iotdb');
var _ = iotdb._;

var ad_http;
var ad_api;

var advertise_http = function(homestar) {
    var td = {};
    var client_id = _.d.get(homestar.settings, "/keys/homestar/key");
    if (client_id) {
        td.runner = client_id;
    }

    ad_http = mdns.createAdvertisement(
        mdns.tcp('http'), 
        homestar.settings.webserver.port,
        {
            // host: homestar.settings.webserver.host,
            name: "Home☆Star: " + homestar.settings.name,
            txtRecord: td
        });
    ad_http.start();
};

var advertise_api = function(homestar) {
    var td = {
        api: "/api"
    };
    var client_id = _.d.get(homestar.settings, "/keys/homestar/key");
    if (client_id) {
        td.runner = client_id;
    }

    ad_api = mdns.createAdvertisement(
        mdns.tcp('iotdb'), 
        homestar.settings.webserver.port,
        {
            // host: homestar.settings.webserver.host,
            name: homestar.settings.name,
            txtRecord: td
        });
    ad_api.start();
};

exports.web = {
    setup: function(app, homestar) {
        advertise_http(homestar);
        advertise_api(homestar);
    }
};
