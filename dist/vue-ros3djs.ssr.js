'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var ROS3D=require('ros3d'),Three=require('three'),ROSLIB=require('roslib'),TWEEN=_interopDefault(require('@tweenjs/tween.js')),timers=require('timers');//

var script = {
  name: 'ros3d-arrow',
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: false,
    },
    x: {
      type: Number,
      default: 0,
      require: false,
    },
    y: {
      type: Number,
      default: 0,
      require: false,
    },
    z: {
      type: Number,
      default: 0,
      require: false,
    },
    directionX: {
      type: Number,
      default: 1,
      require: false,
    },
    directionY: {
      type: Number,
      default: 0,
      require: false,
    },
    directionZ: {
      type: Number,
      default: 0,
      require: false,
    },
    length: {
      type: Number,
      default: 1,
      require: false,
    },
    headLength: {
      type: Number,
      default: 0.2,
      require: false,
    },
    shaftDiameter: {
      type: Number,
      default: 0.05,
      require: false,
    },
    headDiameter: {
      type: Number,
      default: 0.1,
      require: false,
    },
    color: {
      type: String,
      default: "#00ff00",
      require: false,
    },
  },
  watch: {
    color: function color(n) {
      this.object.material.color.set(n);
    },
    x: function x() { this.$nextTick(this.setPosition); },
    y: function y() { this.$nextTick(this.setPosition); },
    z: function z() { this.$nextTick(this.setPosition); },
    directionX: function directionX() { this.$nextTick(this.setDirection); },
    directionY: function directionY() { this.$nextTick(this.setDirection); },
    directionZ: function directionZ() { this.$nextTick(this.setDirection); },
    length: function length(n) {
      this.object.setLength(n);
    },
    visible: function visible(newState) {
      if (newState) { this.show(); }
      else { this.hide(); }
    }
  },
  methods: {
    show: function show() {
      this.$parent.viewer.scene.add(this.object);
    },
    hide: function hide() {
      var obj = this.$parent.viewer.scene.getObjectByName(this._uid);
      if (obj != null) { this.$parent.viewer.scene.remove(obj); }
    },
    setPosition: function setPosition() {
      this.object.position.set(this.x, this.y, this.z);
    },
    setDirection: function setDirection() {
      this.object.setDirection(new Three.Vector3(this.directionX || 0, this.directionY || 0, this.directionZ || 0));
    }
  },
  mounted: function mounted() {
    this.object = new ROS3D.Arrow({
      ros : this.$parent.ros,
      tfClient : this.$parent.tfClient,
      rootObject : this.$parent.viewer.scene,
      origin : new THREE.Vector3(this.x || 0, this.y || 0, this.z || 0),
      direction : new Three.Vector3(this.directionX || 0, this.directionY || 0, this.directionZ || 0),
      length : this.length,
      headLength : this.headLength,
      shaftDiameter : this.shaftDiameter,
      headDiameter : this.headDiameter,
      material : new Three.MeshBasicMaterial({color: this.color}),
    });
    this.object.name = this._uid;
    if (this.visible) { this.show(); }
  },
  beforeDestroy: function beforeDestroy() {
    this.hide();
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = "data-v-6111ada9";
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var Ros3dArrow = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );//

