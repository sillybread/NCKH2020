import React, {
    Component
} from 'react';
import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
//import Axios from 'axios';

export default class Test3 extends Component {
    componentDidMount() {
        var scene = new THREE.Scene();
        this.scene = scene;
        scene.background = new THREE.Color(0xaaffaa);
        var camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        camera.up.set(0, 0, 1);
        camera.position.set(150, 150, 150);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(renderer.domElement);

        var controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 10;
        controls.maxDistance = 100;
        controls.maxPolarAngle = Math.PI;

        var axesHelper = new THREE.AxesHelper(7749);
        scene.add(axesHelper);

        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);

        var geometry = new THREE.BufferGeometry();
        // create a simple square shape. We duplicate the top left and bottom right
        // vertices because each vertex needs to appear once per triangle.
        var vertices = new Float32Array( [
        	10.0, 0,  0,
        	0, 10.0,  0,
        	0,  0, 10.0,
        	0, 0,  0
        ] );

        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 4 ) );
        var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        var mesh = new THREE.Mesh( geometry, material );

        scene.add(mesh);
        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
    }

    render() {
        return ( < div > <
            div className = "chartContainer"
            ref = {
                thisDiv => {
                    this.container = thisDiv
                }
            }
            /> <
            /div>
        );
    }
}