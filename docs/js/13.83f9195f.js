(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{de90:function(n,a,e){"use strict";e.r(a),a["default"]="<template>\n  <div style=\"max-width: 800px; width: 100%;\">\n    <q-icon-picker\n      v-model=\"value\"\n      :icons=\"icons\"\n      style=\"height: 100px;\"\n      tooltips\n    />\n  </div>\n</template>\n\n<script>\nexport default {\n  data () {\n    return {\n      value: '',\n      icons: [\n        { name: 'camera' },\n        { name: 'o_camera' },\n        { name: 'r_camera' },\n        { name: 's_camera' },\n        { name: 'ion-ios-camera' },\n        { name: 'fas fa-camera' },\n        { name: 'eva-camera' },\n        { name: 'mdi-camera' },\n        { name: 'ti-camera' },\n        { name: 'las la-camera' }\n      ],\n      pagination: {\n        itemsPerPage: 10,\n        page: 0\n      }\n    }\n  }\n}\n<\/script>\n"}}]);