var script$1 = {
  name: 'ros3d-axes',
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: false,
    },
    x: {
      type: Number,
      default: 0,
      require: false,
    },
    y: {
      type: Number,
      default: 0,
      require: false,
    },
    z: {
      type: Number,
      default: 0,
      require: false,
    },
    lineType: {
      type: String,
      default: "full",
      require: false,
    },
    lineDashLength: {
      type: Number,
      default: 0.1,
      require: false,
    },
    scale: {
      type: Number,
      default: 1.0,
      require: false,
    },
    headLength: {
      type: Number,
      default: 0.1,
      require: false,
    },
    shaftRadius: {
      type: Number,
      default: 0.008,
      require: false,
    },
    headRadius: {
      type: Number,
      default: 0.023,
      require: false,
    },
  },
  watch: {
    visible: function visible(newState) {
      if (newState) { this.show(); }
      else { this.hide(); }
    },
    x: function x() { this.$nextTick(this.setPosition); },
    y: function y() { this.$nextTick(this.setPosition); },
    z: function z() { this.$nextTick(this.setPosition); },
    lineType: function lineType() { this.$nextTick(this.createObject); },
    lineDashLength: function lineDashLength() { this.$nextTick(this.createObject); },
    scale: function scale() { this.$nextTick(this.createObject); },
    headLength: function headLength() { this.$nextTick(this.createObject); },
    shaftRadius: function shaftRadius() { this.$nextTick(this.createObject); },
    headRadius: function headRadius() { this.$nextTick(this.createObject); },
  },
  methods: {
    show: function show() {
      this.$parent.viewer.scene.add(this.object);
    },
    hide: function hide() {
      var obj = this.$parent.viewer.scene.getObjectByName(this._uid);
      if (obj != null) { this.$parent.viewer.scene.remove(obj); }
    },
    createObject: function createObject() {
      if (this.object != null) { this.hide(); }

      this.object = new ROS3D.Axes({
        ros : this.$parent.ros,
        tfClient : this.$parent.tfClient,
        rootObject : this.$parent.viewer.scene,
        lineType : this.lineType,
        lineDashLength : this.lineDashLength,
        scale : this.scale,
        headLength : this.headLength,
        shaftRadius : this.shaftRadius,
        headRadius : this.headRadius,
      });
      this.object.name = this._uid;
      this.setPosition();
      if (this.visible) { this.show(); }
    },
    setPosition: function setPosition() {
      this.object.position.set(this.x, this.y, this.z);
    }
  },
  mounted: function mounted() {
    this.createObject();
  },
  beforeDestroy: function beforeDestroy() {
    this.hide();
  }
};/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = "data-v-6c4af85e";
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var Ros3dAxes = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );//

var script$2 = {
  name: 'ros3d-grid',
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: false,
    },
    numCells: {
      type: Number,
      default: 10,
      require: false,
    },
    color: {
      type: String,
      default: "#cccccc",
      require: false,
    },
    lineWidth: {
      type: Number,
      default: 1,
      require: false,
    },
    cellSize: {
      type: Number,
      default: 1,
      require: false,
    }
  },
  watch: {
    visible: function visible(newState) {
      if (newState) { this.show(); }
      else { this.hide(); }
    },
    numCells: function numCells() {
      this.$nextTick(this.createObject);
    },
    color: function color() {
      this.$nextTick(this.createObject);
    },
    lineWidth: function lineWidth() {
      this.$nextTick(this.createObject);
    },
    cellSize: function cellSize() {
      this.$nextTick(this.createObject);
    }
  },
  methods: {
    show: function show() {
      this.$parent.viewer.scene.add(this.object);
    },
    hide: function hide() {
      var obj = this.$parent.viewer.scene.getObjectByName(this._uid);
      if (obj != null) { this.$parent.viewer.scene.remove(obj); }
    },
    createObject: function createObject() {
      if (this.object != null) { this.hide(); }

      this.object = new ROS3D.Grid({
        num_cells: this.numCells,
        color: this.color,
        lineWidth: this.lineWidth,
        cellSize: this.cellSize
      });
      this.object.name = this._uid;
      
      if (this.visible) { this.show(); }
    }
  },
  mounted: function mounted() {
    this.createObject();
  },
  beforeDestroy: function beforeDestroy() {
    this.hide();
  }
};/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[])};
var __vue_staticRenderFns__$2 = [];

  /* style */
  var __vue_inject_styles__$2 = undefined;
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = "data-v-570218e8";
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var Ros3dGrid = normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );//

