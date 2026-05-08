import { useState, useRef } from "react";

const LOGO_B64 = "data:image/png;base64,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upRSGljvDokoHozre13rwrU0ODzfgHMHZR/isXk+jfVFABKJeF+CMNQzUikNrC7bGrcRFAMGDRzIkYcfIQAvPdFAOpUkknjhTZH37ysKhUQKci3C6/8/Hm4yevQoALY2btUzUikNrC6162rN28tXkEylOOvscwBY/HitWXBfI30HVJAqN/hJ8BPEfx6QL1P6gsrqJCm/jIdvW8OmdfFYtfPP/zQAr7zysp6RSr2Hj2TjyXVfv16+891vU/dOHSNHj+wsg9kfHyMzzxxK9UAPzAEuGiO4oqNhQ575D9az6rV4PNp5n/g7efCh+/E8nxNOOJEXXnxeG7SUUt2tr90gIiLPzV/wgc0hfMrJc2Vrw1YREfndb+8VfVeUUrs1Z/bJks1kRURkzao1cuUVVx60wJg6ZYrc8t1bJVd6/ddfe13DSim9JXxvc085VX79618zZuxhALQ0t7CxbiPufXlaGE9bXFlZxejRo/G8uPnwyb88xcfOPENvA5VSPfO9735fVq1cLQdLsViUl158Wb74xS9pzUoprWHtm6OPmiFDBg/B9733ZXEsYwzZbIa6uo2sXLVSy14ppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSh3y/gclJcXaNUiBNgAAAABJRU5ErkJggg==";

const MONTHS=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const DAYS=Array.from({length:31},(_,i)=>String(i+1).padStart(2,"0"));
const YEARS=Array.from({length:8},(_,i)=>String(new Date().getFullYear()+i));
const REFS=[
  {nombre:"Estación 6 slots (antigua)",precio:173},
  {nombre:"Estación de 4 slots SIN pantalla",precio:191},
  {nombre:"Estación de 4 slots CON pantalla",precio:297},
  {nombre:"Estación de 4 slots CON pantalla y datáfono",precio:450},
  {nombre:"Estación de 24 slots con pantalla",precio:1350},
  {nombre:"Estación de 24 slots con pantalla para exteriores",precio:1575},
  {nombre:"Estación de 24 slots con pantalla y datáfono",precio:1725},
  {nombre:"Power bank",precio:16},
  {nombre:"Estante en PVC",precio:30},
  {nombre:"Hablador",precio:20},
];
const PB_MAP={"24 slots":20,"6 slots":4,"4 slots":2};
function getPBCount(nombre){for(const[k,v]of Object.entries(PB_MAP)){if(nombre.includes(k))return v;}return 0;}
const TODAY=new Date();
const TODAY_D=String(TODAY.getDate()).padStart(2,"0");
const TODAY_M=MONTHS[TODAY.getMonth()];
const TODAY_Y=String(TODAY.getFullYear());

const initialData={
  aliado:{empresa:"",nit:"",dir:"",tel:"",rep:"",correo:"",cc:"",ccExp:""},
  canales:{correo:"",whatsapp:""},
  duracion:{diaI:"",mesI:"",anioI:"",diaF:"",mesF:"",anioF:""},
  equipos:[{tipo:"",cant:"",unitario:"",total:""}],
  banco:{banco:"",prop:"",id:"",tipo:"",num:""},
  firma:{dia:TODAY_D,mes:TODAY_M,anio:TODAY_Y},
};

const steps=["Información del Aliado","Canales y Duración","Equipos","Datos Bancarios","Generar Contrato"];
const C={purple:"#270140",green:"#8CBF3F",dark:"#1a1a1a",white:"#fff",bg:"#f7f7f5",border:"#e0e0e0",muted:"#777"};

function formatCC(r){const d=r.replace(/\D/g,"");return d.replace(/\B(?=(\d{3})+(?!\d))/g,".");}
function toUpper(s){return s.toUpperCase();}
function numOnly(s){return s.replace(/\D/g,"");}
function capitalize(s){return s.replace(/\b\w+/g,w=>w.charAt(0).toUpperCase()+w.slice(1).toLowerCase());}

const labelCSS={display:"block",fontSize:11,fontWeight:600,color:C.dark,marginBottom:6,letterSpacing:"0.03em"};
const inputCSS={width:"100%",padding:"11px 14px",fontSize:14,border:`1.5px solid ${C.border}`,borderRadius:8,outline:"none",fontFamily:"inherit",transition:"border 0.2s",background:C.white,boxSizing:"border-box"};
const selectCSS={...inputCSS,cursor:"pointer",appearance:"auto"};
const hintCSS={fontSize:10,color:C.muted,marginTop:4,fontStyle:"italic"};
const errCSS={fontSize:10,color:"#c0392b",marginTop:4,fontWeight:500};

function Input({label,value,onChange,placeholder,numeric,hint,error}){
  const handle=v=>{let val=v;if(numeric)val=numOnly(val);onChange(val);};
  return(<div style={{width:"100%"}}><label style={labelCSS}>{label}</label><input value={value} onChange={e=>handle(e.target.value)} placeholder={placeholder||""} inputMode={numeric?"numeric":undefined} style={{...inputCSS,borderColor:error?"#c0392b":C.border}} onFocus={e=>e.target.style.borderColor=C.purple} onBlur={e=>e.target.style.borderColor=error?"#c0392b":C.border}/>{hint&&!error&&<div style={hintCSS}>{hint}</div>}{error&&<div style={errCSS}>{error}</div>}</div>);
}
function Select({label,value,onChange,options,placeholder,error}){
  return(<div style={{width:"100%"}}><label style={labelCSS}>{label}</label><select value={value} onChange={e=>onChange(e.target.value)} style={{...selectCSS,borderColor:error?"#c0392b":C.border}}><option value="">{placeholder||"Seleccionar..."}</option>{options.map(o=><option key={o} value={o}>{o}</option>)}</select>{error&&<div style={errCSS}>{error}</div>}</div>);
}
function Row({children,cols=2}){return(<div style={{display:"grid",gridTemplateColumns:`repeat(auto-fit,minmax(${cols>2?120:200}px,1fr))`,gap:16,marginBottom:18}}>{children}</div>);}
function StepIndicator({current}){return(<div style={{display:"flex",gap:4,marginBottom:28,justifyContent:"center",flexWrap:"wrap",padding:"0 8px"}}>{steps.map((s,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:30,height:30,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0,background:i===current?C.purple:i<current?C.green:"#e5e5e5",color:i<=current?"#fff":"#999",transition:"all 0.3s"}}>{i<current?"✓":i+1}</div>{i<steps.length-1&&<div style={{width:16,height:1.5,background:i<current?C.green:"#e5e5e5",borderRadius:1}}/>}</div>))}</div>);}

