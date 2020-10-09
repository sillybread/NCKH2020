import React, {
    Component, useState, useEffect
} from 'react';
import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import {
    Object3D
} from 'three';
import "./3DChart.css";
//import Axios from 'axios';

const TChart = (props) => {
    let world;
    const container = [];
    const initWorld = () =>{
        let scene = new THREE.Scene();
        scene.background = new THREE.Color(0xaaffaa);
        let camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        camera.up.set(0, 0, 1);
        camera.position.set(350, 350, 350);
    
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        let controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 10;
        controls.maxDistance = 900;
        controls.maxPolarAngle = Math.PI;
        controls.rotateSpeed = 0.5;
        
        let axesHelper = new THREE.AxesHelper(7749);
        scene.add(axesHelper);
         window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);
        let animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
        return {
            scene: scene,
            camera: camera,
            controls: controls,
            renderer: renderer
        };    
    }

    const makeDoor = () => {
        let oSettings = props.config.door;
        if (!oSettings.show || !world.scene) return;
        let oCSize = props.config.size;
        let oSize = {
            x: oCSize.x * oCSize.tilesize,
            y: oCSize.y * oCSize.tilesize,
            z: oCSize.z * oCSize.tilesize,
            e: 20 * oCSize.tilesize
        }

        let oVector= {
            x0: 0, y0: 0, z0: 0,
            x1: 0, y1: 0, z1: 0
        };
        switch (oSettings.direction){
            case 'A':
                oVector = {
                    x0: oSize.x/2, y0: -oSize.e, z0: oSize.z/2,
                    x1: oSize.x/2, y1: oSize.y, z1: oSize.z/2
                }
                break;
            case 'B':
                oVector = {
                    x0: oSize.x/2, y0: oSize.y+oSize.e, z0: oSize.z/2,
                    x1: oSize.x/2, y1: oSize.y, z1: oSize.z/2
                }
                break;
            case 'C':
                oVector = {
                    x0: -oSize.e, y0: oSize.y/2, z0: oSize.z/2,
                    x1: oSize.x, y1: oSize.y/2, z1: oSize.z/2
                }
                break;
            case 'D':
                oVector = {
                    x0: oSize.x+oSize.e, y0: oSize.y/2, z0: oSize.z/2,
                    x1: oSize.x, y1: oSize.y/2, z1: oSize.z/2
                }
                break;
            default:
                break;
        }

        console.log(oSettings.direction, oVector, oSize, oCSize);
        let vDirection = new THREE.Vector3( oVector.x1-oVector.x0, oVector.y1-oVector.y0, oVector.z1-oVector.z0);
        let vOrigin = new THREE.Vector3( oVector.x0, oVector.y0, oVector.z0);

        let iLength = 8*props.tilesize;
        let iColor = 0xff0000;
        let iHeadLength = 2*props.tilesize;
        let iHeadWidth = 1*props.tilesize;
        let oArrow = new THREE.ArrowHelper(vDirection.normalize(), vOrigin, iLength, iColor, iHeadLength, iHeadWidth);
        oArrow.up.set(0,0,1);
        console.log(world.scene);

        world.scene.add(oArrow);
    }

    useEffect(() => {
        world = initWorld();
        makeDoor();
        container[0].appendChild(world.renderer.domElement);
    },[world]);

    return (
        <div className="chartContainer" ref={(self)=>{container.push(self)}}/>
    );
};

export default TChart;

class Chart extends Component {
    constructor(props){
        super(props);
        this.state = {
            oWorld: null,
            oFrame: null,
            oConfig: null,
            oData: null,
            oSlice: null,
            oArrow: null,
            bWireFrame: false,
            bg_color: 0xaaffaa,
            oChartSize: {
                x: 0,
                y: 0,
                z: 0
            }
        }
    }

    init(callback){
        var scene = new THREE.Scene();
        scene.background = new THREE.Color(this.state.bg_color);
        var camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        camera.up.set(0, 0, 1);
        camera.position.set(350, 350, 350);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(renderer.domElement);

        var controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 10;
        controls.maxDistance = 900;
        controls.maxPolarAngle = Math.PI;
        controls.rotateSpeed = 0.5;

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
        this.setState({oWorld: world}, callback);
        return world;
    }

