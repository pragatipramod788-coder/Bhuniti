'use client';
import {useEffect,useRef,useState} from 'react';
import {FileUp,MapPin,Table2,Upload,X} from 'lucide-react';
import Papa from 'papaparse';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

type GeoPreview=GeoJSON.FeatureCollection;

export default function UploadAsset(){
  const input=useRef<HTMLInputElement>(null);
  const mapEl=useRef<HTMLDivElement>(null);
  const mapRef=useRef<maplibregl.Map|null>(null);
  const [file,setFile]=useState<File|null>(null);
  const [rows,setRows]=useState<string[][]>([]);
  const [geo,setGeo]=useState<GeoPreview|null>(null);
  const [error,setError]=useState('');

  useEffect(()=>{
    if(!geo||!mapEl.current)return;
    const m=new maplibregl.Map({
      container:mapEl.current,
      style:'https://demotiles.maplibre.org/style.json',
      center:[78.96,21.1],
      zoom:4,
      attributionControl:false
    });
    mapRef.current=m;
    m.on('load',()=>{
      m.addSource('upload-geojson',{type:'geojson',data:geo as any});
      m.addLayer({id:'upload-fill',type:'fill',source:'upload-geojson',paint:{'fill-color':'#FF9933','fill-opacity':0.35}});
      m.addLayer({id:'upload-line',type:'line',source:'upload-geojson',paint:{'line-color':'#1F3A93','line-width':2}});
    });
    return()=>{mapRef.current=null;m.remove()};
  },[geo]);

  const onFile=async(e:React.ChangeEvent<HTMLInputElement>)=>{
    const f=e.target.files?.[0];
    if(!f)return;
    setFile(f);
    setError('');
    setRows([]);
    setGeo(null);
    if(f.size>20*1024*1024){
      setError('Files must be 20 MB or smaller.');
      return;
    }
    try{
      const text=await f.text();
      const name=f.name.toLowerCase();
      if(name.endsWith('.csv')||f.type.includes('csv')){
        const parsed=Papa.parse<string[]>(text,{skipEmptyLines:true}).data;
        setRows(parsed.slice(0,9));
      }else if(name.endsWith('.geojson')||name.endsWith('.json')||f.type.includes('geo')){
        const parsed=JSON.parse(text);
        const featureCollection=parsed.type==='FeatureCollection'?parsed:parsed.type==='Feature'?{type:'FeatureCollection',features:[parsed]}:null;
        if(!featureCollection)throw new Error('Expected a GeoJSON Feature or FeatureCollection.');
        setGeo(featureCollection);
      }else if(!/pdf|tiff|tif/i.test(f.type+name))throw new Error('Upload CSV, GeoJSON, GeoTIFF or PDF.');
    }catch(err){
      setError(err instanceof Error?err.message:'Could not parse this file');
    }
  };

  return (
    <>
      <button onClick={()=>input.current?.click()} className="focus-ring" style={{background:'#FF9933',color:'#0A2A5E',border:0,borderRadius:10,padding:'11px 14px',fontWeight:900}}>
        <Upload size={14} style={{verticalAlign:'middle'}}/> Upload asset
      </button>
      <input ref={input} type="file" accept=".csv,.geojson,.json,.tif,.tiff,.pdf" onChange={onFile} hidden/>
      {file&&(
        <div className="glass" style={{position:'fixed',right:26,top:88,zIndex:25,width:'min(520px,calc(100% - 40px))',padding:16,borderRadius:16}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div className="eyebrow">Upload indexed · {file.type||'file'}</div>
              <strong style={{fontSize:13}}>{file.name}</strong>
            </div>
            <button onClick={()=>{setFile(null);setRows([]);setGeo(null);setError('')}} style={{background:'transparent',border:0,color:'#9bb2c0'}}>
              <X size={16}/>
            </button>
          </div>
          {error?(
            <p style={{color:'#FF5A5A',fontSize:11}}>{error}</p>
          ):rows.length>0?(
            <div style={{marginTop:12,overflow:'auto'}}>
              <div style={{display:'flex',gap:6,alignItems:'center',color:'#FF9933',fontSize:11,marginBottom:6}}>
                <Table2 size={14}/> CSV table preview · {Math.max(0,rows.length-1)} sampled rows
              </div>
              <table style={{width:'100%',fontSize:10,borderCollapse:'collapse'}}>
                <tbody>
                  {rows.map((r,i)=>(
                    <tr key={i}>
                      {r.map((c,j)=>(
                        <td key={j} style={{padding:5,border:'1px solid var(--line)',fontWeight:i===0?800:400}}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ):geo?(
            <div style={{marginTop:12}}>
              <div style={{display:'flex',gap:6,alignItems:'center',color:'#FF9933',fontSize:11,marginBottom:6}}>
                <MapPin size={14}/> GeoJSON MapLibre preview · {geo.features.length} feature(s)
              </div>
              <div ref={mapEl} style={{height:230,borderRadius:12,overflow:'hidden',border:'1px solid var(--line)'}}/>
            </div>
          ):(
            <div style={{marginTop:12,padding:14,borderRadius:12,background:'rgba(255,153,51,.08)',fontSize:11}}>
              <FileUp size={14} color="#FF9933" style={{verticalAlign:'middle'}}/> Metadata indexed; CSV and GeoJSON previews are available for structured uploads.
            </div>
          )}
          <div style={{display:'flex',justifyContent:'space-between',marginTop:12,fontSize:10}}>
            <span className="muted">Provenance: Aarav Mehta · just now</span>
            <span style={{color:'#138808',fontWeight:700}}>Ready to share</span>
          </div>
        </div>
      )}
    </>
  );
}
