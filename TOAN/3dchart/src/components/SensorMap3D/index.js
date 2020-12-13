import React, {
    useEffect, useRef
} from 'react';
import "./3DChart.css";
import * as THREE from 'three';
import OrbitControls from 'orbit-controls-es6';

class Helper {
    constructor(container){
        this.container = container;
    }

    setConfig(config){
        this.config = config;
    }

    setData(data){
        this.data = data;
    }

    reCalculationLimit(slice){
        this.slice = slice;
        let vOrigin = this.slice.origin;
        let vDes = this.slice.destination;
        !vOrigin && (vOrigin = {
            x: 0,
            y: 0,
            z: 0
        });

        let sz = this.config.size, x=sz.x, y=sz.y, z=sz.z;
        !vDes && (vDes = {
            x: x,
            y: y,
            z: z
        });

        const max = (a, b) => (a>b)?a:b;
        const min = (a, b) => (a<b)?a:b;
        this.limit = {
            ix: x,
            iy: y,
            iz: z,
            idx: Math.abs(vOrigin.x - vDes.x),
            idy: Math.abs(vOrigin.y - vDes.y),
            idz: Math.abs(vOrigin.z - vDes.z),
            ix0: min(vOrigin.x, vDes.x),//origin
            iy0: min(vOrigin.y, vDes.y),
            iz0: min(vOrigin.z, vDes.z),
            ix1: max(vOrigin.x, vDes.x)-1,//destination
            iy1: max(vOrigin.y, vDes.y)-1,
            iz1: max(vOrigin.z, vDes.z)-1
        }
    }

    setTileColor(faceOrder, i, value){
        let iMin = this.data.min;
        let hue = (240 - 240 * (value - iMin) / (this.data.max - iMin)) / 360;
        let currFace = this.cubeFrame.children[faceOrder].geometry.faces;
        currFace[2 * i].color.setHSL(hue, 1, .5);
        currFace[2 * i + 1].color.setHSL(hue, 1, .5);
    }