var script$3 = {
  name: 'ros3d-interactive-marker-client',
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: false,
    },
    topic: {
      type: String,
      default: '',
      require: false,
    },
  },
  watch: {
    topic: function topic(n) {
      this.object.unsubscribe();
      this.object.topicName = n;
      this.object.subscribe();
    },
    visible: function visible(newState) {
      if (newState) { this.show(); }
      else { this.hide(); }
    }
  },
  methods: {
    show: function show() {
      this.$parent.viewer.scene.add(this.object);
    },
    hide: function hide() {
      var obj = this.$parent.viewer.scene.getObjectByName(this._uid);
      if (obj != null) { this.$parent.viewer.scene.remove(obj); }
    }
  },
  mounted: function mounted() {
    this.object = new ROS3D.InteractiveMarkerClient({
      ros : this.$parent.ros,
      tfClient : this.$parent.tfClient,
      rootObject : this.$parent.viewer.selectableObjects,
      camera : this.$parent.viewer.camera,
      topic : this.topic,
    });
    this.object.name = this._uid;
    if (!this.visible) { this.hide(); }
  },
  beforeDestroy: function beforeDestroy() {
    this.object.unsubscribe();
    this.hide();
  }
};/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[])};
var __vue_staticRenderFns__$3 = [];

  /* style */
  var __vue_inject_styles__$3 = undefined;
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = "data-v-53254802";
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var Ros3dInteractiveMarkerClient = normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );//

var script$4 = {
  name: 'ros3d-laser-scan',
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: false,
    },
    topic: {
      type: String,
      default: '/scan',
      require: false,
    },
    compression: {
      type: String,
      default: 'cbor',
      require: false,
    },
    color: {
      type: String,
      default: "#ff0000",
      require: false,
    },
    particleSize: {
      type: Number,
      default: 0.25,
      require: false,
    }
  },
  watch: {
    topic: function topic(n) {
      this.object.unsubscribe();
      this.object.topicName = n;
      this.object.subscribe();
    },
    compression: function compression(n) {
      this.object.unsubscribe();
      this.object.compression = n;
      this.object.subscribe();
    },
    color: function color() {
      this.$nextTick(this.createObject);
    },
    particleSize: function particleSize() {
      this.$nextTick(this.createObject);
    },
    visible: function visible(newState) {
      if (newState) { this.show(); }
      else { this.hide(); }
    }
  },
  methods: {
    show: function show() {
      this.object.subscribe();
      if (this.object.points.sn != null) { this.$parent.viewer.scene.add(this.object.points.sn); }
    },
    hide: function hide() {
      this.object.unsubscribe();
      if (this.object.points.sn != null) { this.$parent.viewer.scene.remove(this.object.points.sn); }
    },
    createObject: function createObject() {
      if (this.object != null) { this.hide(); }

      // Setup the laser scan.
      this.object = new ROS3D.LaserScan({
        ros : this.$parent.ros,
        tfClient : this.$parent.tfClient,
        rootObject : this.$parent.viewer.scene,
        topic: this.topic,
        material: {
          color: this.color,
          size: this.particleSize
        }
      });
      this.object.name = this._uid;
      if (!this.visible) { this.hide(); }
    }
  },
  mounted: function mounted() {
    this.createObject();
  },
  beforeDestroy: function beforeDestroy() {
    this.object.unsubscribe();
    this.hide();
  }
};/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[])};
var __vue_staticRenderFns__$4 = [];

  /* style */
  var __vue_inject_styles__$4 = undefined;
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = "data-v-62e2101c";
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var Ros3dLaserScan = normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );//

var script$5 = {
  name: 'ros3d-marker-client',
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: false,
    },
    topic: {
      type: String,
      default: '',
      require: false,
    },
  },
  watch: {
    topic: function topic(n) {
      this.object.unsubscribe();
      this.object.topicName = n;
      this.object.subscribe();
    },
    visible: function visible(newState) {
      if (newState) { this.show(); }
      else { this.hide(); }
    }
  },
  methods: {
    show: function show() {
      this.$parent.viewer.scene.add(this.object);
    },
    hide: function hide() {
      var obj = this.$parent.viewer.scene.getObjectByName(this._uid);
      if (obj != null) { this.$parent.viewer.scene.remove(obj); }
    }
  },
  mounted: function mounted() {
    this.object = new ROS3D.MarkerClient({
      ros : this.$parent.ros,
      tfClient : this.$parent.tfClient,
      rootObject : this.$parent.viewer.scene,
      topic : this.topic,
    });
    this.object.name = this._uid;
    if (!this.visible) { this.hide(); }
  },
  beforeDestroy: function beforeDestroy() {
    this.object.unsubscribe();
    this.hide();
  }
};/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[])};
var __vue_staticRenderFns__$5 = [];

  /* style */
  var __vue_inject_styles__$5 = undefined;
  /* scoped */
  var __vue_scope_id__$5 = undefined;
  /* module identifier */
  var __vue_module_identifier__$5 = "data-v-3fec0139";
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var Ros3dMarkerClient = normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );//

