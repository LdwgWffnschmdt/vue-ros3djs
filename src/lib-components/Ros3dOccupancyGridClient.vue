<template>
  <div/>
</template>

<script>
import * as ROS3D from 'ros3d'
import * as ROSLIB from 'roslib'

export default {
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
    topic(n, o) {
      this.object.unsubscribe();
      this.object.topicName = n;
      this.object.subscribe();
    },
    continuous(n, o) {
      this.object.continuous = n;
      if (n) this.object.subscribe();
    },
    x(n, o) {
      this.$nextTick(this.setOffset);
    },
    y(n, o) {
      this.$nextTick(this.setOffset);
    },
    z(n, o) {
      this.$nextTick(this.setOffset);
    },
    visible(newState, oldState) {
      if (newState) this.show();
      else this.hide();
    }
  },
  methods: {
    show() {
      this.$parent.viewer.scene.add(this.object.sceneNode);
    },
    hide() {
      if (this.object.sceneNode != null) this.$parent.viewer.scene.remove(this.object.sceneNode);
    },
    setOffset() {
      this.object.unsubscribe();
      this.object.offsetPose = new ROSLIB.Pose({position: {x: this.x, y: this.y, z: this.z} });
      this.object.subscribe();
    }
  },
  mounted() {
    this.object = new ROS3D.OccupancyGridClient({
      ros : this.$parent.ros,
      tfClient : this.$parent.tfClient,
      rootObject : this.$parent.viewer.scene,
      topic: this.topic,
      continuous: this.continuous,
      offsetPose: new ROSLIB.Pose({position: {x: this.x, y: this.y, z: this.z} })
    });
    this.object.name = this._uid;

  
    this.object.processMessage = (message) => {
      console.log("MAP INCOMING");
      ROS3D.OccupancyGridClient.prototype.processMessage.call(this.object, message);
      console.log("MAP LOADED");
    };


    if (!this.visible) this.hide();
  },
  beforeDestroy() {
    this.hide();
  }
};
</script>