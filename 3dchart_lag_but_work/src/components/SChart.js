import React, {
    Component
} from 'react';
import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import './SChart.css';
import Axios from 'axios';

export default class SChart3D extends Component {
    state = {
        aMap: [],
        sSliceAxis: "x",
        iSliceLevel: 0,
        bg_color: 0xaaffaa,
    }

    aMesh = [];
    X = parseInt(this.props.X);
    Y = parseInt(this.props.Y);
    Z = parseInt(this.props.Z);
    size = this.X * this.Y * this.Z;

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
        camera.up.set(0, 0, 1);
        camera.position.set(10, 10, 10);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(renderer.domElement);

        var controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 30;
        controls.maxDistance = 50;
        controls.maxPolarAngle = Math.PI;

        var axesHelper = new THREE.AxesHelper(30);
        scene.add(axesHelper);

        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);

        for (let ii = 0; ii < this.size; ii++) {
            let geometry = new THREE.BoxGeometry(1, 1, 1);
            let material = new THREE.MeshBasicMaterial();
            let mesh = new THREE.Mesh(geometry, material)
            this.scene.add(mesh);
            let pos = this.i2p(ii);
            mesh.position.set(pos.x, pos.y, pos.z);
            geometry.dispose();
            material.dispose();
            mesh.visible = false;
            this.aMesh.push(mesh);
        }

        var obj = this;
        let fetch = function () {
            Axios.get(obj.props.src).then((response) => {
                obj.setState({
                    aMap: response.data.data
                })
            });
            setTimeout(fetch, 1000);
        }
        fetch();

        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
    }


    i2p(iIndex) {
        let rX = iIndex % this.X;
        let iX = Math.trunc(iIndex / this.X);

        let rY = iX % this.Y;
        let iY = Math.trunc(iX / this.Y);

        let rZ = iY % this.Z;
        return {
            x: rX,
            y: rY,
            z: rZ
        }
    }

    p2i(x, y, z) {
        return x + y * this.X + z * this.Y * this.X;
    }

    updateCube(index, tempC) {
        //temperature -55 ~ 125
        //hue 0 ~ 255
        if (this.handleHide(index)) return;
        let hue = 256 - (tempC + 55) * 256 / (125 + 55);
        this.aMesh[index].material.color.set("hsl(" + hue + ",100%,50%)");
        this.aMesh[index].visible = true;
    };

    handleHide(index){
        let iSliceLevel = this.state.iSliceLevel;
        let iCrood = this.i2p(index)[this.state.sSliceAxis.toLowerCase()];
        let iLimit = this[this.state.sSliceAxis.toUpperCase()] - iSliceLevel;
        
        let innerBlock = function(oPos){
            if (oPos.x>0&&oPos.y>0&&oPos.z>0) return true
            return false;
        }
        if ((iSliceLevel > 0 && iCrood >= iLimit)||innerBlock(this.i2p(index))) {
            this.aMesh[index].visible = false;
            return true;
        }
        return false;
    }

    componentDidUpdate() {
        this.scene.background.setHex(this.state.bg_color);
        if (this.state.aMap.length !== this.size) return;
        for (let ii = 0; ii < this.size; ii++) {
            this.updateCube(ii, this.state.aMap[ii]);
        }
    }

    render() {
        return ( <div><
            div 
            className = "chartContainer"
            ref = {
                thisDiv => {
                    this.container = thisDiv
                }
            }
            />
            {/* {<input type="number" min="0" max="255" onChange={(e) => {
                    this.setState({
                        sSliceAxis: "x",
                        iSliceLevel: parseInt(e.target.value)
                    });
                }
            }/>} */}
            </div>
        );
    }
}