import CanvasJSReact from './../../lib/canvasjs.react';

const Graph = () => {
	const CanvasJS = CanvasJSReact.CanvasJS;
	const CanvasJSChart = CanvasJSReact.CanvasJSChart;


	const options = {
		animationEnabled: true,
		backgroundColor: "#E5E5E5",
		// title: {
		// 	text: "Percentile"
		// },
		axisX:{
			minimum: 25,
			maximum: 300,
			gridThickness: 0,
			tickLength: 0,
			// lineThickness: 0,
			labelFormatter: function(){
			return " ";
			}
		},
		axisY: {
			gridThickness: 0,
			tickLength: 0,
			// lineThickness: 0,
			labelFormatter: function(){
			return " ";
			}
		},
		toolTip: {
			enabled: false
		},
		data: [{
			type: "splineArea",
			xValueFormatString: "##",
			// yValueFormatString: "###",
			color: "rgba(133, 144, 179, 0.42)",
			showInLegend: true,
			legendText: "Step 1",
			markerType: "none",
			legendMarkerType: "circle",
			fillOpacity: .4,
			
			dataPoints: [
				{ x: 15, y: 5 },
				{ x: 141, y: 25 },
				{ x: 200, y: 50 },
				{ x: 255, y: 25 },
				{ x: 300, y: 1 }

				// { x: 0, y: 50},
				// { x: 25, y: 100},
				// { x: 50, y: 200},
				// { x: 75, y: 250},
				// { x: 100, y: 300}
			]
		},
		{
			type: "splineArea",
			xValueFormatString: "##",
			// yValueFormatString: "###",
			color: "#DED0D0",
			showInLegend: true,
			legendText: "Step 2",
			legendMarkerType: "circle",
			markerType: "none",
			fillOpacity: .4,
			dataPoints: [

				{ x: 25, y: 5 },
				{ x: 151, y: 30 },
				{ x: 220, y: 50 },
				{ x: 275, y: 25 },
				{ x: 300, y: 3 }

				// { x: 0, y: 50},
				// { x: 25, y: 100},
				// { x: 50, y: 200},
				// { x: 75, y: 250},
				// { x: 100, y: 300}
			]
		}
		]
	}

	return (
		<div className="mw7 center">
			<CanvasJSChart options = {options}
					/* onRef={ref => this.chart = ref} */
			/>
		{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
	)
}

export default Graph;