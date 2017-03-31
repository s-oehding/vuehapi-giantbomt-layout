<template>
  <div id="map">
    <img id="projection" src="../assets/equirectangle_projection.png">
  </div>
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'
import * as THREE from 'three/build/three.js'
import TrackballControls from 'three-trackballcontrols'
import Hexasphere from 'hexasphere.js'

export default {
  name: 'map',
  props: [],
  data () {
    return {
      map: {},
      ready: false
    }
  },
  mounted () {
    this.renderMap()
  },
  methods: {
    renderMap () {
      _.delay(function () {
        var hexasphere = new Hexasphere(30, 25, 0.95)
        var container = document.getElementById('map')
        var width = parseInt(window.getComputedStyle(container).width)
        var height = parseInt(window.getComputedStyle(container).height)
        let renderer = new THREE.WebGLRenderer({ antialias: true })

        renderer.setSize(width, height)
        var cameraDistance = 65
        var camera = new THREE.PerspectiveCamera(cameraDistance, width / height, 1, 200)
        camera.position.z = -cameraDistance

        var scene = new THREE.Scene()
        scene.fog = new THREE.Fog(0x000000, cameraDistance * 0.4, cameraDistance * 1.2)

        var img = document.getElementById('projection')
        var projectionCanvas = document.createElement('canvas')
        var projectionContext = projectionCanvas.getContext('2d')
        projectionCanvas.width = img.width
        projectionCanvas.height = img.height
        projectionContext.drawImage(img, 0, 0, img.width, img.height)
        var pixelData = null

        let isLand = function (lat, lon) {
          var x = parseInt(img.width * (lon + 180) / 360)
          var y = parseInt(img.height * (lat + 90) / 180)
          if (pixelData == null) {
            pixelData = projectionContext.getImageData(0, 0, img.width, img.height)
          }
          // console.log(pixelData.data)
          return pixelData.data[(y * pixelData.width + x) * 4] === 0
        }

        var meshMaterials = []
        meshMaterials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 0x40e0d0 }))
        meshMaterials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 0x36bfb2 }))
        meshMaterials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 0x39fbe7 }))
        meshMaterials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 0x4df5e4 }))
        meshMaterials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 0x42c1b5 }))

        var lineMaterial = new THREE.LineBasicMaterial({ color: 0x292b2c, opacity: 0.1, linewidth: 1, transparent: true })

        for (var i = 0; i < hexasphere.tiles.length; i++) {
          var t = hexasphere.tiles[i]
          var latLon = t.getLatLon(hexasphere.radius)

          var geometry = new THREE.Geometry()

          for (var j = 0; j < t.boundary.length; j++) {
            var bp = t.boundary[j]
            geometry.vertices.push(new THREE.Vector3(bp.x, bp.y, bp.z))
          }
          geometry.vertices.push(new THREE.Vector3(t.boundary[0].x, t.boundary[0].y, t.boundary[0].z))

          if (isLand(latLon.lat, latLon.lon)) {
            geometry.faces.push(new THREE.Face3(0, 1, 2))
            geometry.faces.push(new THREE.Face3(0, 2, 3))
            geometry.faces.push(new THREE.Face3(0, 3, 4))
            geometry.faces.push(new THREE.Face3(0, 4, 5))

            var mesh = new THREE.Mesh(geometry, meshMaterials[Math.floor(Math.random() * meshMaterials.length)])
            mesh.doubleSided = true
            scene.add(mesh)
          } else {
            scene.add(new THREE.Line(geometry, lineMaterial))
          }
        }
        var controls
        controls = new TrackballControls(camera, renderer.domElement)
        renderer.render(scene, camera)
        controls.update()
        var lastTime = Date.now()
        var cameraAngle = 90

        var tick = function () {
          var dt = Date.now() - lastTime

          var rotateCameraBy = (2 * Math.PI) / (200000 / dt)
          cameraAngle += rotateCameraBy

          lastTime = Date.now()

          camera.position.x = cameraDistance * Math.cos(cameraAngle)
          camera.position.y = Math.sin(cameraAngle) * 10
          camera.position.z = cameraDistance * Math.sin(cameraAngle)
          camera.lookAt(scene.position)

          renderer.render(scene, camera)

          window.requestAnimationFrame(tick)
          controls.update()
        }

        function onWindowResize () {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', onWindowResize, false)
        $('#map').append(renderer.domElement)
        window.requestAnimationFrame(tick)
        window.hexasphere = hexasphere
      }, 1000)
    }
  }
}

</script>

<style lang="sass" scoped>
  #map {
    width: 100%;
    height: 100%;
    #projection {
      display: none;
    }
  }
</style>
