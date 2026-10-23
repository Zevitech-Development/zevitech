// Read-only production diagnostic. Never charges, mutates orders, or logs secrets/PII.
const { XMLParser } = require('fast-xml-parser');
const { resolveRedisConfig } = require('./shopify-release-preflight.cjs');
async function run() {
 const id=process.env.SHOPIFY_DIAGNOSTIC_ORDER_ID;
 if(!/^ZVT-[a-f0-9]{32}$/.test(id||''))return;
 const config=resolveRedisConfig(process.env);
 const r=await fetch(config.url,{method:'POST',headers:{Authorization:`Bearer ${config.token}`,'Content-Type':'application/json'},body:JSON.stringify(['GET',`zevitech:shopify-checkout:v1:order:${id}`])});
 const raw=await r.json(); const order=JSON.parse(raw.result||'null');
 if(!order){console.log('[gateway-diagnostic] Order not found');return;}
 const response=await fetch('https://secure.nmi.com/api/query.php',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({security_key:process.env.NMI_SECURITY_KEY,order_id:order.gatewayOrderId||order.id,action_type:'sale'}),signal:AbortSignal.timeout(20000)});
 const body=await response.text();const parsed=new XMLParser({parseTagValue:false,processEntities:false}).parse(body);
 const report=parsed.nm_response;const found=report?.transaction;const tx=Array.isArray(found)?found:found?[found]:[];
 const classify=t=>{t=String(t||'');return [/duplicate/i,/token/i,/security.key|api.key|authenticat|username/i,/expir/i,/card/i,/invalid/i,/reject/i,/timeout|communication/i].map((r,i)=>r.test(t)?['duplicate','token','authentication','expiry','card','invalid','rejected','transport'][i]:null).filter(Boolean)};
 console.log('[gateway-diagnostic]',JSON.stringify({status:order.status,attempts:order.attempts,gatewayCode:order.gatewayCode,uniqueAttempt:!!order.gatewayOrderId,httpStatus:response.status,reportPresent:report!==undefined,reportFields:report&&typeof report==='object'?Object.keys(report).filter(k=>/^[a-z_]+$/.test(k)):[],errorCategories:classify(report?.error||report?.error_message||body.slice(0,500)),transactions:tx.map(t=>({matches:t.order_id===(order.gatewayOrderId||order.id),condition:t.condition,currency:t.currency,actions:(Array.isArray(t.action)?t.action:t.action?[t.action]:[]).map(a=>({type:a.action_type,success:a.success,code:a.response_code,amountMatches:Number(a.amount)===order.amount,reasonCategories:classify(a.response_text)}))}))}));
}
run().catch(()=>{console.log('[gateway-diagnostic] Read-only diagnostic unavailable');process.exitCode=1});
