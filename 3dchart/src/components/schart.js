import React,{Component} from 'react';
import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import './SChart.css'
export default class SChart3D extends Component{
    state = {
        map: [],
        slice_mode: 0,
        bg_color: 0xaaffaa,
    }

    // constructor(props){
    //     super(props);
    // }

    componentDidMount() {
        var scene = new THREE.Scene();
        this.scene = scene;
        scene.background = new THREE.Color(this.state.bg_color);
        var camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
    
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(renderer.domElement);
    
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
    
        camera.position.z = 5;
    

        var controls = new OrbitControls( camera, renderer.domElement );
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;
		controls.screenSpacePanning = false;
		controls.minDistance = 5;
		controls.maxDistance = 40;
        controls.maxPolarAngle = Math.PI / 2;
                
        var animate = function() {
            requestAnimationFrame(animate);
            //cube.rotation.x += 0.01;
            //cube.rotation.y += 0.01;
            //cube.rotation.z += 0.01;
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
    }    
    
    componentDidUpdate(){
        this.scene.background = new THREE.Color(this.state.bg_color);
    }

    render(){
        return(
            <div
                style={{width: window.innerWidth, height: window.innerHeight}} 
                ref={thisDiv => {this.container = thisDiv}}
            />
        );
    }
}