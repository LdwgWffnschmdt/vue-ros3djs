<template>
  <div/>
</template>

<script>
import * as ROS3D from 'ros3d'

export default {
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
    topic(n, o) {
      this.object.unsubscribe();
      this.object.topicName = n;
      this.object.subscribe();
    },
    compression(n, o) {
      this.object.unsubscribe();
      this.object.compression = n;
      this.object.subscribe();
    },
    color(n, o) {
      this.$nextTick(this.createObject);
    },
    particleSize(n, o) {
      this.$nextTick(this.createObject);
    },
    visible(newState, oldState) {
      if (newState) this.show();
      else this.hide();
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