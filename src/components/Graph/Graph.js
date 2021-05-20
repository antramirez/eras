import { useEffect, useContext, useRef, useState } from 'react';
import { UserContext } from './../../context/UserContext';
import CanvasJSReact from './../../lib/canvasjs.react';
import { step1Scores, step2Scores } from './data';
import './Graph.css';

const Graph = () => {
	const CanvasJSChart = CanvasJSReact.CanvasJSChart;
	const chart = useRef();
    const { user } = useContext(UserContext);
	const { graduationYear, step1, step2 } = user;
	const [height, setHeight] = useState(0);

	const options = {
		animationEnabled: true,
		backgroundColor: "transparent",
		axisX:{
			minimum: 150,
			maximum: 300,
			interval: 30,
			gridThickness: 0,
			tickLength: 0,
			crosshair: {
				enabled: true,
				snapToDataPoint: true,
				lineDashType: 'solid',
				labelBackgroundColor: 'transparent',
				labelFontColor: 'black',
				labelFormatter: function(label){
					return " ";
				}
			},
			labelFormatter: function(label){
				return label.value < 155 ? `<${label.value}` : label.value;
			},
		},
		axisY: {
			minimum: 0,
			maximum: 100,
			interval: 50,
			gridThickness: 0,
			tickLength: 0,
			labelFormatter: function(e){
				return `${e.value}%`;
			},
		},
		toolTip: {
			enabled: true,
			animationEnabled: true,
			content: "{name}: {x}, Percentile: {y}%",
			shared: true,
		},
		data: [{
			name: 'Step 1',
			type: "splineArea",
			xValueFormatString: "##",
			color: "rgba(133, 144, 179, 0.42)",
			showInLegend: true,
			legendText: "Step 1",
			markerType: "none",
			legendMarkerType: "circle",
			fillOpacity: .4,
			dataPoints: step1Scores
		},
		{
			name: 'Step 2',
			type: "splineArea",
			xValueFormatString: "##",
			color: "#DED0D0",
			showInLegend: true,
			legendText: "Step 2",
			legendMarkerType: "circle",
			markerType: "none",
			fillOpacity: .4,
			dataPoints: graduationYear < 2023 ? step2Scores : []
		}
		]
	}

	useEffect(() => {
		if (chart.current) {
			setHeight(chart.current.chart.height)
		}
		console.log(step1, step2)
	}, [step1, step2, height])

	return (
		<div className="mw7 center relative">
			<span style={{height: height * .85, width: '3px', top: '2.2%', left: `${(step1 - 141) * 100 / (305 - 141)}%`, zIndex: '100', backgroundColor: 'rgb(133, 144, 179)', display: step1 > 150 ? 'block' : 'none', position: 'absolute'}}className="step-bar step1-bar"></span>
			<span style={{height: height * .85, width: '3px', top: '2.2%', left: `${(step2 - 141) * 100 / (305 - 141)}%`, zIndex: '100', backgroundColor: 'gray', display: step2 > 150 ? 'block' : 'none', position: 'absolute'}}className="step-bar step2-bar"></span>

			<CanvasJSChart options = {options} ref={chart} />
			<p className="mw6 mt4 i tc center">*Based on LCME-accredited US/Canadian Medical Schools Testing between January 1, 2017 – December 31, 2019 for Step 1 {graduationYear < 2023 && 'and July 1, 2017 – June 30, 2020 for Step 2 CK'}</p>

		</div>
	)
}

export default Graph;