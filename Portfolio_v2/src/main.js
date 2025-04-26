import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// Scene, camera, and renderer setup
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})
//
camera.position.set(50,100,0)
camera.lookAt(0,0,0)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 1)
// camera.position.set(20, 30, 20)

renderer.render(scene, camera)
// model creations geometry
//cylinder  
const geometryCylinder = new THREE.CylinderGeometry( 10, 10, 30, 110 ); 
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} ); 
const cylinder = new THREE.Mesh( geometryCylinder, material );
// sphere
const geometrySphere = new THREE.SphereGeometry( 15, 15, 26 ); 
const material2 = new THREE.MeshBasicMaterial( { color: 0xfff00 } ); 
const sphere = new THREE.Mesh( geometrySphere, material2 ); 
sphere.position.set(0,30,0)
// plane
const planeGeometry = new THREE.PlaneGeometry( 1000, 1000, 100, 100 );
const planeMaterial = new THREE.MeshBasicMaterial( { color: 0x228B22, side: THREE.DoubleSide } );
const terrain = new THREE.Mesh( planeGeometry, planeMaterial );
terrain.rotation.x = Math.PI / 2
terrain.position.set(0,-20,0)
// walkerExample 
const walker = new THREE.Mesh(
  new THREE.SphereGeometry( 1, 32, 32 ),
  new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
)

scene.fog = new THREE.Fog(0x000000, 0, 1000)

//adding the objects to the scene


// Light and grid helpers
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)
scene.add(lightHelper, gridHelper)


// Controls for camera movement
const controls = new OrbitControls(camera, renderer.domElement)

// Curve points
const points = [
  new THREE.Vector3(10, 2, 0),
  new THREE.Vector3(10, 2, -10),
  new THREE.Vector3(20, 2, 0),
  new THREE.Vector3(30, 2, 10),
  new THREE.Vector3(40, 2, 0),
  new THREE.Vector3(50, 2, -10),
  new THREE.Vector3(60, 2, 0),
]
const curve = new THREE.CatmullRomCurve3(points)
const curveGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(100))
const curveMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
const curveObject = new THREE.Line(curveGeometry, curveMaterial)

// event listener for button click
document.getElementById('startButton').addEventListener('click', () => {
  moving = !moving;

  const startPoint = curve.getPointAt(0);
  const startTangent = curve.getTangentAt(0);
  document.getElementById('startButton').style.display = moving ? 'none' : 'block';
  camera.position.copy(startPoint);
  camera.position.y += 3;
  camera.lookAt(startPoint.clone().add(startTangent));
});
let progress = 0;
let moving = false;

scene.add(terrain,curveObject, walker)

// animation function 
function animate() {
  requestAnimationFrame(animate)

  if(moving && progress <= 1) {
    progress += 0.0010;
    const point = curve.getPointAt(progress);
    const tangent= curve.getTangentAt(progress);
    // walker adjustments to view Path
    walker.position.copy(point);
    walker.position.y += 3;
    walker.lookAt(point.clone().add(tangent));

    //  testing-walker POV
    camera.position.set(
      point.x + 30,  
      point.y + 20,
      point.z + 30
    );
    camera.lookAt(walker.position);;
  }

  // cylinder.rotation.x += 0.01
  // cylinder.rotation.y += 0.01
  // cylinder.rotation.z += 0.0
  controls.update()
  renderer.render(scene,camera)
}
animate()
