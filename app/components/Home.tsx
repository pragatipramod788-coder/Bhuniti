'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {ArrowRight,CheckCircle2,ChevronDown,Database,Globe2,Layers3,Play,ShieldCheck,Sparkles,Workflow} from 'lucide-react';

const Globe=dynamic(()=>import('./Globe'),{ssr:false,loading:()=> (
  <div className="glass" style={{height:420,borderRadius:28,display:'grid',placeItems:'center'}}>
    <span className="eyebrow">Loading land intelligence…</span>
  </div>
)});

const pillars=[
  ['01','Evidence repository','Research, data and policy in one trusted provenance layer.',Database],
  ['02','AI policy intelligence','Ask grounded questions and see the evidence trail behind every answer.',Sparkles],
  ['03','Geospatial command','Move from India to district-level signals with time-aware maps.',Globe2],
  ['04','Policy simulation','Model trade-offs before implementation — disputes, revenue and resilience.',Workflow]
] as const;

export default function Home(){
  return (
    <div className="grid-bg" style={{minHeight:'100vh'}}>
      <header style={{maxWidth:1240,margin:'0 auto',padding:'22px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link href="/" style={{display:'flex',gap:10,alignItems:'center',fontWeight:900,fontSize:18}}>
          <span style={{width:36,height:36,borderRadius:11,display:'grid',placeItems:'center',background:'linear-gradient(135deg,#FF9933,#1F3A93)',color:'#FFFFFF'}}>B</span>
          Bhu<span style={{color:'#FF9933'}}>Niti</span>
        </Link>
        <nav style={{display:'flex',gap:18,alignItems:'center',fontSize:12,color:'var(--muted)'}}>
          <Link href="/solution">Solution</Link>
          <Link href="/innovation">Innovation</Link>
          <Link href="/developers">Developers</Link>
          <Link href="/login" style={{color:'#0A2A5E',background:'#FF9933',padding:'10px 15px',borderRadius:10,fontWeight:900}}>
            Enter workspace <ArrowRight size={14} style={{verticalAlign:'middle'}}/>
          </Link>
        </nav>
      </header>

      <main style={{maxWidth:1240,margin:'0 auto',padding:'54px 24px 90px'}}>
        <section style={{display:'grid',gridTemplateColumns:'1fr 1.1fr',gap:48,alignItems:'center'}}>
          <div className="fade-up">
            <div className="eyebrow">National land intelligence platform · SIH 26019</div>
            <h1 style={{fontSize:'clamp(48px,7vw,88px)',lineHeight:.98,letterSpacing:'-.07em',margin:'18px 0 22px',maxWidth:680}}>
              Evidence for <span style={{color:'#FF9933'}}>every acre.</span>
            </h1>
            <p style={{fontSize:18,lineHeight:1.65,color:'var(--muted)',maxWidth:570}}>
              BhuNiti connects land records, research, GIS and policy action — so India can move from fragmented data to decisions that hold up in the real world.
            </p>
            <div style={{display:'flex',gap:12,marginTop:28,flexWrap:'wrap'}}>
              <Link href="/dashboard" style={{background:'#FF9933',color:'#0A2A5E',padding:'13px 18px',borderRadius:11,fontWeight:900}}>
                Explore the command center <ArrowRight size={16} style={{verticalAlign:'middle'}}/>
              </Link>
              <Link href="/solution" style={{border:'1px solid var(--line)',padding:'13px 18px',borderRadius:11,fontWeight:800,color:'var(--text)'}}>
                See the solution <Play size={14} style={{verticalAlign:'middle',marginLeft:5}}/>
              </Link>
            </div>
            <div style={{display:'flex',gap:26,marginTop:34,flexWrap:'wrap'}}>
              {[['28','live layers'],['12.4M','records indexed'],['94','evidence score']].map(([a,b])=>(
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
              <span className="muted">Live signal map · 08:42 IST</span>
              <span style={{color:'#138808',fontWeight:700}}>
                <span style={{display:'inline-block',width:7,height:7,borderRadius:'50%',background:'#138808',marginRight:5}}/>
                Systems nominal
              </span>
            </div>
          </div>
        </section>

        <section style={{paddingTop:100}}>
          <div className="eyebrow">One platform, seven pillars</div>
          <h2 style={{fontSize:'clamp(30px,4vw,52px)',letterSpacing:'-.05em',margin:'14px 0 28px'}}>
            Turn land complexity into a <span style={{color:'#FF9933'}}>shared advantage.</span>
          </h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
            {pillars.map(([n,t,d,I])=>(
              <Link href="/dashboard" key={t} className="glass focus-ring" style={{padding:20,borderRadius:18,minHeight:190,transition:'transform .2s'}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <span className="muted" style={{fontSize:11}}>{n}</span>
                  <I size={18} color="#FF9933"/>
                </div>
                <h3 style={{fontSize:17,margin:'28px 0 9px'}}>{t}</h3>
                <p className="muted" style={{fontSize:12,lineHeight:1.6}}>{d}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="glass" style={{marginTop:80,padding:30,borderRadius:24,display:'flex',alignItems:'center',justifyContent:'space-between',gap:20,flexWrap:'wrap'}}>
          <div>
            <div className="eyebrow">Built for collaboration</div>
            <h2 style={{margin:'8px 0',fontSize:28}}>Government + research + citizen insight</h2>
            <p className="muted" style={{margin:0}}>Secure workspaces, explainable AI and evidence trails that keep policy accountable.</p>
          </div>
          <Link href="/projects" style={{color:'#0A2A5E',background:'#FF9933',padding:'12px 16px',borderRadius:10,fontWeight:900}}>
            View collaboration spaces <ArrowRight size={15} style={{verticalAlign:'middle'}}/>
          </Link>
        </section>
      </main>

      <footer style={{maxWidth:1240,margin:'0 auto',padding:'24px',borderTop:'1px solid var(--line)',display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--muted)'}}>
        <span>© 2026 BhuNiti · National Land Intelligence Network</span>
        <span><ShieldCheck size={13} style={{verticalAlign:'middle'}}/> DPDP-aligned by design</span>
      </footer>
    </div>
  );
}
