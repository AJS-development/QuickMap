"use strict";

module.exports = class QuickMap {
  constructor() {
    this.objects = {};
    this.length = 0;
    this.cleanin = 30;
  }
  clean() {
    this.objects = this.objects.filter(function(a) {return !a.deleted})
    this.cleanin = 30
  }
  set(id,node) {
    this.objects[id.toString()] = {node: node,deleted: false}
  }
  delete(id) {
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
