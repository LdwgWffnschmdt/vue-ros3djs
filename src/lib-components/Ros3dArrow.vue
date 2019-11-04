<template>
  <div/>
</template>

<script>
import * as ROS3D from 'ros3d'
import * as Three from 'three'

export default {
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
    color(n) {
      this.object.material.color.set(n);
    },
    x() { this.$nextTick(this.setPosition) },
    y() { this.$nextTick(this.setPosition) },
    z() { this.$nextTick(this.setPosition) },
    directionX() { this.$nextTick(this.setDirection) },
    directionY() { this.$nextTick(this.setDirection) },
    directionZ() { this.$nextTick(this.setDirection) },
    length(n) {
      this.object.setLength(n);
    },
    visible(newState) {
      if (newState) this.show();
      else this.hide();
    }
  },
  methods: {
    show() {
      this.$parent.viewer.scene.add(this.object);
    },
    hide() {
      var obj = this.$parent.viewer.scene.getObjectByName(this._uid);
      if (obj != null) this.$parent.viewer.scene.remove(obj);
    },
    setPosition() {
      this.object.position.set(this.x, this.y, this.z);
    },
    setDirection() {
      this.object.setDirection(new Three.Vector3(this.directionX || 0, this.directionY || 0, this.directionZ || 0));
    }
  },
  mounted() {
    this.object = new ROS3D.Arrow({
      ros : this.$parent.ros,
      tfClient : this.$parent.tfClient,
      rootObject : this.$parent.viewer.scene,
      origin : this.position,
      direction : new Three.Vector3(this.directionX || 0, this.directionY || 0, this.directionZ || 0),
      length : this.length,
      headLength : this.headLength,
      shaftDiameter : this.shaftDiameter,
      headDiameter : this.headDiameter,
      material : new Three.MeshBasicMaterial({color: this.color}),
    });
    this.object.name = this._uid;
    if (this.visible) this.show();
  },
  beforeDestroy() {
    this.hide();
  }
};
</script>