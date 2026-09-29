'use client';
import {useEffect,useRef,useState} from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {GeoJsonLayer,ScatterplotLayer} from '@deck.gl/layers';
import {MapboxOverlay} from '@deck.gl/mapbox';

const layers=['Land Use','Climate Impact','Urban Growth','Land Disputes','Infrastructure','Policy Impact'];
type Level='state'|'district';
const hotspots:[[number,number],[number,number],[number,number],[number,number]]=[[78.48,17.38],[91.74,26.14],[73.85,18.52],[75.78,26.91]];

export default function MapView(){
  const el=useRef<HTMLDivElement>(null);
  const overlay=useRef<MapboxOverlay|null>(null);
  const [year,setYear]=useState(2024);
  const [active,setActive]=useState('Land Use');
  const [compare,setCompare]=useState(false);
  const [swipe,setSwipe]=useState(false);
  const [swipePos,setSwipePos]=useState(52);
  const [level,setLevel]=useState<Level>('state');
  const [selected,setSelected]=useState('India');

  const colorFor=(feature:any,targetYear:number,alpha=1):[number,number,number,number]=>{
    const base=(Number(feature?.properties?.ID_1||feature?.properties?.ID_2||0)*13+targetYear)%100;
    const a=Math.min(190,70+base)*alpha;
    if(active==='Climate Impact')return [255,153,51,a]; /* saffron */
    if(active==='Land Disputes')return [255,90,90,a]; /* danger red */
    if(active==='Urban Growth')return [31,58,147,a]; /* navy */
    if(active==='Infrastructure')return [19,136,8,a]; /* green */
    if(active==='Policy Impact')return [255,153,51,a]; /* saffron */
    return [31,58,147,a]; /* default navy */
  };

  const updateLayers=()=>{
    if(!overlay.current)return;
    const data=level==='state'?'/data/india-states.geojson':'/data/india-districts.geojson';
    const beforeYear=Math.max(2016,year-4);
    const click=(info:any)=>{
      if(info.object){
        const p=info.object.properties||{};
        setSelected(p.NAME_2||p.NAME_1||'Selected geography');
        if(level==='state')setLevel('district');
      }
    };
    const current=new GeoJsonLayer({
      id:'india-boundaries-current',
      data,
      filled:true,
      stroked:true,
      pickable:true,
      autoHighlight:true,
      getFillColor:(f:any)=>colorFor(f,year),
      getLineColor:[255,255,255,180],
      lineWidthMinPixels:1,
      getLineWidth:1,
      onClick:click
    });
    const comparison=compare?new GeoJsonLayer({
      id:'india-boundaries-before',
      data,
      filled:true,
      stroked:false,
      pickable:false,
      getFillColor:(f:any)=>colorFor(f,beforeYear,0.35),
      getLineColor:[255,153,51,120],
      lineWidthMinPixels:1,
      getLineWidth:1
    }):null;
    const points=new ScatterplotLayer({
      id:'signal-hotspots',
      data:hotspots,
      getPosition:(d:any)=>d,
      getRadius:45000,
      getFillColor:active==='Climate Impact'?[255,90,90,220]:[255,153,51,220],
      radiusMinPixels:5,
      radiusMaxPixels:22
    });
    overlay.current.setProps({layers:comparison?[comparison,current,points]:[current,points]});
  };

  useEffect(()=>{
    if(!el.current)return;
    const m=new maplibregl.Map({
      container:el.current,
      style:'https://demotiles.maplibre.org/style.json',
      center:[78.96,21.1],
      zoom:3.9,
      attributionControl:false
    });
    m.addControl(new maplibregl.NavigationControl(),'top-right');
    const o=new MapboxOverlay({interleaved:true,layers:[]});
    overlay.current=o;
    m.addControl(o as any);
    return()=>{overlay.current=null;m.remove()};
  },[]);

  useEffect(()=>{updateLayers()},[active,year,level,compare]);

  return (
    <div className="glass" style={{position:'relative',overflow:'hidden',minHeight:560,borderRadius:24}}>
      <div ref={el} style={{position:'absolute',inset:0}}/>
      {swipe&&(
        <>
          <div aria-hidden="true" style={{position:'absolute',top:0,bottom:0,left:`${swipePos}%`,width:3,background:'#FF9933',boxShadow:'0 0 18px rgba(255,153,51,.9)',zIndex:3,pointerEvents:'none'}}/>
          <div style={{position:'absolute',top:78,left:`calc(${swipePos}% - 54px)`,zIndex:4,background:'rgba(10,42,94,.92)',color:'#FF9933',padding:'5px 7px',borderRadius:6,fontSize:9,fontWeight:800}}>
            BEFORE / AFTER
          </div>
          <input aria-label="Swipe comparison position" type="range" min="20" max="80" value={swipePos} onChange={e=>setSwipePos(+e.target.value)} style={{position:'absolute',bottom:112,left:'25%',width:'50%',zIndex:4,accentColor:'#FF9933'}}/>
        </>
      )}
      <div style={{position:'absolute',top:16,left:16,right:16,display:'flex',gap:8,flexWrap:'wrap',zIndex:2}}>
        {layers.map(x=>(
          <button key={x} onClick={()=>setActive(x)} className="focus-ring" style={{background:active===x?'#FF9933':'rgba(10,42,94,.85)',color:active===x?'#0A2A5E':'#FFFFFF',border:'1px solid rgba(255,255,255,.22)',borderRadius:999,padding:'8px 11px',fontSize:11,fontWeight:800}}>
            {x}
          </button>
        ))}
        <button onClick={()=>setSwipe(v=>!v)} className="focus-ring" style={{background:swipe?'#FF9933':'rgba(10,42,94,.85)',color:swipe?'#0A2A5E':'#FFFFFF',border:'1px solid rgba(255,255,255,.22)',borderRadius:999,padding:'8px 11px',fontSize:11,fontWeight:800}}>
          {swipe?'Swipe on':'Swipe mode'}
        </button>
      </div>
      <div style={{position:'absolute',top:72,left:16,zIndex:2,display:'flex',gap:6}}>
        {(['state','district'] as Level[]).map(x=>(
          <button key={x} onClick={()=>setLevel(x)} className="focus-ring" style={{background:level===x?'#1F3A93':'rgba(10,42,94,.85)',color:'#FFFFFF',border:'1px solid rgba(255,255,255,.22)',borderRadius:8,padding:'7px 10px',fontSize:10,fontWeight:800}}>
            {x==='state'?'State boundaries':'District boundaries'}
          </button>
        ))}
      </div>
      <div className="glass" style={{position:'absolute',bottom:18,left:18,right:18,padding:14,borderRadius:18,zIndex:2}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
          <div>
            <div className="eyebrow">{active} · {year} · {level}</div>
            <div className="muted" style={{fontSize:12,marginTop:4}}>Open India {level} GeoJSON · deck.gl overlay · selected {selected}{compare?` · before ${Math.max(2016,year-4)} vs ${year}`:''}{swipe?' · swipe divider active':''}</div>
          </div>
          <button onClick={()=>setCompare(v=>!v)} className="focus-ring" style={{background:compare?'rgba(255,153,51,.25)':'rgba(31,58,147,.4)',color:compare?'#FF9933':'#FFFFFF',border:compare?'1px solid rgba(255,153,51,.5)':'1px solid rgba(255,255,255,.25)',padding:'8px 12px',borderRadius:10,fontWeight:800}}>
            {compare?'Exit compare':'Compare before / after'}
          </button>
        </div>
        <input aria-label="Map year" type="range" min="2016" max="2024" value={year} onChange={e=>setYear(+e.target.value)} style={{width:'100%',accentColor:'#FF9933',marginTop:12}}/>
        <div className="muted" style={{display:'flex',justifyContent:'space-between',fontSize:10}}>
          <span>2016</span>
          <span>Urban growth year slider · click a boundary to drill down</span>
          <span>2024</span>
        </div>
      </div>
    </div>
  );
}