function ContractPrint({d,printRef}){
  const al=d.aliado,ch=d.canales,du=d.duracion,eq=d.equipos,ba=d.banco,fi=d.firma;
  const blank=(v,w=180)=>v||`${"_".repeat(Math.floor(w/7))}`;
  const fmtName=v=>v?toUpper(v):blank("",180);
  const fmtCC2=v=>v?formatCC(numOnly(v)):blank("",120);
  const S={fontFamily:"Helvetica,Arial,sans-serif",fontSize:10,lineHeight:1.65,color:"#111",maxWidth:680,margin:"0 auto",position:"relative"};
  const H={fontSize:12,fontWeight:700,margin:"18px 0 6px",textAlign:"justify"};
  const P={textAlign:"justify",marginBottom:8};
  const IX={textAlign:"justify",marginBottom:5,paddingLeft:16};
  const TH={fontSize:9,fontWeight:700,padding:"5px 8px",background:"#f5f5f5",border:"0.5px solid #ccc",textAlign:"left"};
  const TD={fontSize:9,padding:"5px 8px",border:"0.5px solid #ccc",minHeight:22};

  return(<div ref={printRef} style={S}>
<style>{`@media print{body{margin:0;padding:0}.no-print{display:none!important}@page{margin:2.5cm 2.5cm;size:letter}}`}</style>
<div style={{position:"absolute",top:0,right:0,width:60}}><img src={LOGO_B64} alt="Mobi" style={{width:"100%",opacity:0.85}}/></div>
<h2 style={{fontSize:13,fontWeight:700,textAlign:"center",margin:"0 0 4px",paddingRight:70}}>CONTRATO DE COLABORACIÓN COMERCIAL CON COMODATO DE EQUIPOS</h2>
<p style={{fontSize:10,textAlign:"center",color:"#444",marginBottom:12}}>Celebrado entre <b>MOBI CHARGE S.A.S.</b>, con NIT 901657651-3, y <b>{fmtName(al.empresa)}</b>, con NIT {blank(al.nit,120)}</p>
<hr style={{border:"none",borderTop:"0.5px solid #ccc",margin:"12px 0"}}/>

<table style={{width:"100%",borderCollapse:"collapse",marginBottom:12,border:"0.5px solid #ccc"}}><thead><tr><th style={{...TH,width:"48%"}}>Información del Aliado</th><th style={TH}>Parte Comodante (MOBI CHARGE S.A.S.)</th></tr></thead><tbody><tr>
<td style={TD}>Compañía: {fmtName(al.empresa)}<br/>NIT: {blank(al.nit)}<br/>Dirección: {blank(al.dir)}<br/>Teléfono: {blank(al.tel)}<br/>Representante: {fmtName(al.rep)}<br/>Correo: {blank(al.correo)}</td>
<td style={TD}>Compañía: Mobi Charge S.A.S.<br/>NIT: 901657651-3<br/>Dirección: Calle 100 n.° 60-04, Of. 317, Bogotá D.C.<br/>Teléfono: 317 425 5361<br/>Representante: David Camilo Baquero Gómez<br/>C.C. 1.000.180.024 de Cota</td>
</tr></tbody></table>

<p style={{fontSize:9,fontWeight:700,color:"#333",marginBottom:4}}>Canales oficiales de comunicación entre las partes</p>
<table style={{width:"100%",borderCollapse:"collapse",marginBottom:4,border:"0.5px solid #ccc"}}><thead><tr><th style={TH}>Parte Comodante (MOBI CHARGE S.A.S.)</th><th style={TH}>EL ALIADO</th></tr></thead><tbody><tr>
<td style={TD}>Correo: davidcamilo@mobicharge.org<br/>WhatsApp: 317 425 5361</td>
<td style={TD}>Correo: {blank(ch.correo)}<br/>WhatsApp: {blank(ch.whatsapp)}</td>
</tr></tbody></table>
<p style={{fontSize:8,color:"#666",fontStyle:"italic",marginBottom:12}}>Las notificaciones enviadas a los canales anteriores se tendrán por válidamente realizadas para todos los efectos del presente contrato. Cualquier cambio en los datos de contacto deberá notificarse por escrito a la contraparte con un mínimo de cinco (5) días hábiles de anticipación.</p>
<hr style={{border:"none",borderTop:"0.5px solid #ccc",margin:"8px 0 12px"}}/>

<p style={P}>Entre los suscritos, el señor <b>DAVID CAMILO BAQUERO GÓMEZ</b>, mayor de edad, identificado con cédula de ciudadanía n.° 1.000.180.024 de Cota, quien actúa como representante legal de <b>MOBI CHARGE S.A.S.</b>, identificada con NIT 901657651-3, denominada en adelante <b>LA PARTE COMODANTE</b> o <b>MOBI CHARGE</b>; y, por la otra parte, <b>{fmtName(al.empresa)}</b>, identificada con NIT {blank(al.nit,120)}, representada por <b>{fmtName(al.rep)}</b>, identificado(a) con cédula de ciudadanía n.° {fmtCC2(al.cc)} de {blank(capitalize(al.ccExp),100)}, denominado(a) en adelante <b>EL ALIADO</b>; hemos acordado celebrar el presente <b>CONTRATO DE COLABORACIÓN COMERCIAL CON COMODATO DE EQUIPOS</b>, el cual es de naturaleza mixta y atípica, regido principalmente por lo pactado entre las partes y, en lo no previsto, por las disposiciones aplicables del Código Civil y el Código de Comercio colombianos, conforme a las siguientes cláusulas:</p>

<p style={H}>CLÁUSULA PRIMERA. OBJETO</p>
<p style={P}>LA PARTE COMODANTE entrega a EL ALIADO, a título de préstamo gratuito, estaciones multifuncionales de préstamo de baterías portátiles (en adelante, «las estaciones»), y EL ALIADO permite el uso de su(s) establecimiento(s) a MOBI CHARGE S.A.S. para situar dichas estaciones e instalarlas, en cumplimiento del objeto del presente contrato, en el(los) establecimiento(s) mencionado(s) en la parte inferior del contrato, en anexos o en futuras notificaciones acordadas entre las partes.</p>

<p style={H}>CLÁUSULA SEGUNDA. VALOR Y RETRIBUCIÓN AL ALIADO</p>
<p style={P}>El presente contrato es a título gratuito para EL ALIADO. En ningún caso EL ALIADO deberá realizar pago alguno a MOBI CHARGE S.A.S. por el uso, la instalación o el funcionamiento de la(s) estación(es).</p>
<p style={P}>Como contraprestación por el espacio cedido y la colaboración de EL ALIADO, MOBI CHARGE S.A.S. le reconocerá una comisión equivalente al <b>diez por ciento (10%)</b> de los ingresos netos generados por el uso de las estaciones y baterías en el(los) establecimiento(s) de EL ALIADO. Para efectos del presente contrato, se entiende por ingresos netos aquellos calculados después de descontar el Impuesto al Valor Agregado (IVA) causado sobre el valor de cada transacción, conforme a la normativa tributaria colombiana vigente. En ningún caso se reconocerá comisión sobre el componente de IVA recaudado. La liquidación y el pago de esta comisión se realizarán conforme a lo establecido en la Cláusula Undécima del presente contrato.</p>

<p style={H}>CLÁUSULA TERCERA. DURACIÓN — VIGENCIA</p>
<p style={P}>El término de duración del presente contrato será de <b>DOCE (12) MESES</b>, contados a partir del {blank(du.diaI,30)} de {blank(du.mesI,80)} de {blank(du.anioI,40)} hasta el {blank(du.diaF,30)} de {blank(du.mesF,80)} de {blank(du.anioF,40)}, previo perfeccionamiento de este.</p>

<p style={H}>CLÁUSULA CUARTA. CANALES OFICIALES DE COMUNICACIÓN</p>
<p style={P}>Para efectos del presente contrato, las partes establecen como canales oficiales de comunicación los consignados en la tabla de la parte superior de este documento. Las notificaciones, avisos, aprobaciones y cualquier comunicación con efectos contractuales enviadas a dichos canales se tendrán por válidamente realizadas desde el momento de su recepción o, en el caso del correo electrónico, desde el día hábil siguiente al envío si no se acusa recibo en el día.</p>
<p style={P}>Cualquier cambio en los datos de contacto de cualquiera de las partes deberá notificarse por escrito a la contraparte a través de los canales vigentes, con un mínimo de <b>cinco (5) días hábiles</b> de anticipación. Hasta tanto no se realice dicha notificación, las comunicaciones enviadas a los datos registrados se entenderán válidamente recibidas.</p>

<p style={H}>CLÁUSULA QUINTA. CONDICIONES DE ENTREGA Y DEVOLUCIÓN</p>
<p style={P}>EL ALIADO declara haber recibido la(s) estación(es) a su satisfacción, en el estado que indica el documento de inventario y recibo que se formalizará en el(los) lugar(es) y fecha(s) de entrega pactados entre las partes; dicho documento es parte integral del presente contrato. La entrega material e instalación de la(s) estación(es) y baterías se realizará en la fecha y hora pactadas mediante los canales de comunicación establecidos en la Cláusula Cuarta.</p>
<p style={P}>EL ALIADO está obligado a devolver la(s) estación(es) al término del contrato, en el mismo estado en que fueron recibidas, con el desgaste natural propio del uso, realizando el mantenimiento y cuidado adecuados conforme al manual suministrado por MOBI CHARGE S.A.S.</p>

<p style={H}>CLÁUSULA SEXTA. RENOVACIÓN AUTOMÁTICA</p>
<p style={P}>Al vencimiento del plazo pactado en la Cláusula Tercera, el contrato se tendrá por renovado automáticamente por períodos iguales, salvo que cualquiera de las partes notifique por escrito su intención de no renovarlo con una anticipación no inferior a <b>sesenta (60) días calendario</b> antes de la fecha de vencimiento, a través de los canales establecidos en la Cláusula Cuarta.</p>

<p style={H}>CLÁUSULA SÉPTIMA. TERMINACIÓN ANTICIPADA POR VOLUNTAD DE LAS PARTES</p>
<p style={P}>Cualquiera de las partes podrá dar por terminado anticipadamente el presente contrato en cualquier momento durante su vigencia, mediante notificación enviada con un mínimo de <b>TREINTA (30) días hábiles</b> de antelación, a través de los canales establecidos en la Cláusula Cuarta. Recibido dicho aviso, MOBI CHARGE S.A.S. dispondrá de <b>QUINCE (15) días hábiles</b> para el retiro de la(s) estación(es), durante los cuales estas continuarán en funcionamiento.</p>

<p style={H}>CLÁUSULA OCTAVA. OBLIGACIONES ESPECÍFICAS DE LA PARTE COMODANTE</p>
<p style={P}>Constituyen obligaciones de MOBI CHARGE S.A.S.:</p>
<p style={IX}>1. Proveer, a título de comodato y sin costo para EL ALIADO, los equipos, habladores y baterías externas acordados.</p>
<p style={IX}>2. Realizar la instalación y la conexión en línea de los equipos en el(los) punto(s) acordado(s).</p>
<p style={IX}>3. No exigir ningún tipo de pago a EL ALIADO por el uso de la(s) estación(es).</p>
<p style={IX}>4. Sustituir, sin costo para EL ALIADO, la(s) estación(es) y/o los dispositivos entregados en comodato que presenten desperfectos en su operatividad o funcionamiento.</p>
<p style={IX}>5. Verificar el correcto funcionamiento de la(s) estación(es) y de las baterías portátiles antes de su entrega a EL ALIADO.</p>
<p style={IX}>6. Brindar apoyo a EL ALIADO para el mantenimiento, la implementación y el cambio de la(s) estación(es), mediante indicaciones a través de los canales de comunicación acordados y, cuando sea necesario, con presencia física de un asesor o técnico de MOBI CHARGE S.A.S.</p>
<p style={IX}>7. Retirar las estaciones y/o baterías entregadas en comodato, a solicitud de EL ALIADO, al término del contrato o de sus prórrogas.</p>

<p style={H}>CLÁUSULA NOVENA. OBLIGACIONES ESPECÍFICAS DE EL ALIADO</p>
<p style={P}>Constituyen obligaciones de EL ALIADO:</p>
<p style={IX}>1. Proveer a MOBI CHARGE S.A.S. un lugar adecuado e idóneo para ubicar la(s) estación(es), con alta visibilidad y accesibilidad para los clientes. Cualquier modificación en el posicionamiento requerirá notificación formal a MOBI CHARGE S.A.S. y su aprobación expresa.</p>
<p style={IX}>2. Mantener la(s) estación(es) con suministro eléctrico durante las horas y días normales de operación del establecimiento, salvo en casos de fuerza mayor o corte de energía. EL ALIADO asumirá el costo del consumo eléctrico correspondiente.</p>
<p style={IX}>3. Asegurar que la(s) estación(es) se mantengan limpias, conforme al manual de uso y mantenimiento suministrado por MOBI CHARGE S.A.S.</p>
<p style={IX}>4. Colaborar con MOBI CHARGE S.A.S. en la operación básica y el mantenimiento de la(s) estación(es), en particular: garantizar que el equipo permanezca encendido y conectado a su toma eléctrica, verificar su funcionamiento y realizar limpieza básica según el manual entregado. Las tareas que requieran conocimientos técnicos previos serán atendidas por MOBI CHARGE S.A.S.</p>
<p style={IX}>5. Adoptar medidas preventivas ante cualquier actividad sospechosa o mal uso alrededor de la(s) estación(es), informar de inmediato a las autoridades y notificar a MOBI CHARGE S.A.S. con la mayor brevedad posible a través de los canales establecidos en la Cláusula Cuarta. En caso de pérdida del equipo, EL ALIADO deberá notificarlo a MOBI CHARGE S.A.S. y radicar la denuncia policial correspondiente de manera simultánea.</p>
<p style={IX}>6. Permitir el ingreso de representantes de MOBI CHARGE S.A.S. al establecimiento para realizar revisiones, inspecciones o recolección de evidencia relacionadas con la(s) estación(es).</p>
<p style={IX}><b>7. Responsabilidad por pérdida o daño — Cláusula Penal:</b> EL ALIADO está obligado a asegurar que la(s) estación(es) no se pierdan ni dañen. En caso de pérdida total o daño irreparable de algún equipo, la responsabilidad económica se distribuirá en partes iguales entre EL ALIADO y MOBI CHARGE S.A.S., correspondiéndole a cada parte el <b>cincuenta por ciento (50%)</b> del valor de reposición del equipo en el mercado a la fecha del siniestro. La parte correspondiente a EL ALIADO deberá pagarse dentro de los <b>diez (10) días hábiles</b> siguientes a la ocurrencia del hecho, tomando como referencia los valores consignados en la tabla siguiente, actualizados con el IPC acumulado desde la firma del contrato. En caso de daño parcial reparable, EL ALIADO responderá por el cien por ciento (100%) de los costos de reparación. Este pago no excluye la indemnización de perjuicios adicionales que MOBI CHARGE S.A.S. pueda acreditar:</p>

<table style={{width:"90%",borderCollapse:"collapse",margin:"8px 0 12px 16px",border:"0.5px solid #ccc"}}><thead><tr><th style={{...TH,width:"45%"}}>Tipo de equipo</th><th style={TH}>Cant.</th><th style={TH}>Valor unit. (USD)</th><th style={TH}>Valor total (USD)</th></tr></thead><tbody>{eq.filter(r=>r.tipo).map((r,i)=>(<tr key={i}><td style={{...TD,minWidth:160}}>{r.tipo}</td><td style={TD}>{r.cant}</td><td style={TD}>{r.unitario?`USD $${r.unitario}`:""}</td><td style={TD}>{r.total?`USD $${r.total}`:""}</td></tr>))}</tbody></table>

<p style={IX}>8. Designar un representante responsable de la relación con MOBI CHARGE S.A.S., con facultad de decisión para aprobar y ejecutar lo establecido en esta cláusula.</p>
<p style={IX}>9. Los ajustes decididos por MOBI CHARGE S.A.S. tomarán efecto en la fecha en que la notificación sea enviada a EL ALIADO y, cuando sea necesaria su aprobación, en la fecha en que esta se otorgue. El incumplimiento de los tiempos acordados para implementar dichos ajustes generará a cargo de EL ALIADO una penalidad equivalente al valor monetario promedio diario de los costos o pérdidas de beneficios causados a MOBI CHARGE S.A.S. por cada día adicional de incumplimiento.</p>

<p style={H}>CLÁUSULA DÉCIMA. CESIÓN DEL CONTRATO</p>
<p style={P}>EL ALIADO no podrá ceder el presente contrato sin autorización previa, expresa y escrita de LA PARTE COMODANTE. Igualmente, EL ALIADO no podrá ceder, total ni parcialmente, la(s) estación(es) objeto del presente contrato sin dicho consentimiento.</p>

<p style={H}>CLÁUSULA UNDÉCIMA. PAGO Y DISTRIBUCIÓN DE INGRESOS</p>
<p style={P}>MOBI CHARGE S.A.S. reconocerá a EL ALIADO la comisión establecida en la Cláusula Segunda del presente contrato.</p>
<p style={P}>MOBI CHARGE S.A.S. revisará y confirmará con EL ALIADO, el día quince (15) de cada mes —o el día hábil siguiente si dicha fecha recae en día de descanso o festivo—, el ingreso de capital generado por la(s) estación(es) en el(los) establecimiento(s) de EL ALIADO durante el mes inmediatamente anterior, y transferirá la comisión correspondiente a la cuenta bancaria designada por EL ALIADO conforme a la información registrada a continuación.</p>
<p style={P}>Los valores adeudados por cualquiera de las partes que no sean cancelados en las fechas pactadas causarán intereses de mora a la tasa del <b>diez por ciento (10%) efectivo anual (e.a.)</b>, calculados desde el día siguiente al vencimiento del plazo hasta la fecha de pago efectivo.</p>
<p style={P}>Si EL ALIADO incumple cualquier obligación a su cargo, deberá pagar a MOBI CHARGE S.A.S. la suma de las pérdidas o costos asociados al incumplimiento, sin que dicho pago lo exima de la obligación de responder por el valor de reposición de la(s) estación(es) en caso de pérdida total, o de los costos de reparación necesarios para restituirla(s) al estado en que fue(ron) entregada(s).</p>
<p style={P}>A la cuenta bancaria indicada a continuación se realizarán todas las transferencias de comisiones y demás pagos a favor de EL ALIADO derivados del presente contrato:</p>
<p style={{...P,paddingLeft:16}}>Nombre del banco: {blank(ba.banco)}<br/>Propietario de la cuenta: {blank(ba.prop)}<br/>Identificación del titular: {blank(ba.id)}<br/>Tipo de cuenta: {blank(ba.tipo)}<br/>N.° de cuenta: {blank(ba.num)}</p>

<p style={H}>CLÁUSULA DUODÉCIMA. TERMINACIÓN ANTICIPADA POR CAUSALES ESPECÍFICAS</p>
<p style={P}>EL ALIADO y MOBI CHARGE S.A.S., de manera conjunta o unilateral, podrán dar por terminado el presente contrato de forma anticipada si ocurre alguna de las siguientes situaciones: a) disolución de MOBI CHARGE S.A.S.; b) necesidad imprevista y urgente de la(s) estación(es) por parte de MOBI CHARGE S.A.S., entendida como cualquier situación que pueda generar pérdidas monetarias para la compañía; c) incumplimiento de las obligaciones pactadas en el presente acuerdo; d) resultados inferiores a las metas acordadas entre las partes, las cuales deberán quedar definidas en el Anexo de Metas suscrito al momento de la instalación, con indicadores objetivos y medibles.</p>