    initWorld(){
        //console.info("makeWorld");
        let e = new THREE.Scene();
        e.background = new THREE.Color(15663086);
        let t = new THREE.PerspectiveCamera(60,this.container.clientWidth / this.container.clientHeight);
        t.up.set(0, 0, 1);
        t.position.set(350, 350, 350);
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        let controls = new OrbitControls(t, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = .05;
        controls.screenSpacePanning = false;
        controls.minDistance = 100;
        controls.maxDistance = 900;
        controls.maxPolarAngle = Math.PI;
        controls.rotateSpeed = .5;
        controls.target.set(0, 0, 0);

        //make axesHelper
        let axesHelper = new THREE.AxesHelper(500);
        e.add(axesHelper);

        let animate = function() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(e, t);
        };
        animate();
        this.scene = e;
        this.camera = t;
        this.controls = controls;
        this.renderer = renderer;
        this.axesHelper = axesHelper;
        this.container.appendChild( renderer.domElement);
    }
    makeDoor() {
        //console.info("makeDoor");
        let e = this.config.door;
        let sensorDensity = this.config.sensorDensity
        if (e.show && this.scene) {
            let t = this.config.size
              , i = {
                x: t.x * 5 / sensorDensity,
                y: t.y * 5 / sensorDensity,
                z: t.z * 5 / sensorDensity,
                e: 20 * 5
            }
              , n = {
                A: {
                    x0: i.x / 2,
                    y0: -i.e,
                    z0: i.z / 2,
                    x1: i.x / 2,
                    y1: i.y,
                    z1: i.z / 2
                },
                B: {
                    x0: i.x / 2,
                    y0: i.y + i.e,
                    z0: i.z / 2,
                    x1: i.x / 2,
                    y1: i.y,
                    z1: i.z / 2
                },
                C: {
                    x0: -i.e,
                    y0: i.y / 2,
                    z0: i.z / 2,
                    x1: i.x,
                    y1: i.y / 2,
                    z1: i.z / 2
                },
                D: {
                    x0: i.x + i.e,
                    y0: i.y / 2,
                    z0: i.z / 2,
                    x1: i.x,
                    y1: i.y / 2,
                    z1: i.z / 2
                }
            }[e.direction]
              , s = new THREE.Vector3(n.x1 - n.x0,n.y1 - n.y0,n.z1 - n.z0)
              , a = new THREE.Vector3(n.x0,n.y0,n.z0)
              , r = 8 * 5
              , o = 2 * 5
              , c = 1 * 5
              , l = new THREE.ArrowHelper(s.normalize(),a,r,0,o,c);
            l.up.set(0, 0, 1);
            this.scene.add(l);
        }
    }
    makeWireFrame() {
        //console.info("makeWireFrame");
        let e = new THREE.LineBasicMaterial({
            color: 0,
            linewidth: 2
        }), d = this.config.sensorDensity
          , t = this.config.size
          , i = t.x * 5 / d
          , n = t.y * 5 / d
          , s = t.z * 5 / d
          , a = [];
        a.push(new THREE.Vector3(0,0,0));
        a.push(new THREE.Vector3(i,0,0));
        a.push(new THREE.Vector3(i,n,0));
        a.push(new THREE.Vector3(0,n,0));
        a.push(new THREE.Vector3(0,0,0));
        a.push(new THREE.Vector3(0,0,s));
        a.push(new THREE.Vector3(i,0,s));
        a.push(new THREE.Vector3(i,n,s));
        a.push(new THREE.Vector3(0,n,s));
        a.push(new THREE.Vector3(0,0,s));
        let r = (new THREE.BufferGeometry()).setFromPoints(a);
        (a = []).push(new THREE.Vector3(i,0,0));
        a.push(new THREE.Vector3(i,0,s));
        a.push(new THREE.Vector3(i,n,s));
        a.push(new THREE.Vector3(i,n,0));
        a.push(new THREE.Vector3(0,n,0));
        a.push(new THREE.Vector3(0,n,s));
        let o = (new THREE.BufferGeometry()).setFromPoints(a)
          , c = new THREE.Line(r,e);
        this.scene.add(c);
        let l = new THREE.Line(o,e);
        this.scene.add(l)
    }
    writeNumber() {
        let e = this
        let t = this.config.size.tilesize;
        let i = (i, n, s, a) => {
            let r = function(e) {
                let i = document.createElement("canvas")
                  , n = i.getContext("2d");
                i.width = i.height = 2 * t;
                n.font = "Bold " + 2 * t + "px Roboto";
                n.fillStyle = "#7F007F";
                n.textAlign = "center";
                n.fillText(e, t, 1.74591293182 * t);
                let s = new THREE.Texture(i);
                s.needsUpdate = !0;
                let a = new THREE.SpriteMaterial({
                    map: s
                })
                  , r = new THREE.Sprite(a);
                r.scale.set(i.width, i.width, i.width);
                return r;
            }(String(i));
            r.position.set((n - .5) * t, (s - .5) * t, (a - .5) * t);
            e.scene.add(r);
        }
        let n = this.config["axis-labels"];
        n["axis-x"].show && n["axis-x"].list.forEach((e) => i(e, e, 0, 0));
        n["axis-y"].show && n["axis-y"].list.forEach((e) => i(e, 0, e, 0));
        n["axis-z"].show && n["axis-z"].list.forEach((e) => i(e, 0, 0, e));
    }

    makeCubes(){
        if (!this.data) return;
        this.data.map(e => {
            this.scene.add(
                this.cube(e.x, e.y, e.z, e.status)
            )
        })
    }

    cube(x = 0, y = 0, z = 0, status = "RUNNING") {
        const colorMap = {
            'EMPTY' : '#CCCCCC',
            'RUNNING': '#00A100',
            'ON': '#FFAA00',
            'IMPORTANT' : '#DC0404'
        }
        const g = new THREE.BoxGeometry(5,5,5);
        const m = new THREE.MeshBasicMaterial({color: colorMap[status]});
        const c = new THREE.Mesh(g, m);
        c.position.x = 2.5 + x * 5;
        c.position.y = 2.5 + y * 5;
        c.position.z = 2.5 + z * 5;
        return c;
    }
}

const SensorMap3D = (props) => {
    const container = useRef();
    const chart = useRef();

    useEffect(()=>{
        chart.current = new Helper(container.current);
    },[])

    useEffect(() => {
        chart.current.setConfig(props.config);
        chart.current.setData(props.data);
        chart.current.initWorld();
        chart.current.makeDoor();
        chart.current.makeWireFrame();
        chart.current.makeCubes();
        //chart.current.writeNumber();
    },[props.config, props.data]);

    return (
        <div className="chartContainer" style={{
            width: "inherit",
            height: "inherit"
        }} ref={(self)=>{container.current = self}}/>
    );
};

export default SensorMap3D;