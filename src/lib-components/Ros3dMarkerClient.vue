<template>
  <div/>
</template>

<script>
import * as ROS3D from 'ros3d'

export default {
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
    topic(n, o) {
      this.object.unsubscribe();
      this.object.topicName = n;
      this.object.subscribe();
    },
    visible(newState, oldState) {
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
    this.object = new ROS3D.MarkerClient({
      ros : this.$parent.ros,
      tfClient : this.$parent.tfClient,
      rootObject : this.$parent.viewer.scene,
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