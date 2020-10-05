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
    state = {
        oChart: null,
        oConfig: null,
        oData: null,
        oSlice: null,
        bg_color: 0xaaffaa,
    }

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

        let oChart = this.buildChart(scene, controls, this.state, this.props);        

        this.setState({oChart: oChart});

        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
    }

    buildChart(oScene, oControls, oState, oProps) {
        let size = {
            x: oProps.size.x,
            y: oProps.size.y,
            z: oProps.size.z,
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

        //Centering oribit controls
        oControls.target.set(size.mid('x'),size.mid('y'),size.mid('z'));

        let cube = new Object3D();
        for (let ii = 0; ii < 6; ii++) {
            cube.add(createAFace(size, ii));
        }
        oScene.add(cube);
        cube.size = size;

        return cube;

        function createAFace(faceSize, order, viewWireFrame = false) {
            let oCurrFI;
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
            oCurrFI = oFaceInfo[order];
            let tileGeometry = new THREE.PlaneGeometry(
                faceSize[oCurrFI.width] * faceSize.tileSize,
                faceSize[oCurrFI.height] * faceSize.tileSize,
                faceSize[oCurrFI.width], faceSize[oCurrFI.height]
            );

            let tileMaterial = new THREE.MeshBasicMaterial({
                vertexColors: THREE.FaceColors,
                side: oCurrFI.side
            });
            let tileMesh = new THREE.Mesh(tileGeometry, tileMaterial);
            tileMesh.rotation.setFromVector3(oCurrFI.angle);
            tileMesh.position.copy(oCurrFI.position);

            if (viewWireFrame) {
                let wireFrameGeometry = new THREE.WireframeGeometry(tileGeometry);
                let wireFrameMaterial = new THREE.LineBasicMaterial({
                    color: 0x0
                });
                let wireFrame = new THREE.LineSegments(wireFrameGeometry, wireFrameMaterial);
                tileMesh.add(wireFrame);
            }
            return tileMesh;
        }
    }

    updateChart(oState) {
        let currFace = null;
        let color = null;
        let aData = oState.oData;
        let oMesh = oState.oChart;

        let iX = aData[0][0].length;
        let iY = aData[0].length;
        let iZ = aData.length;
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

            sStatement = (dY.r === 0) * 1 + "" + (dY.r === iY - 1) * 1 + "" + (dX.r === 0) * 1 + "" + (dX.r === iX - 1) * 1 + "" + (dZ.r === 0) * 1 + "" + (dZ.r === iZ - 1) * 1;
            for (let si = 0; si < sStatement.length; si++) {
                if (sStatement[si] === "1")(aFace[si]).push(aData[dZ.r][dY.r][dX.r]);
            }
        }


        for (let ii = 0; ii < 6; ii++) {
            currFace = oMesh.children[ii].geometry.faces;
            let n = currFace.length / 2;
            for (let ia = 0; ia < n; ia++) {
                color = tempToHSL(iMin, iMax, aFace[ii][ia]);
                currFace[ia * 2].color.set(color);
                currFace[ia * 2 + 1].color.set(color);
            }
            oMesh.children[ii].geometry.elementsNeedUpdate = true;
        }

        function tempToHSL(min, max, temp) {
            let ret = 230 - (temp + min) * 230 / (max - min);
            ret = Math.floor(ret);
            return "hsl(" + ret + ",100%,50%)";
        }
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

    handleHide(index) {
        let iSliceLevel = this.state.iSliceLevel;
        let iCrood = this.i2p(index)[this.state.sSliceAxis.toLowerCase()];
        let iLimit = this[this.state.sSliceAxis.toUpperCase()] - iSliceLevel;

        let innerBlock = function (oPos) {
            if (oPos.x > 0 && oPos.y > 0 && oPos.z > 0) return true
            return false;
        }
        if ((iSliceLevel > 0 && iCrood >= iLimit) || innerBlock(this.i2p(index))) {
            this.aMesh[index].visible = false;
            return true;
        }
        return false;
    }

    componentDidUpdate() {
        this.scene.background.setHex(this.state.bg_color);
        this.updateChart(this.state);
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