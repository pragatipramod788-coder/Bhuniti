'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {Activity,AlertTriangle,BrainCircuit,Command,Database,FileSearch,Globe2,Layers3,LayoutDashboard,Menu,Network,PanelLeft,Scale,Settings2,ShieldCheck,Sparkles,Users,Workflow,X} from 'lucide-react';

const nav=[
  ['dashboard','Command Center',LayoutDashboard],
  ['repository','Central Repository',Database],
  ['search','AI Research Search',FileSearch],
  ['recommendations','Policy Recommendations',Scale],
  ['copilot','Research Copilot',BrainCircuit],
  ['gis','GIS Intelligence',Globe2],
  ['analytics','Analytics',Activity],
  ['simulation','Policy Simulation',Workflow],
  ['projects','Collaboration',Users],
  ['early-warning','Dispute Early-Warning',AlertTriangle],
  ['knowledge-graph','Knowledge Graph',Network],
  ['time-machine','Impact Time Machine',Layers3],
  ['permissions','Permissions & DPDP',ShieldCheck],
  ['api-docs','Developer APIs',Settings2]
] as const;

const roles=['Government Official','Researcher','Student','Institution Admin','Public User','Super Admin'];

export default function AppShell({children,active='dashboard'}:{children:React.ReactNode;active?:string}){
  const [open,setOpen]=useState(true);
  const [palette,setPalette]=useState(false);
  const [contrast,setContrast]=useState(false);
  const [light,setLight]=useState(()=>active==='repository');
  const [role,setRole]=useState('Government Official');
  const [language,setLanguage]=useState('English');

  useEffect(()=>{
    const roleParam=new URLSearchParams(window.location.search).get('role');
    const savedRole=window.localStorage.getItem('bhuniti-role');
    if(roleParam&&roles.includes(roleParam))setRole(roleParam);
    else if(savedRole)setRole(savedRole);

    const fn=(e:KeyboardEvent)=>{
      if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){
        e.preventDefault();
        setPalette(v=>!v);
      }
    };
    window.addEventListener('keydown',fn);
    return()=>window.removeEventListener('keydown',fn);
  },[]);

  useEffect(()=>{
    window.localStorage.setItem('bhuniti-role',role);
  },[role]);

  useEffect(()=>{
    document.documentElement.dataset.theme=light?'light':'dark';
  },[light]);

  return (
    <div className={`app-shell ${open?'sidebar-open':'sidebar-closed'} ${contrast?'high-contrast':''}`}>
      <div className="app-shell-inner">
        <aside className="app-sidebar glass">
          <div className="brand-row">
            <Link href="/" className="brand-link">
              <span className="brand-mark">B</span>
              {open&&<span className="brand-word">Bhu<span>Niti</span></span>}
            </Link>
            <button aria-label={open?'Collapse sidebar':'Expand sidebar'} onClick={()=>setOpen(v=>!v)} className="icon-button focus-ring">
              {open?<PanelLeft size={16}/>:<Menu size={18}/>}
            </button>
          </div>
          <nav className="app-nav">
            {nav.map(([id,label,Icon])=>(
              <Link key={id} href={'/'+id} className={`nav-link focus-ring ${active===id?'active':''}`}>
                <Icon size={16}/>
                {open&&label}
              </Link>
            ))}
          </nav>
          {open&&(
            <div className="shell-controls">
              <label className="muted" htmlFor="active-role">ACTIVE ROLE</label>
              <select id="active-role" aria-label="Active role" value={role} onChange={e=>setRole(e.target.value)}>
                {roles.map(x=><option key={x}>{x}</option>)}
              </select>
            </div>
          )}
        </aside>

        <main className="app-main">
          <header className="glass app-topbar">
            <div className="topbar-start">
              <button onClick={()=>setPalette(true)} className="command-button focus-ring">
                <Command size={14}/> Search anything <span className="keycap">⌘K</span>
              </button>
              <span className="muted topbar-network">National Land Intelligence Network</span>
            </div>
            <div className="topbar-end">
              <label className="sr-only" htmlFor="language">Language</label>
              <select id="language" aria-label="Language" value={language} onChange={e=>setLanguage(e.target.value)} className="compact-select">
                <option>English</option>
                <option>हिन्दी</option>
                <option>मराठी</option>
              </select>
              <button onClick={()=>setLight(v=>!v)} aria-label={light?'Use dark theme':'Use light theme'} className="icon-button focus-ring" title={light?'Switch to Dark Mode':'Switch to Light Mode'}>
                <Sparkles size={17} color={light?'#FF9933':'#FF9933'}/>
              </button>
              <button onClick={()=>setContrast(v=>!v)} aria-label="Toggle high contrast" className="icon-button focus-ring" title="Toggle contrast">
                <span style={{fontSize:11,fontWeight:900}}>A</span>
              </button>
              <Link href="/profile" className="profile-link focus-ring">
                <span className="avatar">AM</span>
                <span className="profile-name">Aarav Mehta</span>
              </Link>
            </div>
          </header>
          <div className="app-content">{children}</div>
        </main>
      </div>

      {palette&&(
        <div role="dialog" aria-modal="true" onClick={()=>setPalette(false)} className="palette-backdrop">
          <div onClick={e=>e.stopPropagation()} className="glass palette-dialog">
            <div className="palette-header">
              <div className="eyebrow">Command palette</div>
              <button onClick={()=>setPalette(false)} className="icon-button">
                <X size={16}/>
              </button>
            </div>
            <input autoFocus placeholder="Search pages, datasets, policies…" className="focus-ring palette-input"/>
            <div className="palette-links">
              {nav.slice(0,7).map(([id,label,Icon])=>(
                <Link key={id} href={'/'+id} onClick={()=>setPalette(false)} className="palette-link">
                  <Icon size={15} color="#FF9933"/>
                  {label}
                  <span className="muted">Go to</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
