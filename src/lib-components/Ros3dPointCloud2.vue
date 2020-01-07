<template>
  <div/>
</template>

<script>
import * as ROS3D from 'ros3d'

export default {
  name: 'ros3d-point-cloud2',
  props: {
    visible: {
      type: Boolean,
      default: true,
      require: false,
    },
    topic: {
      type: String,
      default: '/points',
      require: false,
    },
    compression: {
      type: String,
      default: 'cbor',
      require: false,
    },
    max_pts: {
      type: Number,
      default: 10000,
      require: false,
    },
    pointRatio: {
      type: Number,
      default: 1,
      require: false,
    },
    messageRatio: {
      type: Number,
      default: 1,
      require: false,
    },
    colorsrc: {
      type: String,
      default: "rgb",
      require: false,
    },
    colormap: {
      type: Object,
      default: undefined,
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
    visible(newState) {
      if (newState) this.show();
      else this.hide();
    },
    topic(n) {
      this.object.unsubscribe();
      this.object.topicName = n;
      this.object.subscribe();
    },
    compression(n) {
      this.object.unsubscribe();
      this.object.compression = n;
      this.object.subscribe();
    },
    max_pts() {
      this.$nextTick(this.createObject);
    },
    messageRatio() {
      this.$nextTick(this.createObject);
    },
    colorsrc() {
      this.$nextTick(this.createObject);
    },
    colormap() {
      this.$nextTick(this.createObject);
    },
    color() {
      this.$nextTick(this.createObject);
    },
    particleSize() {
      this.$nextTick(this.createObject);
    }
  },
  methods: {
    show() {
      this.object.subscribe();
      if (this.object.points.sn != null) this.$parent.viewer.scene.add(this.object.points.sn);
    },
    hide() {
      this.object.unsubscribe();
      if (this.object.points.sn != null) this.$parent.viewer.scene.remove(this.object.points.sn);
    },
    createObject() {
      if (this.object != null) this.hide();

      // Setup the point cloud.
      this.object = new ROS3D.PointCloud2({
        ros : this.$parent.ros,
        tfClient : this.$parent.tfClient,
        rootObject : this.$parent.viewer.scene,
        topic: this.topic,
        compression: this.compression,
        max_pts: this.max_pts,
        pointRatio: this.pointRatio,
        messageRatio: this.messageRatio,
        material: {
          color: this.color,
          size: this.particleSize
        }
      });
      this.object.name = this._uid;
      if (!this.visible) this.hide();
    }
  },
  mounted() {
    this.createObject();
  },
  beforeDestroy() {
    this.object.unsubscribe();
    this.hide();
  }
};
</script>