import * as THREE from './js/three.module.js';
			import { OrbitControls } from './js/OrbitControls.js';
			
			var camera, controls, scene, renderer;
			
			init();
			//render(); // remove when using next line for animation loop (requestAnimationFrame)
			animate();

			function init() {
				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xffffff );
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );
				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( 8000, 4000, 1000 );

				// controls
				controls = new OrbitControls( camera, renderer.domElement );
				//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
				controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
				controls.dampingFactor = 0.05;
				controls.screenSpacePanning = false;
				controls.minDistance = 100;
				controls.maxDistance = 500;
				controls.maxPolarAngle = Math.PI / 2;

				// world
				var groupCube1 = new THREE.Group();
				var geometryCube1 = new THREE.BoxGeometry(200, 200, 200);
				var cube1 = new THREE.Mesh(
				geometryCube1,
				new THREE.MeshBasicMaterial({
					color: 0x00ff00,
					transparent: false,
					opacity: 0.1,
					overdraw: 0.5,
					depthWrite: false
				}));
				//groupCube1.add( new THREE.LineSegments( geometryCube1, new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true, opacity: 0.5 } ) ) );
				groupCube1.add(cube1);
				scene.add(groupCube1);
				
				var cube2 = new THREE.Mesh(
				new THREE.BoxGeometry(100, 100, 100),
				new THREE.MeshBasicMaterial({
					color: 0x0000ff,
					transparent: false,
					opacity: 0.1,
					overdraw: 0.5,
					depthWrite: false
				}));
				scene.add(cube2);
				
				window.addEventListener( 'resize', onWindowResize, false );
			}

			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

			function animate() {
				requestAnimationFrame( animate );
				controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
				render();
			}

			function render() {
				renderer.render( scene, camera );
			}