var script$6 = {
  name: 'ros3d-occupancy-grid-client',
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: false,
    },
    topic: {
      type: String,
      default: '',
      require: false,
    },
    continuous: {
      type: Boolean,
      default: false,
      require: false,
    },
  },
  watch: {
    topic: function topic(n) {
      this.object.unsubscribe();
      this.object.topicName = n;
      this.object.subscribe();
    },
    continuous: function continuous(n) {
      this.object.continuous = n;
      if (n) { this.object.subscribe(); }
    },
    x: function x() {
      this.$nextTick(this.setOffset);
    },
    y: function y() {
      this.$nextTick(this.setOffset);
    },
    z: function z() {
      this.$nextTick(this.setOffset);
    },
    visible: function visible(newState) {
      if (newState) { this.show(); }
      else { this.hide(); }
    }
  },
  methods: {
    show: function show() {
      this.$parent.viewer.scene.add(this.object.sceneNode);
    },
    hide: function hide() {
      if (this.object.sceneNode != null) { this.$parent.viewer.scene.remove(this.object.sceneNode); }
    },
    setOffset: function setOffset() {
      this.object.unsubscribe();
      this.object.offsetPose = new ROSLIB.Pose({position: {x: this.x, y: this.y, z: this.z} });
      this.object.subscribe();
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    this.object = new ROS3D.OccupancyGridClient({
      ros : this.$parent.ros,
      tfClient : this.$parent.tfClient,
      rootObject : this.$parent.viewer.scene,
      topic: this.topic,
      continuous: this.continuous,
      offsetPose: new ROSLIB.Pose({position: {x: this.x, y: this.y, z: this.z} })
    });
    this.object.name = this._uid;

  
    this.object.processMessage = function (message) {
      ROS3D.OccupancyGridClient.prototype.processMessage.call(this$1.object, message);
    };


    if (!this.visible) { this.hide(); }
  },
  beforeDestroy: function beforeDestroy() {
    this.hide();
  }
};/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[])};
var __vue_staticRenderFns__$6 = [];

  /* style */
  var __vue_inject_styles__$6 = undefined;
  /* scoped */
  var __vue_scope_id__$6 = undefined;
  /* module identifier */
  var __vue_module_identifier__$6 = "data-v-595057b6";
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var Ros3dOccupancyGridClient = normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );//

var script$7 = {
  name: 'ros3d-path',
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: false,
    },
    topic: {
      type: String,
      default: '',
      require: false,
    },
    color: {
      type: String,
      default: "#009688",
      require: false,
    },
  },
  watch: {
    topic: function topic(n) {
      this.object.unsubscribe();
      this.object.topicName = n;
      this.object.subscribe();
    },
    color: function color(n) {
      this.object.color = n;
    },
    visible: function visible(newState) {
      if (newState) { this.show(); }
      else { this.hide(); }
    }
  },
  methods: {
    show: function show() {
      this.$parent.viewer.scene.add(this.object);
    },
    hide: function hide() {
      var obj = this.$parent.viewer.scene.getObjectByName(this._uid);
      if (obj != null) { this.$parent.viewer.scene.remove(obj); }
    }
  },
  mounted: function mounted() {
    this.object = new ROS3D.Path({
      ros : this.$parent.ros,
      tfClient : this.$parent.tfClient,
      rootObject : this.$parent.viewer.scene,
      topic : this.topic,
      color: this.color
    });
    this.object.name = this._uid;
    if (!this.visible) { this.hide(); }
  },
  beforeDestroy: function beforeDestroy() {
    this.object.unsubscribe();
    this.hide();
  }
};/* script */
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[])};
var __vue_staticRenderFns__$7 = [];

  /* style */
  var __vue_inject_styles__$7 = undefined;
  /* scoped */
  var __vue_scope_id__$7 = undefined;
  /* module identifier */
  var __vue_module_identifier__$7 = "data-v-9c5a8ed0";
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var Ros3dPath = normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    undefined,
    undefined,
    undefined
  );//

