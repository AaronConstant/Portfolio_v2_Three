import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import * as THREE from 'three'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(145, window.innerWidth/window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)

const geometryCylinder = new THREE.CylinderGeometry( 15, 15, 30, 100 ); 
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} ); 
const cylinder = new THREE.Mesh( geometryCylinder, material ); scene.add( cylinder );

scene.add(geometryCylinder)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(25,25,25)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)
const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper)




function animate() {
  requestAnimationFrame(animate)

  cylinder.rotation.x += 0.01
  cylinder.rotation.y += 0.01
  cylinder.rotation.z += 0.01


  renderer.render(scene,camera)
}
animate()
