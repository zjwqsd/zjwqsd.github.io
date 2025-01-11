<template>
    <div ref="chart" class="force-graph"></div>
  </template>
  
  <script>
  import * as d3 from 'd3';
  
  export default {
    name: 'ForceGraph',
    props: {
      data: {
        type: Object,
        required: true,
      }
    },
    mounted() {
      this.createForceGraph();
    },
    methods: {
      createForceGraph() {
        const width = 928;
        const height = 680;
  
        // Specify the color scale.
        const color = d3.scaleOrdinal(d3.schemeCategory10);
  
        // Create a copy of the links and nodes to avoid mutating original data
        const links = this.data.links.map(d => ({ ...d }));
        const nodes = this.data.nodes.map(d => ({ ...d }));
  
        // Create the simulation with various forces
        this.simulation = d3.forceSimulation(nodes)
          .force("link", d3.forceLink(links).id(d => d.id))
          .force("charge", d3.forceManyBody())
          .force("x", d3.forceX())
          .force("y", d3.forceY());
  
        // Create the SVG container
        const svg = d3.select(this.$refs.chart)
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [-width / 2, -height / 2, width, height])
          .attr("style", "max-width: 100%; height: auto;");
  
        // Add lines for links and circles for nodes
        const link = svg.append("g")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(links)
          .join("line")
          .attr("stroke-width", d => Math.sqrt(d.value));
  
        const node = svg.append("g")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.5)
          .selectAll("circle")
          .data(nodes)
          .join("circle")
          .attr("r", 5)
          .attr("fill", d => color(d.group));
  
        node.append("title")
          .text(d => d.id);
  
        // Add drag behavior to nodes
        node.call(d3.drag()
          .on("start", this.dragstarted)
          .on("drag", this.dragged)
          .on("end", this.dragended));
  
        // Set positions during simulation ticks
        this.simulation.on("tick", () => {
          link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
  
          node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        });
      },
  
      // Handle drag events
      dragstarted(event) {
        if (!event.active) this.simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      },
  
      dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      },
  
      dragended(event) {
        if (!event.active) this.simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
    }
  };
  </script>
  
  <style scoped>
  .force-graph {
    width: 100%;
    height: 100%;
    position: relative;
  }
  </style>
  