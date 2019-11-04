<template>
  <div/>
</template>

<script>
import * as ROS3D from 'ros3d'

export default {
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
    visible(newState) {
      if (newState) this.show();
      else this.hide();
    },
    x() { this.$nextTick(this.setPosition) },
    y() { this.$nextTick(this.setPosition) },
    z() { this.$nextTick(this.setPosition) },
    lineType() { this.$nextTick(this.createObject) },
    lineDashLength() { this.$nextTick(this.createObject) },
    scale() { this.$nextTick(this.createObject) },
    headLength() { this.$nextTick(this.createObject) },
    shaftRadius() { this.$nextTick(this.createObject) },
    headRadius() { this.$nextTick(this.createObject) },
  },
  methods: {
    show() {
      this.$parent.viewer.scene.add(this.object);
    },
    hide() {
      var obj = this.$parent.viewer.scene.getObjectByName(this._uid);
      if (obj != null) this.$parent.viewer.scene.remove(obj);
    },
    createObject() {
      if (this.object != null) this.hide();

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
      if (this.visible) this.show();
    },
    setPosition() {
      this.object.position.set(this.x, this.y, this.z);
    }
  },
  mounted() {
    this.createObject();
  },
  beforeDestroy() {
    this.hide();
  }
};
</script>