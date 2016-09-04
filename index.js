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
    this.objects = [];
    this.length = 0;
    this.cleanin = 30;
  }
  clean() {
    var objects = [];
    this.objects.forEach((ob,id)=>{
      if (ob.deleted) return;
      objects[id] = ob;
    })
    this.objects = objects;
    this.cleanin = 30
    this.length = this.objects.length;
  }
  set(id,node) {
    this.length ++;
    this.objects[id.toString()] = {node: node,deleted: false}
  }
  get(id) {
    if (!this.objects[id.toString()] || this.objects[id.toString()].deleted) return false;
    return this.objects[id.toString()].node
  }
  delete(id) {
    this.length --;
    if (!this.objects[id.toString()] && !this.objects[id.toString()].deleted) return false;
    this.objects[id.toString()] = {deleted: true}
    this.cleanin --;
    if (this.cleanin <= 0) this.clean();
    return true
  }
  toObject() {
    var objects = [];
    this.objects.forEach((ob,id)=>{
      if (ob.deleted) return;
      objects[id] = ob.node;
    })
    return objects;
  }
  every(a,b,c) {
    return this.toObject().every(a,b,c)
  }
  forEach(a,b,c) {
    return this.toObject().forEach(a,b,c)
  }
  
}
