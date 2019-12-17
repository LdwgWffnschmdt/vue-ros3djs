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
    pose: {
      type: Object,
      default: undefined,
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
    pose() { this.$nextTick(this.setPose) },
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
    setPose() {
      if (this.pose == undefined) return;

      this.object.position.set(this.pose.position.x, this.pose.position.y, this.pose.position.z);

      var rot = new THREE.Quaternion(this.pose.orientation.x, this.pose.orientation.y,
                                     this.pose.orientation.z, this.pose.orientation.w);
      var direction = new THREE.Vector3(1,0,0);
      direction.applyQuaternion(rot);

      this.object.setDirection(direction);
    }
  },
  mounted() {
    this.object = new ROS3D.Arrow({
      ros : this.$parent.ros,
      tfClient : this.$parent.tfClient,
      rootObject : this.$parent.viewer.scene,
      length : this.length,
      headLength : this.headLength,
      shaftDiameter : this.shaftDiameter,
      headDiameter : this.headDiameter,
      material : new Three.MeshBasicMaterial({color: this.color}),
    });
    this.object.name = this._uid;

    this.setPose();

    if (this.visible) this.show();
  },
  beforeDestroy() {
    this.hide();
  }
};
</script>