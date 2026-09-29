'use client';
import dynamic from 'next/dynamic';
import {useEffect,useMemo,useState} from 'react';
import Link from 'next/link';
import {AlertTriangle,ArrowDownRight,ArrowUpRight,BarChart3,Check,ChevronRight,Database,Download,FileText,Filter,Info,Mic,Plus,RefreshCw,Save,Search,Send,ShieldCheck,Sparkles,Upload,Users,Workflow,X} from 'lucide-react';
import AppShell from './AppShell';
import {repoItems,projects,risks,activity} from '../data/seed';
import {DisputeChart,LandUseChart,TrendChart} from './Charts';
import UploadAsset from './UploadAsset';
import {useLanguage} from '../context/LanguageContext';

const MapView=dynamic(()=>import('./MapView'),{ssr:false,loading:()=> (
  <div className="glass" style={{height:560,borderRadius:24,display:'grid',placeItems:'center'}}>
    <span className="eyebrow">Loading MapLibre intelligence layers…</span>
  </div>
)});

function Header({kicker,title,desc,action}:{kicker:string;title:string;desc:string;action?:React.ReactNode}){
  return (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:20,flexWrap:'wrap',marginBottom:22}}>
      <div>
        <div className="eyebrow">{kicker}</div>
        <h1 style={{fontSize:'clamp(30px,4vw,48px)',letterSpacing:'-.055em',margin:'9px 0 8px'}}>{title}</h1>
        <p className="muted" style={{margin:0,maxWidth:680,lineHeight:1.6,fontSize:13}}>{desc}</p>
      </div>
      {action}
    </div>
  );
}

function Stat({label,value,delta,down=false}:{label:string;value:string;delta:string;down?:boolean}){
  const {t}=useLanguage();
  return (
    <div className="glass" style={{padding:17,borderRadius:16}}>
      <div className="muted" style={{fontSize:11}}>{label}</div>
      <div className="metric" style={{fontSize:28,fontWeight:900,margin:'8px 0'}}>{value}</div>
      <div style={{fontSize:11,color:down?'#FF5A5A':'#138808',fontWeight:700,display:'flex',alignItems:'center',gap:3}}>
        {down?<ArrowDownRight size={13}/>:<ArrowUpRight size={13}/>} {delta} <span className="muted" style={{fontWeight:400,marginLeft:4}}>{t('dash.vsLast')}</span>
      </div>
    </div>
  );
}