<p style={H}>CLÁUSULA DECIMOTERCERA. RESTITUCIÓN DE EQUIPOS</p>
<p style={P}>Vencido o terminado el contrato por cualquier causa, EL ALIADO deberá permitir el retiro de la(s) estación(es) dentro de los <b>cinco (5) días hábiles</b> siguientes a la notificación de terminación. Si transcurrido dicho plazo EL ALIADO impide o dificulta el retiro, MOBI CHARGE S.A.S. quedará facultada para iniciar la acción de restitución de bien mueble ante la autoridad competente, sin perjuicio de cobrar a EL ALIADO una penalidad diaria equivalente al cero punto cinco por ciento (0,5%) del valor del equipo retenido por cada día de retención injustificada, contado desde el vencimiento del plazo anterior.</p>

<p style={H}>CLÁUSULA DECIMOCUARTA. PUBLICIDAD DIGITAL EN PANTALLAS (DOOH)</p>
<p style={P}>MOBI CHARGE S.A.S. tendrá derecho exclusivo a comercializar el espacio publicitario de las pantallas integradas en las estaciones instaladas en el(los) establecimiento(s) de EL ALIADO. Los ingresos derivados de dicha publicidad digital pertenecen en su totalidad a MOBI CHARGE S.A.S., sin que EL ALIADO pueda exigir participación económica adicional a la comisión establecida en la Cláusula Segunda.</p>
<p style={P}>Como reconocimiento a la presencia de las pantallas en su establecimiento, MOBI CHARGE S.A.S. asignará a EL ALIADO el <b>diez por ciento (10%)</b> del tiempo de pauta disponible en las pantallas ubicadas en su(s) establecimiento(s), para que EL ALIADO lo destine a contenido propio o comercial de su elección. Este tiempo será coordinado entre las partes mediante los canales establecidos en la Cláusula Cuarta, y no podrá acumularse ni transferirse a terceros.</p>
<p style={P}>Los anunciantes gestionados por MOBI CHARGE S.A.S. deberán alinearse con las políticas comerciales, de imagen y de convivencia de EL ALIADO, comunicadas previamente por escrito. MOBI CHARGE S.A.S. se compromete a no pautar contenido que represente competencia directa para el negocio principal de EL ALIADO, que contravenga sus valores institucionales o que genere un conflicto de interés evidente con su actividad comercial. Ante cualquier objeción fundamentada de EL ALIADO sobre un anunciante específico, MOBI CHARGE S.A.S. evaluará el caso y, de confirmarse el conflicto, retirará o reemplazará dicho contenido en un plazo no mayor a <b>cinco (5) días hábiles</b>.</p>

