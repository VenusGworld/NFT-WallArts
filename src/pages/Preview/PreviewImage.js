

import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useEffect, useRef } from 'react';
import { ACESFilmicToneMapping, CanvasTexture, MeshStandardMaterial, PCFSoftShadowMap, PointLight, PointLightHelper, sRGBEncoding, WebGLRenderer } from 'three';
import { Scene } from 'three';
import { PerspectiveCamera } from 'three';
import { HemisphereLight } from 'three';
import { TextureLoader } from 'three';
import { SpotLight } from 'three';
import { SpotLightHelper } from 'three';
import { PlaneGeometry } from 'three';
import { MeshLambertMaterial } from 'three';
import { Mesh } from 'three';
import { BoxGeometry } from 'three';

let renderer, scene, camera;

let spotLight1, spotLight2, spotLight3, lightHelper1, lightHelper2, lightHelper3;
const Three = ({img_url, width, height, containerWidth, containerHeight}) => {
  // console.log(img_url, width, height)
  function init() {

    renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerWidth-10, containerHeight-10);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    renderer.outputEncoding = sRGBEncoding;

    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    renderer.setAnimationLoop(render);

    scene = new Scene();

    camera = new PerspectiveCamera(50, containerWidth / containerHeight, 1, 1000);
    camera.position.set(10, 70, 180);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 50;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI / 2;
    controls.target.set(0, 30, 0);
    controls.update();


    


    // const ambient = new HemisphereLight(0xffffff, 0x444444, 0.08);
    // scene.add(ambient);
    spotLight1 = new PointLight(0xffffff, 10);
    spotLight1.intensity = 0.5;
    spotLight1.position.set(0, 100, 100);
    spotLight1.angle = Math.PI / 3;
    spotLight1.penumbra = 0.4;
    spotLight1.decay = 0.5;
    spotLight1.distance = 1000;
    spotLight1.castShadow = true;
    spotLight1.shadow.mapSize.width = 600;
    spotLight1.shadow.mapSize.height = 600;
    spotLight1.shadow.camera.near = 10;
    spotLight1.shadow.camera.far = 200;
    spotLight1.shadow.focus = 1;
    lightHelper1 = new PointLightHelper(spotLight1);
    scene.add(spotLight1);
    scene.add(lightHelper1);
    
    const geometry = new PlaneGeometry(2000, 2000);
    const floorMat = new THREE.MeshStandardMaterial( {
      roughness: 0.8,
      color: 0xffffff,
      metalness: 0.2,
      bumpScale: 0.0005
    } );
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(  process.env.PUBLIC_URL + '/img/hardwood2_diffuse.jpg', function ( map ) {
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set( 10, 24 );
      map.encoding = THREE.sRGBEncoding;
      floorMat.map = map;
      floorMat.needsUpdate = true;
    } );
    const mesh = new Mesh(geometry, floorMat);
    mesh.position.set(0, - 1, 0);
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    const geometry_1 = new PlaneGeometry(width, height);
    const mat_nft = new THREE.MeshStandardMaterial( {
      roughness: 0.8,
      color: 0xffffff,
      metalness: 0.2,
      bumpScale: 0.0005
    } );
    const textureLoader_1 = new THREE.TextureLoader();
    textureLoader_1.load(  img_url, function ( map ) {
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set( 1, 1 );
      map.encoding = THREE.sRGBEncoding;
      mat_nft.map = map;
      mat_nft.needsUpdate = true;
    } );
    const mesh_1 = new Mesh(geometry_1, mat_nft);
    mesh_1.position.set(0, 30, 1.1);
    // mesh_1.rotation.x = - Math.PI / 2;
    mesh_1.receiveShadow = true;
    scene.add(mesh_1);

    const geometry_2 = new BoxGeometry(width, height, 1);
    geometry_2.computeVertexNormals();
    const material_2 = new MeshStandardMaterial({ color: 0x808080,
        roughness: 0,
        metalness: 0,
        bumpScale: 0.005 });
    const mesh_2 = new Mesh(geometry_2, material_2);
    mesh_2.position.set(0, 30, 0);
    mesh_2.castShadow = true;
    mesh_2.receiveShadow = true;
    scene.add(mesh_2);
  }

  function render() {
  }
  const mountRef = useRef(null);


  useEffect(() => {
    init();
    mountRef.current.appendChild(renderer.domElement);
    var animate = function () {
      requestAnimationFrame(animate);
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    // function onWindowResize() {
    //   camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();
    //   renderer.setSize(window.innerWidth, window.innerHeight);
    // }
    // window.addEventListener('resize', onWindowResize);
    animate();
    return () => mountRef.current.removeChild(renderer.domElement);
  }, [img_url, width, height]);

// const data = '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'

  return (<div ref={mountRef}>
    {/* <img src={`data:image/jpeg;base64,${data}`} /> */}
    {/* <a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - spotlight<br /> */}
  </div>)
}

export default Three;