var script$8 = {
  name: 'ros3d-scene-node',
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: false,
    },
    frameID: {
      type: String,
      default: 'base_link',
      require: false,
    },
    model: {
      type: Object,
      require: true,
    },
  },
  watch: {
    model: function model() {
      this.$nextTick(this.createObject);
    },
    frameID: function frameID() {
      this.$nextTick(this.createObject);
    },
    visible: function visible(newState) {
      if (newState) { this.show(); }
      else { this.hide(); }
    }
  },
  methods: {
    show: function show() {
      this.$parent.viewer.scene.add(this.object);
    },
    hide: function hide() {
      var obj = this.$parent.viewer.scene.getObjectByName(this._uid);
      if (obj != null) { this.$parent.viewer.scene.remove(obj); }
    },
    createObject: function createObject() {
      if (this.object != null) { this.hide(); }

      if (this.model != null) {
        this.object = new ROS3D.SceneNode({
          tfClient : this.$parent.tfClient,
          frameID : this.frameID,
          object : this.model
        });
        this.object.name = this._uid;

        // This is not done automatically
        this.show();
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.object.unsubscribeTf();
    this.hide();
  }
};/* script */
var __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[])};
var __vue_staticRenderFns__$8 = [];

  /* style */
  var __vue_inject_styles__$8 = undefined;
  /* scoped */
  var __vue_scope_id__$8 = undefined;
  /* module identifier */
  var __vue_module_identifier__$8 = "data-v-456d291d";
  /* functional template */
  var __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var Ros3dSceneNode = normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    undefined,
    undefined,
    undefined
  );//

