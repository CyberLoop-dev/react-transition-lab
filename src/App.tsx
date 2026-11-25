import {useMemo,useState,useTransition} from "react";

type Item={id:number;name:string;group:string};
const items:Item[]=Array.from({length:2400},(_,i)=>({id:i+1,name:["Compiler","Renderer","Scheduler","Cache","Router","Parser"][i%6]+" module "+(i+1),group:["Core","UI","Data","Tools"][i%4]}));

export default function App(){
 const [draft,setDraft]=useState("");
 const [query,setQuery]=useState("");
 const [group,setGroup]=useState("All");
 const [isPending,startTransition]=useTransition();
 const visible=useMemo(()=>items.filter(item=>(!query||item.name.toLowerCase().includes(query.toLowerCase()))&&(group==="All"||item.group===group)),[query,group]);
 function changeQuery(value:string){setDraft(value);startTransition(()=>setQuery(value));}
 function changeGroup(value:string){startTransition(()=>setGroup(value));}
 return <main className="shell"><header><span className="eyebrow">REACT CONCURRENCY PLAYGROUND</span><h1>Transitions, made visible.</h1><p>Type immediately. Let non-urgent rendering happen in the background.</p></header><section className="panel"><label htmlFor="search">Search the local catalogue</label><input id="search" value={draft} onChange={e=>changeQuery(e.target.value)} placeholder="Try “router” or “cache”"/><div className="toolbar"><div className="filters">{["All","Core","UI","Data","Tools"].map(x=><button key={x} className={group===x?"active":""} onClick={()=>changeGroup(x)}>{x}</button>)}</div><span className={isPending?"pending":"ready"}>{isPending?"Transition rendering…":"Ready"}</span></div><div className="summary"><strong>{visible.length.toLocaleString()}</strong> matching items <span>• input state updates urgently; filtered results update in a transition</span></div><div className="list">{visible.slice(0,120).map(item=><article key={item.id}><span>{item.name}</span><small>{item.group}</small></article>)}</div><footer>Showing at most 120 rows to keep the demo readable.</footer></section></main>;
}
