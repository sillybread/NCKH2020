import React, {
    Component
} from 'react';
import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import './SChartLite.css';
import {
    Object3D
} from 'three';
//import Axios from 'axios';

export default class SChart3DLite extends Component {
    constructor(props){
        super(props);
        this.state = {
            oWorld: null,
            oFrame: null,
            oConfig: null,
            oData: null,
            oSlice: null,
            bg_color: 0xaaffaa,
            i_lx: 0,
            i_ly: 0,
            i_lz: 0
        }
    }

    init(){
        var scene = new THREE.Scene();
        scene.background = new THREE.Color(this.state.bg_color);
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

        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        let world = {
            scene: scene,
            camera: camera,
            controls: controls,
            renderer: renderer
        };
        this.setState({oWorld: world});
        return world;
    }

    makeFrame() {
        let threeWorld = this.state.oWorld;
        let size = {
            x: this.state.oConfig.size.x-((this.state.oSlice.axis==='x')?this.state.oSlice.level:0),
            y: this.state.oConfig.size.y-((this.state.oSlice.axis==='y')?this.state.oSlice.level:0),
            z: this.state.oConfig.size.z-((this.state.oSlice.axis==='z')?this.state.oSlice.level:0),
            get X() {
                return this.x * this.tileSize;
            },
            get Y() {
                    return this.y * this.tileSize;
            },
            get Z() {
                return this.z * this.tileSize;
            },
            tileSize: 1,
            mid: function(axis){
                return size[axis.toUpperCase()]/2;
            }
        };
        console.log(size);

        //Centering oribit controls
        threeWorld.controls.target.set(size.mid('x'),size.mid('y'),size.mid('z'));

        let cube = new Object3D();
        for (let ii = 0; ii < 6; ii++) {
            cube.add(createAFace(size, ii));
        }
        threeWorld.scene.add(cube);
        cube.size = size;

        return cube;

        function createAFace(faceSize, order) {
            let fPi = Math.PI;
            let oFaceInfo = {
                0: {
                    width: 'x',
                    height: 'z',
                    angle: new THREE.Vector3(3 * fPi / 2, 0, 0),
                    get position() {
                        return new THREE.Vector3(faceSize[this.width] * faceSize.tileSize / 2, 0, faceSize[this.height] * faceSize.tileSize / 2)
                    },
                    side: THREE.BackSide
                },
                1: {
                    width: 'x',
                    height: 'z',
                    angle: new THREE.Vector3(3 * fPi / 2, 0, 0),
                    get position() {
                        return new THREE.Vector3(faceSize[this.width] * faceSize.tileSize / 2, faceSize.y * faceSize.tileSize, faceSize[this.height] * faceSize.tileSize / 2)
                    },
                    side: THREE.FrontSide
                },
                2: {
                    width: 'y',
                    height: 'z',
                    angle: new THREE.Vector3(3 * fPi / 2, 3 * fPi / 2, 0),
                    get position() {
                        return new THREE.Vector3(0, faceSize[this.width] * faceSize.tileSize / 2, faceSize[this.height] * faceSize.tileSize / 2)
                    },
                    side: THREE.FrontSide
                },
                3: {
                    width: 'y',
                    height: 'z',
                    angle: new THREE.Vector3(3 * fPi / 2, 3 * fPi / 2, 0),
                    get position() {
                        return new THREE.Vector3(faceSize.x * faceSize.tileSize, faceSize[this.width] * faceSize.tileSize / 2, faceSize[this.height] * faceSize.tileSize / 2)
                    },
                    side: THREE.BackSide
                },
                4: {
                    width: 'x',
                    height: 'y',
                    angle: new THREE.Vector3(fPi, 0, 0),
                    get position() {
                        return new THREE.Vector3(faceSize[this.width] * faceSize.tileSize / 2, faceSize[this.height] * faceSize.tileSize / 2, 0)
                    },
                    side: THREE.FrontSide
                },
                5: {
                    width: 'x',
                    height: 'y',
                    angle: new THREE.Vector3(fPi, 0, 0),
                    get position() {
                        return new THREE.Vector3(faceSize[this.width] * faceSize.tileSize / 2, faceSize[this.height] * faceSize.tileSize / 2, faceSize.z * faceSize.tileSize)
                    },
                    side: THREE.BackSide
                }
            }
            let oCurrFI = oFaceInfo[order];
            let tileGeometry = new THREE.PlaneGeometry(
                faceSize[oCurrFI.width] * faceSize.tileSize,
                faceSize[oCurrFI.height] * faceSize.tileSize,
                faceSize[oCurrFI.width], faceSize[oCurrFI.height]
            );

            let tileMaterial = new THREE.MeshBasicMaterial({
                vertexColors: THREE.FaceColors,
                side: oCurrFI.side
            });
            let boxMesh = new THREE.Mesh(tileGeometry, tileMaterial);
            boxMesh.rotation.setFromVector3(oCurrFI.angle);
            boxMesh.position.copy(oCurrFI.position);
            tileGeometry.dispose();
            tileMaterial.dispose();
            return boxMesh;
        }
    }

