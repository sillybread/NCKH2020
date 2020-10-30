import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import OrbitControlsView from 'expo-three-orbit-controls';
import React, {useState, useRef} from 'react';
import * as THREE from 'three';
import perfectChart from './perfectChart.js';

export default function App(){
    return(
        <Chart/>
    )
}

function Chart(props) {
    const [camera, setCamera] = useState(null);
    const chartView = useRef(null);
    let timeout;

    const onContextCreate = async (gl) => {
        console.log("=> onContextCreate");
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
        const sceneColor = 0xaaffaa;

        // Create a WebGLRenderer without a DOM element
        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);
        renderer.setClearColor(sceneColor);

        const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
        camera.position.set(2, 5, 5);

        setCamera(camera);

        const scene = new THREE.Scene();
        scene.add(new THREE.GridHelper(10, 10));

        // Setup an animation loop
        const render = () => {
            timeout = requestAnimationFrame(render);
            renderer.render(scene, camera);
            gl.endFrameEXP();
        };
        render();
        console.log("<= onContextCreate");
    };

    const initChartView = () => {
        // https://github.com/expo/expo/issues/3877
        (chartView.current==null) && (
            console.log("=> initChartView"),
            chartView.current = React.createElement(GLView,{
                style: { flex: 1 },
                onContextCreate: onContextCreate
            }),
            console.log("initChartView =>")
        )
    }

    React.useEffect(() => {
        console.log("\n".repeat(3)+"===== START =====");
        initChartView();
        return () => {
            console.log("===== END =====");
            // Clear the animation loop when the component unmounts
            //clearTimeout(timeout);
        }
    }, []);

    return (
        <>
            {console.log("=> Component return")}
            <OrbitControlsView style={{ flex: 1 }} camera={camera}>
                {initChartView(),
                chartView.current}
            </OrbitControlsView>
            {console.log("Component return =>")}
        </>
    );
}