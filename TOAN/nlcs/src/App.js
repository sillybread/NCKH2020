//import TChart from 'components/3DChart/3DChart'

import MatrixView from "components/matrix/matrix";

const testData = {
	values: [
		[[1,2,3],
		[4,5,6],
		[7,8,9]],
		[[10,11,12],
		[13,14,15],
		[16,17,18]],
		[[19,20,21],
		[22,23,24],
		[25,26,27]],
	],
	min: 1,
	max: 27
}

const testConfig =  {
	size: {
		x: 3,
		y: 3,
		z: 3
	},
}

function App() {
    return (
		<MatrixView data={testData} config={testConfig}/>
  	);
}

export default App;