var script$9 = {
  name: 'ros3d-viewer',
  props: {
    ros: {
      type: Object,
      require: true,
    },
    background: {
      type: String,
      default: '#7e7e7e',
      require: false,
    },
    fixedFrame: {
      type: String,
      default: '/map',
      require: false,
    },
    antialias: {
      type: Boolean,
      default: true,
      require: false,
    },
    longPressTolerance: {
      type: Number,
      default: 15,
      require: false,
    },
    longPressDuration: {
      type: Number,
      default: 750,
      require: false
    }
  },
  data: function () { return ({
    viewer: null,
    tfClient: null,
    loaded: false,
    hold: false,
    position: null,
    direction: null,
    screenPosition: null
  }); },
  watch: {
    hold: function hold(n, o) {
      if (n && !o) {
        this.viewer.scene.add(this.arrow);
      }
      else if (o && !n) {
        this.viewer.scene.remove(this.arrow);
      }
    },
    position: function position(n) {
      if (n != null) {
        this.arrow.position.set(n.x, n.y, n.z + 0.05);
        this.circle.position.set(n.x, n.y, n.z + 0.05);
      }
    },
    direction: function direction(n) {
      if (n != null) { this.arrow.setDirection(n); }
    },
  },
  mounted: function mounted() {
    var this$1 = this;

    this.$el.id =  "viewer";

    // Create the main viewer.
    this.viewer = new ROS3D.Viewer({
      divID : this.$el.id,
      width : this.$el.clientWidth,
      height : this.$el.clientHeight,
      antialias : this.antialias,
      background: this.background,
      displayPanAndZoomFrame: false,
      cameraPose: {
        x: 8,
        y: 7,
        z: 50
      }
    });

    // Add TWEEN.update() to draw loop (for smooth animations)
    this.viewer.draw = function () {
      TWEEN.update();
      ROS3D.Viewer.prototype.draw.call(this$1.viewer);
    };

    // Setup a client to listen to TFs.
    this.tfClient = new ROSLIB.TFClient({
      ros : this.ros,
      angularThres : 0.01,
      transThres : 0.01,
      rate : 10.0,
      fixedFrame : this.fixedFrame
    });


    // listen to DOM events
    var eventNames = [ 'contextmenu', 'click', 'mouseout', 'mousedown', 'mouseup',
        'mousemove', 'touchstart', 'touchend', 'touchcancel',
        'touchleave', 'touchmove' ];
    this.listeners = {};

    // add event listeners for the associated mouse events
    eventNames.forEach(function (eventName) {
      this$1.listeners[eventName] = this$1.processDomEvent.bind(this$1);
      this$1.$el.addEventListener(eventName, this$1.listeners[eventName], true);
    }, this);

    // For debug reason
    window.scene = window.Scene = this.viewer.scene;

    // Create arrow for touch-and-hold or right-click
    this.arrow = new ROS3D.Arrow({
      ros: this.ros,
      tfClient: this.tfClient,
      rootObject: this.viewer.scene,
      material: new Three.MeshBasicMaterial({color: 0xff0000}),
    });

    // Create circle for touchdown animation
    var geometry = new Three.CircleGeometry( 1, 32 );
    var material = new Three.MeshPhongMaterial( { color: 0x000000, specular: 0x666666, emissive: 0x994400, shininess: 0, opacity: 0.5, transparent: true } );
    this.circle = new Three.Mesh( geometry, material );
    this.circle.visible = false;
    this.circle.scale.set(0, 0, 0);
    this.viewer.scene.add( this.circle );

    this.loaded = true;
  },
  methods: {
    startTimer: function startTimer() {
      var this$1 = this;

      if (this.timer) { timers.clearTimeout(this.timer); }
      this.timer = timers.setTimeout(function () { return this$1.hold = true; }, this.longPressDuration);
    },
    stopTimer: function stopTimer() {
      if (this.timer) {
        timers.clearTimeout(this.timer);
        this.timer = undefined;
      }
      this.hold = false;
      this.position = null;
      this.direction = null;
      this.screenPosition = null;
      
      this.circle.visible = false;
      this.circle.scale.set(0, 0, 0);
    },
    processDomEvent: function processDomEvent(domEvent) {
      var this$1 = this;

      this.$emit(domEvent.type);

      // if the mouse/touch leaves the dom element, stop everything
      if (domEvent.type === 'mouseout' ||
          domEvent.type === 'touchleave' ||
          domEvent.type === 'touchcancel') {
        this.stopTimer();
        return;
      }
      
      if (domEvent.type === 'mouseup' ||
          domEvent.type === 'click' ||
          domEvent.type === 'touchend') {
        if (this.hold) {
          var quat = new Three.Quaternion();
          this.arrow.getWorldQuaternion(quat);

          quat = quat.multiply(new Three.Quaternion(0, 0, Math.sqrt(0.5), Math.sqrt(0.5)));

          this.$emit("touch",
            {
              pose: new ROSLIB.Pose({
                position : new ROSLIB.Vector3(
                {
                  x: this.position.x,
                  y: this.position.y
                }),
                orientation : new ROSLIB.Quaternion(
                {
                  x: quat.x,
                  y: quat.y,
                  z: quat.z,
                  w: quat.w
                })
              }),
              screenPosition: this.screenPosition
            });
        }
        this.stopTimer();
        return;
      }

      var pos_x, pos_y;

      if(domEvent.type.indexOf('touch') !== -1) {
        pos_x = 0;
        pos_y = 0;
        for(var i=0; i<domEvent.touches.length; ++i) {
            pos_x += domEvent.touches[i].clientX;
            pos_y += domEvent.touches[i].clientY;
        }
        pos_x /= domEvent.touches.length;
        pos_y /= domEvent.touches.length;
      }
      else {
        pos_x = domEvent.clientX;
        pos_y = domEvent.clientY;
      }


      // Calculate the touch position in ROS space
      var vec = new Three.Vector3(); // create once and reuse
      var pos = new Three.Vector3(); // create once and reuse
      vec.set(
          ( pos_x / window.innerWidth ) * 2 - 1,
          - ( pos_y / window.innerHeight ) * 2 + 1,
          0.5 );

      vec.unproject( this.viewer.camera );
      vec.sub( this.viewer.camera.position ).normalize();
      var distance = - this.viewer.camera.position.z / vec.z;
      pos.copy( this.viewer.camera.position ).add( vec.multiplyScalar( distance ) );

      var scaleVector, scaleFactor, scale;

      if (domEvent.type === 'mousedown' && domEvent.button === 2) { // Right click
        this.hold = true;
        this.position = pos;
        this.screenPosition = [pos_x, pos_y];
        
        // Make touch group scale independent of camera
        scaleVector = new Three.Vector3();
        scaleFactor = 20;
        scale = scaleVector.subVectors(this.position, this.viewer.camera.position).length() / scaleFactor;
        this.arrow.scale.set(scale, scale, 1);
        
        return;
      }

      else if (domEvent.type === 'touchmove' || domEvent.type === 'mousemove') {
        if (this.hold) {
          this.hold = true;
          this.direction = pos.sub(this.position);
          domEvent.stopPropagation();
        }
        else if (this.screenPosition == null || Math.sqrt((this.screenPosition[0] - pos_x) * (this.screenPosition[0] - pos_x) + (this.screenPosition[1] - pos_y) * (this.screenPosition[1] - pos_y)) > this.longPressTolerance) {
          this.stopTimer();
        }
        return;
      }

      else if (domEvent.type === 'touchstart') {
        this.position = pos;
        this.screenPosition = [pos_x, pos_y];
        this.startTimer();

        // Make touch group scale independent of camera
        scaleVector = new Three.Vector3();
        scaleFactor = 10;
        scale = scaleVector.subVectors(this.position, this.viewer.camera.position).length() / scaleFactor;
        this.arrow.scale.set(scale, scale, 1);
        
        this.circle.visible = true;
        if (this.circleScaleTween) { this.circleScaleTween.stop(); }
        this.circle.scale.set(0, 0, 0);
        this.circleScaleTween = new TWEEN.Tween(this.circle.scale.clone())
                                      .to(new Three.Vector3(scale, scale, 1), this.longPressDuration)
                                      .easing(TWEEN.Easing.Back.InOut)
                                      .onUpdate(function (obj) {
                                        this$1.circle.scale.copy(obj);
                                      }).start();
      }
    }
  }
};/* script */
var __vue_script__$9 = script$9;

