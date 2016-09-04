"use strict";

module.exports = class QuickMap {
  constructor() {
    this.objects = {};
    this.length = 0;
    this.cleanin = 30;
  }
  clean() {
    var objects = {};
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
    var objects = {};
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
