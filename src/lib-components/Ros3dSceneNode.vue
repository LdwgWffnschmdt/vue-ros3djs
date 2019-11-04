<template>
  <div/>
</template>

<script>
import * as ROS3D from 'ros3d'

export default {
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
    model() {
      this.$nextTick(this.createObject);
    },
    frameID() {
      this.$nextTick(this.createObject);
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
    createObject() {
      if (this.object != null) this.hide();

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
  beforeDestroy() {
    this.object.unsubscribeTf();
    this.hide();
  }
};
</script>