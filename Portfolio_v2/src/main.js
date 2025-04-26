import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// Scene, camera, and renderer setup
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(160, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})
//
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(0)
camera.position.setY(40)
camera.position.setX(30)
renderer.setClearColor(0x000000, 1)
// camera.position.set(20, 30, 20)
camera.lookAt(10,0.01,0.90)

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


scene.add(terrain,curveObject)
function animate() {
  requestAnimationFrame(animate)

  // cylinder.rotation.x += 0.01
  // cylinder.rotation.y += 0.01
  // cylinder.rotation.z += 0.0
  controls.update()
  renderer.render(scene,camera)
}
animate()
