"use strict";
/*
   Copyright 2016 Andrew S

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/ 
module.exports = class QuickMap {
  constructor() {
    this.objects = {};
    this.length = 0;
    this.cleanin = 30;
  }
  clean() {
    var objects = {};
    for (var i in this.objects) {
     var ob = this.objects[i];
      if (ob.deleted) continue;
      objects[id] = ob;
    }
    this.objects = objects;
    this.cleanin = 30
    this.length = this.objects.length;
  }
  set(id,node) {
     var key = "_" + id.toString();
   if (!this.objects[key] || this.objects[key].deleted) this.length ++;
    this.objects[key] = {node: node,deleted: false,key: id}
  }
  get(id) {
     var object = this.objects["_" + id.toString()];
    if (!object || object.deleted) return false;
    return object.node
  }
  delete(id) {
    var object = this.objects["_" + id.toString()];
    if (object && !object.deleted) this.length --;
     
    if (!object && !object.deleted) return false;
    this.objects["_" + id.toString()] = {deleted: true}
    this.cleanin --;
    if (this.cleanin <= 0) this.clean();
    return true
  }
  toObject() {
    var objects = [];
    for (var i in this.objects) {
     var ob = this.objects[i];
      if (ob.deleted) continue;
      objects[ob.key] = ob.node;
    }
    return objects;
  }
  every(a) {
     var visited = [];
    for (var i in this.objects) {
     if (this.objects[i].deleted) continue;
     visited.push(i);
     if (!a(this.objects[i].node,this.objects[i].key)) return;
    }
  }
  forEach(a) {
     var visited = [];
      for (var i in this.objects) {
     if (this.objects[i].deleted) continue;
     visited.push(i);
     a(this.objects[i].node,this.objects[i].key)
    }
  }
  
}