    makeDoor(){
        let oSettings = this.state.oConfig.door;
        if (!oSettings.show || !this.state.oWorld.scene) return;

        let oCSize = this.state.oConfig.size; 
        let oSize = {
            x: oCSize.x*this.props.tileSize,
            y: oCSize.y*this.props.tileSize,
            z: oCSize.z*this.props.tileSize,
            e: 20*this.props.tileSize
        }
        let oVector;

        switch (oSettings.direction){
            case 'A':
                oVector = {
                    x0: oSize.x/2, y0: -oSize.e, z0: oSize.z/2,
                    x1: oSize.x/2, y1: oSize.y, z1: oSize.z/2
                }
                break;
            case 'B':
                oVector = {
                    x0: oSize.x/2, y0: oSize.y+oSize.e, z0: oSize.z/2,
                    x1: oSize.x/2, y1: oSize.y, z1: oSize.z/2
                }
                break;
            case 'C':
                oVector = {
                    x0: -oSize.e, y0: oSize.y/2, z0: oSize.z/2,
                    x1: oSize.x, y1: oSize.y/2, z1: oSize.z/2
                }
                break;
            case 'D':
                oVector = {
                    x0: oSize.x+oSize.e, y0: oSize.y/2, z0: oSize.z/2,
                    x1: oSize.x, y1: oSize.y/2, z1: oSize.z/2
                }
                break;
            default:
                break;
        }

        let vDirection = new THREE.Vector3( oVector.x1-oVector.x0, oVector.y1-oVector.y0, oVector.z1-oVector.z0);
        let vOrigin = new THREE.Vector3( oVector.x0, oVector.y0, oVector.z0);

        let iLength = 8*this.props.tileSize;
        let iColor = 0x000000;
        let iHeadLength = 2*this.props.tileSize;
        let iHeadWidth = 1*this.props.tileSize;
        let oArrow = new THREE.ArrowHelper(vDirection.normalize(), vOrigin, iLength, iColor, iHeadLength, iHeadWidth);
        oArrow.up.set(0,0,1);
        
        
        if (this.state.oArrow!=null){
            //remove previous arrow
            this.state.oWorld.scene.remove(this.state.oArrow);
        }
        this.state.oWorld.scene.add(oArrow);
        this.setState({oArrow: oArrow});
    }

    makeWireFrame(){
        if (!this.state.oConfig.size) return;
        let oMaterial = new THREE.LineBasicMaterial({
            color: 0x000000,
            linewidth: 2
        });
        let oSize = this.state.oConfig.size;
        let x = oSize.x * this.props.tileSize;
        let y = oSize.y * this.props.tileSize;
        let z = oSize.z * this.props.tileSize;
        let aPoints = [];
        aPoints.push( new THREE.Vector3( 0, 0, 0 ) );
        aPoints.push( new THREE.Vector3( x, 0, 0 ) );
        aPoints.push( new THREE.Vector3( x, y, 0 ) );
        aPoints.push( new THREE.Vector3( 0, y, 0 ) );
        aPoints.push( new THREE.Vector3( 0, 0, 0 ) );
        aPoints.push( new THREE.Vector3( 0, 0, z ) );
        aPoints.push( new THREE.Vector3( x, 0, z ) );
        aPoints.push( new THREE.Vector3( x, y, z ) );
        aPoints.push( new THREE.Vector3( 0, y, z ) );
        aPoints.push( new THREE.Vector3( 0, 0, z ) );
        let oGeometry1 = new THREE.BufferGeometry().setFromPoints( aPoints );

        aPoints = [];
        aPoints.push( new THREE.Vector3( x, 0, 0 ) );
        aPoints.push( new THREE.Vector3( x, 0, z ) );
        aPoints.push( new THREE.Vector3( x, y, z ) );
        aPoints.push( new THREE.Vector3( x, y, 0 ) );
        aPoints.push( new THREE.Vector3( 0, y, 0 ) );
        aPoints.push( new THREE.Vector3( 0, y, z ) );
        let oGeometry2 = new THREE.BufferGeometry().setFromPoints( aPoints );

        let hWait = setInterval(()=>{
            if (this.state.oWorld.scene){
                let oLine1 = new THREE.Line( oGeometry1, oMaterial );
                this.state.oWorld.scene.add(oLine1);
                let oLine2 = new THREE.Line( oGeometry2, oMaterial );
                this.state.oWorld.scene.add(oLine2);
            }
            clearInterval(hWait);
        },100);       
    }

