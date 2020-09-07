import React, { Component } from 'react';
import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
<<<<<<< HEAD
import './SChart.css';
import Axios from 'axios';
import Slider from 'rc-slider';
import Select from 'react-select';
import { Form, FormGroup, Input } from 'reactstrap';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const MySlider = createSliderWithTooltip(Slider);
=======
import Axios from 'axios';
>>>>>>> 1be80c17c98d15de9fdd485e15056335df29721e

export default class SChart3D extends Component {
    state = {
        aMap: [],
        sSliceAxis: 'x',
        iSliceLevel: 0,
        bg_color: 0xaaffaa,
    };

    aMesh = [];
    X = parseInt(this.props.X);
    Y = parseInt(this.props.Y);
    Z = parseInt(this.props.Z);
    size = this.X * this.Y * this.Z;

<<<<<<< HEAD
    getMaxSliceLever() {
        switch (this.state.sSliceAxis) {
            case 'x':
                return parseInt(this.props.X);
            case 'y':
                return parseInt(this.props.Y);
            case 'z':
                return parseInt(this.props.Z);
            default:
                return parseInt(this.props.Z);
        }
    }
    componentDidMount() {
        let container = this.container;
        var scene = new THREE.Scene();
        this.scene = scene;
        scene.background = new THREE.Color(this.state.bg_color);
        var camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 1, 1000);
        camera.up.set(0, 0, 1);
        camera.position.set(10, 10, 10);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.appendChild(renderer.domElement);
=======
    componentDidMount() {
        var scene = new THREE.Scene();
        this.scene = scene;
        scene.background = new THREE.Color(this.state.bg_color);
        var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.up.set(0, 0, 1);
        camera.position.set(30, 30, 30);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(renderer.domElement);
>>>>>>> 1be80c17c98d15de9fdd485e15056335df29721e

        var controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
<<<<<<< HEAD
        controls.minDistance = 5;
        controls.maxDistance = 50;
=======
        controls.minDistance = 10;
        controls.maxDistance = 30;
>>>>>>> 1be80c17c98d15de9fdd485e15056335df29721e
        controls.maxPolarAngle = Math.PI;

        var axesHelper = new THREE.AxesHelper(30);
        scene.add(axesHelper);

        window.addEventListener(
            'resize',
            function () {
<<<<<<< HEAD
                camera.aspect = container.offsetWidth / container.offsetHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.offsetWidth, container.offsetHeight);
=======
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(200, 200);
>>>>>>> 1be80c17c98d15de9fdd485e15056335df29721e
            },
            false
        );

        for (let ii = 0; ii < this.size; ii++) {
            let geometry = new THREE.BoxGeometry(1, 1, 1);
            let material = new THREE.MeshBasicMaterial();
            let mesh = new THREE.Mesh(geometry, material);
            this.scene.add(mesh);
            let pos = this.i2p(ii);
            mesh.position.set(pos.x, pos.y, pos.z);
            geometry.dispose();
            material.dispose();
            mesh.visible = false;
            this.aMesh.push(mesh);
        }

        //for (let ii = 0; ii < this.size; ii++) {
        //let pos = this.i2p(ii);
        //console.log(pos.x + " " + pos.y + " " + pos.z + " " + ii);
        //this.updateCube(ii, ii * (180 / this.size) - 55);
        //}

        var obj = this;
        let fetch = function () {
            Axios.get(obj.props.src).then((response) => {
                obj.setState({
                    aMap: response.data.data,
                });
            });
            setTimeout(fetch, 1000);
        };
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
            z: rZ,
        };
    }

    p2i(x, y, z) {
        return x + y * this.X + z * this.Y * this.X;
    }

    updateCube(index, tempC) {
        //temperature -55 ~ 125
        //hue 0 ~ 255
        let hue = 256 - ((tempC + 55) * 256) / (125 + 55);
        this.aMesh[index].material.color.set('hsl(' + hue + ',100%,50%)');
        this.aMesh[index].visible = true;
    }

    componentDidUpdate() {
        this.scene.background.setHex(this.state.bg_color);
        if (this.state.aMap.length !== this.size) return;
        for (let ii = 0; ii < this.size; ii++) {
            if (
                this.state.iSliceLevel > 0 &&
                this.i2p(ii)[this.state.sSliceAxis.toLowerCase()] >=
                    this[this.state.sSliceAxis.toUpperCase()] - this.state.iSliceLevel
            ) {
                this.aMesh[ii].visible = false;
                continue;
            }
            this.updateCube(ii, this.state.aMap[ii]);
        }
    }

    render() {
        return (
<<<<<<< HEAD
            <div>
                <div
                    className="chartContainer"
                    ref={(thisDiv) => {
                        this.container = thisDiv;
                    }}
                />
                <div className="mt-5 row pr-0">
                    <Select
                        className="react-select bg-white col-2"
                        classNamePrefix="react-select"
                        defaultValue={{ value: 'z', label: 'Axis Z' }}
                        options={[
                            { value: 'x', label: 'Axis X' },
                            { value: 'y', label: 'Axis Y' },
                            { value: 'z', label: 'Axis Z' },
                        ]}
                        onChange={(data) => {
                            this.setState({ sSliceAxis: data.value });
                        }}></Select>
                    <Form className="col-1 pl-0">
                        <FormGroup>
                            <Input type="text" name="sliceValue" id="sliceValue" value={this.state.iSliceLevel} />
                        </FormGroup>
                    </Form>
                    <MySlider
                        className="col-9 mt-3"
                        min={0}
                        max={this.getMaxSliceLever()}
                        onChange={(value) => {
                            this.setState({ iSliceLevel: value });
                        }}></MySlider>
                </div>
            </div>
=======
            <div
                style={{
                    width: 0,
                    height: 0,
                }}
                ref={(thisDiv) => {
                    this.container = thisDiv;
                }}
            />
>>>>>>> 1be80c17c98d15de9fdd485e15056335df29721e
        );
    }
}
