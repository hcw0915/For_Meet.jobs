import React from 'react';
import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

import EarthDayMap from '../../assets/textures/8k_earth_daymap.jpg';
import EarthNormalMap from '../../assets/textures/8k_earth_normal_map.jpg';
import EarthSpecularMap from '../../assets/textures/8k_earth_specular_map.jpg';
import EarthCloudsMap from '../../assets/textures/8k_earth_clouds.jpg';
import { PointLight, TextureLoader } from 'three';

export const Earth = (props) => {
  // useloader -> 加載靜態資料
  // syntax ->  [ ] = useLoader("不同加載器", [放 url或是, 或外部 import 之後放入])
  // https://docs.pmnd.rs/react-three-fiber/api/hooks
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );

  // useRef()控制 綁定對應的 components。
  const earthRef = useRef();
  const cloudsRef = useRef();

  // useFrame -> 每一幀動作都會與放入內部的函數、狀況、變化
  // syntax ->  useFrame() => { callback, updating control }
  // others -> useEffect 針對初次渲染後，對寫入 Effect的動作做渲染
  //           useFrame  針對每一幀，對寫入 Frame的動作做渲染
  // https://docs.pmnd.rs/react-three-fiber/api/hooks

  // clock -> THREE 裡的時間跟蹤，具有許多屬性、方法可以使用。
  // https://threejs.org/docs/index.html#api/zh/core/Clock
  useFrame(({ clock }) => {
    /**
     *  useFrame 綁定 clock :
     * 每一幀，都會隨著時間變化，使經過 useRef綁定的物件的值
     * 並依照時間變化，設定旋轉、移動位置而變化。
     */
    const elapsedTime = clock.getElapsedTime();
    earthRef.current.rotation.y = elapsedTime / 9;
    // earthRef.current.rotation.x = elapsedTime / 5;
    cloudsRef.current.rotation.y = elapsedTime / 8;
  });

  return (
    <>
      {/*! 加入光源 */}

      {/* ambientLight 環境光源 (繼承 Light、Object3D)
        color -> 光的顏色 / rgb數值 / default => 白光(0xffffff)
        intensity -> 光照強度 / default => 1
        https://threejs.org/docs/index.html?q=am#api/zh/lights/AmbientLight
      */}
      <ambientLight intensity={1} />

      {/* pointLight 點光源 (繼承 Light、Object3D) => 可用於投射陰影
        基本與 ambientLight相通屬性 而 position是繼承自 Object3D 公共屬性
      */}

      <pointLight color="#f6f3ea" position={[2, 0.3, 6]} intensity={1.5} />

      {/* Star
      radius -> 半徑 
      depth -> 深度 不太理解...
      count -> 星星個數
      factor -> 控制星星亮閃因子 越大越大顆
      saturation -> 飽和度 不太理解
      fade -> 褪色，這裡表示星星黯淡狀況
      */}
      <Stars
        radius={100}
        depth={60}
        count={10000}
        factor={6}
        saturation={0}
        fade={true}
      />
      {/* Mesh網格物件_ 由球體 sphereGeometry + meshPhongMaterial(模擬鏡面高光的光澤表面)
        sphereGeometry(球體)
        args -> 

        meshPhongMaterial(高光材質)
        map -> 要運用的圖片(不能直接引用要經過 loader)
        
        transparent -> 要先設定才可以設定opacity(先開啟功能在選擇強度)
        opacity -> 透明度 0.0表示完全透明，1.0表示完全不透明。
        depthWrite -> 選染此材質深度緩衝區影響
        side -> 設定渲染單/雙面 預設 THREE.FrontSide => 要導入 THREE
      */}
      <mesh ref={cloudsRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1.006, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.4}
          // depthWrite={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1, 32, 32]} />
        {/* specularMap 高光貼圖 */}
        <meshPhongMaterial specularMap={specularMap} />
        {/* meshStandardMaterial 標準材質
          normalMap -> 基礎貼圖
          metalness -> 金屬程度
          roughness -> 粗糙程度
        */}
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.7}
        />
        {/* OrbitControls 軌道控制器
          Zoom -> 縮放
          Pan -> 平移 (使用右鍵 可以平移)
          Rotate -> 旋轉
        */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={1}
        />
      </mesh>
    </>
  );
};