    calcSize(){
        let x = this.state.oConfig.size.x-((this.state.oSlice.axis==='x')?this.state.oSlice.level:0)
        let y = this.state.oConfig.size.y-((this.state.oSlice.axis==='y')?this.state.oSlice.level:0)
        let z = this.state.oConfig.size.z-((this.state.oSlice.axis==='z')?this.state.oSlice.level:0)
        if (x < 0 || y < 0 || z < 0) return null;
        return {
            x: x,
            y: y,
            z: z,
        }
    }

    makeFrame() {
        let threeWorld = this.state.oWorld;
        let tileSize = this.props.tileSize;
        let size = {
            o: this.calcSize(),
            get X() {
                return this.o.x * tileSize;
            },
            get Y() {
                return this.o.y * tileSize;
            },
            get Z() {
                return this.o.z * tileSize;
            }
        };

        //Centering oribit controls
        let frameSz = this.state.oConfig.size
        threeWorld.controls.target.set(frameSz.x*tileSize/2, frameSz.y*tileSize/2, frameSz.z*tileSize/2);

        let cube = new Object3D();
        for (let ii = 0; ii < 6; ii++) {
            cube.add(createAFace.bind(this)(ii));
        }
        
        threeWorld.scene.add(cube);
        cube.size = size;

        this.setState({
            oFrame: cube,
            oChartSize: this.calcSize()
        })

        return cube;

        function createAFace(order) {
            if (!this.state.oConfig) return;
            let tileSize = this.props.tileSize;
            let fPi = Math.PI;
            let size = this.calcSize();
            let oFaceInfo = {
                0: {
                    width: 'x',
                    height: 'z',
                    angle: new THREE.Vector3(3 * fPi / 2, 0, 0),
                    get position() {
                        return new THREE.Vector3(size[this.width] * tileSize / 2, 0, size[this.height] * tileSize / 2)
                    },
                    side: THREE.BackSide
                },
                1: {
                    width: 'x',
                    height: 'z',
                    angle: new THREE.Vector3(3 * fPi / 2, 0, 0),
                    get position() {
                        return new THREE.Vector3(size[this.width] * tileSize / 2, size.y * tileSize, size[this.height] * tileSize / 2)
                    },
                    side: THREE.FrontSide
                },
                2: {
                    width: 'y',
                    height: 'z',
                    angle: new THREE.Vector3(3 * fPi / 2, 3 * fPi / 2, 0),
                    get position() {
                        return new THREE.Vector3(0, size[this.width] * tileSize / 2, size[this.height] * tileSize / 2)
                    },
                    side: THREE.FrontSide
                },
                3: {
                    width: 'y',
                    height: 'z',
                    angle: new THREE.Vector3(3 * fPi / 2, 3 * fPi / 2, 0),
                    get position() {
                        return new THREE.Vector3(size.x * tileSize, size[this.width] * tileSize / 2, size[this.height] * tileSize / 2)
                    },
                    side: THREE.BackSide
                },
                4: {
                    width: 'x',
                    height: 'y',
                    angle: new THREE.Vector3(fPi, 0, 0),
                    get position() {
                        return new THREE.Vector3(size[this.width] * tileSize / 2, size[this.height] * tileSize / 2, 0)
                    },
                    side: THREE.FrontSide
                },
                5: {
                    width: 'x',
                    height: 'y',
                    angle: new THREE.Vector3(fPi, 0, 0),
                    get position() {
                        return new THREE.Vector3(size[this.width] * tileSize / 2, size[this.height] * tileSize / 2, size.z * tileSize)
                    },
                    side: THREE.BackSide
                }
            }
            let oCurrFI = oFaceInfo[order];
            let tileGeometry = new THREE.PlaneGeometry(
                size[oCurrFI.width] * tileSize,
                size[oCurrFI.height] * tileSize,
                size[oCurrFI.width], size[oCurrFI.height]
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

    writeNumber(){
        let pos = (x, y, z) => {
            let mul = (n) => {return (n-0.5)*this.props.tileSize};
            return [ mul(x), mul(y), mul(z) ]
        }
        
        let makeTextSprite = ( message) => {
            let tileSize = this.props.tileSize;
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            canvas.width = tileSize*2;
            canvas.height = canvas.width;

            // context.beginPath();
            // context.rect(0,0,canvas.width,canvas.height);
            // context.fillStyle = "red";
            // context.fill();

            context.font = 'Bold '+tileSize*2+'px Roboto';
            context.fillStyle = "#7F007F";
            context.textAlign = "center";
            context.fillText(message, tileSize, tileSize*1.74591293182);

            let texture = new THREE.Texture(canvas) 
            texture.needsUpdate = true;

            var spriteMaterial = new THREE.SpriteMaterial( 
                { map: texture } );
            var sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(canvas.width,canvas.height,canvas.height);
            return sprite;	
        }
        
        let writeNumber = (n, x, y, z) => {
            let sp = makeTextSprite(String(n));
            sp.position.set(...pos(x,y,z));
            this.state.oWorld.scene.add(sp);
        }

        let hTimer = setInterval(()=>{
            let oLabel = this.state.oConfig["axis-labels"];
            if (oLabel){
                if (oLabel["axis-x"].show)
                    oLabel["axis-x"].list.forEach((e) => {
                        writeNumber(e,e,0,0);
                })
                if (oLabel["axis-y"].show)
                    oLabel["axis-y"].list.forEach((e) => {
                        writeNumber(e,0,e,0);
                })
                if (oLabel["axis-z"].show)
                    oLabel["axis-z"].list.forEach((e) => {
                        writeNumber(e,0,0,e);
                })
                clearInterval(hTimer);
            }
        },100)

    }

    updateChart() {
        let currFace = null;
        let color = null;
        let aData = this.state.oData;
        let oMesh = this.state.oFrame;
        let iX = this.state.oChartSize.x;
        let iY = this.state.oChartSize.y;
        let iZ = this.state.oChartSize.z;

        if (!oMesh || 
            !aData ||
            iX>aData[0][0].length ||
            iY>aData[0].length ||
            iZ>aData.length
            ) {return};
        
        // eslint-disable-next-line
        let aFace = new Array(6).fill(0).map(x => new Array());

        //Find lowest and greatest temperature
        let iMin = 999;
        let iMax = -999;
        for(let iit=0;iit<iZ;iit++){
            for(let iis=0;iis<iY;iis++){
                for(let iif=0;iif<iX;iif++){
                    if (aData[iit][iis][iif]<iMin) iMin = aData[iit][iis][iif];
                    if (aData[iit][iis][iif]>iMax) iMax = aData[iit][iis][iif];

                    if (iis === 0)
                        (aFace[0]).push(aData[iit][iis][iif]);
                    if (iis === iY - 1)
                        (aFace[1]).push(aData[iit][iis][iif]);
                    if (iif === 0)
                        (aFace[2]).push(aData[iit][iis][iif]);        
                    if (iif === iX - 1)
                        (aFace[3]).push(aData[iit][iis][iif]);
                    if (iit === 0)
                        (aFace[4]).push(aData[iit][iis][iif]);
                    if (iit === iZ - 1)
                        (aFace[5]).push(aData[iit][iis][iif]);
                }
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
            let ret = Math.floor(
                240 - (temp - min) * 240 / (max - min)
            );
            return "hsl(" + ret + ",100%,50%)";
        }
    }

    componentDidMount() {
        this.init(()=>{
            this.writeNumber();
        });
    }

    componentDidUpdate() {
        this.state.oWorld.scene.background.setHex(this.state.bg_color);
        let oChartSize = this.state.oChartSize;
        let oCurrSize = this.calcSize();
        if (oChartSize.x !== oCurrSize.x || oChartSize.y !== oCurrSize.y || oChartSize.z !== oCurrSize.z){
                this.state.oFrame && this.state.oFrame.children.forEach((child) =>{
                    child.geometry.dispose();
                    child.material.dispose();
                    this.state.oWorld.scene.remove(child);
                });
                this.state.oWorld.scene.remove(this.state.oFrame);

                this.makeFrame(this.state);
                this.makeDoor();
        }
        this.updateChart();
        this.makeWireFrame();
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