<p style={H}>CLÁUSULA DECIMOQUINTA. RESPONSABILIDAD E INDEMNIDAD</p>
<p style={P}><b>Sección 15.01 Responsabilidad general.</b> Las partes serán responsables de los daños o perjuicios que causen a la otra parte en el marco de sus obligaciones derivadas del presente contrato.</p>
<p style={P}><b>Sección 15.02 Responsabilidad de LA PARTE COMODANTE.</b> MOBI CHARGE S.A.S. es la única responsable del uso de los cargadores portátiles y de la plataforma tecnológica (app), así como de la introducción de datos, documentos, texto, audio, video, imágenes y otros contenidos cargados por los usuarios. El usuario es y seguirá siendo el único propietario de todos sus datos; no obstante, con la firma de este contrato faculta a MOBI CHARGE S.A.S. para utilizarlos en la prestación del servicio. EL ALIADO tratará los datos facilitados por MOBI CHARGE S.A.S. como confidenciales y solo los comunicará a sus empleados, entidades afiliadas, contratistas y proveedores para efectos exclusivos de la prestación del servicio.</p>
<p style={P}>Mediante la suscripción de este contrato, EL ALIADO acepta y autoriza a MOBI CHARGE S.A.S. para compilar información estadística relacionada con el rendimiento del servicio, en la medida en que dicha información no identifique de forma explícita a personas naturales, conforme a la Ley 1581 de 2012.</p>
<p style={P}><b>Parágrafo.</b> MOBI CHARGE S.A.S. se reserva el derecho de almacenar y realizar copias de seguridad de la información recolectada a través de la plataforma tecnológica.</p>
<p style={P}><b>Sección 15.03 Exclusión de responsabilidad.</b> EL ALIADO no será responsable de daños o perjuicios causados a los usuarios cuando ocurra alguno de los siguientes eventos: (i) fuerza mayor o caso fortuito; (ii) pérdida de beneficios esperados por el cliente con el uso de la plataforma; (iii) indisponibilidad de la plataforma por causas fuera de los niveles de servicio acordados; (iv) suspensión del servicio por mantenimiento correctivo o preventivo; (v) daño a terceros por incumplimiento de limitaciones de uso por parte de MOBI CHARGE S.A.S. o sus autorizados; (vi) modificaciones urgentes necesarias por causas ajenas a la voluntad de EL ALIADO, incluyendo fallas eléctricas, atmosféricas o de software; (vii) virus importados a través de la red; (viii) uso inadecuado de la plataforma por parte de los usuarios.</p>
<p style={P}><b>Sección 15.04 Indemnidad.</b> MOBI CHARGE S.A.S. se compromete a mantener indemne a EL ALIADO, y a sus accionistas, socios, directivos y gerentes, frente a cualquier pérdida o reclamación que surja de: (i) incumplimiento de este contrato por parte de MOBI CHARGE S.A.S.; (ii) violación de la ley aplicable por parte de MOBI CHARGE S.A.S.; (iii) reclamaciones relativas a daños causados por el uso de la plataforma tecnológica; (iv) violación de los derechos de EL ALIADO por parte de MOBI CHARGE S.A.S.; (v) cualquier reclamación, daño, pérdida u honorarios legales relacionados con el incumplimiento de este contrato o actos u omisiones de MOBI CHARGE S.A.S.</p>

