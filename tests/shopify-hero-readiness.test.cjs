const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const resolve = Module._resolveFilename, load = Module._load;
Module._resolveFilename = function(r,p,...rest){return resolve.call(this,r.startsWith('@/')?path.resolve(__dirname,'../src',r.slice(2)):r,p,...rest)};
Module._load = function(r,...args){if(r==='framer-motion')return {motion:{div:'div'},useReducedMotion:()=>false};return load.call(this,r,...args)};
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
const Hero=require('../src/elements/business/shopify/shopify-hero-preview.tsx').default;
function nodes(tree){if(!tree||typeof tree!=='object')return [];return [tree,...React.Children.toArray(tree.props?.children).flatMap(nodes)];}
test('manual swipe waits for both decoded cards; backward swipe mounts its destination first',()=>{
 const originals={useState:React.useState,useRef:React.useRef,useEffect:React.useEffect,useCallback:React.useCallback,window:global.window,IntersectionObserver:global.IntersectionObserver};
 const state=[],refs=[];let si=0,ri=0,effects=[];
 React.useState=init=>{const i=si++;if(!(i in state))state[i]=init;return[state[i],v=>state[i]=typeof v==='function'?v(state[i]):v]};
 React.useRef=init=>{const i=ri++;return refs[i]||(refs[i]={current:init})};
 React.useCallback=fn=>fn;React.useEffect=fn=>effects.push(fn);
 global.window={setTimeout:()=>1,clearTimeout(){}};global.IntersectionObserver=class{observe(){}disconnect(){}};
 const render=()=>{si=ri=0;effects=[];const tree=Hero();effects.forEach(fn=>fn());return tree};
 try{
  let tree=render();let frames=nodes(tree).filter(n=>n.props?.onReadiness);
  const first=frames[0].props.design.id,next=frames[1].props.design.id;
  nodes(tree).find(n=>n.props?.role==='button').props.onClick();render();
  assert.equal(state[0].active,0,'does not reveal unloaded next card');
  frames[0].props.onReadiness(first,true);render();assert.equal(state[0].active,0);
  frames[1].props.onReadiness(next,true);render();assert.equal(state[0].active,1);
  // Reset transition for a separate backwards navigation from the first card.
  state[0]={active:0,outgoing:-1,direction:1};refs[0].current=false;
  tree=render();nodes(tree).find(n=>n.props?.role==='button').props.onKeyDown({key:'ArrowLeft',preventDefault(){}});
  tree=render();frames=nodes(tree).filter(n=>n.props?.onReadiness);
  assert.equal(frames.length,3,'backward destination is preloaded alongside current and next');
  assert.equal(state[0].active,0);
  frames[2].props.onReadiness(frames[2].props.design.id,true);render();assert.equal(state[0].active,6);
 }finally{Object.assign(React,{useState:originals.useState,useRef:originals.useRef,useEffect:originals.useEffect,useCallback:originals.useCallback});global.window=originals.window;global.IntersectionObserver=originals.IntersectionObserver;}
});
