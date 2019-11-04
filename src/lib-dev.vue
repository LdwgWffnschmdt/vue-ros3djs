<template>
  <ros3d-viewer
    :ros="ros"
    ref="viewer" id="viewer"
    @hook:mounted="rosViewerMounted" 
    v-if="connected"
    
  >
    <ros3d-axes />
    <ros3d-grid />
  </ros3d-viewer>
</template>

<script>
import ROSLIB from 'roslib';
import { Ros3dViewer, Ros3dGrid, Ros3dAxes } from './entry';

export default {
  name:  'VueRos3djsLibDev', // vue library dev component
  components: {
    Ros3dViewer,
    Ros3dGrid,
    Ros3dAxes
  },
  created() {
    window.addEventListener('resize', this.handleResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  data: () => ({
    ros: null,
    connected: false
  }),
  mounted() {
    this.ros = new ROSLIB.Ros({
      url : 'ws://localhost:9090'
    });

    this.ros.on('connection', () => {
      this.connected = true;
    });
  },
  methods: {
    handleResize() {
      if (this.$refs.viewer && this.$refs.viewer.viewer) this.$refs.viewer.viewer.resize(this.$el.clientWidth, this.$el.clientHeight);
    },
    rosViewerMounted () {
      this.handleResize();
    }
  }
}
</script>

<style>
html { overflow-y: auto ! important }

body { margin: 0; }

#viewer {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
</style>
