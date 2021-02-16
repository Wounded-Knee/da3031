import * as d3 from "d3";
import { ZoomContainer } from './ZoomContainer';
import { Stage } from './Stage';

export default function NodeGraph({ annuitCœptis }) {
	const getDataById = annuitCœptis.getDataById.bind(annuitCœptis);
	const getNodeLinks = () => annuitCœptis.data.reduce(
		(accumulator, node) => {
			if (node.relationType_id !== undefined) {
				const [ r0, r1 ] = node.relatives;
					if (getDataById(r0) && getDataById(r1)) {
						accumulator.links.push({
							source: r0,
							target: r1,
							value: 1,
						});
					} else {
						console.warn('Invalid link in data');
					}
			} else {
				accumulator.nodes.push({
					id: node.id,
					text: node.text,
					group: annuitCœptis.getDataById(node.id).getParents().length > 0 ? 'y' : 'x',
					radius: 1,
				});
			}
			return accumulator;
		}, { links: [], nodes: [] }
	);
	
	const width = 240,
		height = 240;
	
	const getChart = () => {
		const data = getNodeLinks();
	
		const chartElement = document.getElementById('chart');
		if (!chartElement) {
			setTimeout(annuitCœptis.reRenderCallback.bind(annuitCœptis), 100);
			return false;
		} else {
			chartElement.innerHTML = ''; // Dirty AF
		}
	
		const drag = simulation => {
		  function dragstarted(event, d) {
		    if (!event.active) simulation.alphaTarget(0.3).restart();
		    d.fx = d.x;
		    d.fy = d.y;
		  }
	
		  function dragged(event,d) {
		    d.fx = event.x;
		    d.fy = event.y;
		  }
	
		  function dragended(event,d) {
		    if (!event.active) simulation.alphaTarget(0);
		    d.fx = null;
		    d.fy = null;
		  }
	
		  return d3.drag()
		      .on("start", dragstarted)
		      .on("drag", dragged)
		      .on("end", dragended);
		};
	
		const scale = d3.scaleOrdinal(d3.schemeCategory10);
		const color = d => scale(d.group);
	
		const links = data.links.map(d => Object.create(d));
		const nodes = data.nodes.map(d => Object.create(d));
	
		const simulation = d3.forceSimulation(nodes)
		  .force("link", d3.forceLink(links).id(d => d.id))
		  .force("charge", d3.forceManyBody())
		  .force("x", d3.forceX())
		  .force("y", d3.forceY());
	
		const svg = d3.select("#chart")
			  .attr("viewBox", [-width / 2, -height / 2, width, height]);
	
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
		  .attr("fill", color)
		  .call(drag(simulation));
	
		node.append("title")
		  .text(d => d.text);
	
		node.on("click", (event, { index }) => {
			console.log('Click on ', index, data.nodes[index]);
			d3.select(this).style("color", "red");
		  });
	
		simulation.on("tick", () => {
		link
		    .attr("x1", d => d.source.x)
		    .attr("y1", d => d.source.y)
		    .attr("x2", d => d.target.x)
		    .attr("y2", d => d.target.y);
	
		node
		    .attr("cx", d => d.x)
		    .attr("cy", d => d.y);
		});
	
		return null;
	};

	return (
		<Stage width={ width+'px' } height={ height+'px' } id="chart">
			<ZoomContainer>
				{ getChart() }
			</ZoomContainer>
		</Stage>
	);
};
