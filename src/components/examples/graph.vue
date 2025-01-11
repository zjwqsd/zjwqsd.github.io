<template>
    <div>
      <ForceGraph :data="graphData" />
    </div>
  </template>
  
  <script>
  import ForceGraph from './ForceGraph.vue';
  
  export default {
    components: {
      ForceGraph
    },
    data() {
        console.log('create data');
      return {
        graphData: {
          nodes: [
            { id: "1", group: 1 },
            { id: "2", group: 2 },
            { id: "3", group: 1 },
            { id: "4", group: 2 },
            { id: "5", group: 1 },
            { id: "6", group: 2 },
            { id: "7", group: 1 },
            { id: "8", group: 2 }

          ],
          links: [
            { source: "1", target: "2", value: 1 },
            { source: "2", target: "3", value: 1 },
            { source: "3", target: "4", value: 1 },
            { source: "4", target: "5", value: 1 },
            { source: "5", target: "6", value: 1 },
            { source: "6", target: "7", value: 1 },
            { source: "7", target: "8", value: 1 },
            { source: "8", target: "1", value: 1 }
          ]
        }
      };
    }
  };
  </script>
  