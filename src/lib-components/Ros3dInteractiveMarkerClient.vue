<template>
  <div/>
</template>

<script>
import * as ROS3D from 'ros3d'

export default {
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
    topic(n) {
      this.object.unsubscribe();
      this.object.topicName = n;
      this.object.subscribe();
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
    }
  },
  mounted() {
    this.object = new ROS3D.InteractiveMarkerClient({
      ros : this.$parent.ros,
      tfClient : this.$parent.tfClient,
      rootObject : this.$parent.viewer.selectableObjects,
      camera : this.$parent.viewer.camera,
      topic : this.topic,
    });
    this.object.name = this._uid;
    if (!this.visible) this.hide();
  },
  beforeDestroy() {
    this.object.unsubscribe();
    this.hide();
  }
};
</script>