/* template */
var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.loaded)?_vm._t("default"):_vm._e()],2)};
var __vue_staticRenderFns__$9 = [];

  /* style */
  var __vue_inject_styles__$9 = undefined;
  /* scoped */
  var __vue_scope_id__$9 = undefined;
  /* module identifier */
  var __vue_module_identifier__$9 = "data-v-7b20e75c";
  /* functional template */
  var __vue_is_functional_template__$9 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var Ros3dViewer = normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    undefined,
    undefined,
    undefined
  );/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,Ros3dArrow: Ros3dArrow,Ros3dAxes: Ros3dAxes,Ros3dGrid: Ros3dGrid,Ros3dInteractiveMarkerClient: Ros3dInteractiveMarkerClient,Ros3dLaserScan: Ros3dLaserScan,Ros3dMarkerClient: Ros3dMarkerClient,Ros3dOccupancyGridClient: Ros3dOccupancyGridClient,Ros3dPath: Ros3dPath,Ros3dSceneNode: Ros3dSceneNode,Ros3dViewer: Ros3dViewer});// Import vue components

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Object.keys(components).forEach(function (componentName) {
    Vue.component(componentName, components[componentName]);
  });
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}exports.Ros3dArrow=Ros3dArrow;exports.Ros3dAxes=Ros3dAxes;exports.Ros3dGrid=Ros3dGrid;exports.Ros3dInteractiveMarkerClient=Ros3dInteractiveMarkerClient;exports.Ros3dLaserScan=Ros3dLaserScan;exports.Ros3dMarkerClient=Ros3dMarkerClient;exports.Ros3dOccupancyGridClient=Ros3dOccupancyGridClient;exports.Ros3dPath=Ros3dPath;exports.Ros3dSceneNode=Ros3dSceneNode;exports.Ros3dViewer=Ros3dViewer;exports.default=plugin;