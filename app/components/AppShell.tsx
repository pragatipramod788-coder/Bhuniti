'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {Activity,AlertTriangle,BrainCircuit,Command,Database,FileSearch,Globe2,Home,Layers3,LayoutDashboard,Menu,Network,PanelLeft,Scale,Settings2,ShieldCheck,Sparkles,Users,Workflow,X} from 'lucide-react';
import BackButton from './BackButton';
import {useLanguage} from '../context/LanguageContext';

const nav=[
  ['','nav.home',Home],
  ['dashboard','nav.dashboard',LayoutDashboard],
  ['repository','nav.repository',Database],
  ['search','nav.search',FileSearch],
  ['recommendations','nav.recommendations',Scale],
  ['copilot','nav.copilot',BrainCircuit],
  ['gis','nav.gis',Globe2],
  ['analytics','nav.analytics',Activity],
  ['simulation','nav.simulation',Workflow],
  ['projects','nav.projects',Users],
  ['early-warning','nav.earlyWarning',AlertTriangle],
  ['knowledge-graph','nav.knowledgeGraph',Network],
  ['time-machine','nav.timeMachine',Layers3],
  ['permissions','nav.permissions',ShieldCheck],
  ['api-docs','nav.apiDocs',Settings2]
] as const;

const roles=['Government Official','Researcher','Student','Institution Admin','Public User','Super Admin'] as const;
const roleKeyMap:Record<string,string>={
  'Government Official':'role.official',
  'Researcher':'role.researcher',
  'Student':'role.student',
  'Institution Admin':'role.admin',
  'Public User':'role.public',
  'Super Admin':'role.super'
};

export default function AppShell({children,active='dashboard'}:{children:React.ReactNode;active?:string}){
  const [open,setOpen]=useState(true);
  const [palette,setPalette]=useState(false);
  const [contrast,setContrast]=useState(false);
  const [light,setLight]=useState(()=>active==='repository');
  const [role,setRole]=useState<string>('Government Official');
  const {lang,setLang,t}=useLanguage();

  useEffect(()=>{
    const roleParam=new URLSearchParams(window.location.search).get('role');
    const savedRole=window.localStorage.getItem('bhuniti-role');
    if(roleParam&&roles.includes(roleParam as any))setRole(roleParam);
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
            <Link href="/" className="brand-link" title={t('nav.home')}>
              <span className="brand-mark">B</span>
              {open&&<span className="brand-word">Bhu<span>Niti</span></span>}
            </Link>
            <button aria-label={open?'Collapse sidebar':'Expand sidebar'} onClick={()=>setOpen(v=>!v)} className="icon-button focus-ring">
              {open?<PanelLeft size={16}/>:<Menu size={18}/>}
            </button>
          </div>
          <nav className="app-nav">
            {nav.map(([id,labelKey,Icon])=>{
              const isActive = id==='' ? (active===''||active==='home') : active===id;
              const href = id ? '/' + id : '/';
              return (
                <Link key={id||'home'} href={href} className={`nav-link focus-ring ${isActive?'active':''}`}>
                  <Icon size={16}/>
                  {open&&t(labelKey)}
                </Link>
              );
            })}
          </nav>
          {open&&(
            <div className="shell-controls">
              <label className="muted" htmlFor="active-role">{t('nav.activeRole')}</label>
              <select id="active-role" aria-label={t('nav.activeRole')} value={role} onChange={e=>setRole(e.target.value)}>
                {roles.map(x=><option key={x} value={x}>{t(roleKeyMap[x]||x)}</option>)}
              </select>
            </div>
          )}
        </aside>

        <main className="app-main">
          <header className="glass app-topbar">
            <div className="topbar-start">
              <BackButton />
              <button onClick={()=>setPalette(true)} className="command-button focus-ring">
                <Command size={14}/> {t('nav.searchAnything')} <span className="keycap">⌘K</span>
              </button>
              <span className="muted topbar-network">{t('nav.network')}</span>
            </div>
            <div className="topbar-end">
              <label className="sr-only" htmlFor="language">{t('nav.language')}</label>
              <select
                id="language"
                aria-label={t('nav.language')}
                value={lang}
                onChange={e=>setLang(e.target.value as any)}
                className="compact-select"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="mr">मराठी</option>
              </select>
              <button onClick={()=>setLight(v=>!v)} aria-label={light?'Use dark theme':'Use light theme'} className="icon-button focus-ring" title={light?'Switch to Dark Mode':'Switch to Light Mode'}>
                <Sparkles size={17} color="#FF9933"/>
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
              <div className="eyebrow">{t('nav.commandPalette')}</div>
              <button onClick={()=>setPalette(false)} className="icon-button">
                <X size={16}/>
              </button>
            </div>
            <input autoFocus placeholder={t('nav.palettePlaceholder')} className="focus-ring palette-input"/>
            <div className="palette-links">
              {nav.slice(0,8).map(([id,labelKey,Icon])=>{
                const href = id ? '/' + id : '/';
                return (
                  <Link key={id||'home'} href={href} onClick={()=>setPalette(false)} className="palette-link">
                    <Icon size={15} color="#FF9933"/>
                    {t(labelKey)}
                    <span className="muted">{t('nav.goTo')}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
