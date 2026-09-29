'use client';
import {Area,AreaChart,Bar,BarChart,CartesianGrid,Line,LineChart,ResponsiveContainer,Tooltip,XAxis,YAxis} from 'recharts';
import {landUseSeries,monthlyDisputes} from '../data/seed';

export function DisputeChart(){
  const data=monthlyDisputes.map((v,i)=>({m:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],value:v}));
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="saffronFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF9933" stopOpacity={0.35}/>
            <stop offset="95%" stopColor="#FF9933" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false}/>
        <XAxis dataKey="m" stroke="#8da7c4" fontSize={10}/>
        <YAxis stroke="#8da7c4" fontSize={10}/>
        <Tooltip contentStyle={{background:'#0A2A5E',border:'1px solid rgba(255,255,255,.2)',borderRadius:10,color:'#FFFFFF'}}/>
        <Area type="monotone" dataKey="value" stroke="#FF9933" fill="url(#saffronFill)" strokeWidth={2}/>
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function LandUseChart(){
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={landUseSeries}>
        <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false}/>
        <XAxis dataKey="year" stroke="#8da7c4" fontSize={10}/>
        <YAxis stroke="#8da7c4" fontSize={10}/>
        <Tooltip contentStyle={{background:'#0A2A5E',border:'1px solid rgba(255,255,255,.2)',borderRadius:10,color:'#FFFFFF'}}/>
        <Bar dataKey="urban" stackId="a" fill="#FF9933"/>
        <Bar dataKey="agri" stackId="a" fill="#138808"/>
        <Bar dataKey="forest" stackId="a" fill="#1F3A93"/>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TrendChart(){
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={landUseSeries}>
        <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false}/>
        <XAxis dataKey="year" stroke="#8da7c4" fontSize={10}/>
        <YAxis stroke="#8da7c4" fontSize={10}/>
        <Tooltip contentStyle={{background:'#0A2A5E',border:'1px solid rgba(255,255,255,.2)',borderRadius:10,color:'#FFFFFF'}}/>
        <Line dataKey="urban" stroke="#FF9933" strokeWidth={2}/>
        <Line dataKey="forest" stroke="#138808" strokeWidth={2}/>
      </LineChart>
    </ResponsiveContainer>
  );
}