    updateChart() {
        let currFace = null;
        let color = null;
        let aData = this.state.oData;
        let oMesh = this.state.oFrame;
        let iX = this.state.i_lx;
        let iY = this.state.i_ly;
        let iZ = this.state.i_lz;

        if (!oMesh || 
            !aData ||
            iX>aData[0][0].length ||
            iY>aData[0].length ||
            iZ>aData.length
            ) {return};
        let dX, dY, dZ, sStatement; // eslint-disable-next-line
        let aFace = new Array(6).fill(0).map(x => new Array());
        let divide = (a, b) => ({
            r: a % b,
            d: Math.trunc(a / b)
        });

        //Find lowest and greatest temperature
        let aFlat = aData.flat(3);
        let iMin = Math.min.apply(null, aFlat);
        let iMax = Math.max.apply(null, aFlat);

        for (let ii = 0; ii < iX * iY * iZ; ii++) {
            dX = divide(ii, iX);
            dY = divide(dX.d, iY);
            dZ = divide(dY.d, iZ);
            //console.log(ii, dX.r, dY.r, dZ.r);
            sStatement = (dY.r === 0) * 1 + "" + (dY.r === iY - 1) * 1 + "" + (dX.r === 0) * 1 + "" + (dX.r === iX - 1) * 1 + "" + (dZ.r === 0) * 1 + "" + (dZ.r === iZ - 1) * 1;
            for (let si = 0; si < sStatement.length; si++) {
                if (sStatement[si] === '1') (aFace[si]).push(aData[dZ.r][dY.r][dX.r]);
            }
        }

        for (let ii = 0; ii < 6; ii++) {
            currFace = oMesh.children[ii].geometry.faces;
            let n = currFace.length / 2;
            for (let ia = 0; ia < n; ia++) {
                color = tempToHSL(iMin, iMax, aFace[ii][ia]);
                //console.log(iMin, iMax, aFace[ii][ia]);
                currFace[ia * 2].color.set(color);
                currFace[ia * 2 + 1].color.set(color);
            }
            oMesh.children[ii].geometry.elementsNeedUpdate = true;
        }

        function tempToHSL(min, max, temp) {
            let ret = 240 - (temp - min) * 240 / (max - min);
            ret = Math.floor(ret);
            return "hsl(" + ret + ",100%,50%)";
        }
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate() {
        this.state.oWorld.scene.background.setHex(this.state.bg_color);
        if (this.state.i_lx !== this.state.oConfig.size.x-((this.state.oSlice.axis==='x')?this.state.oSlice.level:0) || 
            this.state.i_ly !== this.state.oConfig.size.y-((this.state.oSlice.axis==='y')?this.state.oSlice.level:0) || 
            this.state.i_lz !== this.state.oConfig.size.z-((this.state.oSlice.axis==='z')?this.state.oSlice.level:0)){
                this.state.oFrame && this.state.oFrame.children.forEach((child) =>{
                    console.log(child);
                    child.geometry.dispose();
                    child.material.dispose();
                    this.state.oWorld.scene.remove(child);
                });
                this.state.oWorld.scene.remove(this.state.oFrame);

                let frame = this.makeFrame(this.state);
                this.setState({
                    oFrame: frame,
                    i_lx: this.state.oConfig.size.x-((this.state.oSlice.axis==='x')?this.state.oSlice.level:0),
                    i_ly: this.state.oConfig.size.y-((this.state.oSlice.axis==='y')?this.state.oSlice.level:0),
                    i_lz: this.state.oConfig.size.z-((this.state.oSlice.axis==='z')?this.state.oSlice.level:0),
                })
        }
        this.updateChart();
    }

    render() {
        return ( <div> <
            div className = "chartContainer"
            ref = {
                thisDiv => {
                    this.container = thisDiv
                }
            }
            /> </div>
        );
    }
}