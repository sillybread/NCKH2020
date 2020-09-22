import React, {
    Component
} from 'react';
import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import './SChartLite.css';
//import Axios from 'axios';

export default class SChart3DLite extends Component {
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

        var axesHelper = new THREE.AxesHelper(7749);
        scene.add(axesHelper);

        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);

        this.doStuff(scene);

        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
    }

    doStuff(oScene){
        let size = {
            x: 4, 
            y: 4, 
            z: 5,
            get X(){
                return this.x*this.tileSize;
            },
            get Y(){
                return this.y*this.tileSize;
            },
            get Z(){
                return this.z*this.tileSize;
            },
            tileSize: 1
        };

        let cube = new Array(6);
        for (let ii=0;ii<6;ii++){
            cube[ii] = createAFace(size, ii);
            setColor(cube[ii]);
            oScene.add(cube[ii]);
        }
        
        function setColor(face){
            let v = 0;
            for (let ii=0;ii<face.geometry.faces.length/2;ii++){
                v = (ii+1)*0x100fff;
                face.geometry.faces[ii*2].color.setHex(v);
                face.geometry.faces[ii*2+1].color.setHex(v);
            }
            face.geometry.elementsNeedUpdate = true;
        }

        function createAFace(faceSize, order, viewWireFrame = false){
            let iWidth, iHeigh, vAngle, vPosition;

            switch (order){
                case 0:
                    iWidth = faceSize.x;
                    iHeigh = faceSize.z;
                    vAngle = new THREE.Vector3(3*Math.PI/2,0,0);
                    vPosition = new THREE.Vector3(
                        iWidth* faceSize.tileSize/2,
                        0,
                        iHeigh* faceSize.tileSize/2
                    );
                    break;
                case 1:
                    iWidth = faceSize.x;
                    iHeigh = faceSize.z;
                    vAngle = new THREE.Vector3(Math.PI/2,0,0);
                    vPosition = new THREE.Vector3(
                        iWidth* faceSize.tileSize/2,
                        faceSize.y * faceSize.tileSize,
                        iHeigh* faceSize.tileSize/2,
                    );
                    break;
                case 2:
                    iWidth = faceSize.y;
                    iHeigh = faceSize.z;
                    vAngle = new THREE.Vector3(Math.PI/2,Math.PI/2,0);
                    vPosition = new THREE.Vector3(
                        0,
                        iWidth* faceSize.tileSize/2,
                        iHeigh* faceSize.tileSize/2
                    );
                    break;
                case 3:
                    iWidth = faceSize.y;
                    iHeigh = faceSize.z;
                    vAngle = new THREE.Vector3(Math.PI/2,Math.PI/2,0);
                    vPosition = new THREE.Vector3(
                        faceSize.x * faceSize.tileSize,
                        iWidth* faceSize.tileSize/2,
                        iHeigh* faceSize.tileSize/2
                    );
                    break;
                case 4:
                    iWidth = faceSize.x;
                    iHeigh = faceSize.y;
                    vAngle = new THREE.Vector3(0,0,0);
                    vPosition = new THREE.Vector3(
                        iWidth* faceSize.tileSize/2,
                        iHeigh* faceSize.tileSize/2,
                        0
                    );
                    break;
                case 5:
                    iWidth = faceSize.x;
                    iHeigh = faceSize.y;
                    vAngle = new THREE.Vector3(Math.PI,0,0);
                    vPosition = new THREE.Vector3(
                        iWidth* faceSize.tileSize/2,
                        iHeigh* faceSize.tileSize/2,
                        faceSize.z * faceSize.tileSize
                    );
                    break;
                default:
                    break;
            }

            let tileGeometry = new THREE.PlaneGeometry( iWidth*faceSize.tileSize, iHeigh*faceSize.tileSize, iWidth, iHeigh );
            let tileMaterial = new THREE.MeshBasicMaterial( {vertexColors: THREE.FaceColors, side: THREE.DoubleSide} );
            let tileMesh = new THREE.Mesh( tileGeometry, tileMaterial );
            tileMesh.rotation.setFromVector3(vAngle);
            tileMesh.position.copy(vPosition);

            if (viewWireFrame){
                let wireFrameGeometry = new THREE.WireframeGeometry( tileGeometry );
                let wireFrameMaterial = new THREE.LineBasicMaterial( { color: 0x0 } );
                let wireFrame = new THREE.LineSegments( wireFrameGeometry, wireFrameMaterial );    
                tileMesh.add(wireFrame);
            }
            return tileMesh;
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
            </div>
        );
    }
}