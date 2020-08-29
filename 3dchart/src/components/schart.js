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
            60,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        camera.position.set( 17.7, 19.8, 30 );

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(renderer.domElement);    
        
        var controls = new OrbitControls( camera, renderer.domElement );
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;
		controls.screenSpacePanning = false;
		controls.minDistance = 10;
		controls.maxDistance = 40;
        controls.maxPolarAngle = Math.PI / 2;
        
        var axesHelper = new THREE.AxesHelper(9999);
        scene.add( axesHelper );
        
        window.addEventListener( 'resize', function(){
            camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
        }, false );

        var animate = function() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
    }    
    
    meshCube( x, y, z, tempC){
        let geometry = new THREE.BoxGeometry( 1, 1, 1);
        //temperature -55 ~ 125
        //hue 0 ~ 255
        let hue = 256-(tempC+55)*256/(125+55);
        let color = new THREE.Color("hsl("+hue+",100%,50%)");
        let material = new THREE.MeshBasicMaterial({color: color});
        let mesh = new THREE.Mesh( geometry, material )
        this.scene.add(mesh);
        let vector = new THREE.Vector3(x,y,z);
        mesh.position.copy(vector);
        geometry.dispose();
        material.dispose();
        return mesh;
    };

    componentDidUpdate(){
        this.scene.background = new THREE.Color(this.state.bg_color);
        let lmap = this.state.map;
        for (let ii=0;ii<lmap.length;ii++)
            for (let jj=0;jj<lmap[0].length;jj++)
                for (let kk=0;kk<lmap[0][0].length;kk++){
                    this.meshCube(ii,jj,kk,lmap[ii][jj][kk]);
                }
    }

    render(){
        return(
            <div
                style={{width: 0, height: 0}} 
                ref={thisDiv => {this.container = thisDiv}}
            />
        );
    }
}