function Dashboard(){
  const {t}=useLanguage();
  return (
    <>
      <Header
        kicker={t('dash.kicker')}
        title={t('dash.title')}
        desc={t('dash.desc')}
        action={
          <button className="focus-ring" onClick={()=>window.print()} style={{background:'var(--btn-bg)',color:'var(--btn-text)',border:0,borderRadius:10,padding:'11px 14px',fontWeight:900}}>
            <Download size={14} style={{verticalAlign:'middle'}}/> {t('dash.export')}
          </button>
        }
      />
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
        <Stat label={t('dash.stat1')} value="12.4M" delta="18.6%"/>
        <Stat label={t('dash.stat2')} value="2,840" delta="8.2%" down/>
        <Stat label={t('dash.stat3')} value="87.4" delta="4.9%"/>
        <Stat label={t('dash.stat4')} value="148" delta="12.1%"/>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1.35fr 1fr',gap:14,marginTop:14}}>
        <section className="glass" style={{padding:18,borderRadius:18}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <div>
              <div className="eyebrow">{t('dash.disputeSignals')}</div>
              <h3 style={{margin:'5px 0 0'}}>{t('dash.caseTrajectory')}</h3>
            </div>
            <span style={{fontSize:11,color:'#138808',fontWeight:700}}>{t('dash.sinceJan')}</span>
          </div>
          <DisputeChart/>
        </section>
        <section className="glass" style={{padding:18,borderRadius:18}}>
          <div className="eyebrow">{t('dash.needsAttention')}</div>
          <h3 style={{margin:'5px 0 14px'}}>{t('dash.earlyWarning')}</h3>
          {risks.map(r=>(
            <Link href="/early-warning" key={r.district} style={{display:'flex',alignItems:'center',gap:10,padding:'11px 0',borderBottom:'1px solid var(--line)'}}>
              <span style={{width:8,height:8,borderRadius:'50%',background:r.color==='critical'?'#FF5A5A':r.color==='high'?'#FF9933':'#138808'}}/>
              <span style={{fontSize:12,flex:1}}>
                {r.district}
                <small className="muted" style={{display:'block',marginTop:3}}>{r.reason}</small>
              </span>
              <strong style={{fontSize:13}}>{r.score}</strong>
              <ChevronRight size={14} color="#708999"/>
            </Link>
          ))}
        </section>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginTop:14}}>
        <section className="glass" style={{padding:18,borderRadius:18}}>
          <div className="eyebrow">{t('dash.landUse')}</div>
          <h3 style={{margin:'5px 0 12px'}}>{t('dash.urbanFootprint')}</h3>
          <LandUseChart/>
        </section>
        <section className="glass" style={{padding:18,borderRadius:18}}>
          <div className="eyebrow">{t('dash.activityFeed')}</div>
          <h3 style={{margin:'5px 0 10px'}}>{t('dash.acrossNetwork')}</h3>
          {activity.map(a=>(
            <div key={a.label} style={{display:'flex',gap:10,padding:'11px 0',borderBottom:'1px solid var(--line)'}}>
              <div style={{width:26,height:26,borderRadius:8,background:'rgba(255,153,51,.12)',display:'grid',placeItems:'center'}}>
                <Sparkles size={13} color="#FF9933"/>
              </div>
              <div style={{fontSize:12}}>
                {a.label}
                <div className="muted" style={{fontSize:10,marginTop:4}}>{a.meta}</div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

function Repository(){
  const {t}=useLanguage();
  const [q,setQ]=useState('');
  const [preview,setPreview]=useState<string|null>(null);
  const [voice,setVoice]=useState(false);
  const [voiceError,setVoiceError]=useState('');
  const [filtered,setFiltered]=useState(repoItems);

  useEffect(()=>{
    let live=true;
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then(r=>r.json())
      .then(data=>{if(live)setFiltered(data.results||[])})
      .catch(()=>{if(live)setFiltered(repoItems)});
    return()=>{live=false};
  },[q]);

  const startVoice=()=>{
    const S=(window as any).webkitSpeechRecognition||(window as any).SpeechRecognition;
    if(!S){
      setVoiceError('Voice search is not supported in this browser.');
      return;
    }
    setVoiceError('');
    const r=new S();
    r.onstart=()=>setVoice(true);
    r.onresult=(e:any)=>{setQ(e.results[0][0].transcript);setVoice(false)};
    r.onerror=()=>{setVoice(false);setVoiceError('Microphone permission was denied or unavailable.');};
    r.onend=()=>setVoice(false);
    r.start();
  };

  return (
    <>
      <Header
        kicker={t('repo.kicker')}
        title={t('repo.title')}
        desc={t('repo.desc')}
        action={<UploadAsset/>}
      />
      <div className="glass" style={{padding:12,borderRadius:16,display:'flex',gap:8,alignItems:'center',marginBottom:14}}>
        <Search size={16} color="var(--accent)"/>
        <input
          value={q}
          onChange={e=>setQ(e.target.value)}
          placeholder={t('repo.searchPlaceholder')}
          style={{flex:1,background:'transparent',border:0,outline:0,color:'var(--text)',fontSize:13}}
        />
        <button onClick={startVoice} aria-label="Start voice search" className="focus-ring" style={{background:voice?'rgba(255,153,51,.2)':'rgba(255,255,255,.05)',border:'1px solid var(--line)',color:voice?'#FF9933':'var(--muted)',borderRadius:8,padding:8}}>
          <Mic size={15}/>
        </button>
        <button className="focus-ring" aria-label="Filter results" style={{background:'rgba(255,255,255,.05)',border:'1px solid var(--line)',color:'var(--muted)',borderRadius:8,padding:8}}>
          <Filter size={15}/>
        </button>
      </div>
      {voiceError&&<div role="status" style={{color:'#FF9933',fontSize:11,marginBottom:10}}>{voiceError}</div>}
      <div style={{display:'flex',gap:8,marginBottom:14,flexWrap:'wrap'}}>
        {[t('repo.allFormats'),t('repo.papers'),t('repo.datasets'),t('repo.policies'),t('repo.legal'),'Maharashtra','Climate','2024'].map(x=>(
          <button key={x} onClick={()=>setQ(x===t('repo.allFormats')?'':x)} style={{fontSize:11,padding:'7px 10px',borderRadius:999,border:'1px solid var(--line)',color:'var(--muted)',background:'transparent'}}>
            {x}
          </button>
        ))}
      </div>
      <div className="glass" style={{borderRadius:18,overflow:'hidden'}}>
        {filtered.map(item=>(
          <div key={item.id} style={{padding:18,borderBottom:'1px solid var(--line)',display:'flex',gap:16,alignItems:'flex-start',flexWrap:'wrap'}}>
            <div style={{width:40,height:40,borderRadius:11,background:item.type==='Dataset'?'rgba(31,58,147,.16)':item.type==='Policy'?'rgba(255,153,51,.16)':'rgba(19,136,8,.14)',display:'grid',placeItems:'center'}}>
              {item.type==='Dataset'?<Database size={18} color="#1F3A93"/>:<FileText size={18} color="#FF9933"/>}
            </div>
            <div style={{flex:1,minWidth:230}}>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <span className="eyebrow" style={{fontSize:9}}>{item.type} · {item.format}</span>
                <span style={{fontSize:10,color:'#FF9933',fontWeight:700}}>{t('repo.evidence')} {item.evidence}</span>
              </div>
              <h3 style={{fontSize:15,margin:'6px 0'}}>{item.title}</h3>
              <p className="muted" style={{fontSize:12,lineHeight:1.5,margin:'0 0 8px'}}>{item.abstract}</p>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {item.tags.map(tTag=>(
                  <span key={tTag} style={{fontSize:10,color:'var(--muted)',background:'rgba(255,255,255,.05)',padding:'4px 7px',borderRadius:6}}>#{tTag}</span>
                ))}
              </div>
            </div>
            <div style={{textAlign:'right',fontSize:11}}>
              <div className="muted">{item.state} · {item.year}</div>
              <div className="muted" style={{margin:'5px 0 10px'}}>v{item.version.replace('v','')} · {item.uploader}</div>
              <button onClick={()=>setPreview(item.id)} className="focus-ring" style={{background:'rgba(255,153,51,.12)',color:'#FF9933',border:'1px solid rgba(255,153,51,.35)',borderRadius:8,padding:'7px 9px',fontSize:11,fontWeight:700}}>
                {t('repo.preview')}
              </button>
            </div>
          </div>
        ))}
      </div>
      {preview&&(
        <div onClick={()=>setPreview(null)} style={{position:'fixed',inset:0,zIndex:30,background:'rgba(10,42,94,.85)',display:'grid',placeItems:'center',padding:20}}>
          <div onClick={e=>e.stopPropagation()} className="glass" style={{width:'min(720px,100%)',padding:22,borderRadius:20}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
              <div>
                <div className="eyebrow">{t('repo.previewTitle')} {preview}</div>
                <h2 style={{margin:'8px 0'}}>{t('repo.sourceSchema')}</h2>
              </div>
              <button onClick={()=>setPreview(null)} style={{background:'transparent',border:0,color:'var(--muted)'}}>
                <X size={18}/>
              </button>
            </div>
            <div className="grid-bg" style={{height:220,borderRadius:14,border:'1px solid var(--line)',display:'grid',placeItems:'center',marginTop:14}}>
              <div style={{textAlign:'center'}}>
                <Database size={24} color="#FF9933"/>
                <p className="muted" style={{fontSize:12}}>Structured preview opens from the upload control above; this record retains source/version evidence metadata.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AI({kind}:{kind:'copilot'|'recommendations'|'search'}){
  const {t}=useLanguage();
  const [q,setQ]=useState('');
  const [answer,setAnswer]=useState('');
  const [citations,setCitations]=useState<string[]>([]);
  const [mode,setMode]=useState('');
  const [loading,setLoading]=useState(false);

  const ask=async()=>{
    setLoading(true);
    try{
      const res=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({kind,question:q})});
      const data=await res.json();
      setAnswer(data.answer||'No answer returned.');
      setCitations(data.citations||[]);
      setMode(data.mode||'');
    }finally{
      setLoading(false);
    }
  };

  const cited=useMemo(()=>citations.length?repoItems.filter(x=>citations.includes(x.id)):repoItems.slice(0,3),[citations]);

  return (
    <>
      <Header
        kicker={kind==='copilot'?t('ai.copilotKicker'):kind==='recommendations'?t('ai.recomKicker'):t('ai.searchKicker')}
        title={kind==='copilot'?t('ai.copilotTitle'):t('ai.engineTitle')}
        desc={t('ai.desc')}
      />
      <div style={{display:'grid',gridTemplateColumns:'1.15fr .85fr',gap:14}}>
        <section className="glass" style={{padding:20,borderRadius:18,minHeight:480}}>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:16}}>
            {[t('ai.q1'),t('ai.q2'),t('ai.q3')].map(x=>(
              <button key={x} onClick={()=>setQ(x)} style={{background:'rgba(255,153,51,.1)',border:'1px solid rgba(255,153,51,.28)',color:'#FF9933',borderRadius:999,padding:'8px 10px',fontSize:11,fontWeight:700}}>
                {x}
              </button>
            ))}
          </div>
          {answer?(
            <div className="fade-up">
              <div style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                <div style={{width:30,height:30,borderRadius:9,background:'rgba(255,153,51,.15)',display:'grid',placeItems:'center'}}>
                  <Sparkles size={15} color="#FF9933"/>
                </div>
                <div style={{fontSize:14,lineHeight:1.8,whiteSpace:'pre-wrap'}}>{answer}</div>
              </div>
              <div className="muted" style={{fontSize:10,marginTop:12}}>Response path: {mode||'seeded'}</div>
              <div style={{marginTop:16,paddingTop:14,borderTop:'1px solid var(--line)',display:'flex',gap:7,flexWrap:'wrap'}}>
                {cited.map(x=>(
                  <span key={x.id} style={{fontSize:10,color:'#FF9933',background:'rgba(255,153,51,.1)',padding:'6px 8px',borderRadius:7}}>
                    [{x.id}] {x.title.slice(0,42)}…
                  </span>
                ))}
              </div>
            </div>
          ):(
            <div style={{height:300,display:'grid',placeItems:'center',textAlign:'center'}}>
              <div>
                <Sparkles size={28} color="#FF9933"/>
                <h3>{t('ai.startQuestion')}</h3>
                <p className="muted" style={{fontSize:12}}>{t('ai.modelContext')}</p>
              </div>
            </div>
          )}
          <div style={{display:'flex',gap:8,marginTop:14}}>
            <input
              value={q}
              onChange={e=>setQ(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&ask()}
              placeholder={t('ai.inputPlaceholder')}
              className="focus-ring"
              style={{flex:1,background:'var(--panel2)',border:'1px solid var(--line)',borderRadius:10,padding:'12px 13px',color:'var(--text)'}}
            />
            <button onClick={ask} disabled={loading||!q} style={{background:'var(--btn-bg)',border:0,color:'var(--btn-text)',borderRadius:10,padding:'0 14px',fontWeight:900}}>
              {loading?<RefreshCw size={16}/>:<Send size={16}/>}
            </button>
          </div>
        </section>
        <section className="glass" style={{padding:20,borderRadius:18}}>
          <div className="eyebrow">{t('ai.howItWorks')}</div>
          <h3>{t('ai.transparent')}</h3>
          {[
            ['01',t('ai.step1Title'),t('ai.step1Desc')],
            ['02',t('ai.step2Title'),t('ai.step2Desc')],
            ['03',t('ai.step3Title'),t('ai.step3Desc')],
            ['04',t('ai.step4Title'),t('ai.step4Desc')]
          ].map(([n,tStep,dStep])=>(
            <div key={n} style={{display:'flex',gap:12,padding:'14px 0',borderBottom:'1px solid var(--line)'}}>
              <span style={{color:'#FF9933',fontWeight:900}}>{n}</span>
              <div>
                <strong style={{fontSize:13}}>{tStep}</strong>
                <p className="muted" style={{margin:'5px 0 0',fontSize:11,lineHeight:1.5}}>{dStep}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

function GIS(){
  const {t}=useLanguage();
  return (
    <>
      <Header
        kicker={t('gis.kicker')}
        title={t('gis.title')}
        desc={t('gis.desc')}
      />
      <MapView/>
    </>
  );
}

function Analytics(){
  const {t}=useLanguage();
  return (
    <>
      <Header
        kicker={t('dash.kicker')}
        title="Signals before they become crises."
        desc="Trend, anomaly and evidence views connect the shape of land change to the policy choices around it."
        action={
          <button onClick={()=>window.print()} style={{background:'var(--btn-bg)',border:0,color:'var(--btn-text)',borderRadius:10,padding:'11px 14px',fontWeight:900}}>
            <Download size={14} style={{verticalAlign:'middle'}}/> {t('dash.export')}
          </button>
        }
      />
      <div style={{display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:14}}>
        <section className="glass" style={{padding:18,borderRadius:18}}>
          <div className="eyebrow">{t('dash.disputeSignals')}</div>
          <h3 style={{margin:'5px 0 12px'}}>Cases are falling — unevenly</h3>
          <DisputeChart/>
        </section>
        <section className="glass" style={{padding:18,borderRadius:18}}>
          <div className="eyebrow">{t('dash.landUse')}</div>
          <h3 style={{margin:'5px 0 12px'}}>Conversion pressure by year</h3>
          <TrendChart/>
        </section>
      </div>
      <section className="glass" style={{padding:18,borderRadius:18,marginTop:14}}>
        <div className="eyebrow">Explainable risk ranking</div>
        <h3 style={{margin:'5px 0 12px'}}>Districts to watch</h3>
        {risks.map(r=>(
          <div key={r.district} style={{display:'grid',gridTemplateColumns:'1.3fr 1fr 60px',gap:12,alignItems:'center',padding:'12px 0',borderBottom:'1px solid var(--line)',fontSize:12}}>
            <span>
              {r.district}
              <small className="muted" style={{display:'block',marginTop:4}}>{r.reason}</small>
            </span>
            <div style={{height:8,background:'rgba(255,255,255,.08)',borderRadius:99}}>
              <div style={{width:`${r.score}%`,height:'100%',background:r.score>85?'#FF5A5A':r.score>75?'#FF9933':'#138808',borderRadius:99}}/>
            </div>
            <strong>{r.score}</strong>
          </div>
        ))}
      </section>
    </>
  );
}

function Simulation(){
  const {t}=useLanguage();
  const [digit,setDigit]=useState(68);
  const [boundary,setBoundary]=useState(42);
  const [saved,setSaved]=useState(false);
  const [outcomes,setOutcomes]=useState({disputePressure:77,revenueIndex:92,conversionRisk:58,resilience:72,confidence:8.4});

  useEffect(()=>{
    let live=true;
    fetch('/api/simulation',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({digitisation:digit,boundary})})
      .then(r=>r.json())
      .then(data=>{if(live)setOutcomes(data)});
    return()=>{live=false};
  },[digit,boundary]);

  const save=async()=>{
    await fetch('/api/projects',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'scenario',digitisation:digit,boundary,outcomes})});
    setSaved(true);
  };

  return (
    <>
      <Header
        kicker={t('sim.kicker')}
        title={t('sim.title')}
        desc={t('sim.desc')}
        action={
          <button onClick={save} style={{background:saved?'rgba(19,136,8,.18)':varBtnBg(),border:0,color:saved?'#138808':varBtnText(),borderRadius:10,padding:'11px 14px',fontWeight:900}}>
            {saved?<><Check size={14} style={{verticalAlign:'middle'}}/> {t('sim.saved')}</>:<><Save size={14} style={{verticalAlign:'middle'}}/> {t('sim.save')}</>}
          </button>
        }
      />
      <div style={{display:'grid',gridTemplateColumns:'300px 1fr',gap:14}}>
        <section className="glass" style={{padding:20,borderRadius:18}}>
          <div className="eyebrow">{t('sim.controls')}</div>
          <h3>{t('sim.digitalTransition')}</h3>
          <label className="muted" style={{fontSize:11}}>{t('sim.digitisationRate')} <strong style={{color:'var(--text)',float:'right'}}>{digit}%</strong></label>
          <input type="range" min="20" max="100" value={digit} onChange={e=>setDigit(+e.target.value)} style={{width:'100%',accentColor:'#FF9933',margin:'12px 0 22px'}}/>
          <label className="muted" style={{fontSize:11}}>{t('sim.boundaryStrictness')} <strong style={{color:'var(--text)',float:'right'}}>{boundary}%</strong></label>
          <input type="range" min="10" max="90" value={boundary} onChange={e=>setBoundary(+e.target.value)} style={{width:'100%',accentColor:'#1F3A93',margin:'12px 0 22px'}}/>
          <div style={{padding:12,borderRadius:12,background:'rgba(255,153,51,.08)',fontSize:11,lineHeight:1.6}}>
            <Info size={13} color="#FF9933" style={{verticalAlign:'middle'}}/> {t('sim.confidenceRange')} <strong>±{outcomes.confidence}%</strong><br/>{t('sim.basedOn')}
          </div>
        </section>
        <section className="glass" style={{padding:20,borderRadius:18}}>
          <div className="eyebrow">{t('sim.projectedOutcomes')}</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,margin:'16px 0'}}>
            <Stat label={t('sim.disputePressure')} value={`${outcomes.disputePressure}`} delta={t('sim.lowerBetter')} down/>
            <Stat label={t('sim.revenueIndex')} value={`${outcomes.revenueIndex}`} delta={t('sim.apiProjected')}/>
            <Stat label={t('sim.conversionRisk')} value={`${outcomes.conversionRisk}`} delta={t('sim.apiProjected')}/>
            <Stat label={t('sim.resilience')} value={`${outcomes.resilience}`} delta={t('sim.apiProjected')}/>
          </div>
          <div className="grid-bg" style={{height:260,borderRadius:16,display:'flex',alignItems:'flex-end',gap:10,padding:22}}>
            {[54,61,58,68,72,78,84].map((h,i)=>(
              <div key={i} style={{flex:1,height:`${Math.max(25,h+(digit-68)*.25-(boundary-42)*.1)}%`,background:`linear-gradient(180deg,${i>3?'#138808':'#FF9933'},rgba(31,58,147,.3))`,borderRadius:'6px 6px 2px 2px',boxShadow:'0 0 18px rgba(255,153,51,.15)'}}/>
            ))}
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'var(--muted)',marginTop:7}}>
            {[2024,2025,2026,2027,2028,2029,2030].map(x=><span key={x}>{x}</span>)}
          </div>
        </section>
      </div>
    </>
  );
}

function varBtnBg(){ return 'var(--btn-bg)'; }
function varBtnText(){ return 'var(--btn-text)'; }

function Projects(){
  const {t}=useLanguage();
  const [list,setList]=useState(projects);
  const [active,setActive]=useState(projects[0]);
  const [comment,setComment]=useState('');
  const [notes,setNotes]=useState<string[]>([]);
  const [tasks,setTasks]=useState([false,false,false]);

  const addWorkspace=()=>{
    const p={id:`p${list.length+1}`,name:'New evidence workspace',members:1,status:'Draft',progress:0,lead:'Aarav Mehta',color:'#FF9933'};
    setList(v=>[...v,p]);
    setActive(p);
  };

  const addNote=async()=>{
    if(!comment.trim())return;
    await fetch('/api/projects',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'note',projectId:active.id,body:comment})});
    setNotes(v=>[...v,comment.trim()]);
    setComment('');
  };

  return (
    <>
      <Header
        kicker={t('proj.kicker')}
        title={t('proj.title')}
        desc={t('proj.desc')}
        action={
          <button onClick={addWorkspace} style={{background:'var(--btn-bg)',border:0,color:'var(--btn-text)',borderRadius:10,padding:'11px 14px',fontWeight:900}}>
            <Plus size={14} style={{verticalAlign:'middle'}}/> {t('proj.new')}
          </button>
        }
      />
      <div style={{display:'grid',gridTemplateColumns:'290px 1fr',gap:14}}>
        <section className="glass" style={{padding:12,borderRadius:18}}>
          {list.map(p=>(
            <button key={p.id} onClick={()=>setActive(p)} style={{width:'100%',textAlign:'left',background:active.id===p.id?'rgba(255,153,51,.14)':'transparent',border:'1px solid '+(active.id===p.id?'rgba(255,153,51,.35)':'transparent'),borderRadius:12,padding:13,color:'var(--text)',marginBottom:7}}>
              <div style={{display:'flex',gap:10,alignItems:'center'}}>
                <span style={{width:10,height:10,borderRadius:'50%',background:p.color}}/>
                <span style={{fontSize:12,fontWeight:800}}>{p.name}</span>
              </div>
              <div className="muted" style={{fontSize:10,margin:'8px 0 0 20px'}}>{p.members} {t('proj.members')} · {p.progress}% {t('proj.complete')}</div>
            </button>
          ))}
        </section>
        <section className="glass" style={{padding:20,borderRadius:18}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'start',gap:10}}>
            <div>
              <div className="eyebrow">{t('proj.activeWorkspace')} · {active.status}</div>
              <h2 style={{margin:'7px 0'}}>{active.name}</h2>
              <p className="muted" style={{fontSize:12}}>{t('proj.ledBy')} {active.lead} · {t('proj.evidenceSprint')}</p>
            </div>
            <div style={{display:'flex'}}>
              {['AM','FK','PS','+15'].map((x,i)=>(
                <span key={x} style={{marginLeft:-5,width:28,height:28,borderRadius:'50%',background:i===3?'var(--panel2)':'linear-gradient(135deg,#FF9933,#1F3A93)',border:'2px solid var(--panel)',display:'grid',placeItems:'center',fontSize:9,fontWeight:900,color:'#FFFFFF'}}>
                  {x}
                </span>
              ))}
            </div>
          </div>
          <div style={{height:8,background:'rgba(255,255,255,.08)',borderRadius:99,margin:'18px 0'}}>
            <div style={{width:`${active.progress}%`,height:'100%',background:active.color,borderRadius:99}}/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
            <div>
              <div className="eyebrow">{t('proj.taskBoard')}</div>
              {['Validate district evidence','Review model assumptions','Draft policy note'].map((x,i)=>(
                <button key={x} onClick={()=>setTasks(v=>v.map((done,j)=>j===i?!done:done))} style={{display:'flex',width:'100%',alignItems:'center',gap:9,padding:'12px 0',border:0,borderBottom:'1px solid var(--line)',fontSize:12,background:'transparent',color:'var(--text)',textAlign:'left'}}>
                  <span style={{width:17,height:17,borderRadius:5,border:'1px solid '+(tasks[i]?'#138808':'#6d8290'),display:'grid',placeItems:'center'}}>
                    {tasks[i]&&<Check size={12} color="#138808"/>}
                  </span>
                  {x}
                  <span className="muted" style={{marginLeft:'auto',fontSize:10}}>{tasks[i]?t('proj.done'):t('proj.open')}</span>
                </button>
              ))}
            </div>
            <div>
              <div className="eyebrow">{t('proj.threadedNotes')}</div>
              <div style={{padding:'12px 0',fontSize:12,lineHeight:1.5}}>
                <strong>Farah Ahmed</strong>
                <p className="muted" style={{margin:'5px 0'}}>The floodplain evidence is strong, but let’s add the 2021 rainfall anomaly before review.</p>
                <span className="muted" style={{fontSize:10}}>28 min ago</span>
                {notes.map((n,i)=>(
                  <p key={i} style={{margin:'10px 0',padding:'8px',background:'rgba(255,153,51,.1)',borderRadius:8}}>{n}</p>
                ))}
              </div>
              <div style={{display:'flex',gap:7}}>
                <input
                  value={comment}
                  onChange={e=>setComment(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&addNote()}
                  placeholder={t('proj.addNote')}
                  style={{flex:1,background:'var(--panel2)',border:'1px solid var(--line)',borderRadius:8,padding:9,color:'var(--text)',fontSize:11}}
                />
                <button onClick={addNote} aria-label="Send note" style={{background:'var(--btn-bg)',border:0,borderRadius:8,padding:'0 10px',color:'var(--btn-text)'}}>
                  <Send size={14}/>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function Login(){
  const {t}=useLanguage();
  return (
    <div style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:20}}>
      <div className="glass" style={{width:'min(500px,100%)',borderRadius:24,padding:28}}>
        <Link href="/" style={{display:'flex',alignItems:'center',gap:10,fontWeight:900,fontSize:20}} title={t('nav.home')}>
          <span style={{width:36,height:36,borderRadius:11,display:'grid',placeItems:'center',background:'linear-gradient(135deg,#FF9933,#1F3A93)',color:'#FFFFFF'}}>B</span>
          Bhu<span style={{color:'var(--accent)'}}>Niti</span>
        </Link>
        <div className="eyebrow" style={{marginTop:36}}>{t('login.kicker')}</div>
        <h1 style={{fontSize:34,letterSpacing:'-.05em',margin:'9px 0'}}>{t('login.title')}</h1>
        <p className="muted" style={{fontSize:13,lineHeight:1.6}}>{t('login.desc')}</p>
        <div style={{display:'grid',gap:8,marginTop:22}}>
          {[
            ['Government Official','role.official'],
            ['Researcher','role.researcher'],
            ['Student','role.student'],
            ['Institution Admin','role.admin'],
            ['Public User','role.public'],
            ['Super Admin','role.super']
          ].map(([r,k],i)=>(
            <Link href={`/dashboard?role=${encodeURIComponent(r)}`} key={r} className="focus-ring" style={{display:'flex',alignItems:'center',gap:10,padding:12,borderRadius:11,border:'1px solid var(--line)',background:'rgba(255,255,255,.03)',fontSize:13}}>
              <span style={{width:27,height:27,borderRadius:8,display:'grid',placeItems:'center',background:i%2?'rgba(31,58,147,.16)':'rgba(255,153,51,.15)',color:i%2?'#1F3A93':'#FF9933',fontWeight:900}}>
                {t(k).slice(0,1)}
              </span>
              {t(k)}
              <ChevronRight size={15} style={{marginLeft:'auto'}}/>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function Generic({mode}:{mode:string}){
  const {t}=useLanguage();
  const content:any={
    solution:{title:'A national operating layer for land decisions.',desc:'Connect land records, research, GIS and policy action in one evidence trail.',cards:['Discover evidence','Inspect geography','Move from policy to pilot']},
    innovation:{title:'From idea to pilot to scale.',desc:'A transparent innovation portal for challenge briefs, grants and field pilots.',cards:['Open challenge briefs','Match evidence to pilots','Track outcomes']},
    developers:{title:'Build on open land intelligence.',desc:'Same-origin APIs, citation-aware search and typed demo contracts for public-interest builders.',cards:['Search repository APIs','Compose cited answers','Integrate with permission boundaries']}
  };
  const item=content[mode]||{title:'BhuNiti workspace',desc:'Evidence for every acre.',cards:['What exists today','Evidence trail','Next action']};
  return (
    <>
      <Header kicker="BhuNiti platform" title={item.title} desc={item.desc}/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
        {item.cards.map((x:string,i:number)=>(
          <div className="glass" key={x} style={{padding:20,borderRadius:18,minHeight:170}}>
            <div className="eyebrow">0{i+1}</div>
            <h3>{x}</h3>
            <p className="muted" style={{fontSize:12,lineHeight:1.6}}>Seeded public evidence, clear provenance and a practical next action keep the product connected to a real decision.</p>
            <Link href={i===0?'/repository':i===1?'/gis':'/projects'} style={{display:'inline-block',background:'rgba(255,153,51,.12)',border:'1px solid rgba(255,153,51,.3)',color:'#FF9933',borderRadius:8,padding:'8px 10px',fontSize:11,fontWeight:700}}>
              {t('generic.exploreModule')} <ChevronRight size={12} style={{verticalAlign:'middle'}}/>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default function Workspace({mode='dashboard'}:{mode?:string}){
  const active=mode==='login'?'dashboard':mode;
  const content=mode==='login'?<Login/>:mode==='dashboard'?<Dashboard/>:mode==='repository'?<Repository/>:mode==='gis'?<GIS/>:mode==='analytics'||mode==='early-warning'?<Analytics/>:mode==='simulation'||mode==='time-machine'?<Simulation/>:mode==='copilot'?<AI kind="copilot"/>:mode==='recommendations'||mode==='search'?<AI kind={mode==='search'?'search':'recommendations'}/>:mode==='projects'?<Projects/>:<Generic mode={mode}/>;
  return <AppShell active={active}>{content}</AppShell>;
}
