'use client';
import {Canvas,useFrame} from '@react-three/fiber';
import {OrbitControls,Stars,Line,Html} from '@react-three/drei';
import {useEffect,useMemo,useRef,useState} from 'react';
import * as THREE from 'three';

function Earth(){
  const ref=useRef<any>(null);
  const points=useMemo(()=>Array.from({length:38},(_,i)=>{
    const a=i*.74;
    const lat=-.7+(i%8)*.2;
    return [Math.cos(a)*Math.cos(lat)*1.52,Math.sin(lat)*1.52,Math.sin(a)*Math.cos(lat)*1.52] as [number,number,number];
  }),[]);
  useFrame((_,d)=>{if(ref.current)ref.current.rotation.y+=d*.055});
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1.5,48,48]}/>
        <meshStandardMaterial color="#0A2A5E" emissive="#0A2A5E" emissiveIntensity={0.6} roughness={0.65} metalness={0.25}/>
      </mesh>
      <mesh>
        <sphereGeometry args={[1.505,48,48]}/>
        <meshBasicMaterial color="#1F3A93" wireframe transparent opacity={0.3}/>
      </mesh>
      {points.map((p,i)=>(
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.035+(i%3)*0.009,8,8]}/>
          <meshBasicMaterial color={i%3===0?'#138808':'#FF9933'}/>
        </mesh>
      ))}
      <Line points={[[0,0,1.54],[.75,.45,1.25],[1.15,.15,.62]]} color="#FF9933" lineWidth={1.2} transparent opacity={0.8}/>
      <Line points={[[0,0,-1.54],[-.85,.4,-1.1],[-1.25,.1,-.5]]} color="#138808" lineWidth={1.2} transparent opacity={0.8}/>
    </group>
  );
}

export default function Globe(){
  const [reduced,setReduced]=useState(true);
  useEffect(()=>{
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas=document.createElement('canvas');
    const webgl=Boolean(canvas.getContext('webgl')||canvas.getContext('experimental-webgl'));
    setReduced(motion||!webgl);
  },[]);

  if(reduced) {
    return (
      <div className="glass grid-bg" style={{height:420,borderRadius:28,display:'grid',placeItems:'center',position:'relative',overflow:'hidden'}}>
        <div style={{width:245,height:245,borderRadius:'50%',border:'1px solid rgba(255,153,51,.55)',boxShadow:'0 0 90px rgba(255,153,51,.2),inset -28px -20px 55px rgba(31,58,147,.35)'}}/>
        <span style={{position:'absolute',bottom:28,left:28}} className="muted">Static intelligence view · reduced motion or WebGL fallback</span>
      </div>
    );
  }

  return (
    <div style={{height:420,borderRadius:28,overflow:'hidden',background:'radial-gradient(circle at 50% 40%,rgba(31,58,147,.45),transparent 48%),#0A2A5E'}}>
      <Canvas camera={{position:[0,0,5],fov:42}}>
        <ambientLight intensity={0.65}/>
        <pointLight position={[4,4,4]} intensity={5} color="#FF9933"/>
        <pointLight position={[-4,-2,2]} intensity={3} color="#1F3A93"/>
        <Stars radius={40} depth={20} count={1000} factor={2} saturation={0.2} fade/>
        <Earth/>
        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.25} minDistance={3.2} maxDistance={7}/>
        <Html position={[-2.8,-1.35,0]}>
          <div className="eyebrow" style={{whiteSpace:'nowrap',color:'#FF9933'}}>Live land intelligence · 28 layers</div>
        </Html>
      </Canvas>
    </div>
  );
}
