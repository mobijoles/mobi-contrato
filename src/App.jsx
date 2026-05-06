import { useState, useRef } from "react";

const MONTHS = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const DAYS = Array.from({length:31},(_,i)=>String(i+1).padStart(2,"0"));
const YEARS = Array.from({length:8},(_,i)=>String(2024+i));

const defaultEquip = Array.from({length:5},()=>({tipo:"",cant:"",unitario:"",total:""}));

const initialData = {
  aliado:{empresa:"",nit:"",dir:"",tel:"",rep:"",correo:"",cc:"",ccExp:""},
  canales:{correo:"",whatsapp:""},
  duracion:{diaI:"",mesI:"",anioI:"",diaF:"",mesF:"",anioF:""},
  equipos: defaultEquip,
  banco:{banco:"",prop:"",id:"",tipo:"",num:"",tel:"",correo:""},
  firma:{dia:"",mes:"",anio:""},
};

const steps=["Información del Aliado","Canales y Duración","Equipos","Datos Bancarios","Generar Contrato"];

function formatCC(raw){const d=raw.replace(/\D/g,"");return d.replace(/\B(?=(\d{3})+(?!\d))/g,".");}
function toUpper(s){return s.toUpperCase();}
function numOnly(s){return s.replace(/\D/g,"");}
function capitalize(s){return s.replace(/\b\w+/g,w=>w.charAt(0).toUpperCase()+w.slice(1).toLowerCase());}

const labelCSS={display:"block",fontSize:11,fontWeight:600,color:"#555",marginBottom:6,letterSpacing:"0.03em"};
const inputCSS={width:"100%",padding:"11px 14px",fontSize:14,border:"1.5px solid #ddd",borderRadius:8,outline:"none",fontFamily:"inherit",transition:"border 0.2s",background:"#fafafa",boxSizing:"border-box"};
const selectCSS={...inputCSS,cursor:"pointer",appearance:"auto"};

function Input({label,value,onChange,placeholder,numeric,formatter}){
  const handle=v=>{let val=v;if(numeric)val=numOnly(val);if(formatter)val=formatter(val);onChange(val);};
  return(<div style={{width:"100%"}}><label style={labelCSS}>{label}</label><input value={value} onChange={e=>handle(e.target.value)} placeholder={placeholder||""} inputMode={numeric?"numeric":undefined} style={inputCSS} onFocus={e=>e.target.style.borderColor="#1a1a1a"} onBlur={e=>e.target.style.borderColor="#ddd"}/></div>);
}

function Select({label,value,onChange,options,placeholder}){
  return(<div style={{width:"100%"}}><label style={labelCSS}>{label}</label><select value={value} onChange={e=>onChange(e.target.value)} style={selectCSS}><option value="">{placeholder||"Seleccionar..."}</option>{options.map(o=><option key={o} value={o}>{o}</option>)}</select></div>);
}

function Row({children,cols=2}){return(<div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:16,marginBottom:18}}>{children}</div>);}

function StepIndicator({current}){return(<div style={{display:"flex",gap:4,marginBottom:32,justifyContent:"center",flexWrap:"wrap",padding:"0 8px"}}>{steps.map((s,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0,background:i===current?"#1a1a1a":i<current?"#4ade80":"#e5e5e5",color:i<=current?"#fff":"#999",transition:"all 0.3s"}}>{i<current?"✓":i+1}</div>{i<steps.length-1&&<div style={{width:16,height:1.5,background:i<current?"#4ade80":"#e5e5e5",borderRadius:1}}/>}</div>))}</div>);}

