import type {Metadata} from 'next';
import Home from '../components/Home'; import Workspace from '../components/Workspace';

const publicMeta:Record<string,{title:string;description:string}>={
  solution:{title:'BhuNiti Solution — Land Intelligence',description:'See how BhuNiti connects records, research, GIS and policy action.'},
  innovation:{title:'BhuNiti Innovation Portal',description:'Move land-governance ideas from evidence to pilot to scale.'},
  developers:{title:'BhuNiti Developer Portal',description:'Build on open, citation-aware land intelligence APIs.'},
};
export async function generateMetadata({params}:{params:Promise<{slug?:string[]}>}):Promise<Metadata>{const {slug=[]}=await params;const key=slug[0]||'';const meta=publicMeta[key];return meta?{title:meta.title,description:meta.description,openGraph:{title:meta.title,description:meta.description}}:{}};
export default function Page({params}:{params:Promise<{slug?:string[]}>}){return <Route params={params}/>}
async function Route({params}:{params:Promise<{slug?:string[]}>}){const {slug=[]}=await params; const path=slug[0]||''; if(!path)return <Home/>; if(path==='login')return <Workspace mode="login"/>; return <Workspace mode={path}/>}
