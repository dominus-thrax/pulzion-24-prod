import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Loader from "./Loader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
import * as styles from "../styles/layout.module.css";

import headerImg from "../public/astronaut.svg";

const Layout = ({ children }) => {

  const router = useRouter();
  const bgRef = useRef(null);
  // key features
  //      3d animation
  //      3d navigation
  useEffect(() => {
    let satellite,
      satellite2,
      satellite3,
      meteor,
      meteor2,
      meteor3,
      meteor4,
      meteor5,
      meteor6,
      meteor7,
      meteor8,
      meteor9,
      renderer,
      scene,
      camera,
      activeCamera,
      controls,
      container = document.getElementById("canvas-container"),
      timeout_Debounce,
      planetNodes = [],
      orbits = [],
      sun,
      timestamp = 0,
      currentNode,
      uniforms,
      metadata = {
        urls: {
          sun: {
            surfaceMaterial:
              "data:image/jpeg;base64,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",
            atmosphereMaterial:
              "https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/sunAtmosphereMaterial.png",
          },
        },
      };

    const saturnRings = [
      "#3b2d27",
      "#876f5b",
      "#735c49",
      "#5e4a3d",
      "#3b2d27",
      "#241f1e",
      "#241f1e",
      "#735c49",
      "#735c49",
      "#735c49",
      "#5e4a3d",
      "#5e4a3d",
      "#3b2d27",
      "#3b2d27",
      "#3b2d27",
    ];

    const planets = {
      mercury: { radius: 2, orbitRadius: 33, speed: 5, rotationSpeed: 0.01 },
      venus: { radius: 3.5, orbitRadius: 48, speed: 3, rotationSpeed: 0.005 },
      earth: { radius: 3.5, orbitRadius: 55, speed: 4, rotationSpeed: 0.02 },
      mars: { radius: 2.5, orbitRadius: 72, speed: 2, rotationSpeed: 0.01 },
      jupiter: { radius: 9, orbitRadius: 90, speed: 0.8, rotationSpeed: 0.04 },
      saturn: { radius: 5, orbitRadius: 120, speed: 0.5, rotationSpeed: 0.02 },
      uranus: { radius: 5, orbitRadius: 140, speed: 0.4, rotationSpeed: 0.01 },
      neptune: { radius: 5, orbitRadius: 180, speed: 0.4, rotationSpeed: 0.01 },
    };

    const MEDIA_PREFIX =
      "https://brynmtchll.github.io/codepen-assets/solar-system/";

    init();
    animate();

    function init() {
      scene = new THREE.Scene();

      // lighting
      let ambientLight = new THREE.AmbientLight("#ffffff", 0.4);
      ambientLight.position.set(0, 20, 20);
      scene.add(ambientLight);

      let pointLight = new THREE.PointLight(0xffffff, 2.5);
      scene.add(pointLight);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(container?.clientWidth, container?.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      container?.appendChild(renderer.domElement);

      // main camera and orbit controls
      camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        0.01,
        1000
      );
      camera.position.set(0, -100, 170);
      scene.add(camera);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.maxDistance = 400;
      controls.minDistance = 80;
      controls.enablePan = false;

      // globe background
      {
        let loader = new THREE.TextureLoader(),
          texture = loader.load("https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg");

        texture.anisotropy = 20;

        let geometry = new THREE.SphereBufferGeometry(350, 60, 60),
          material = new THREE.MeshBasicMaterial({
            side: THREE.BackSide,
            map: texture,
          });

        let globe = new THREE.Mesh(geometry, material);
        scene.add(globe);
      }
      // meteor:
      var meteorGeomety1 = new THREE.DodecahedronGeometry(5, 1);
      var meteorGeomety2 = new THREE.DodecahedronGeometry(2, 1);
      var meteorGeomety3 = new THREE.DodecahedronGeometry(3, 2);
      var meteorGeomety4 = new THREE.DodecahedronGeometry(3, 2);
      var meteorGeomety5 = new THREE.DodecahedronGeometry(3, 2);
      var meteorGeomety6 = new THREE.DodecahedronGeometry(3, 2);
      var meteorGeomety7 = new THREE.DodecahedronGeometry(3, 2);
      var meteorGeomety8 = new THREE.DodecahedronGeometry(3, 2);
      var meteorGeomety9 = new THREE.DodecahedronGeometry(3, 2);
      scene.add(meteor);
      const texture = new THREE.TextureLoader().load(
        "https://thumbs.dreamstime.com/b/k-rock-ground-roughness-texture-height-map-specular-imperfection-d-materials-black-white-hi-res-200366106.jpg"
      );
      var meteorMaterial = new THREE.MeshBasicMaterial({ map: texture });
      meteor = new THREE.Mesh(meteorGeomety1, meteorMaterial);
      meteor2 = new THREE.Mesh(meteorGeomety2, meteorMaterial);
      meteor3 = new THREE.Mesh(meteorGeomety3, meteorMaterial);
      meteor4 = new THREE.Mesh(meteorGeomety4, meteorMaterial);
      meteor5 = new THREE.Mesh(meteorGeomety5, meteorMaterial);
      meteor6 = new THREE.Mesh(meteorGeomety6, meteorMaterial);
      meteor7 = new THREE.Mesh(meteorGeomety7, meteorMaterial);
      meteor8 = new THREE.Mesh(meteorGeomety8, meteorMaterial);
      meteor9 = new THREE.Mesh(meteorGeomety9, meteorMaterial);
      meteor.position.x = -100;
      meteor.position.y = -50;
      scene.add(meteor);
      meteor2.position.y = 70;
      scene.add(meteor2);
      meteor3.position.x = 100;
      scene.add(meteor3);
      meteor4.position.setX(100);
      meteor4.position.setY(60);
      meteor4.position.setZ(50);
      scene.add(meteor4);
      meteor5.position.setX(-100);
      meteor5.position.setY(75);
      meteor5.position.setZ(35);
      scene.add(meteor5);
      meteor6.position.setX(200);
      meteor6.position.setY(50);
      meteor6.position.setZ(40);
      scene.add(meteor6);
      meteor7.position.setX(-200);
      meteor7.position.setY(80);
      meteor7.position.setZ(45);
      scene.add(meteor7);
      meteor8.position.setX(150);
      meteor8.position.setY(-40);
      meteor8.position.setZ(50);
      scene.add(meteor8);
      meteor9.position.setX(-150);
      meteor9.position.setY(100);
      meteor9.position.setZ(55);
      scene.add(meteor9);

      var getSatellite = (x, y, z) => {
        var satellite = new THREE.Group();
        const satelliteTexture = new THREE.TextureLoader().load('https://thumbs.dreamstime.com/b/metal-plates-rivets-background-texture-patched-steel-steam-punk-85209793.jpg')
        const rect1 = new THREE.PlaneGeometry(10, 10, 7, 7);
        const PlaneMaterial = new THREE.MeshBasicMaterial({
          side: THREE.DoubleSide,
          color: '#3f4046'
        });
        PlaneMaterial.wireframe = true;
        const rectFirst = new THREE.Mesh(rect1, PlaneMaterial);
        rectFirst.position.x = -10;
        satellite.add(rectFirst);
        const rect2 = new THREE.PlaneGeometry(10, 10, 7, 7);
        const rectSecond = new THREE.Mesh(rect2, PlaneMaterial);
        rectSecond.position.x = 10;
        satellite.add(rectSecond);
        const capsuleGeometry = new THREE.CapsuleGeometry(5, 10, 32, 32);
        const capsuleMaterial = new THREE.MeshBasicMaterial({
          color: '#aaaaaa',
          map: satelliteTexture
        });
        const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
        satellite.add(capsule);
        satellite.position.setX(x);
        satellite.position.setY(y);
        satellite.position.setZ(z);
        return satellite;
      }
      satellite = getSatellite(30, 10, 260);
      scene.add(satellite);
      satellite2 = getSatellite(160, 30, -230);
      scene.add(satellite2);
      satellite3 = getSatellite(-220, 40, -180);
      scene.add(satellite3)
      //   sun
      {
        // credit for the shaders - github: 'https://github.com/bradyhouse/house/tree/master/fiddles/three/fiddle-0009-Sun',
        let fragmentShader = `uniform float time;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        varying vec2 texCoord;
        void main( void ) {
           vec4 noise = texture2D( texture1, texCoord );
           vec2 T1 = texCoord + vec2( 1.5, -1.5 ) * time  * 0.01;
           vec2 T2 = texCoord + vec2( -0.5, 2.0 ) * time *  0.01;
           T1.x -= noise.r * 2.0;
           T1.y += noise.g * 4.0;
           T2.x += noise.g * 0.2;
           T2.y += noise.b * 0.2;
           float p = texture2D( texture1, T1 * 2.0 ).a + 0.3;
           vec4 color = texture2D( texture2, T2 );
           vec4 temp = color * 3.0 * ( vec4( p + 0.1, p - 0.2, p + 0.5, p + 0.5) ) + ( color * color);

           gl_FragColor = temp;
        }`;
        let vertexShader = `varying vec2 texCoord;
        void main() {
            texCoord = uv;
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
            gl_Position = projectionMatrix * mvPosition;
        }`;

        let loader = new THREE.TextureLoader(),
          textureSun1 = loader.load(metadata.urls.sun.atmosphereMaterial),
          textureSun2 = loader.load(metadata.urls.sun.surfaceMaterial);
        uniforms = {
          time: { type: "f", value: 1.0 },
          texture1: {
            type: "t",
            value: 0,
            texture: textureSun1,
          },
          texture2: {
            type: "t",
            value: textureSun2,
          },
        };

        let material = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
        }),
          geometry = new THREE.SphereGeometry(25, 64, 64);
        sun = new THREE.Mesh(geometry, material);
        sun.position.setX(100);
        scene.add(sun);
      }

      //     planets
      let createPlanet = function (name, radius, orbitRadius) {
        // create planet
        let loader = new THREE.TextureLoader(),
          texture = loader.load(MEDIA_PREFIX + name + ".jpeg"),
          geometry = new THREE.SphereGeometry(radius, 32, 16),
          material = new THREE.MeshLambertMaterial({ map: texture }),
          planet = new THREE.Mesh(geometry, material);

        // saturn rings
        if (name == "saturn") {
          for (let i = 0; i < saturnRings.length; i++) {
            let ringGeometry = new THREE.RingGeometry(
              i / 4 + 6.5,
              i / 4 + 6.75,
              32
            ),
              ringMaterial = new THREE.MeshBasicMaterial({
                color: saturnRings[i],
                side: THREE.DoubleSide,
              }),
              ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2;
            planet.add(ring);
          }
        }
        scene.add(planet);

        // planet camera and controls
        let camera = new THREE.PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          0.01,
          1000
        );
        camera.position.set(0, 100, 175);
        let controls = new OrbitControls(camera, renderer.domElement);
        controls.maxDistance = 400;
        controls.minDistance = 80;
        controls.enablePan = false;

        // store planet
        planetNodes.push({
          planet: planet,
          camera: camera,
          controls: controls,
          name: name,
        });

        // create planet orbit line
        let shape = new THREE.Shape();
        shape.moveTo(orbitRadius, 0);
        shape.absarc(0, 0, orbitRadius, 0, 2 * Math.PI, false);

        let spacedPoints = shape.getSpacedPoints(128);

        let orbitGeometry = new THREE.BufferGeometry().setFromPoints(
          spacedPoints
        );
        orbitGeometry.rotateX(-1.5707);

        let orbitMaterial = new THREE.LineBasicMaterial({
          color: "#5C5680",
        });

        let orbit = new THREE.Line(orbitGeometry, orbitMaterial);
        orbit.position.x = 100;
        scene.add(orbit);
        orbits.push(orbit);
      };

      for (let [name, properties] of Object.entries(planets)) {
        createPlanet(name, properties.radius, properties.orbitRadius);
      }    

      currentNode = planetNodes[5];
      activeCamera = camera;
    }

    function animate() {
      // move and rotate planets
      timestamp = Date.now() * 0.0001;
      planetNodes.forEach(function ({ planet, name }) {
        planet.position.x =
          100 +
          Math.cos(timestamp * planets[name].speed) * planets[name].orbitRadius;
        planet.position.z =
          Math.sin(timestamp * planets[name].speed) * planets[name].orbitRadius;
        planet.rotation.y += planets[name].rotationSpeed;
      });

      // meteor.position.z = Math.sin(timestamp);
      sun.rotation.y += 0.001;

      // update planet controls
      const currentObjectPosition = new THREE.Vector3();
      currentNode.planet.getWorldPosition(currentObjectPosition);
      currentNode.planet.getWorldPosition(currentNode.controls.target);
      const cameraOffset = new THREE.Vector3(
        camera.position.x,
        camera.position.y,
        camera.position.z
      );

      satellite.rotation.x = 0.005;
      satellite.rotation.y -= 0.008;
      satellite.rotation.z += 0.007;

      satellite2.rotation.x -= 0.005;
      satellite2.rotation.y = 0.008;
      satellite2.rotation.z += 0.007;

      satellite3.rotation.x += 0.005;
      satellite3.rotation.y -= 0.008;
      satellite3.rotation.z += 0.007;

      currentNode.camera.position.copy(currentObjectPosition).add(cameraOffset);
      currentNode.controls.update();

      controls.update();
      renderer.render(scene, activeCamera);
      requestAnimationFrame(animate);
    }

    // resize
    window.addEventListener("resize", () => {
      clearTimeout(timeout_Debounce);
      timeout_Debounce = setTimeout(onWindowResize, 80);
    });
    function onWindowResize() {
      camera.aspect = container?.clientWidth / container?.clientHeight;
      camera.updateProjectionMatrix();

      planetNodes.forEach((planetNode) => {
        planetNode.camera.aspect = container
          ? container?.clientWidth / container?.clientHeight
          : 1;
        planetNode.camera.updateProjectionMatrix();
      });

      renderer.setSize(container?.clientWidth, container?.clientHeight);
    }
  }, []);
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS && router.pathname !== "/") {
      document.getElementById("bg_video") !== null && document.getElementById("bg_video").remove();
      document.getElementById("bg") !== null && document.getElementById("bg").appendChild(document.getElementById("bg_image"));
      setLoader(false)
    } else {
      document.getElementById("bg_image") !== null && document.getElementById("bg_image").remove();
      const video = document.getElementById("bg_video")
      video?.addEventListener("loadeddata", () => {
        setLoader(false);
      });
    }
  },)



  return (
    <>
      {router.pathname === "/" && (
        <div
          id="canvas-container"
          ref={bgRef}
          style={{
            objectFit: "cover",
            height: "100vh",
            width: "100vw",
            position: "fixed",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
        </div>
      )}
      {loader && router.pathname !=="/" && <Loader />}
      <div
        className={`min-h-screen flex flex-col styles.gradientClass   ${router.pathname === "/" ? "" : ""
          }`}
      >
        <Header />
        <div
          className={`flex-1  ${router.pathname === "/" ? "" : "background"}`}
        >
          {router.pathname !== "/" && (
            <div
              id="bg"
              className="fixed bottom-0 left-0 right-0 min-w-full min-h-full"
              style={{
                zIndex: -1,
                height: "100vh",
                width: "100%",
              }}
            >
              <video
                id="bg_video"
                style={{
                  zIndex: -1,
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
                autoPlay
                loop
                muted
                controls={false}
                webkitPlaysinline={true}
                className={loader ? "hidden" : ""} 
              >
                <source src="Cart_bg.mp4" type="video/mp4" />
              </video>
              
              <img id="bg_image" src="space_bg.jpg" className="h-[100%] w-[100%] -z-1"/>
            </div>
          )}

          {children}
        </div>
        {router.pathname !== "/" && <Footer />}
      </div>
    </>
  );
};

export default Layout;