function ContractPrint({d,printRef}){
  const al=d.aliado,ch=d.canales,du=d.duracion,eq=d.equipos,ba=d.banco,fi=d.firma;
  const blank=(v,w=180)=>v||`${"_".repeat(Math.floor(w/7))}`;
  const fmtName=v=>v?toUpper(v):blank("",180);
  const fmtCC=v=>v?formatCC(numOnly(v)):blank("",120);
  const S={fontFamily:"Helvetica,Arial,sans-serif",fontSize:10,lineHeight:1.65,color:"#111",maxWidth:680,margin:"0 auto"};
  const H={fontSize:12,fontWeight:700,margin:"18px 0 6px",textAlign:"justify"};
  const P={textAlign:"justify",marginBottom:8};
  const I={textAlign:"justify",marginBottom:5,paddingLeft:16};
  const TH={fontSize:9,fontWeight:700,padding:"5px 8px",background:"#f5f5f5",border:"0.5px solid #ccc",textAlign:"left"};
  const TD={fontSize:9,padding:"5px 8px",border:"0.5px solid #ccc",minHeight:22};

  return(<div ref={printRef} style={S}>
<style>{`@media print{body{margin:0;padding:0}.no-print{display:none!important}@page{margin:2.5cm 2.5cm;size:letter}}`}</style>
<h2 style={{fontSize:13,fontWeight:700,textAlign:"center",margin:"0 0 4px"}}>CONTRATO DE COLABORACIÓN COMERCIAL CON COMODATO DE EQUIPOS</h2>
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

<p style={P}>Entre los suscritos, el señor <b>DAVID CAMILO BAQUERO GÓMEZ</b>, mayor de edad, identificado con cédula de ciudadanía n.° 1.000.180.024 de Cota, quien actúa como representante legal de <b>MOBI CHARGE S.A.S.</b>, identificada con NIT 901657651-3, denominada en adelante <b>LA PARTE COMODANTE</b> o <b>MOBI CHARGE</b>; y, por la otra parte, <b>{fmtName(al.empresa)}</b>, identificada con NIT {blank(al.nit,120)}, representada por <b>{fmtName(al.rep)}</b>, identificado(a) con cédula de ciudadanía n.° {fmtCC(al.cc)} de {blank(capitalize(al.ccExp),100)}, denominado(a) en adelante <b>EL ALIADO</b>; hemos acordado celebrar el presente <b>CONTRATO DE COLABORACIÓN COMERCIAL CON COMODATO DE EQUIPOS</b>, el cual es de naturaleza mixta y atípica, regido principalmente por lo pactado entre las partes y, en lo no previsto, por las disposiciones aplicables del Código Civil y el Código de Comercio colombianos, conforme a las siguientes cláusulas:</p>

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
{["1. Proveer, a título de comodato y sin costo para EL ALIADO, los equipos, habladores y baterías externas acordados.","2. Realizar la instalación y la conexión en línea de los equipos en el(los) punto(s) acordado(s).","3. No exigir ningún tipo de pago a EL ALIADO por el uso de la(s) estación(es).","4. Sustituir, sin costo para EL ALIADO, la(s) estación(es) y/o los dispositivos entregados en comodato que presenten desperfectos en su operatividad o funcionamiento.","5. Verificar el correcto funcionamiento de la(s) estación(es) y de las baterías portátiles antes de su entrega a EL ALIADO.","6. Brindar apoyo a EL ALIADO para el mantenimiento, la implementación y el cambio de la(s) estación(es), mediante indicaciones a través de los canales de comunicación acordados y, cuando sea necesario, con presencia física de un asesor o técnico de MOBI CHARGE S.A.S.","7. Retirar las estaciones y/o baterías entregadas en comodato, a solicitud de EL ALIADO, al término del contrato o de sus prórrogas."].map((t,i)=><p key={i} style={I}>{t}</p>)}

<p style={H}>CLÁUSULA NOVENA. OBLIGACIONES ESPECÍFICAS DE EL ALIADO</p>
<p style={P}>Constituyen obligaciones de EL ALIADO:</p>
{["1. Proveer a MOBI CHARGE S.A.S. un lugar adecuado e idóneo para ubicar la(s) estación(es), con alta visibilidad y accesibilidad para los clientes. Cualquier modificación en el posicionamiento requerirá notificación formal a MOBI CHARGE S.A.S. y su aprobación expresa.","2. Mantener la(s) estación(es) con suministro eléctrico durante las horas y días normales de operación del establecimiento, salvo en casos de fuerza mayor o corte de energía. EL ALIADO asumirá el costo del consumo eléctrico correspondiente.","3. Asegurar que la(s) estación(es) se mantengan limpias, conforme al manual de uso y mantenimiento suministrado por MOBI CHARGE S.A.S.","4. Colaborar con MOBI CHARGE S.A.S. en la operación básica y el mantenimiento de la(s) estación(es), en particular: garantizar que el equipo permanezca encendido y conectado a su toma eléctrica, verificar su funcionamiento y realizar limpieza básica según el manual entregado. Las tareas que requieran conocimientos técnicos previos serán atendidas por MOBI CHARGE S.A.S.","5. Adoptar medidas preventivas ante cualquier actividad sospechosa o mal uso alrededor de la(s) estación(es), informar de inmediato a las autoridades y notificar a MOBI CHARGE S.A.S. con la mayor brevedad posible a través de los canales establecidos en la Cláusula Cuarta. En caso de pérdida del equipo, EL ALIADO deberá notificarlo a MOBI CHARGE S.A.S. y radicar la denuncia policial correspondiente de manera simultánea.","6. Permitir el ingreso de representantes de MOBI CHARGE S.A.S. al establecimiento para realizar revisiones, inspecciones o recolección de evidencia relacionadas con la(s) estación(es)."].map((t,i)=><p key={i} style={I}>{t}</p>)}

<p style={I}><b>7. Responsabilidad por pérdida o daño — Cláusula Penal:</b> EL ALIADO está obligado a asegurar que la(s) estación(es) no se pierdan ni dañen. En caso de pérdida total o daño irreparable de algún equipo, la responsabilidad económica se distribuirá en partes iguales entre EL ALIADO y MOBI CHARGE S.A.S., correspondiéndole a cada parte el <b>cincuenta por ciento (50%)</b> del valor de reposición del equipo en el mercado a la fecha del siniestro. La parte correspondiente a EL ALIADO deberá pagarse dentro de los <b>diez (10) días hábiles</b> siguientes a la ocurrencia del hecho, tomando como referencia los valores consignados en la tabla siguiente, actualizados con el IPC acumulado desde la firma del contrato. En caso de daño parcial reparable, EL ALIADO responderá por el cien por ciento (100%) de los costos de reparación. Este pago no excluye la indemnización de perjuicios adicionales que MOBI CHARGE S.A.S. pueda acreditar:</p>

<table style={{width:"90%",borderCollapse:"collapse",margin:"8px 0 12px 16px",border:"0.5px solid #ccc"}}><thead><tr><th style={{...TH,width:"45%"}}>Tipo de equipo</th><th style={TH}>Cant.</th><th style={TH}>Valor unit. (USD)</th><th style={TH}>Valor total (USD)</th></tr></thead><tbody>{eq.map((r,i)=>(<tr key={i}><td style={{...TD,minWidth:160}}>{r.tipo||""}</td><td style={TD}>{r.cant||""}</td><td style={TD}>{r.unitario?`USD $${r.unitario}`:""}</td><td style={TD}>{r.total?`USD $${r.total}`:""}</td></tr>))}</tbody></table>

{["8. Designar un representante responsable de la relación con MOBI CHARGE S.A.S., con facultad de decisión para aprobar y ejecutar lo establecido en esta cláusula.","9. Los ajustes decididos por MOBI CHARGE S.A.S. tomarán efecto en la fecha en que la notificación sea enviada a EL ALIADO y, cuando sea necesaria su aprobación, en la fecha en que esta se otorgue. El incumplimiento de los tiempos acordados para implementar dichos ajustes generará a cargo de EL ALIADO una penalidad equivalente al valor monetario promedio diario de los costos o pérdidas de beneficios causados a MOBI CHARGE S.A.S. por cada día adicional de incumplimiento."].map((t,i)=><p key={i} style={I}>{t}</p>)}

<p style={H}>CLÁUSULA DÉCIMA. CESIÓN DEL CONTRATO</p>
<p style={P}>EL ALIADO no podrá ceder el presente contrato sin autorización previa, expresa y escrita de LA PARTE COMODANTE. Igualmente, EL ALIADO no podrá ceder, total ni parcialmente, la(s) estación(es) objeto del presente contrato sin dicho consentimiento.</p>

<p style={H}>CLÁUSULA UNDÉCIMA. PAGO Y DISTRIBUCIÓN DE INGRESOS</p>
<p style={P}>MOBI CHARGE S.A.S. reconocerá a EL ALIADO la comisión establecida en la Cláusula Segunda del presente contrato.</p>
<p style={P}>MOBI CHARGE S.A.S. revisará y confirmará con EL ALIADO, el día quince (15) de cada mes —o el día hábil siguiente si dicha fecha recae en día de descanso o festivo—, el ingreso de capital generado por la(s) estación(es) en el(los) establecimiento(s) de EL ALIADO durante el mes inmediatamente anterior, y transferirá la comisión correspondiente a la cuenta bancaria designada por EL ALIADO conforme a la información registrada a continuación.</p>
<p style={P}>Los valores adeudados por cualquiera de las partes que no sean cancelados en las fechas pactadas causarán intereses de mora a la tasa del <b>diez por ciento (10%) efectivo anual (e.a.)</b>, calculados desde el día siguiente al vencimiento del plazo hasta la fecha de pago efectivo.</p>
<p style={P}>Si EL ALIADO incumple cualquier obligación a su cargo, deberá pagar a MOBI CHARGE S.A.S. la suma de las pérdidas o costos asociados al incumplimiento, sin que dicho pago lo exima de la obligación de responder por el valor de reposición de la(s) estación(es) en caso de pérdida total, o de los costos de reparación necesarios para restituirla(s) al estado en que fue(ron) entregada(s).</p>
<p style={P}>A la cuenta bancaria indicada a continuación se realizarán todas las transferencias de comisiones y demás pagos a favor de EL ALIADO derivados del presente contrato:</p>
<p style={{...P,paddingLeft:16}}>Nombre del banco: {blank(ba.banco)}<br/>Propietario de la cuenta: {blank(ba.prop)}<br/>Identificación del titular: {blank(ba.id)}<br/>Tipo de cuenta: {blank(ba.tipo)}<br/>N.° de cuenta: {blank(ba.num)}<br/>Número telefónico asociado: {blank(ba.tel)}<br/>Correo asociado: {blank(ba.correo)}</p>

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
<div style={{flex:1}}><div style={{borderBottom:"1px solid #000",height:36}}/><p style={{fontSize:10,marginTop:4}}><b>Firma de EL ALIADO</b><br/>Nombre: {fmtName(al.rep)}<br/>Identificación: {fmtCC(al.cc)}<br/>Fecha: {blank("",120)}</p></div>
<div style={{flex:1}}><div style={{borderBottom:"1px solid #000",height:36}}/><p style={{fontSize:10,marginTop:4}}><b>David Camilo Baquero Gómez</b><br/>Representante Legal — Mobi Charge S.A.S.<br/>C.C. 1.000.180.024 de Cota<br/>Fecha: {blank("",120)}</p></div>
</div>
</div>);
}