<p style={H}>CLÁUSULA DECIMOSEXTA. AUTORIZACIÓN PARA RECOLECCIÓN Y TRATAMIENTO DE DATOS PERSONALES</p>
<p style={P}>Con el propósito de dar un adecuado tratamiento a los datos personales de EL ALIADO, de conformidad con el régimen general de protección de datos reglamentado por la Constitución Política Nacional, la Ley 1581 de 2012, el Decreto 1377 de 2013 y demás normas concordantes, las partes manifiestan contar con políticas de tratamiento de datos personales, publicadas en www.mobicharge.org. En consecuencia, las partes aceptan la forma en que se hará uso de sus datos personales presentes y futuros.</p>
<p style={P}>MOBI CHARGE S.A.S. es responsable del tratamiento de los datos personales de los usuarios finales que interactúan con la app y los equipos. EL ALIADO no tendrá acceso ni uso sobre dichos datos, salvo autorización expresa y escrita de MOBI CHARGE S.A.S.</p>

<p style={H}>CLÁUSULA DECIMOSÉPTIMA. CONFIDENCIALIDAD — RESERVA DE LA INFORMACIÓN</p>
<p style={P}>Toda la información que las partes intercambien en desarrollo del presente contrato tiene carácter reservado. Las partes se comprometen a guardar estricta reserva sobre dicha información y a no divulgarla a terceros ni utilizarla para propósitos distintos del cumplimiento del objeto contractual.</p>
<p style={P}><b>Parágrafo primero.</b> Se considera confidencial, de manera enunciativa y no taxativa, la siguiente información de MOBI CHARGE S.A.S.: estados financieros, declaraciones de renta, balances, software, patentes, diseños industriales, propuestas comerciales, informes estadísticos o de ventas, manuales de funciones y procedimientos, contratos, actas de socios y junta directiva, información de productos, bases de datos y cualquier otro documento sensible para el giro ordinario del negocio.</p>
<p style={P}><b>Parágrafo segundo.</b> Son objeto especial de este acuerdo las técnicas de producción y mercadeo de los productos de MOBI CHARGE S.A.S., así como el know-how de la compañía, en cualquier medio.</p>
<p style={P}><b>Parágrafo tercero.</b> La violación de este acuerdo de confidencialidad será considerada falta grave y causal de terminación del contrato con justa causa imputable a EL ALIADO. En dicho caso, sin perjuicio de las acciones legales correspondientes, EL ALIADO deberá pagar a MOBI CHARGE S.A.S. una cláusula penal equivalente a <b>VEINTE (20) salarios mínimos legales mensuales vigentes (SMLMV)</b> a título de indemnización por daños y perjuicios.</p>

<p style={H}>CLÁUSULA DECIMOCTAVA. PROPIEDAD INTELECTUAL</p>
<p style={P}>El objeto del presente contrato no transfiere a EL ALIADO ningún derecho de propiedad intelectual sobre las estaciones, las baterías, el software, la plataforma tecnológica, la marca MOBI CHARGE ni ningún otro activo intangible de MOBI CHARGE S.A.S. EL ALIADO reconoce que dichos derechos pertenecen exclusivamente a MOBI CHARGE S.A.S. y se obliga a no reproducirlos, modificarlos ni explotarlos de ninguna forma.</p>
<p style={P}>En caso de que EL ALIADO, con ocasión de la ejecución del presente contrato, realice mejoras, adaptaciones o sugerencias concretas sobre el funcionamiento de las estaciones o el servicio prestado a través de ellas, dichas contribuciones se entenderán cedidas a MOBI CHARGE S.A.S. a título gratuito, sin que ello genere obligación adicional alguna para MOBI CHARGE S.A.S. ni derecho patrimonial para EL ALIADO. Esta cesión se limita estrictamente a mejoras sobre los equipos y el servicio objeto de este contrato, y no se extiende a la actividad comercial propia del establecimiento de EL ALIADO.</p>

<p style={H}>CLÁUSULA DECIMONOVENA. ÉTICA Y TRANSPARENCIA</p>
<p style={P}>EL ALIADO se obliga a conocer, entender y cumplir los controles, políticas y código de ética establecidos por MOBI CHARGE S.A.S. en materia de seguridad y protección de la información. En particular, EL ALIADO tendrá las siguientes prohibiciones: a) instalar en los equipos de cómputo asignados por MOBI CHARGE S.A.S. o de sus clientes programas no institucionales o sin licencia; b) modificar el software instalado por MOBI CHARGE S.A.S. salvo autorización expresa; c) desarrollar sistemas o programas no autorizados; d) interferir transmisiones de voz, datos u otro tipo sin propósito legítimo; e) monitorear comunicaciones sin autorización; f) utilizar información confidencial para beneficio propio o de terceros.</p>
<p style={P}>Las partes declaran su compromiso en la lucha contra la corrupción y el soborno, y se obligan a abstenerse de ofrecer, dar o prometer dádivas, sumas de dinero o cualquier beneficio a servidores públicos o particulares con el fin de obtener ventajas indebidas. El incumplimiento de esta cláusula constituye falta grave y faculta a la parte afectada para dar por terminado el contrato, siendo la parte incumplida responsable de todos los perjuicios causados.</p>

