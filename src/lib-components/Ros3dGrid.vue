<template>
  <div/>
</template>

<script>
import * as ROS3D from 'ros3d'

export default {
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
    visible(newState) {
      if (newState) this.show();
      else this.hide();
    },
    numCells() {
      this.$nextTick(this.createObject);
    },
    color() {
      this.$nextTick(this.createObject);
    },
    lineWidth() {
      this.$nextTick(this.createObject);
    },
    cellSize() {
      this.$nextTick(this.createObject);
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

      this.object = new ROS3D.Grid({
        num_cells: this.numCells,
        color: this.color,
        lineWidth: this.lineWidth,
        cellSize: this.cellSize
      });
      this.object.name = this._uid;
      
      if (this.visible) this.show();
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