export default function App(){
  const [step,setStep]=useState(0);
  const [data,setData]=useState(initialData);
  const [preview,setPreview]=useState(false);
  const printRef=useRef();

  const upd=(sec,fld,val)=>setData(p=>({...p,[sec]:{...p[sec],[fld]:val}}));
  const updEquip=(i,fld,val)=>setData(p=>{const eq=[...p.equipos];eq[i]={...eq[i],[fld]:val};return{...p,equipos:eq}});

  const handlePrint=()=>{const c=printRef.current;const w=window.open("","_blank","width=816,height=1056");w.document.write(`<!DOCTYPE html><html><head><title>Contrato Mobi Charge</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Helvetica,Arial,sans-serif;padding:60px 72px;font-size:10px;line-height:1.65;color:#111}@page{margin:2.2cm 2.5cm;size:letter}table{page-break-inside:avoid}</style></head><body>${c.innerHTML}</body></html>`);w.document.close();setTimeout(()=>w.print(),500);};

  if(preview) return(
    <div style={{background:"#f0f0f0",minHeight:"100vh",padding:"16px 12px"}}>
      <div className="no-print" style={{maxWidth:700,margin:"0 auto 16px",display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
        <button onClick={()=>setPreview(false)} style={{padding:"10px 24px",fontSize:14,border:"1.5px solid #ccc",borderRadius:8,background:"#fff",cursor:"pointer",fontFamily:"inherit"}}>Volver al formulario</button>
        <button onClick={handlePrint} style={{padding:"10px 28px",fontSize:14,border:"none",borderRadius:8,background:"#1a1a1a",color:"#fff",cursor:"pointer",fontWeight:600,fontFamily:"inherit"}}>Imprimir / Guardar PDF</button>
      </div>
      <div style={{maxWidth:740,margin:"0 auto",background:"#fff",padding:"clamp(24px,5vw,56px) clamp(16px,5vw,64px)",borderRadius:4,boxShadow:"0 2px 16px rgba(0,0,0,0.08)"}}>
        <ContractPrint d={data} printRef={printRef}/>
      </div>
    </div>
  );

  const card={background:"#fff",borderRadius:12,padding:"clamp(20px,4vw,28px)",border:"1px solid #e8e8e8",marginBottom:8};
  const nav={display:"flex",gap:12,justifyContent:"flex-end",marginTop:24,flexWrap:"wrap"};
  const btnP={padding:"12px 28px",fontSize:14,border:"none",borderRadius:8,background:"#1a1a1a",color:"#fff",cursor:"pointer",fontWeight:600,fontFamily:"inherit"};
  const btnS={padding:"12px 28px",fontSize:14,border:"1.5px solid #ccc",borderRadius:8,background:"#fff",cursor:"pointer",fontFamily:"inherit"};

  return(
    <div style={{background:"#fafaf8",minHeight:"100vh"}}>
      <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&display=swap" rel="stylesheet"/>
      <div style={{maxWidth:580,margin:"0 auto",padding:"clamp(24px,5vw,40px) clamp(12px,3vw,24px)",fontFamily:"'Source Serif 4',Georgia,serif"}}>
        <div style={{textAlign:"center",marginBottom:8}}>
          <h1 style={{fontSize:"clamp(18px,4vw,22px)",fontWeight:700,color:"#1a1a1a",letterSpacing:"-0.02em",margin:0}}>Contrato de Colaboración Comercial</h1>
          <p style={{fontSize:13,color:"#888",marginTop:4}}>Mobi Charge S.A.S. — Formulario de diligenciamiento</p>
        </div>
        <StepIndicator current={step}/>

        {step===0&&<div style={card}>
          <p style={{fontSize:13,fontWeight:600,color:"#333",marginBottom:20}}>Información del Aliado</p>
          <Row><Input label="Nombre de la compañía" value={data.aliado.empresa} onChange={v=>upd("aliado","empresa",v)}/><Input label="NIT" value={data.aliado.nit} onChange={v=>upd("aliado","nit",v)} numeric/></Row>
          <Row cols={1}><Input label="Dirección" value={data.aliado.dir} onChange={v=>upd("aliado","dir",v)}/></Row>
          <Row><Input label="Teléfono" value={data.aliado.tel} onChange={v=>upd("aliado","tel",v)} numeric/><Input label="Correo electrónico" value={data.aliado.correo} onChange={v=>upd("aliado","correo",v)}/></Row>
          <Row cols={1}><Input label="Representante legal (nombre completo)" value={data.aliado.rep} onChange={v=>upd("aliado","rep",v)}/></Row>
          <Row><Input label="Cédula del representante" value={data.aliado.cc} onChange={v=>upd("aliado","cc",v)} numeric/><Input label="Expedida en" value={data.aliado.ccExp} onChange={v=>upd("aliado","ccExp",v)}/></Row>
          <div style={nav}><button style={btnP} onClick={()=>setStep(1)}>Siguiente</button></div>
        </div>}

        {step===1&&<div style={card}>
          <p style={{fontSize:13,fontWeight:600,color:"#333",marginBottom:20}}>Canales de comunicación del Aliado</p>
          <Row><Input label="Correo electrónico oficial" value={data.canales.correo} onChange={v=>upd("canales","correo",v)}/><Input label="WhatsApp" value={data.canales.whatsapp} onChange={v=>upd("canales","whatsapp",v)} numeric/></Row>
          <p style={{fontSize:13,fontWeight:600,color:"#333",margin:"8px 0 20px"}}>Duración del contrato</p>
          <p style={{fontSize:11,color:"#888",marginBottom:12}}>Fecha de inicio</p>
          <Row cols={3}><Select label="Día" value={data.duracion.diaI} onChange={v=>upd("duracion","diaI",v)} options={DAYS}/><Select label="Mes" value={data.duracion.mesI} onChange={v=>upd("duracion","mesI",v)} options={MONTHS}/><Select label="Año" value={data.duracion.anioI} onChange={v=>upd("duracion","anioI",v)} options={YEARS}/></Row>
          <p style={{fontSize:11,color:"#888",marginBottom:12}}>Fecha de fin</p>
          <Row cols={3}><Select label="Día" value={data.duracion.diaF} onChange={v=>upd("duracion","diaF",v)} options={DAYS}/><Select label="Mes" value={data.duracion.mesF} onChange={v=>upd("duracion","mesF",v)} options={MONTHS}/><Select label="Año" value={data.duracion.anioF} onChange={v=>upd("duracion","anioF",v)} options={YEARS}/></Row>
          <div style={nav}><button style={btnS} onClick={()=>setStep(0)}>Atrás</button><button style={btnP} onClick={()=>setStep(2)}>Siguiente</button></div>
        </div>}

        {step===2&&<div style={card}>
          <p style={{fontSize:13,fontWeight:600,color:"#333",marginBottom:4}}>Tabla de equipos entregados</p>
          <p style={{fontSize:11,color:"#888",marginBottom:20}}>Completa las filas con los equipos a entregar en comodato</p>
          <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,minWidth:480}}>
              <thead><tr>{["Tipo de equipo","Cant.","Val. unit. USD","Val. total USD"].map((h,i)=>(
                <th key={i} style={{textAlign:"left",padding:"8px 4px",fontSize:11,fontWeight:600,color:"#555",borderBottom:"1.5px solid #e0e0e0"}}>{h}</th>
              ))}</tr></thead>
              <tbody>{data.equipos.map((r,i)=>(
                <tr key={i}>
                  <td style={{padding:"6px 4px"}}><input value={r.tipo} onChange={e=>updEquip(i,"tipo",e.target.value)} style={{width:"100%",padding:"9px 8px",border:"1.5px solid #eee",borderRadius:6,fontSize:13,fontFamily:"inherit",background:"#fafafa",boxSizing:"border-box"}} placeholder="Ej: Estación HCPS-002"/></td>
                  <td style={{padding:"6px 4px",width:65}}><input value={r.cant} onChange={e=>updEquip(i,"cant",numOnly(e.target.value))} inputMode="numeric" style={{width:"100%",padding:"9px 8px",border:"1.5px solid #eee",borderRadius:6,fontSize:13,fontFamily:"inherit",textAlign:"center",background:"#fafafa",boxSizing:"border-box"}}/></td>
                  <td style={{padding:"6px 4px",width:100}}><input value={r.unitario} onChange={e=>updEquip(i,"unitario",numOnly(e.target.value))} inputMode="numeric" style={{width:"100%",padding:"9px 8px",border:"1.5px solid #eee",borderRadius:6,fontSize:13,fontFamily:"inherit",textAlign:"right",background:"#fafafa",boxSizing:"border-box"}} placeholder="$"/></td>
                  <td style={{padding:"6px 4px",width:100}}><input value={r.total} onChange={e=>updEquip(i,"total",numOnly(e.target.value))} inputMode="numeric" style={{width:"100%",padding:"9px 8px",border:"1.5px solid #eee",borderRadius:6,fontSize:13,fontFamily:"inherit",textAlign:"right",background:"#fafafa",boxSizing:"border-box"}} placeholder="$"/></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div style={nav}><button style={btnS} onClick={()=>setStep(1)}>Atrás</button><button style={btnP} onClick={()=>setStep(3)}>Siguiente</button></div>
        </div>}

        {step===3&&<div style={card}>
          <p style={{fontSize:13,fontWeight:600,color:"#333",marginBottom:20}}>Información bancaria del Aliado</p>
          <Row><Input label="Nombre del banco" value={data.banco.banco} onChange={v=>upd("banco","banco",v)}/><Input label="Propietario de la cuenta" value={data.banco.prop} onChange={v=>upd("banco","prop",v)}/></Row>
          <Row><Input label="Identificación del titular" value={data.banco.id} onChange={v=>upd("banco","id",v)} numeric/><Select label="Tipo de cuenta" value={data.banco.tipo} onChange={v=>upd("banco","tipo",v)} options={["Ahorros","Corriente"]}/></Row>
          <Row cols={1}><Input label="N.° de cuenta" value={data.banco.num} onChange={v=>upd("banco","num",v)} numeric/></Row>
          <Row><Input label="Teléfono asociado" value={data.banco.tel} onChange={v=>upd("banco","tel",v)} numeric/><Input label="Correo asociado" value={data.banco.correo} onChange={v=>upd("banco","correo",v)}/></Row>
          <p style={{fontSize:13,fontWeight:600,color:"#333",margin:"8px 0 20px"}}>Fecha de suscripción</p>
          <Row cols={3}><Select label="Día" value={data.firma.dia} onChange={v=>upd("firma","dia",v)} options={DAYS}/><Select label="Mes" value={data.firma.mes} onChange={v=>upd("firma","mes",v)} options={MONTHS}/><Select label="Año" value={data.firma.anio} onChange={v=>upd("firma","anio",v)} options={YEARS}/></Row>
          <div style={nav}><button style={btnS} onClick={()=>setStep(2)}>Atrás</button><button style={btnP} onClick={()=>setStep(4)}>Revisar contrato</button></div>
        </div>}

        {step===4&&<div style={card}>
          <p style={{fontSize:13,fontWeight:600,color:"#333",marginBottom:8}}>Contrato listo para generar</p>
          <p style={{fontSize:12,color:"#666",marginBottom:20}}>Revisa los datos. Al generar, se abrirá una vista previa del contrato completo desde donde puedes imprimirlo o guardarlo como PDF.</p>
          <div style={{background:"#f8f8f6",borderRadius:8,padding:"clamp(14px,3vw,20px)",fontSize:12,lineHeight:2,marginBottom:20}}>
            <p><b>Aliado:</b> {toUpper(data.aliado.empresa)||"—"} · NIT {data.aliado.nit||"—"}</p>
            <p><b>Representante:</b> {toUpper(data.aliado.rep)||"—"} · C.C. {formatCC(data.aliado.cc)||"—"}</p>
            <p><b>Canales:</b> {data.canales.correo||"—"} · {data.canales.whatsapp||"—"}</p>
            <p><b>Vigencia:</b> {data.duracion.diaI||"__"} de {data.duracion.mesI||"___"} de {data.duracion.anioI||"____"} → {data.duracion.diaF||"__"} de {data.duracion.mesF||"___"} de {data.duracion.anioF||"____"}</p>
            <p><b>Equipos:</b> {data.equipos.filter(e=>e.tipo).length} registrado(s)</p>
            <p><b>Banco:</b> {data.banco.banco||"—"} · Cta {data.banco.num||"—"}</p>
            <p><b>Fecha firma:</b> {data.firma.dia||"__"} de {data.firma.mes||"___"} de {data.firma.anio||"____"}</p>
          </div>
          <div style={nav}>
            <button style={btnS} onClick={()=>setStep(3)}>Atrás</button>
            <button style={{...btnP,background:"#16a34a",padding:"12px 32px"}} onClick={()=>setPreview(true)}>Generar contrato</button>
          </div>
        </div>}
      </div>
    </div>
  );
}