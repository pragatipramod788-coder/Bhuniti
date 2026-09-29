'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {ArrowRight,Database,Globe2,Play,ShieldCheck,Sparkles,Workflow} from 'lucide-react';
import {useLanguage} from '../context/LanguageContext';

const Globe=dynamic(()=>import('./Globe'),{ssr:false,loading:()=> (
  <div className="glass" style={{height:420,borderRadius:28,display:'grid',placeItems:'center'}}>
    <span className="eyebrow">Loading land intelligence…</span>
  </div>
)});

export default function Home(){
  const {lang,setLang,t}=useLanguage();

  const pillars=[
    ['01',t('home.pillar1.title'),t('home.pillar1.desc'),Database],
    ['02',t('home.pillar2.title'),t('home.pillar2.desc'),Sparkles],
    ['03',t('home.pillar3.title'),t('home.pillar3.desc'),Globe2],
    ['04',t('home.pillar4.title'),t('home.pillar4.desc'),Workflow]
  ] as const;

  return (
    <div className="grid-bg" style={{minHeight:'100vh'}}>
      <header style={{maxWidth:1240,margin:'0 auto',padding:'22px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
        <Link href="/" style={{display:'flex',gap:10,alignItems:'center',fontWeight:900,fontSize:18}} title={t('nav.home')}>
          <span style={{width:36,height:36,borderRadius:11,display:'grid',placeItems:'center',background:'linear-gradient(135deg,#FF9933,#1F3A93)',color:'#FFFFFF'}}>B</span>
          Bhu<span style={{color:'#FF9933'}}>Niti</span>
        </Link>
        <nav style={{display:'flex',gap:14,alignItems:'center',fontSize:12,color:'var(--muted)',flexWrap:'wrap'}}>
          <Link href="/" className="nav-link-top active" style={{display:'inline-flex',alignItems:'center'}}>
            {t('nav.home')}
          </Link>
          <Link href="/solution" className="nav-link-top">{t('home.solution')}</Link>
          <Link href="/innovation" className="nav-link-top">{t('home.innovation')}</Link>
          <Link href="/developers" className="nav-link-top">{t('home.developers')}</Link>
          <select
            aria-label={t('nav.language')}
            value={lang}
            onChange={e=>setLang(e.target.value as any)}
            className="compact-select"
            style={{padding:'6px 8px',borderRadius:8,fontSize:11,background:'rgba(255,255,255,0.06)',border:'1px solid var(--line)',color:'var(--text)',cursor:'pointer'}}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
          </select>
          <Link href="/login" style={{color:'#0A2A5E',background:'#FF9933',padding:'9px 14px',borderRadius:10,fontWeight:900}}>
            {t('home.enterWorkspace')} <ArrowRight size={14} style={{verticalAlign:'middle'}}/>
          </Link>
        </nav>
      </header>

      <main style={{maxWidth:1240,margin:'0 auto',padding:'54px 24px 90px'}}>
        <section style={{display:'grid',gridTemplateColumns:'1fr 1.1fr',gap:48,alignItems:'center'}}>
          <div className="fade-up">
            <div className="eyebrow">{t('home.eyebrow')}</div>
            <h1 style={{fontSize:'clamp(44px,6.5vw,84px)',lineHeight:.98,letterSpacing:'-.07em',margin:'18px 0 22px',maxWidth:680}}>
              {t('home.heroTitle1')}<span style={{color:'#FF9933'}}>{t('home.heroTitle2')}</span>
            </h1>
            <p style={{fontSize:18,lineHeight:1.65,color:'var(--muted)',maxWidth:570}}>
              {t('home.heroDesc')}
            </p>
            <div style={{display:'flex',gap:12,marginTop:28,flexWrap:'wrap'}}>
              <Link href="/dashboard" style={{background:'#FF9933',color:'#0A2A5E',padding:'13px 18px',borderRadius:11,fontWeight:900}}>
                {t('home.exploreCommand')} <ArrowRight size={16} style={{verticalAlign:'middle'}}/>
              </Link>
              <Link href="/solution" style={{border:'1px solid var(--line)',padding:'13px 18px',borderRadius:11,fontWeight:800,color:'var(--text)'}}>
                {t('home.seeSolution')} <Play size={14} style={{verticalAlign:'middle',marginLeft:5}}/>
              </Link>
            </div>
            <div style={{display:'flex',gap:26,marginTop:34,flexWrap:'wrap'}}>
              {[
                ['28',t('home.liveLayers')],
                ['12.4M',t('home.recordsIndexed')],
                ['94',t('home.evidenceScore')]
              ].map(([a,b])=>(
                <div key={b}>
                  <div className="metric" style={{fontSize:25,fontWeight:900}}>{a}</div>
                  <div className="muted" style={{fontSize:11}}>{b}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="fade-up" style={{animationDelay:'.12s'}}>
            <Globe/>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:10,fontSize:11}}>
              <span className="muted">{t('home.liveSignal')}</span>
              <span style={{color:'#138808',fontWeight:700}}>
                <span style={{display:'inline-block',width:7,height:7,borderRadius:'50%',background:'#138808',marginRight:5}}/>
                {t('home.systemsNominal')}
              </span>
            </div>
          </div>
        </section>

        <section style={{paddingTop:100}}>
          <div className="eyebrow">{t('home.pillarsEyebrow')}</div>
          <h2 style={{fontSize:'clamp(30px,4vw,52px)',letterSpacing:'-.05em',margin:'14px 0 28px'}}>
            {t('home.pillarsTitle1')}<span style={{color:'#FF9933'}}>{t('home.pillarsTitle2')}</span>
          </h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
            {pillars.map(([n,tTitle,dDesc,Icon])=>(
              <Link href="/dashboard" key={n} className="glass focus-ring" style={{padding:20,borderRadius:18,minHeight:190,transition:'transform .2s'}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <span className="muted" style={{fontSize:11}}>{n}</span>
                  <Icon size={18} color="#FF9933"/>
                </div>
                <h3 style={{fontSize:17,margin:'28px 0 9px'}}>{tTitle}</h3>
                <p className="muted" style={{fontSize:12,lineHeight:1.6}}>{dDesc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="glass" style={{marginTop:80,padding:30,borderRadius:24,display:'flex',alignItems:'center',justifyContent:'space-between',gap:20,flexWrap:'wrap'}}>
          <div>
            <div className="eyebrow">{t('home.collabEyebrow')}</div>
            <h2 style={{margin:'8px 0',fontSize:28}}>{t('home.collabTitle')}</h2>
            <p className="muted" style={{margin:0}}>{t('home.collabDesc')}</p>
          </div>
          <Link href="/projects" style={{color:'#0A2A5E',background:'#FF9933',padding:'12px 16px',borderRadius:10,fontWeight:900}}>
            {t('home.viewCollab')} <ArrowRight size={15} style={{verticalAlign:'middle'}}/>
          </Link>
        </section>
      </main>

      <footer style={{maxWidth:1240,margin:'0 auto',padding:'24px',borderTop:'1px solid var(--line)',display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--muted)'}}>
        <span>{t('home.copyright')}</span>
        <span><ShieldCheck size={13} style={{verticalAlign:'middle'}}/> {t('home.dpdp')}</span>
      </footer>
    </div>
  );
}
