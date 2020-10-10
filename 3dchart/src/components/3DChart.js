import React, {
    useState, useEffect
} from 'react';
import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';
import {
    Object3D
} from 'three';
import "./3DChart.css";
//import Axios from 'axios';

const TChart = (props) => {
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
    let [world] = useState(initWorld());

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

        let vDirection = new THREE.Vector3( oVector.x1-oVector.x0, oVector.y1-oVector.y0, oVector.z1-oVector.z0);
        let vOrigin = new THREE.Vector3( oVector.x0, oVector.y0, oVector.z0);

        let iLength = 8*oCSize.tilesize;
        let iColor = 0x000000;
        let iHeadLength = 2*oCSize.tilesize;
        let iHeadWidth = 1*oCSize.tilesize;
        let oDoor = new THREE.ArrowHelper(vDirection.normalize(), vOrigin, iLength, iColor, iHeadLength, iHeadWidth);
        oDoor.up.set(0,0,1);

        world.scene.add(oDoor);
    }

    const makeWireFrame = () => {
        let oMaterial = new THREE.LineBasicMaterial({
            color: 0x000000,
            linewidth: 2
        });
        let oSize = props.config.size;
        let x = oSize.x * oSize.tilesize;
        let y = oSize.y * oSize.tilesize;
        let z = oSize.z * oSize.tilesize;
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

        let oLine1 = new THREE.Line( oGeometry1, oMaterial );
        world.scene.add(oLine1);
        let oLine2 = new THREE.Line( oGeometry2, oMaterial );
        world.scene.add(oLine2);
    }

    const calcSize = () => {
        let result = {
            x: props.config.size.x,
            y: props.config.size.y,
            z: props.config.size.z,
        }
        result[props.slice.axis.toLowerCase()] -= props.slice.level;
        if (result.x < 0 || result.y < 0 || result.z < 0) return null;
        return result;
    }

    const makeFrame = () => {
        let size = calcSize();
        let tileSize = props.config.size.tilesize;        
        //Centering oribit controls
        world.controls.target.set(size.x*tileSize/2, size.y*tileSize/2, size.z*tileSize/2);
        console.log(size.x*tileSize/2);
        let cube = new Object3D();
        for (let ii = 0; ii < 6; ii++) {
            cube.add(createAFace(ii));
        }
        
        world.scene.add(cube);
        cube.size = size;//?

        return cube;

        function createAFace(order) {
            let fPi = Math.PI;
            let size = calcSize();
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
    let [cube] = useState(makeFrame());

    const writeNumber = () => {
        const tilesize = props.config.size.tilesize;
        
        const makeTextSprite = ( message) => {
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            canvas.width = canvas.height = tilesize*2;

            // context.beginPath();
            // context.rect(0,0,canvas.width,canvas.height);
            // context.fillStyle = "red";
            // context.fill();

            context.font = 'Bold '+tilesize*2+'px Roboto';
            context.fillStyle = "#7F007F";
            context.textAlign = "center";
            context.fillText(message, tilesize, tilesize*1.74591293182);

            let texture = new THREE.Texture(canvas) 
            texture.needsUpdate = true;

            var spriteMaterial = new THREE.SpriteMaterial( { map: texture } );
            var sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(canvas.width, canvas.width, canvas.width);
            return sprite;	
        }
        
        const writeN = (n, x, y, z) => {
            const mul = (n) => {return (n-0.5)*tilesize};
            let sp = makeTextSprite(String(n));
            sp.position.set( mul(x), mul(y), mul(z) );
            world.scene.add(sp);
        }

        
        let oLabel = props.config["axis-labels"];
        if (oLabel){
        if (oLabel["axis-x"].show)
            oLabel["axis-x"].list.forEach((e) => {
                writeN(e,e,0,0);
        })
        if (oLabel["axis-y"].show)
            oLabel["axis-y"].list.forEach((e) => {
                writeN(e,0,e,0);
        })
        if (oLabel["axis-z"].show)
            oLabel["axis-z"].list.forEach((e) => {
                writeN(e,0,0,e);
        })
        }
    }

    const updateChart = (oFrame) => {
        let currFace = null;
        let color = null;
        let aData = props.data;
        let size = calcSize();
        
        // eslint-disable-next-line
        let aFace = new Array(6).fill(0).map(x => new Array());

        //Find lowest and greatest temperature
        let iMin = 999;
        let iMax = -999;
        for(let iit=0;iit<size.z;iit++){
            for(let iis=0;iis<size.y;iis++){
                for(let iif=0;iif<size.x;iif++){
                    if (aData[iit][iis][iif]<iMin) iMin = aData[iit][iis][iif];
                    if (aData[iit][iis][iif]>iMax) iMax = aData[iit][iis][iif];

                    if (iis === 0)
                        (aFace[0]).push(aData[iit][iis][iif]);
                    if (iis === size.y - 1)
                        (aFace[1]).push(aData[iit][iis][iif]);
                    if (iif === 0)
                        (aFace[2]).push(aData[iit][iis][iif]);        
                    if (iif === size.x - 1)
                        (aFace[3]).push(aData[iit][iis][iif]);
                    if (iit === 0)
                        (aFace[4]).push(aData[iit][iis][iif]);
                    if (iit === size.z - 1)
                        (aFace[5]).push(aData[iit][iis][iif]);
                }
            }
        }

        for (let ii = 0; ii < 6; ii++) {
            currFace = oFrame.children[ii].geometry.faces;
            let n = currFace.length / 2;
            for (let ia = 0; ia < n; ia++) {
                color = tempToHSL(iMin, iMax, aFace[ii][ia]);
                currFace[ia * 2].color.set(color);
                currFace[ia * 2 + 1].color.set(color);
            }
            oFrame.children[ii].geometry.elementsNeedUpdate = true;
        }

        function tempToHSL(min, max, temp) {
            let ret = Math.floor(
                240 - (temp - min) * 240 / (max - min)
            );
            return "hsl(" + ret + ",100%,50%)";
        }
    }

    useEffect(() => {
        container[0].appendChild(world.renderer.domElement);
        makeDoor();
        makeWireFrame();
        writeNumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(()=>{
        updateChart(cube);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.data]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (
        <div className="chartContainer" ref={(self)=>{container.push(self)}}/>
    );
};

export default TChart;