<p style={H}>CLÁUSULA VIGÉSIMA. PREVENCIÓN DE RIESGOS LA/FT Y CORRUPCIÓN</p>
<p style={P}>EL ALIADO declara bajo la gravedad de juramento que el origen de su patrimonio y las actividades propias de su oficio son de legítima y lícita procedencia, y se compromete a no realizar actividades vinculadas con lavado de activos o financiación del terrorismo. EL ALIADO declara conocer y aceptar el Manual de SARLAFT de MOBI CHARGE S.A.S. y se obliga a cumplir todas las políticas en materia de prevención y control de lavado de activos y financiación del terrorismo.</p>
<p style={P}>MOBI CHARGE S.A.S. podrá dar por terminada unilateralmente la relación comercial, sin lugar al pago de indemnización, cuando EL ALIADO sea: a) condenado por delitos relacionados con lavado de activos, delitos fuente o financiación del terrorismo; b) sancionado administrativamente por violaciones a normas anticorrupción; c) incluido en listas de control nacional o internacional de lavado de activos o financiación del terrorismo; d) vinculado a investigaciones judiciales, administrativas, disciplinarias o fiscales por dichas conductas.</p>
<p style={P}><b>Parágrafo.</b> En caso de hurtos, fraudes o cualquier acto que atente contra los intereses de MOBI CHARGE S.A.S., EL ALIADO autoriza la realización de las investigaciones correspondientes, sin que ello constituya vulneración de su derecho a la privacidad o intimidad.</p>

<p style={H}>CLÁUSULA VIGÉSIMA PRIMERA. SOLUCIÓN DE CONTROVERSIAS</p>
<p style={P}>Las diferencias que surjan entre las partes con ocasión del presente contrato serán resueltas, en primera instancia, mediante conciliación extrajudicial ante un centro de conciliación debidamente autorizado. Si la conciliación fracasa o las partes no llegan a un acuerdo dentro de los treinta (30) días hábiles siguientes a la presentación de la solicitud, las controversias serán resueltas mediante arbitramento ante el Centro de Arbitraje y Conciliación de la Cámara de Comercio de Bogotá, conforme a su reglamento, mediante un (1) árbitro, con fallo en derecho.</p>

<p style={H}>CLÁUSULA VIGÉSIMA SEGUNDA. INTEGRACIÓN Y MODIFICACIONES</p>
<p style={P}>El presente contrato reemplaza y deja sin efecto cualquier otro contrato escrito o verbal, así como cualquier acuerdo suscrito o convenido entre las partes con anterioridad. En consecuencia, este es el único texto contractual aplicable entre las partes. Las modificaciones que se acuerden se formalizarán mediante otrosí suscrito por ambas partes.</p>
<p style={P}>Los derechos sobre este contrato son intransferibles, en atención a la naturaleza intuitu personae del mismo. Solo podrán transferirse con autorización expresa y escrita de ambas partes.</p>

<p style={{...P,marginTop:16}}>Se suscribe en la ciudad de Bogotá D.C., en dos ejemplares del mismo tenor y valor, con destino a cada una de las partes, a los {blank(fi.dia,30)} días del mes de {blank(fi.mes,80)} del año {blank(fi.anio,40)}.</p>

<div style={{display:"flex",gap:40,marginTop:48}}>
<div style={{flex:1}}><div style={{borderBottom:"1px solid #000",height:36}}/><p style={{fontSize:10,marginTop:4}}><b>Firma de EL ALIADO</b><br/>Nombre: {fmtName(al.rep)}<br/>Identificación: {fmtCC2(al.cc)}<br/>Fecha:</p></div>
<div style={{flex:1}}><div style={{borderBottom:"1px solid #000",height:36}}/><p style={{fontSize:10,marginTop:4}}><b>David Camilo Baquero Gómez</b><br/>Representante Legal — Mobi Charge S.A.S.<br/>C.C. 1.000.180.024 de Cota<br/>Fecha:</p></div>
</div>
</div>);
}

