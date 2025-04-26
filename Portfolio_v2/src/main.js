import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(160, window.innerWidth/window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)
// model creations
//cylinder  
const geometryCylinder = new THREE.CylinderGeometry( 15, 15, 30, 110 ); 
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} ); 
const cylinder = new THREE.Mesh( geometryCylinder, material );

const geometrySphere = new THREE.SphereGeometry( 25, 100, 26 ); 
const material2 = new THREE.MeshBasicMaterial( { color: 0xfff00 } ); 
const sphere = new THREE.Mesh( geometrySphere, material2 ); 
sphere.position.set(0,30,0)

scene.add(cylinder,sphere)

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


function animate() {
  requestAnimationFrame(animate)

  // cylinder.rotation.x += 0.01
  // cylinder.rotation.y += 0.01
  // cylinder.rotation.z += 0.0
  controls.update()
  renderer.render(scene,camera)
}
animate()
