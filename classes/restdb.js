import React, { useEffect } from 'react';
import { annuitCœptis } from './AnnuitCœptis.class';
import config from '../config';
const {
	apikey
} = config;

const RestDB = () => {
  useEffect(
  	() => {
		/*
		 * RestDB.io (c) JavaScript API
		 * Generated for database: https://da3031-adea.restdb.io
		 * Date: Sat Jan 23 2021 21:42:26 GMT+0000 (UTC)
		 * Source: https://da3031-adea.restdb.io/rest/_jsapi.js?plainjs=true
		 */

		var restdb = (function(apikey, opt) {
			var _self = this;
			var _es = null;
			var _pubsub_listeners = [];
			opt = opt || {}
			this.logging = opt.logging;
			this._url = opt.url || "https://da3031-adea.restdb.io";
			this._apikey = apikey;
			this._jwt = opt.jwt || false;
			this.evtsrc = null;
			var _lastping = new Date();
			var _pingdiff = 0;
			var _keepalivedelay = opt._keepalivedelay || 20000;
			var _keepalivediff = opt._keepalivediff || 25000;

			// local pub/sub
		    var events = (function(){
		        var topics = {};
		        var hOP = topics.hasOwnProperty;

		        return {
		          subscribe: function(topic, listener) {
		            // Create the topic's object if not yet created
		            if(!hOP.call(topics, topic)) topics[topic] = [];

		            // Add the listener to queue
		            var index = topics[topic].push(listener) -1;

		            // Provide handle back for removal of topic
		            return {
		              remove: function() {
		                delete topics[topic][index];
		              }
		            };
		          },
		          publish: function(topic, info) {
		            // If the topic doesn't exist, or there's no listeners in queue, just leave
		            if(!hOP.call(topics, topic)) return;

		            // Cycle through topics queue, fire!
		            topics[topic].forEach(function(item) {
		                    item(info != undefined ? info : {});
		            });
		          }
		        };
		      })();

			// logging
			var _log = function() {
				if (_self.logging === true) {
					console.log(arguments);
				}
			}
			// keep alive
			setInterval(function(){
				var now = new Date();
				_pingdiff = now.getTime() - _lastping.getTime();
				if (_pingdiff > _keepalivediff) {
					_conn();
					events.publish("da3031adea_reconnect_event");
				}
			}, _keepalivedelay);

			var _isFunction = function(functionToCheck) {
				var getType = {};
				return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
			}

			// reatime global events
			var _on = function(evt, callback){
				if (!opt.realtime) {return};
				// listen for all realtime events
				switch (evt) {
					case "CONNECT":
						events.subscribe("da3031adea_connect_event",function(data){
							_log("Connect");
							if (callback){callback(null, null);}
						});
						break;
					case "DISCONNECT":
						events.subscribe("da3031adea_disconnect_event",function(data){
							_log("Disconnect");
							if (callback){callback(null, null);}
						});
						break;
					case "RECONNECT":
						events.subscribe("da3031adea_reconnect_event",function(data){
							_log("Reconnect");
							if (callback){callback(null, null);}
						});
						break;
					case "POST":
						events.subscribe("da3031adea_post_data_event",function(data){
							_log("Post");
							if (callback){callback(null, data);}
						});
						break;
					case "PUT":
						events.subscribe("da3031adea_put_data_event",function(data){
							_log("Put");
							if (callback){callback(null, data);}
						});
						break;
					case "DELETE":
						events.subscribe("da3031adea_delete_data_event",function(data){
							_log("Delete");
							if (callback){callback(null, data);}
						});
						break;
					default:
						events.subscribe("da3031adea_publish_data_event",function(data){
							_log("Publish");
							if (callback && data.event === evt){callback(null, data);}
						});
						break;
				}
			};

			// connect

			var _conn = function() {
				if (!opt.realtime) {return};

				_log('Connect...',_self._url);
				if (_es !== null) {
					_es.close();
				}
				if (opt.jwt) {
					_es = new EventSource(_self._url+"/realtime?jwt="+apikey+"&rt-apikey="+(opt['realtime-api-key'] || apikey));
				} else {
					_es = new EventSource(_self._url+"/realtime?apikey="+apikey);
				}

				_es.addEventListener("open", function(e) {
					_log("Realtime open");
					events.publish("da3031adea_connect_event");
				});
				_es.addEventListener('ping', function(e){
					_lastping = new Date(e.data);
				},false);
				_es.addEventListener('put', function(e) {
					var eo = JSON.parse(e.data);
					_log("PUT evt ", eo);
					events.publish("da3031adea_put_data_event", eo);
				}, false);
				_es.addEventListener('post', function(e) {
					var eo = JSON.parse(e.data);
					_log("POST evt ", eo);
					events.publish("da3031adea_post_data_event", eo);
				}, false);
				_es.addEventListener('delete', function(e) {
					var eo = JSON.parse(e.data);
					_log("DELETE evt ", eo);
					events.publish("da3031adea_delete_data_event", eo);
				}, false);
				_es.addEventListener('publish', function(e) {
					var eo = JSON.parse(e.data);
					_log("DELETE evt ", eo);
					events.publish("da3031adea_publish_data_event", eo);
				}, false);
				_es.addEventListener("error", function(e) {
					_log('Connect error ...',e);
					var txt;
					events.publish("da3031adea_disconnect_event");
					switch(e.target.readyState){
					case EventSource.CONNECTING:
						_log('Reconnecting...');
						break;
					case EventSource.CLOSED:
						_log('Closed...');
						setTimeout(function(){
							_conn();
						}, opt.reconnectdelay || 5000);

						break;
					}
				});
			}
			if (opt.realtime){
				_conn(this);
			}

			// global ajax
			var _ajax = function(opt, callback) {
				var data = opt.data;

				var xhr = new XMLHttpRequest();
				xhr.withCredentials = false;

				xhr.addEventListener("readystatechange", function () {
					if (this.readyState === 4) {
						//console.log(this.responseText);
						if (xhr.status >= 200 && xhr.status < 300) {
							var json = JSON.parse(this.responseText);
							callback(null, json, xhr.status, xhr);
						} else {
							callback(JSON.parse(this.responseText), null);
						}
					}
				});

				xhr.open(opt.type, opt.url);
				xhr.setRequestHeader("content-type", "application/json");
				if (_self._jwt) {
					ajx.headers["Authorization"] = "Bearer " + _self._apikey;
				} else {
					xhr.setRequestHeader("x-apikey", _self._apikey);
				}
				xhr.setRequestHeader("cache-control", "no-cache");

				xhr.send(data);
			}

			// Helper
			var _json2obj = function(json, obj) {
				if (json && json['_id']) {
					obj['_id'] = json['_id'];
				}
				if (json && json['_created']) {
					obj['_created'] = json['_created'];
				}
				if (json && json['_createdby']) {
					obj['_createdby'] = json['_createdby'];
				}
				if (json && json['_changed']) {
					obj['_changed'] = json['_changed'];
				}
				if (json && json['_changedby']) {
					obj['_changedby'] = json['_changedby'];
				}
				if (json && json['_version']) {
					obj['_version'] = json['_version'];
				}
			}

			// Publish/Subscribe events
			/*
			var _subscribe = function(topic, callback) {

				_es.addEventListener(topic, function(e) {
					var eo = JSON.parse(e.data);
					console.log(eo);
					callback(null, eo);
				});
			}
			*/
			var _publish = function(topic, payload, callback) {
				var msg = {"event": topic, "data": payload};
				var url = _self._url + "/realtime";
				var ajxopt = {url : url, type : 'POST', data: JSON.stringify(msg), retry: true};
				if (!callback) {
					ajxopt.async = false;
				}
				_ajax(ajxopt, function(err, res){
					if (!err){
						_log("Published ok ", res);
						if (callback){
							callback(err, res);
						}
					} else {
						if (callback){
							callback(err, null);
						}
					}
				});
			}

			// Collection class
			var systemjobs = function(json) {
				_json2obj(json, this);
							this['script'] = json['script'];
							this['active'] = json['active'];
							this['description'] = json['description'];
							this['crontab'] = json['crontab'];
			};


			systemjobs.prototype = {
				toString: function() {
					return "systemjobs";
				},
				// Save object
				save: function(callback) {
					// save to db
					var url = _self._url + "/rest/system_jobs";
					var json = {};
					json['script'] = this['script'];
					json['active'] = this['active'];
					json['description'] = this['description'];
					json['crontab'] = this['crontab'];
					if (this['_id']) {
						json['_id'] = this['_id'];
						url += "/" + this['_id'];
					}
					if (this['_parent_id']) {json['_parent_id'] = this['_parent_id']};
					if (this['_parent_def']) {json['_parent_def'] = this['_parent_def']};
					if (this['_parent_field']) {json['_parent_field'] = this['_parent_field']};
					_log("save: ", url, json);
					var _that = this;
					var ajxopt = {url : url, type : (json._id ? 'PUT' : 'POST'), data: JSON.stringify(json), retry: true};
					if (!callback) {
						ajxopt.async = false;
					}
					_ajax(ajxopt, function(err, res){
						if (!err){
							_log("Saved ok ", res);
							_json2obj(res, _that);
							_that['script'] = res['script'];
							_that['active'] = res['active'];
							_that['description'] = res['description'];
							_that['crontab'] = res['crontab'];
							_log("After ajax save ", _that);
							if (callback){
								callback(err, _that);
							}
						} else {
							if (callback){
								callback(err, null);
							}
						}
					});
				},
				// Delete object
				delete: function(callback) {
					// delete from db
					var url = _self._url + "/rest/system_jobs/"+this['_id'];
					_log("Delete: ", url)
					if (this['_id']) {
						_ajax({url : url, type : 'DELETE', retry: true}, callback);
					}
				},
				// Reload object from db by ID
				reload: function(callback){
					// find by ID
					var url = _self._url + "/rest/system_jobs/" + this['_id'];
					_log("reload: ", url);
					if (this['_id']) {
						var _that = this;
						_ajax({url : url, type : 'GET', retry: true}, function(err, res){
							if (callback && !err){
								_log("Reloaded ok ", res);
									_json2obj(res, _that);
									_that['script'] = res['script'];
									_that['active'] = res['active'];
									_that['description'] = res['description'];
									_that['crontab'] = res['crontab'];
									callback(err, _that);
							} else {
								if (callback){
									callback(err, null);
								}
							}
						});
					} else {
						_log("Cannot reload object without an _id");
					}
				},
				// listen for PUT and DELETE events for this object
				on: function(evt, callback) {
					if (!opt.realtime) {return};
					// listen for realtime events
					var _that = this;
					events.subscribe("da3031adea_put_data_event",function(data){
						if ("system_jobs" === data.collection && (evt === "PUT" || evt === "DELETE")){
							if (_that['_id'] && _that['_id'] === data.data){
								_log("system_jobs this Observer: ",data);
								if (callback){callback(null, _that);}
							}
						}
					});
				}
				// Helper methods
			};
			// Query
			systemjobs.find = function(query, hint, callback){
				// find by query
				var url = _self._url + "/rest/system_jobs?q="+JSON.stringify(query);
				if (hint && hint.metafields) {
					url += "&metafields=true";
					delete hint.metafields;
				}
				_log("find: ", url);
				if (_isFunction(hint)) {
					callback = hint;
				} else {
					url += "&h="+JSON.stringify(hint);
				}
				_ajax({url : url, type : 'GET', retry: true}, function(_err, _res, _status, xhr){
					if (callback && !_err){
						var xpage = JSON.parse(xhr.getResponseHeader('X-Pagination'));
						_log(xpage);
						var index, len;
						var arr = [];
						if(hint["$aggregate"] || hint["$groupby"]) {
							callback(null, _res);
						} else {
							for (index = 0, len = _res.length; index < len; ++index) {
								arr.push( new systemjobs(_res[index]));
							}
							callback(null, arr);
						}

					} else {
						if (callback){callback(_err, null);}
					}
				});
			};
			// Get object by ID
			systemjobs.getById = function(ID, callback){
				// find by ID
				var url = _self._url + "/rest/system_jobs/" + ID;
				_log("getById: ", url);
				_ajax({url : url, type : 'GET', retry: true}, function(err, res){
					if (callback && !err) {
						callback(null, new systemjobs(res));
					} else {
						if (callback){
							callback(err, null);
						}
					}
				});
			};

			// listen for collection events
			systemjobs.on = function(evt, callback){
				if (!opt.realtime) {return};
				// listen for realtime events
				events.subscribe("da3031adea_put_data_event",function(data){
					if ("system_jobs" === data.collection && evt === "PUT"){
						_log("system_jobs Observer put: ",data);
						if (callback){callback(null, data);}
					}
				});
				events.subscribe("da3031adea_post_data_event",function(data){
					if ("system_jobs" === data.collection && evt === "POST"){
						_log("system_jobs Observer post: ",data);
						if (callback){callback(null, data);}
					}
				});
				events.subscribe("da3031adea_delete_data_event",function(data){
					if ("system_jobs" === data.collection && evt === "DELETE"){
						_log("system_jobs Observer delete: ",data);
						if (callback){callback(null, data);}
					}
				});
			};
			var systemlog = function(json) {
				_json2obj(json, this);
							this['status'] = json['status'];
							this['logstring'] = json['logstring'];
			};


			systemlog.prototype = {
				toString: function() {
					return "systemlog";
				},
				// Save object
				save: function(callback) {
					// save to db
					var url = _self._url + "/rest/system_log";
					var json = {};
					json['status'] = this['status'];
					json['logstring'] = this['logstring'];
					if (this['_id']) {
						json['_id'] = this['_id'];
						url += "/" + this['_id'];
					}
					if (this['_parent_id']) {json['_parent_id'] = this['_parent_id']};
					if (this['_parent_def']) {json['_parent_def'] = this['_parent_def']};
					if (this['_parent_field']) {json['_parent_field'] = this['_parent_field']};
					_log("save: ", url, json);
					var _that = this;
					var ajxopt = {url : url, type : (json._id ? 'PUT' : 'POST'), data: JSON.stringify(json), retry: true};
					if (!callback) {
						ajxopt.async = false;
					}
					_ajax(ajxopt, function(err, res){
						if (!err){
							_log("Saved ok ", res);
							_json2obj(res, _that);
							_that['status'] = res['status'];
							_that['logstring'] = res['logstring'];
							_log("After ajax save ", _that);
							if (callback){
								callback(err, _that);
							}
						} else {
							if (callback){
								callback(err, null);
							}
						}
					});
				},
				// Delete object
				delete: function(callback) {
					// delete from db
					var url = _self._url + "/rest/system_log/"+this['_id'];
					_log("Delete: ", url)
					if (this['_id']) {
						_ajax({url : url, type : 'DELETE', retry: true}, callback);
					}
				},
				// Reload object from db by ID
				reload: function(callback){
					// find by ID
					var url = _self._url + "/rest/system_log/" + this['_id'];
					_log("reload: ", url);
					if (this['_id']) {
						var _that = this;
						_ajax({url : url, type : 'GET', retry: true}, function(err, res){
							if (callback && !err){
								_log("Reloaded ok ", res);
									_json2obj(res, _that);
									_that['status'] = res['status'];
									_that['logstring'] = res['logstring'];
									callback(err, _that);
							} else {
								if (callback){
									callback(err, null);
								}
							}
						});
					} else {
						_log("Cannot reload object without an _id");
					}
				},
				// listen for PUT and DELETE events for this object
				on: function(evt, callback) {
					if (!opt.realtime) {return};
					// listen for realtime events
					var _that = this;
					events.subscribe("da3031adea_put_data_event",function(data){
						if ("system_log" === data.collection && (evt === "PUT" || evt === "DELETE")){
							if (_that['_id'] && _that['_id'] === data.data){
								_log("system_log this Observer: ",data);
								if (callback){callback(null, _that);}
							}
						}
					});
				}
				// Helper methods
			};
			// Query
			systemlog.find = function(query, hint, callback){
				// find by query
				var url = _self._url + "/rest/system_log?q="+JSON.stringify(query);
				if (hint && hint.metafields) {
					url += "&metafields=true";
					delete hint.metafields;
				}
				_log("find: ", url);
				if (_isFunction(hint)) {
					callback = hint;
				} else {
					url += "&h="+JSON.stringify(hint);
				}
				_ajax({url : url, type : 'GET', retry: true}, function(_err, _res, _status, xhr){
					if (callback && !_err){
						var xpage = JSON.parse(xhr.getResponseHeader('X-Pagination'));
						_log(xpage);
						var index, len;
						var arr = [];
						if(hint["$aggregate"] || hint["$groupby"]) {
							callback(null, _res);
						} else {
							for (index = 0, len = _res.length; index < len; ++index) {
								arr.push( new systemlog(_res[index]));
							}
							callback(null, arr);
						}

					} else {
						if (callback){callback(_err, null);}
					}
				});
			};
			// Get object by ID
			systemlog.getById = function(ID, callback){
				// find by ID
				var url = _self._url + "/rest/system_log/" + ID;
				_log("getById: ", url);
				_ajax({url : url, type : 'GET', retry: true}, function(err, res){
					if (callback && !err) {
						callback(null, new systemlog(res));
					} else {
						if (callback){
							callback(err, null);
						}
					}
				});
			};

			// listen for collection events
			systemlog.on = function(evt, callback){
				if (!opt.realtime) {return};
				// listen for realtime events
				events.subscribe("da3031adea_put_data_event",function(data){
					if ("system_log" === data.collection && evt === "PUT"){
						_log("system_log Observer put: ",data);
						if (callback){callback(null, data);}
					}
				});
				events.subscribe("da3031adea_post_data_event",function(data){
					if ("system_log" === data.collection && evt === "POST"){
						_log("system_log Observer post: ",data);
						if (callback){callback(null, data);}
					}
				});
				events.subscribe("da3031adea_delete_data_event",function(data){
					if ("system_log" === data.collection && evt === "DELETE"){
						_log("system_log Observer delete: ",data);
						if (callback){callback(null, data);}
					}
				});
			};
			var emailoutbound = function(json) {
				_json2obj(json, this);
							this['subject'] = json['subject'];
							this['body'] = json['body'];
							this['to'] = json['to'];
			};


			emailoutbound.prototype = {
				toString: function() {
					return "emailoutbound";
				},
				// Save object
				save: function(callback) {
					// save to db
					var url = _self._url + "/rest/email_outbound";
					var json = {};
					json['subject'] = this['subject'];
					json['body'] = this['body'];
					json['to'] = this['to'];
					if (this['_id']) {
						json['_id'] = this['_id'];
						url += "/" + this['_id'];
					}
					if (this['_parent_id']) {json['_parent_id'] = this['_parent_id']};
					if (this['_parent_def']) {json['_parent_def'] = this['_parent_def']};
					if (this['_parent_field']) {json['_parent_field'] = this['_parent_field']};
					_log("save: ", url, json);
					var _that = this;
					var ajxopt = {url : url, type : (json._id ? 'PUT' : 'POST'), data: JSON.stringify(json), retry: true};
					if (!callback) {
						ajxopt.async = false;
					}
					_ajax(ajxopt, function(err, res){
						if (!err){
							_log("Saved ok ", res);
							_json2obj(res, _that);
							_that['subject'] = res['subject'];
							_that['body'] = res['body'];
							_that['to'] = res['to'];
							_log("After ajax save ", _that);
							if (callback){
								callback(err, _that);
							}
						} else {
							if (callback){
								callback(err, null);
							}
						}
					});
				},
				// Delete object
				delete: function(callback) {
					// delete from db
					var url = _self._url + "/rest/email_outbound/"+this['_id'];
					_log("Delete: ", url)
					if (this['_id']) {
						_ajax({url : url, type : 'DELETE', retry: true}, callback);
					}
				},
				// Reload object from db by ID
				reload: function(callback){
					// find by ID
					var url = _self._url + "/rest/email_outbound/" + this['_id'];
					_log("reload: ", url);
					if (this['_id']) {
						var _that = this;
						_ajax({url : url, type : 'GET', retry: true}, function(err, res){
							if (callback && !err){
								_log("Reloaded ok ", res);
									_json2obj(res, _that);
									_that['subject'] = res['subject'];
									_that['body'] = res['body'];
									_that['to'] = res['to'];
									callback(err, _that);
							} else {
								if (callback){
									callback(err, null);
								}
							}
						});
					} else {
						_log("Cannot reload object without an _id");
					}
				},
				// listen for PUT and DELETE events for this object
				on: function(evt, callback) {
					if (!opt.realtime) {return};
					// listen for realtime events
					var _that = this;
					events.subscribe("da3031adea_put_data_event",function(data){
						if ("email_outbound" === data.collection && (evt === "PUT" || evt === "DELETE")){
							if (_that['_id'] && _that['_id'] === data.data){
								_log("email_outbound this Observer: ",data);
								if (callback){callback(null, _that);}
							}
						}
					});
				}
				// Helper methods
			};
			// Query
			emailoutbound.find = function(query, hint, callback){
				// find by query
				var url = _self._url + "/rest/email_outbound?q="+JSON.stringify(query);
				if (hint && hint.metafields) {
					url += "&metafields=true";
					delete hint.metafields;
				}
				_log("find: ", url);
				if (_isFunction(hint)) {
					callback = hint;
				} else {
					url += "&h="+JSON.stringify(hint);
				}
				_ajax({url : url, type : 'GET', retry: true}, function(_err, _res, _status, xhr){
					if (callback && !_err){
						var xpage = JSON.parse(xhr.getResponseHeader('X-Pagination'));
						_log(xpage);
						var index, len;
						var arr = [];
						if(hint["$aggregate"] || hint["$groupby"]) {
							callback(null, _res);
						} else {
							for (index = 0, len = _res.length; index < len; ++index) {
								arr.push( new emailoutbound(_res[index]));
							}
							callback(null, arr);
						}

					} else {
						if (callback){callback(_err, null);}
					}
				});
			};
			// Get object by ID
			emailoutbound.getById = function(ID, callback){
				// find by ID
				var url = _self._url + "/rest/email_outbound/" + ID;
				_log("getById: ", url);
				_ajax({url : url, type : 'GET', retry: true}, function(err, res){
					if (callback && !err) {
						callback(null, new emailoutbound(res));
					} else {
						if (callback){
							callback(err, null);
						}
					}
				});
			};

			// listen for collection events
			emailoutbound.on = function(evt, callback){
				if (!opt.realtime) {return};
				// listen for realtime events
				events.subscribe("da3031adea_put_data_event",function(data){
					if ("email_outbound" === data.collection && evt === "PUT"){
						_log("email_outbound Observer put: ",data);
						if (callback){callback(null, data);}
					}
				});
				events.subscribe("da3031adea_post_data_event",function(data){
					if ("email_outbound" === data.collection && evt === "POST"){
						_log("email_outbound Observer post: ",data);
						if (callback){callback(null, data);}
					}
				});
				events.subscribe("da3031adea_delete_data_event",function(data){
					if ("email_outbound" === data.collection && evt === "DELETE"){
						_log("email_outbound Observer delete: ",data);
						if (callback){callback(null, data);}
					}
				});
			};
			var emailinbound = function(json) {
				_json2obj(json, this);
							this['from'] = json['from'];
							this['subject'] = json['subject'];
							this['body'] = json['body'];
			};


			emailinbound.prototype = {
				toString: function() {
					return "emailinbound";
				},
				// Save object
				save: function(callback) {
					// save to db
					var url = _self._url + "/rest/email_inbound";
					var json = {};
					json['from'] = this['from'];
					json['subject'] = this['subject'];
					json['body'] = this['body'];
					if (this['_id']) {
						json['_id'] = this['_id'];
						url += "/" + this['_id'];
					}
					if (this['_parent_id']) {json['_parent_id'] = this['_parent_id']};
					if (this['_parent_def']) {json['_parent_def'] = this['_parent_def']};
					if (this['_parent_field']) {json['_parent_field'] = this['_parent_field']};
					_log("save: ", url, json);
					var _that = this;
					var ajxopt = {url : url, type : (json._id ? 'PUT' : 'POST'), data: JSON.stringify(json), retry: true};
					if (!callback) {
						ajxopt.async = false;
					}
					_ajax(ajxopt, function(err, res){
						if (!err){
							_log("Saved ok ", res);
							_json2obj(res, _that);
							_that['from'] = res['from'];
							_that['subject'] = res['subject'];
							_that['body'] = res['body'];
							_log("After ajax save ", _that);
							if (callback){
								callback(err, _that);
							}
						} else {
							if (callback){
								callback(err, null);
							}
						}
					});
				},
				// Delete object
				delete: function(callback) {
					// delete from db
					var url = _self._url + "/rest/email_inbound/"+this['_id'];
					_log("Delete: ", url)
					if (this['_id']) {
						_ajax({url : url, type : 'DELETE', retry: true}, callback);
					}
				},
				// Reload object from db by ID
				reload: function(callback){
					// find by ID
					var url = _self._url + "/rest/email_inbound/" + this['_id'];
					_log("reload: ", url);
					if (this['_id']) {
						var _that = this;
						_ajax({url : url, type : 'GET', retry: true}, function(err, res){
							if (callback && !err){
								_log("Reloaded ok ", res);
									_json2obj(res, _that);
									_that['from'] = res['from'];
									_that['subject'] = res['subject'];
									_that['body'] = res['body'];
									callback(err, _that);
							} else {
								if (callback){
									callback(err, null);
								}
							}
						});
					} else {
						_log("Cannot reload object without an _id");
					}
				},
				// listen for PUT and DELETE events for this object
				on: function(evt, callback) {
					if (!opt.realtime) {return};
					// listen for realtime events
					var _that = this;
					events.subscribe("da3031adea_put_data_event",function(data){
						if ("email_inbound" === data.collection && (evt === "PUT" || evt === "DELETE")){
							if (_that['_id'] && _that['_id'] === data.data){
								_log("email_inbound this Observer: ",data);
								if (callback){callback(null, _that);}
							}
						}
					});
				}
				// Helper methods
			};
			// Query
			emailinbound.find = function(query, hint, callback){
				// find by query
				var url = _self._url + "/rest/email_inbound?q="+JSON.stringify(query);
				if (hint && hint.metafields) {
					url += "&metafields=true";
					delete hint.metafields;
				}
				_log("find: ", url);
				if (_isFunction(hint)) {
					callback = hint;
				} else {
					url += "&h="+JSON.stringify(hint);
				}
				_ajax({url : url, type : 'GET', retry: true}, function(_err, _res, _status, xhr){
					if (callback && !_err){
						var xpage = JSON.parse(xhr.getResponseHeader('X-Pagination'));
						_log(xpage);
						var index, len;
						var arr = [];
						if(hint["$aggregate"] || hint["$groupby"]) {
							callback(null, _res);
						} else {
							for (index = 0, len = _res.length; index < len; ++index) {
								arr.push( new emailinbound(_res[index]));
							}
							callback(null, arr);
						}

					} else {
						if (callback){callback(_err, null);}
					}
				});
			};
			// Get object by ID
			emailinbound.getById = function(ID, callback){
				// find by ID
				var url = _self._url + "/rest/email_inbound/" + ID;
				_log("getById: ", url);
				_ajax({url : url, type : 'GET', retry: true}, function(err, res){
					if (callback && !err) {
						callback(null, new emailinbound(res));
					} else {
						if (callback){
							callback(err, null);
						}
					}
				});
			};

			// listen for collection events
			emailinbound.on = function(evt, callback){
				if (!opt.realtime) {return};
				// listen for realtime events
				events.subscribe("da3031adea_put_data_event",function(data){
					if ("email_inbound" === data.collection && evt === "PUT"){
						_log("email_inbound Observer put: ",data);
						if (callback){callback(null, data);}
					}
				});
				events.subscribe("da3031adea_post_data_event",function(data){
					if ("email_inbound" === data.collection && evt === "POST"){
						_log("email_inbound Observer post: ",data);
						if (callback){callback(null, data);}
					}
				});
				events.subscribe("da3031adea_delete_data_event",function(data){
					if ("email_inbound" === data.collection && evt === "DELETE"){
						_log("email_inbound Observer delete: ",data);
						if (callback){callback(null, data);}
					}
				});
			};
			var emailunsubscribed = function(json) {
				_json2obj(json, this);
							this['to'] = json['to'];
			};


			emailunsubscribed.prototype = {
				toString: function() {
					return "emailunsubscribed";
				},
				// Save object
				save: function(callback) {
					// save to db
					var url = _self._url + "/rest/email_unsubscribed";
					var json = {};
					json['to'] = this['to'];
					if (this['_id']) {
						json['_id'] = this['_id'];
						url += "/" + this['_id'];
					}
					if (this['_parent_id']) {json['_parent_id'] = this['_parent_id']};
					if (this['_parent_def']) {json['_parent_def'] = this['_parent_def']};
					if (this['_parent_field']) {json['_parent_field'] = this['_parent_field']};
					_log("save: ", url, json);
					var _that = this;
					var ajxopt = {url : url, type : (json._id ? 'PUT' : 'POST'), data: JSON.stringify(json), retry: true};
					if (!callback) {
						ajxopt.async = false;
					}
					_ajax(ajxopt, function(err, res){
						if (!err){
							_log("Saved ok ", res);
							_json2obj(res, _that);
							_that['to'] = res['to'];
							_log("After ajax save ", _that);
							if (callback){
								callback(err, _that);
							}
						} else {
							if (callback){
								callback(err, null);
							}
						}
					});
				},
				// Delete object
				delete: function(callback) {
					// delete from db
					var url = _self._url + "/rest/email_unsubscribed/"+this['_id'];
					_log("Delete: ", url)
					if (this['_id']) {
						_ajax({url : url, type : 'DELETE', retry: true}, callback);
					}
				},
				// Reload object from db by ID
				reload: function(callback){
					// find by ID
					var url = _self._url + "/rest/email_unsubscribed/" + this['_id'];
					_log("reload: ", url);
					if (this['_id']) {
						var _that = this;
						_ajax({url : url, type : 'GET', retry: true}, function(err, res){
							if (callback && !err){
								_log("Reloaded ok ", res);
									_json2obj(res, _that);
									_that['to'] = res['to'];
									callback(err, _that);
							} else {
								if (callback){
									callback(err, null);
								}
							}
						});
					} else {
						_log("Cannot reload object without an _id");
					}
				},
				// listen for PUT and DELETE events for this object
				on: function(evt, callback) {
					if (!opt.realtime) {return};
					// listen for realtime events
					var _that = this;
					events.subscribe("da3031adea_put_data_event",function(data){
						if ("email_unsubscribed" === data.collection && (evt === "PUT" || evt === "DELETE")){
							if (_that['_id'] && _that['_id'] === data.data){
								_log("email_unsubscribed this Observer: ",data);
								if (callback){callback(null, _that);}
							}
						}
					});
				}
				// Helper methods
			};
			// Query
			emailunsubscribed.find = function(query, hint, callback){
				// find by query
				var url = _self._url + "/rest/email_unsubscribed?q="+JSON.stringify(query);
				if (hint && hint.metafields) {
					url += "&metafields=true";
					delete hint.metafields;
				}
				_log("find: ", url);
				if (_isFunction(hint)) {
					callback = hint;
				} else {
					url += "&h="+JSON.stringify(hint);
				}
				_ajax({url : url, type : 'GET', retry: true}, function(_err, _res, _status, xhr){
					if (callback && !_err){
						var xpage = JSON.parse(xhr.getResponseHeader('X-Pagination'));
						_log(xpage);
						var index, len;
						var arr = [];
						if(hint["$aggregate"] || hint["$groupby"]) {
							callback(null, _res);
						} else {
							for (index = 0, len = _res.length; index < len; ++index) {
								arr.push( new emailunsubscribed(_res[index]));
							}
							callback(null, arr);
						}

					} else {
						if (callback){callback(_err, null);}
					}
				});
			};
			// Get object by ID
			emailunsubscribed.getById = function(ID, callback){
				// find by ID
				var url = _self._url + "/rest/email_unsubscribed/" + ID;
				_log("getById: ", url);
				_ajax({url : url, type : 'GET', retry: true}, function(err, res){
					if (callback && !err) {
						callback(null, new emailunsubscribed(res));
					} else {
						if (callback){
							callback(err, null);
						}
					}
				});
			};

			// listen for collection events
			emailunsubscribed.on = function(evt, callback){
				if (!opt.realtime) {return};
				// listen for realtime events
				events.subscribe("da3031adea_put_data_event",function(data){
					if ("email_unsubscribed" === data.collection && evt === "PUT"){
						_log("email_unsubscribed Observer put: ",data);
						if (callback){callback(null, data);}
					}
				});
				events.subscribe("da3031adea_post_data_event",function(data){
					if ("email_unsubscribed" === data.collection && evt === "POST"){
						_log("email_unsubscribed Observer post: ",data);
						if (callback){callback(null, data);}
					}
				});
				events.subscribe("da3031adea_delete_data_event",function(data){
					if ("email_unsubscribed" === data.collection && evt === "DELETE"){
						_log("email_unsubscribed Observer delete: ",data);
						if (callback){callback(null, data);}
					}
				});
			};
			var silos = function(json) {
				_json2obj(json, this);
							this['id'] = json['id'];
							this['name'] = json['name'];
			};


			silos.prototype = {
				toString: function() {
					return "silos";
				},
				// Save object
				save: function(callback) {
					// save to db
					var url = _self._url + "/rest/silos";
					var json = {};
					json['id'] = this['id'];
					json['name'] = this['name'];
					if (this['_id']) {
						json['_id'] = this['_id'];
						url += "/" + this['_id'];
					}
					if (this['_parent_id']) {json['_parent_id'] = this['_parent_id']};
					if (this['_parent_def']) {json['_parent_def'] = this['_parent_def']};
					if (this['_parent_field']) {json['_parent_field'] = this['_parent_field']};
					_log("save: ", url, json);
					var _that = this;
					var ajxopt = {url : url, type : (json._id ? 'PUT' : 'POST'), data: JSON.stringify(json), retry: true};
					if (!callback) {
						ajxopt.async = false;
					}
					_ajax(ajxopt, function(err, res){
						if (!err){
							_log("Saved ok ", res);
							_json2obj(res, _that);
							_that['id'] = res['id'];
							_that['name'] = res['name'];
							_log("After ajax save ", _that);
							if (callback){
								callback(err, _that);
							}
						} else {
							if (callback){
								callback(err, null);
							}
						}
					});
				},
				// Delete object
				delete: function(callback) {
					// delete from db
					var url = _self._url + "/rest/silos/"+this['_id'];
					_log("Delete: ", url)
					if (this['_id']) {
						_ajax({url : url, type : 'DELETE', retry: true}, callback);
					}
				},
				// Reload object from db by ID
				reload: function(callback){
					// find by ID
					var url = _self._url + "/rest/silos/" + this['_id'];
					_log("reload: ", url);
					if (this['_id']) {
						var _that = this;
						_ajax({url : url, type : 'GET', retry: true}, function(err, res){
							if (callback && !err){
								_log("Reloaded ok ", res);
									_json2obj(res, _that);
									_that['id'] = res['id'];
									_that['name'] = res['name'];
									callback(err, _that);
							} else {
								if (callback){
									callback(err, null);
								}
							}
						});
					} else {
						_log("Cannot reload object without an _id");
					}
				},
				// listen for PUT and DELETE events for this object
				on: function(evt, callback) {
					if (!opt.realtime) {return};
					// listen for realtime events
					var _that = this;
					events.subscribe("da3031adea_put_data_event",function(data){
						if ("silos" === data.collection && (evt === "PUT" || evt === "DELETE")){
							if (_that['_id'] && _that['_id'] === data.data){
								_log("silos this Observer: ",data);
								if (callback){callback(null, _that);}
							}
						}
					});
				}
				// Helper methods
			};
			// Query
			silos.find = function(query, hint, callback){
				// find by query
				var url = _self._url + "/rest/silos?q="+JSON.stringify(query);
				if (hint && hint.metafields) {
					url += "&metafields=true";
					delete hint.metafields;
				}
				_log("find: ", url);
				if (_isFunction(hint)) {
					callback = hint;
				} else {
					url += "&h="+JSON.stringify(hint);
				}
				_ajax({url : url, type : 'GET', retry: true}, function(_err, _res, _status, xhr){
					if (callback && !_err){
						var xpage = JSON.parse(xhr.getResponseHeader('X-Pagination'));
						_log(xpage);
						var index, len;
						var arr = [];
						if(hint["$aggregate"] || hint["$groupby"]) {
							callback(null, _res);
						} else {
							for (index = 0, len = _res.length; index < len; ++index) {
								arr.push( new silos(_res[index]));
							}
							callback(null, arr);
						}

					} else {
						if (callback){callback(_err, null);}
					}
				});
			};
			// Get object by ID
			silos.getById = function(ID, callback){
				// find by ID
				var url = _self._url + "/rest/silos/" + ID;
				_log("getById: ", url);
				_ajax({url : url, type : 'GET', retry: true}, function(err, res){
					if (callback && !err) {
						callback(null, new silos(res));
					} else {
						if (callback){
							callback(err, null);
						}
					}
				});
			};

			// listen for collection events
			silos.on = function(evt, callback){
				if (!opt.realtime) {return};
				// listen for realtime events
				events.subscribe("da3031adea_put_data_event",function(data){
					if ("silos" === data.collection && evt === "PUT"){
						_log("silos Observer put: ",data);
						if (callback){callback(null, data);}
					}
				});
				events.subscribe("da3031adea_post_data_event",function(data){
					if ("silos" === data.collection && evt === "POST"){
						_log("silos Observer post: ",data);
						if (callback){callback(null, data);}
					}
				});
				events.subscribe("da3031adea_delete_data_event",function(data){
					if ("silos" === data.collection && evt === "DELETE"){
						_log("silos Observer delete: ",data);
						if (callback){callback(null, data);}
					}
				});
			};
			var nodes = function(json) {
				_json2obj(json, this);
							this['data'] = json['data'];
							this['silo_id'] = json['silo_id'];
			};


			nodes.prototype = {
				toString: function() {
					return "nodes";
				},
				// Save object
				save: function(callback) {
					// save to db
					var url = _self._url + "/rest/nodes";
					var json = {};
					json['data'] = this['data'];
					json['silo_id'] = this['silo_id'];
					if (this['_id']) {
						json['_id'] = this['_id'];
						url += "/" + this['_id'];
					}
					if (this['_parent_id']) {json['_parent_id'] = this['_parent_id']};
					if (this['_parent_def']) {json['_parent_def'] = this['_parent_def']};
					if (this['_parent_field']) {json['_parent_field'] = this['_parent_field']};
					_log("save: ", url, json);
					var _that = this;
					var ajxopt = {url : url, type : (json._id ? 'PUT' : 'POST'), data: JSON.stringify(json), retry: true};
					if (!callback) {
						ajxopt.async = false;
					}
					_ajax(ajxopt, function(err, res){
						if (!err){
							_log("Saved ok ", res);
							_json2obj(res, _that);
							_that['data'] = res['data'];
							_that['silo_id'] = res['silo_id'];
							_log("After ajax save ", _that);
							if (callback){
								callback(err, _that);
							}
						} else {
							if (callback){
								callback(err, null);
							}
						}
					});
				},
				// Delete object
				delete: function(callback) {
					// delete from db
					var url = _self._url + "/rest/nodes/"+this['_id'];
					_log("Delete: ", url)
					if (this['_id']) {
						_ajax({url : url, type : 'DELETE', retry: true}, callback);
					}
				},
				// Reload object from db by ID
				reload: function(callback){
					// find by ID
					var url = _self._url + "/rest/nodes/" + this['_id'];
					_log("reload: ", url);
					if (this['_id']) {
						var _that = this;
						_ajax({url : url, type : 'GET', retry: true}, function(err, res){
							if (callback && !err){
								_log("Reloaded ok ", res);
									_json2obj(res, _that);
									_that['data'] = res['data'];
									_that['silo_id'] = res['silo_id'];
									callback(err, _that);
							} else {
								if (callback){
									callback(err, null);
								}
							}
						});
					} else {
						_log("Cannot reload object without an _id");
					}
				},
				// listen for PUT and DELETE events for this object
				on: function(evt, callback) {
					if (!opt.realtime) {return};
					// listen for realtime events
					var _that = this;
					events.subscribe("da3031adea_put_data_event",function(data){
						if ("nodes" === data.collection && (evt === "PUT" || evt === "DELETE")){
							if (_that['_id'] && _that['_id'] === data.data){
								_log("nodes this Observer: ",data);
								if (callback){callback(null, _that);}
							}
						}
					});
				}
				// Helper methods
			};
			// Query
			nodes.find = function(query, hint, callback){
				// find by query
				var url = _self._url + "/rest/nodes?q="+JSON.stringify(query);
				if (hint && hint.metafields) {
					url += "&metafields=true";
					delete hint.metafields;
				}
				_log("find: ", url);
				if (_isFunction(hint)) {
					callback = hint;
				} else {
					url += "&h="+JSON.stringify(hint);
				}
				_ajax({url : url, type : 'GET', retry: true}, function(_err, _res, _status, xhr){
					if (callback && !_err){
						var xpage = JSON.parse(xhr.getResponseHeader('X-Pagination'));
						_log(xpage);
						var index, len;
						var arr = [];
						if(hint["$aggregate"] || hint["$groupby"]) {
							callback(null, _res);
						} else {
							for (index = 0, len = _res.length; index < len; ++index) {
								arr.push( new nodes(_res[index]));
							}
							callback(null, arr);
						}

					} else {
						if (callback){callback(_err, null);}
					}
				});
			};
			// Get object by ID
			nodes.getById = function(ID, callback){
				// find by ID
				var url = _self._url + "/rest/nodes/" + ID;
				_log("getById: ", url);
				_ajax({url : url, type : 'GET', retry: true}, function(err, res){
					if (callback && !err) {
						callback(null, new nodes(res));
					} else {
						if (callback){
							callback(err, null);
						}
					}
				});
			};

			// listen for collection events
			nodes.on = function(evt, callback){
				if (!opt.realtime) {return};
				// listen for realtime events
				events.subscribe("da3031adea_put_data_event",function(data){
					if ("nodes" === data.collection && evt === "PUT"){
						_log("nodes Observer put: ",data);
						if (callback){callback(null, data);}
					}
				});
				events.subscribe("da3031adea_post_data_event",function(data){
					if ("nodes" === data.collection && evt === "POST"){
						_log("nodes Observer post: ",data);
						if (callback){callback(null, data);}
					}
				});
				events.subscribe("da3031adea_delete_data_event",function(data){
					if ("nodes" === data.collection && evt === "DELETE"){
						_log("nodes Observer delete: ",data);
						if (callback){callback(null, data);}
					}
				});
			};

			// Public API methods
			return {
				on: _on,
				publish: _publish,
				logging: this.logging,
				url: this._url,
				apikey: this._apikey,
				systemjobs: systemjobs,
				systemlog: systemlog,
				emailoutbound: emailoutbound,
				emailinbound: emailinbound,
				emailunsubscribed: emailunsubscribed,
				silos: silos,
				nodes: nodes
			}
		});

		// Source: https://da3031-adea.restdb.io/assets/js/eventsource.min.js
		!function(a){"use strict";function b(){this.data={}}function c(){this.listeners=new b}function d(a){k(function(){throw a},0)}function e(a){this.type=a,this.target=void 0}function f(a,b){e.call(this,a),this.data=b.data,this.lastEventId=b.lastEventId}function g(a,b){var c=a;return c!==c&&(c=b),A>c?A:c>B?B:c}function h(a,b,c){try{"function"==typeof b&&b.call(a,c)}catch(e){d(e)}}function i(b,d){function i(){P=t,void 0!=L&&(L.abort(),L=void 0),0!==M&&(l(M),M=0),0!==N&&(l(N),N=0),H.readyState=t}function j(a){var c="";if(P===s||P===r)try{c=L.responseText}catch(d){}var j=void 0,m=!1;if(P===r){var n=0,o="",p=void 0;if("contentType"in L)""!==a&&"error"!==a&&(n=200,o="OK",p=L.contentType);else try{n=L.status,o=L.statusText,p=L.getResponseHeader("Content-Type")}catch(d){n=0,o="",p=void 0}if(void 0==p&&(p=""),0===n&&""===o&&"load"===a&&""!==c&&(n=200,o="OK",""===p)){var A=/^data\:([^,]*?)(?:;base64)?,[\S]*$/.exec(b);void 0!=A&&(p=A[1])}if(200===n&&z.test(p)){if(P=s,J=!0,I=E,H.readyState=s,j=new e("open"),H.dispatchEvent(j),h(H,H.onopen,j),P===t)return}else if(0!==n&&(200!==n||""!==p)){var C="";C=200!==n?"EventSource's response has a status "+n+" "+o.replace(/\s+/g," ")+" that is not 200. Aborting the connection.":"EventSource's response has a Content-Type specifying an unsupported type: "+p.replace(/\s+/g," ")+". Aborting the connection.",k(function(){throw new Error(C)},0),m=!0}}if(P===s){c.length>O&&(J=!0);for(var D=O-1,K=c.length,N="\n";++D<K;)if(N=c.charAt(D),U===u&&"\n"===N)U=v;else if(U===u&&(U=v),"\r"===N||"\n"===N){if("data"===V?Q.push(W):"id"===V?R=W:"event"===V?S=W:"retry"===V?(E=g(Number(W),E),I=E):"heartbeatTimeout"===V&&(F=g(Number(W),F),0!==M&&(l(M),M=k(T,F))),W="",V="",U===v){if(0!==Q.length&&(G=R,""===S&&(S="message"),j=new f(S,{data:Q.join("\n"),lastEventId:R}),H.dispatchEvent(j),"message"===S&&h(H,H.onmessage,j),P===t))return;Q.length=0,S=""}U="\r"===N?u:v}else U===v&&(U=w),U===w?":"===N?U=x:V+=N:U===x?(" "!==N&&(W+=N),U=y):U===y&&(W+=N);O=K}P!==s&&P!==r||!("load"===a||"error"===a||m||O>1048576||0===M&&!J)?0===M&&(J=!1,M=k(T,F)):(m?i():(""!==a||0!==M||J||k(function(){throw new Error("No activity within "+F+" milliseconds. Reconnecting.")},0),P=q,L.abort(),0!==M&&(l(M),M=0),I>16*E&&(I=16*E),I>B&&(I=B),M=k(T,I),I=2*I+1,H.readyState=r),j=new e("error"),H.dispatchEvent(j),h(H,H.onerror,j))}function m(){j("progress")}function n(){j("load")}function A(){j("error")}function C(){j(4===L.readyState?0===L.status?"error":"load":"progress")}b=b.toString();var D=o&&void 0!=d&&Boolean(d.withCredentials),E=g(1e3,0),F=g(45e3,0),G="",H=this,I=E,J=!1,K=void 0!=d&&void 0!=d.Transport?d.Transport:p,L=new K,M=0,N=0,O=0,P=q,Q=[],R="",S="",T=void 0,U=v,V="",W="";"readyState"in L&&void 0!=a.opera&&(N=k(function X(){3===L.readyState&&j("progress"),N=k(X,500)},0)),T=function(){if(M=0,P!==q)return void j("");if((!("ontimeout"in L)||"sendAsBinary"in L||"mozAnon"in L)&&void 0!=a.document&&void 0!=a.document.readyState&&"complete"!==a.document.readyState)return void(M=k(T,4));L.onload=n,L.onerror=A,"onabort"in L&&(L.onabort=A),"onprogress"in L&&(L.onprogress=m),"onreadystatechange"in L&&(L.onreadystatechange=C),J=!1,M=k(T,F),O=0,P=r,Q.length=0,S="",R=G,W="",V="",U=v;var c=b.slice(0,5);c="data:"!==c&&"blob:"!==c?b+((-1===b.indexOf("?",0)?"?":"&")+"lastEventId="+encodeURIComponent(G)+"&r="+(Math.random()+1).toString().slice(2)):b,L.open("GET",c,!0),"withCredentials"in L&&(L.withCredentials=D),"responseType"in L&&(L.responseType="text"),"setRequestHeader"in L&&L.setRequestHeader("Accept","text/event-stream"),L.send(void 0)},c.call(this),this.close=i,this.url=b,this.readyState=r,this.withCredentials=D,this.onopen=void 0,this.onmessage=void 0,this.onerror=void 0,T()}function j(){this.CONNECTING=r,this.OPEN=s,this.CLOSED=t}var k=a.setTimeout,l=a.clearTimeout;b.prototype.get=function(a){return this.data[a+"~"]},b.prototype.set=function(a,b){this.data[a+"~"]=b},b.prototype["delete"]=function(a){delete this.data[a+"~"]},c.prototype.dispatchEvent=function(a){a.target=this;var b=a.type.toString(),c=this.listeners,e=c.get(b);if(void 0!=e)for(var f=e.length,g=-1,h=void 0;++g<f;){h=e[g];try{h.call(this,a)}catch(i){d(i)}}},c.prototype.addEventListener=function(a,b){a=a.toString();var c=this.listeners,d=c.get(a);void 0==d&&(d=[],c.set(a,d));for(var e=d.length;--e>=0;)if(d[e]===b)return;d.push(b)},c.prototype.removeEventListener=function(a,b){a=a.toString();var c=this.listeners,d=c.get(a);if(void 0!=d){for(var e=d.length,f=[],g=-1;++g<e;)d[g]!==b&&f.push(d[g]);0===f.length?c["delete"](a):c.set(a,f)}},f.prototype=e.prototype;var m=a.XMLHttpRequest,n=a.XDomainRequest,o=void 0!=m&&void 0!=(new m).withCredentials,p=o||void 0!=m&&void 0==n?m:n,q=-1,r=0,s=1,t=2,u=3,v=4,w=5,x=6,y=7,z=/^text\/event\-stream;?(\s*charset\=utf\-8)?$/i,A=1e3,B=18e6;j.prototype=c.prototype,i.prototype=new j,j.call(i),o&&(i.prototype.withCredentials=void 0);var C=function(){return void 0!=a.EventSource&&"withCredentials"in a.EventSource.prototype};void 0!=p&&(void 0==a.EventSource||o&&!C())&&(a.NativeEventSource=a.EventSource,a.EventSource=i)}(window);

		const restDB = new restdb(apikey, {realtime: true, logging: true});
		annuitCœptis.setRestDB(restDB);
		annuitCœptis.setWindow(window);
  	}
  )

  return null;
};

export default RestDB;