export default function App(){
  const [step,setStep]=useState(0);
  const [data,setData]=useState(initialData);
  const [preview,setPreview]=useState(false);
  const [errors,setErrors]=useState({});
  const [tried,setTried]=useState({});
  const printRef=useRef();

  const upd=(sec,fld,val)=>{setData(p=>({...p,[sec]:{...p[sec],[fld]:val}}));if(errors[`${sec}.${fld}`]){setErrors(p=>{const n={...p};delete n[`${sec}.${fld}`];return n;});}};
  const recalcPB=(eq)=>{const pbRef=REFS.find(r=>r.nombre==="Power bank");let totalPB=0;eq.forEach(r=>{if(r._auto)return;const c=getPBCount(r.tipo);if(c>0)totalPB+=c*(Number(r.cant)||0);});const pbIdx=eq.findIndex(r=>r._auto);if(totalPB>0){const pbRow={tipo:"Power bank",cant:String(totalPB),unitario:String(pbRef.precio),total:String(totalPB*pbRef.precio),_auto:true};if(pbIdx>=0)eq[pbIdx]=pbRow;else eq.push(pbRow);}else if(pbIdx>=0){eq.splice(pbIdx,1);}return eq;};
  const updEquip=(i,fld,val)=>{setData(p=>{let eq=[...p.equipos];const row={...eq[i],[fld]:val};if(fld==="tipo"){const ref=REFS.find(r=>r.nombre===val);row.unitario=ref?String(ref.precio):"";row.total=ref&&row.cant?String(Number(row.cant)*ref.precio):"";}if(fld==="cant"){const u=Number(row.unitario)||0;row.total=val?String(Number(val)*u):"";}eq[i]=row;eq=recalcPB(eq);return{...p,equipos:eq}});if(errors["equipos"])setErrors(p=>{const n={...p};delete n.equipos;return n;});};
  const addRow=()=>setData(p=>({...p,equipos:[...p.equipos,{tipo:"",cant:"",unitario:"",total:""}]}));
  const removeRow=i=>setData(p=>{let eq=[...p.equipos].filter((_,j)=>j!==i);eq=recalcPB(eq);return{...p,equipos:eq.length?eq:[{tipo:"",cant:"",unitario:"",total:""}]};});


  const validate=(s)=>{
    const e={};const d=data;
    if(s===0){if(!d.aliado.empresa)e["aliado.empresa"]="Requerido";if(!d.aliado.nit)e["aliado.nit"]="Requerido";if(!d.aliado.dir)e["aliado.dir"]="Requerido";if(!d.aliado.tel)e["aliado.tel"]="Requerido";if(!d.aliado.rep)e["aliado.rep"]="Requerido";if(!d.aliado.correo)e["aliado.correo"]="Requerido";if(d.aliado.correo&&!d.aliado.correo.includes("@"))e["aliado.correo"]="Formato inválido";if(!d.aliado.cc)e["aliado.cc"]="Requerido";if(!d.aliado.ccExp)e["aliado.ccExp"]="Requerido";}
    if(s===1){if(!d.canales.correo)e["canales.correo"]="Requerido";if(d.canales.correo&&!d.canales.correo.includes("@"))e["canales.correo"]="Formato inválido";if(!d.canales.whatsapp)e["canales.whatsapp"]="Requerido";if(!d.duracion.diaI)e["duracion.diaI"]="Requerido";if(!d.duracion.mesI)e["duracion.mesI"]="Requerido";if(!d.duracion.anioI)e["duracion.anioI"]="Requerido";}
    if(s===2){if(!d.equipos.some(r=>r.tipo&&r.cant))e["equipos"]="Diligencia al menos una fila completa (tipo y cantidad)";}
    if(s===3){if(!d.banco.banco)e["banco.banco"]="Requerido";if(!d.banco.prop)e["banco.prop"]="Requerido";if(!d.banco.id)e["banco.id"]="Requerido";if(!d.banco.tipo)e["banco.tipo"]="Requerido";if(!d.banco.num)e["banco.num"]="Requerido";}
    return e;
  };

  const next=()=>{const e=validate(step);setErrors(e);setTried(p=>({...p,[step]:true}));if(Object.keys(e).length===0)setStep(step+1);};
  const er=k=>tried[step]?errors[k]:undefined;

  const handlePrint=()=>{const c=printRef.current;const w=window.open("","_blank","width=816,height=1056");w.document.write(`<!DOCTYPE html><html><head><title>Contrato Mobi Charge</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Helvetica,Arial,sans-serif;padding:60px 72px;font-size:10px;line-height:1.65;color:#111}@page{margin:2.2cm 2.5cm;size:letter}table{page-break-inside:avoid}</style></head><body>${c.innerHTML}</body></html>`);w.document.close();setTimeout(()=>w.print(),500);};

  if(preview) return(
    <div style={{background:"#f0f0f0",minHeight:"100vh",padding:"16px 12px"}}>
      <div className="no-print" style={{maxWidth:700,margin:"0 auto 16px",display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
        <button onClick={()=>setPreview(false)} style={{padding:"10px 24px",fontSize:14,border:`1.5px solid ${C.border}`,borderRadius:8,background:C.white,cursor:"pointer",fontFamily:"inherit"}}>Volver al formulario</button>
        <button onClick={handlePrint} style={{padding:"10px 28px",fontSize:14,border:"none",borderRadius:8,background:C.purple,color:C.white,cursor:"pointer",fontWeight:600,fontFamily:"inherit"}}>Imprimir / Guardar PDF</button>
      </div>
      <div style={{maxWidth:740,margin:"0 auto",background:C.white,padding:"clamp(24px,5vw,56px) clamp(16px,5vw,64px)",borderRadius:4,boxShadow:"0 2px 16px rgba(0,0,0,0.08)"}}>
        <ContractPrint d={data} printRef={printRef}/>
      </div>
    </div>
  );

  const card={background:C.white,borderRadius:12,padding:"clamp(20px,4vw,28px)",border:`1px solid ${C.border}`,marginBottom:8};
  const nav={display:"flex",gap:12,justifyContent:"flex-end",marginTop:24,flexWrap:"wrap"};
  const btnP={padding:"12px 28px",fontSize:14,border:"none",borderRadius:8,background:C.purple,color:C.white,cursor:"pointer",fontWeight:600,fontFamily:"inherit"};
  const btnS={padding:"12px 28px",fontSize:14,border:`1.5px solid ${C.border}`,borderRadius:8,background:C.white,cursor:"pointer",fontFamily:"inherit"};
  const btnG={padding:"12px 28px",fontSize:14,border:"none",borderRadius:8,background:C.green,color:C.dark,cursor:"pointer",fontWeight:600,fontFamily:"inherit"};
  const eqCSS={width:"100%",padding:"9px 8px",border:"1.5px solid #eee",borderRadius:6,fontSize:13,fontFamily:"inherit",background:"#fafafa",boxSizing:"border-box"};

  return(
    <div style={{background:C.bg,minHeight:"100vh"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      <div style={{maxWidth:580,margin:"0 auto",padding:"clamp(24px,5vw,40px) clamp(12px,3vw,24px)",fontFamily:"'DM Sans',sans-serif"}}>
        <div style={{textAlign:"center",marginBottom:12}}>
          <img src={LOGO_B64} alt="Mobi Charge" style={{width:60,marginBottom:8}}/>
          <h1 style={{fontSize:"clamp(18px,4vw,22px)",fontWeight:700,color:C.dark,letterSpacing:"-0.02em",margin:0}}>Contrato de Colaboración Comercial</h1>
          <p style={{fontSize:13,color:C.muted,marginTop:4}}>Mobi Charge S.A.S. — Formulario de diligenciamiento</p>
        </div>
        <StepIndicator current={step}/>

        {step===0&&<div style={card}>
          <p style={{fontSize:14,fontWeight:600,color:C.purple,marginBottom:20}}>Información del Aliado</p>
          <Row><Input label="Nombre de la compañía" value={data.aliado.empresa} onChange={v=>upd("aliado","empresa",v)} error={er("aliado.empresa")} hint="Se mostrará en mayúsculas en el contrato"/><Input label="NIT" value={data.aliado.nit} onChange={v=>upd("aliado","nit",v)} numeric error={er("aliado.nit")} hint="Solo números, sin guion de verificación"/></Row>
          <Row cols={1}><Input label="Dirección" value={data.aliado.dir} onChange={v=>upd("aliado","dir",v)} error={er("aliado.dir")}/></Row>
          <Row><Input label="Teléfono" value={data.aliado.tel} onChange={v=>upd("aliado","tel",v)} numeric error={er("aliado.tel")} hint="Solo números"/><Input label="Correo electrónico" value={data.aliado.correo} onChange={v=>upd("aliado","correo",v)} error={er("aliado.correo")} placeholder="correo@empresa.com"/></Row>
          <Row cols={1}><Input label="Representante legal (nombre completo)" value={data.aliado.rep} onChange={v=>upd("aliado","rep",v)} error={er("aliado.rep")} hint="Se mostrará en mayúsculas en el contrato"/></Row>
          <Row><Input label="Cédula del representante" value={data.aliado.cc} onChange={v=>upd("aliado","cc",v)} numeric error={er("aliado.cc")} hint="Solo números — se formateará con puntos (ej: 1.000.180.024)"/><Input label="Expedida en" value={data.aliado.ccExp} onChange={v=>upd("aliado","ccExp",v)} error={er("aliado.ccExp")} hint="Ciudad o municipio de expedición"/></Row>
          <div style={nav}><button style={btnP} onClick={next}>Siguiente</button></div>
        </div>}

        {step===1&&<div style={card}>
          <p style={{fontSize:14,fontWeight:600,color:C.purple,marginBottom:20}}>Canales de comunicación del Aliado</p>
          <Row><Input label="Correo electrónico oficial" value={data.canales.correo} onChange={v=>upd("canales","correo",v)} error={er("canales.correo")} placeholder="correo@empresa.com"/><Input label="WhatsApp" value={data.canales.whatsapp} onChange={v=>upd("canales","whatsapp",v)} numeric error={er("canales.whatsapp")} hint="Solo números"/></Row>
          <p style={{fontSize:14,fontWeight:600,color:C.purple,margin:"8px 0 20px"}}>Duración del contrato</p>
          <p style={{fontSize:11,color:C.muted,marginBottom:12}}>Fecha de inicio</p>
          <Row cols={3}><Select label="Día" value={data.duracion.diaI} onChange={v=>upd("duracion","diaI",v)} options={DAYS} error={er("duracion.diaI")}/><Select label="Mes" value={data.duracion.mesI} onChange={v=>upd("duracion","mesI",v)} options={MONTHS} error={er("duracion.mesI")}/><Select label="Año" value={data.duracion.anioI} onChange={v=>upd("duracion","anioI",v)} options={YEARS} error={er("duracion.anioI")}/></Row>
          {(()=>{
            const di=data.duracion.diaI,mi=data.duracion.mesI,ai=data.duracion.anioI;
            if(di&&mi&&ai){
              const mIdx=MONTHS.indexOf(mi);
              const start=new Date(Number(ai),mIdx,Number(di));
              const end=new Date(start);end.setFullYear(end.getFullYear()+1);end.setDate(end.getDate()-1);
              const ed=String(end.getDate()).padStart(2,"0"),em=MONTHS[end.getMonth()],ey=String(end.getFullYear());
              if(data.duracion.diaF!==ed||data.duracion.mesF!==em||data.duracion.anioF!==ey){
                setTimeout(()=>{upd("duracion","diaF",ed);upd("duracion","mesF",em);upd("duracion","anioF",ey);},0);
              }
              return <div style={{background:"#f8f8f6",borderRadius:8,padding:16,marginBottom:18}}>
                <p style={{fontSize:11,color:C.muted,marginBottom:4}}>Fecha de finalización (12 meses)</p>
                <p style={{fontSize:14,fontWeight:600,color:C.dark}}>{ed} de {em} de {ey}</p>
                <p style={{fontSize:10,color:C.muted,marginTop:4,fontStyle:"italic"}}>Calculada automáticamente: inicio + 12 meses − 1 día.</p>
              </div>;
            }
            return <div style={{background:"#f8f8f6",borderRadius:8,padding:16,marginBottom:18,opacity:0.6}}>
              <p style={{fontSize:11,color:C.muted}}>Fecha de finalización</p>
              <p style={{fontSize:12,color:C.muted,fontStyle:"italic"}}>Se calculará al completar la fecha de inicio.</p>
            </div>;
          })()}
          <div style={nav}><button style={btnS} onClick={()=>setStep(0)}>Atrás</button><button style={btnP} onClick={next}>Siguiente</button></div>
        </div>}

        {step===2&&<div style={card}>
          <p style={{fontSize:14,fontWeight:600,color:C.purple,marginBottom:4}}>Tabla de equipos entregados</p>
          <p style={{fontSize:11,color:C.muted,marginBottom:20}}>Registra los equipos a entregar en comodato. Al menos una fila debe estar completa.</p>
          <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,minWidth:480}}>
              <thead><tr>{["Tipo de equipo","Cant.","Val. unit. USD","Val. total USD",""].map((h,i)=>(
                <th key={i} style={{textAlign:"left",padding:"8px 4px",fontSize:11,fontWeight:600,color:"#555",borderBottom:`1.5px solid ${C.border}`}}>{h}</th>
              ))}</tr></thead>
              <tbody>{data.equipos.map((r,i)=>(
                <tr key={i}>
                  <td style={{padding:"6px 4px"}}><select value={r.tipo} onChange={e=>updEquip(i,"tipo",e.target.value)} disabled={!!r._auto} style={{...eqCSS,cursor:r._auto?"default":"pointer",appearance:"auto",opacity:r._auto?0.7:1}}><option value="">Seleccionar equipo...</option>{REFS.map(ref=><option key={ref.nombre} value={ref.nombre}>{ref.nombre}</option>)}</select></td>
                  <td style={{padding:"6px 4px",width:65}}><input value={r.cant} onChange={e=>updEquip(i,"cant",numOnly(e.target.value))} inputMode="numeric" disabled={!!r._auto} style={{...eqCSS,textAlign:"center",opacity:r._auto?0.7:1}} placeholder="0"/></td>
                  <td style={{padding:"6px 4px",width:100}}><div style={{...eqCSS,textAlign:"right",background:"#f0f0ee",color:r.unitario?"#333":"#aaa",display:"flex",alignItems:"center",justifyContent:"flex-end",minHeight:36}}>{r.unitario?`$${r.unitario}`:"—"}</div></td>
                  <td style={{padding:"6px 4px",width:100}}><div style={{...eqCSS,textAlign:"right",background:"#f0f0ee",color:r.total?"#333":"#aaa",fontWeight:r.total?600:400,display:"flex",alignItems:"center",justifyContent:"flex-end",minHeight:36}}>{r.total?`$${r.total}`:"—"}</div></td>
                  <td style={{padding:"6px 4px",width:36}}>{data.equipos.length>1&&!r._auto&&<button onClick={()=>removeRow(i)} style={{background:"none",border:"none",fontSize:18,cursor:"pointer",color:"#c0392b",fontWeight:700,lineHeight:1}} title="Eliminar fila">×</button>}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <button onClick={addRow} style={{marginTop:12,padding:"8px 16px",fontSize:12,fontWeight:600,border:`1.5px dashed ${C.green}`,borderRadius:6,background:"transparent",color:C.green,cursor:"pointer",fontFamily:"inherit"}}>+ Agregar equipo</button>
          {tried[step]&&errors["equipos"]&&<div style={errCSS}>{errors["equipos"]}</div>}
          <div style={nav}><button style={btnS} onClick={()=>setStep(1)}>Atrás</button><button style={btnP} onClick={next}>Siguiente</button></div>
        </div>}

        {step===3&&<div style={card}>
          <p style={{fontSize:14,fontWeight:600,color:C.purple,marginBottom:20}}>Información bancaria del Aliado</p>
          <Row><Input label="Nombre del banco" value={data.banco.banco} onChange={v=>upd("banco","banco",v)} error={er("banco.banco")}/><Input label="Propietario de la cuenta" value={data.banco.prop} onChange={v=>upd("banco","prop",v)} error={er("banco.prop")}/></Row>
          <Row><Input label="Identificación del titular" value={data.banco.id} onChange={v=>upd("banco","id",v)} numeric error={er("banco.id")} hint="Solo números"/><Select label="Tipo de cuenta" value={data.banco.tipo} onChange={v=>upd("banco","tipo",v)} options={["Ahorros","Corriente"]} error={er("banco.tipo")}/></Row>
          <Row cols={1}><Input label="N.° de cuenta" value={data.banco.num} onChange={v=>upd("banco","num",v)} numeric error={er("banco.num")} hint="Solo números"/></Row>
          <div style={{background:"#f8f8f6",borderRadius:8,padding:16,marginTop:8}}>
            <p style={{fontSize:12,color:C.muted}}>Fecha de suscripción: <b style={{color:C.dark}}>{data.firma.dia} de {data.firma.mes} de {data.firma.anio}</b></p>
            <p style={{fontSize:10,color:C.muted,marginTop:4,fontStyle:"italic"}}>Se toma automáticamente la fecha de hoy.</p>
          </div>
          <div style={nav}><button style={btnS} onClick={()=>setStep(2)}>Atrás</button><button style={btnP} onClick={next}>Revisar contrato</button></div>
        </div>}

        {step===4&&<div style={card}>
          <p style={{fontSize:14,fontWeight:600,color:C.purple,marginBottom:8}}>Contrato listo para generar</p>
          <p style={{fontSize:12,color:C.muted,marginBottom:20}}>Revisa los datos. Al generar, se abrirá la vista previa del contrato completo para imprimir o guardar como PDF.</p>
          <div style={{background:"#f8f8f6",borderRadius:8,padding:"clamp(14px,3vw,20px)",fontSize:12,lineHeight:2,marginBottom:20,borderLeft:`3px solid ${C.green}`}}>
            <p><b>Aliado:</b> {toUpper(data.aliado.empresa)} · NIT {data.aliado.nit}</p>
            <p><b>Representante:</b> {toUpper(data.aliado.rep)} · C.C. {formatCC(data.aliado.cc)}</p>
            <p><b>Canales:</b> {data.canales.correo} · {data.canales.whatsapp}</p>
            <p><b>Vigencia:</b> {data.duracion.diaI} de {data.duracion.mesI} de {data.duracion.anioI} → {data.duracion.diaF} de {data.duracion.mesF} de {data.duracion.anioF}</p>
            <p><b>Equipos:</b> {data.equipos.filter(e=>e.tipo).length} registrado(s)</p>
            <p><b>Banco:</b> {data.banco.banco} · {data.banco.tipo} {data.banco.num}</p>
            <p><b>Fecha firma:</b> {data.firma.dia} de {data.firma.mes} de {data.firma.anio}</p>
          </div>
          <div style={nav}>
            <button style={btnS} onClick={()=>setStep(3)}>Atrás</button>
            <button style={btnG} onClick={()=>setPreview(true)}>Generar contrato</button>
          </div>
        </div>}
      </div>
    </div>
  );
}