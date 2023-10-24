import{d as H,g as U,u as E,t as w,r as q,a as J,b as K,_ as Q,c as v,e as o,w as r,v as d,f as X,h as b,i as Y,j as ee,o as x}from"./index-82efd59e.js";import{m as n}from"./messageBox-19614e80.js";const I="3.7.5",se=I,oe=typeof atob=="function",te=typeof btoa=="function",h=typeof Buffer=="function",D=typeof TextDecoder=="function"?new TextDecoder:void 0,V=typeof TextEncoder=="function"?new TextEncoder:void 0,ie="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",p=Array.prototype.slice.call(ie),g=(e=>{let s={};return e.forEach((i,l)=>s[i]=l),s})(p),ne=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,a=String.fromCharCode.bind(String),T=typeof Uint8Array.from=="function"?Uint8Array.from.bind(Uint8Array):e=>new Uint8Array(Array.prototype.slice.call(e,0)),N=e=>e.replace(/=/g,"").replace(/[+\/]/g,s=>s=="+"?"-":"_"),$=e=>e.replace(/[^A-Za-z0-9\+\/]/g,""),P=e=>{let s,i,l,c,u="";const t=e.length%3;for(let m=0;m<e.length;){if((i=e.charCodeAt(m++))>255||(l=e.charCodeAt(m++))>255||(c=e.charCodeAt(m++))>255)throw new TypeError("invalid character found");s=i<<16|l<<8|c,u+=p[s>>18&63]+p[s>>12&63]+p[s>>6&63]+p[s&63]}return t?u.slice(0,t-3)+"===".substring(t):u},y=te?e=>btoa(e):h?e=>Buffer.from(e,"binary").toString("base64"):P,B=h?e=>Buffer.from(e).toString("base64"):e=>{let i=[];for(let l=0,c=e.length;l<c;l+=4096)i.push(a.apply(null,e.subarray(l,l+4096)));return y(i.join(""))},_=(e,s=!1)=>s?N(B(e)):B(e),ae=e=>{if(e.length<2){var s=e.charCodeAt(0);return s<128?e:s<2048?a(192|s>>>6)+a(128|s&63):a(224|s>>>12&15)+a(128|s>>>6&63)+a(128|s&63)}else{var s=65536+(e.charCodeAt(0)-55296)*1024+(e.charCodeAt(1)-56320);return a(240|s>>>18&7)+a(128|s>>>12&63)+a(128|s>>>6&63)+a(128|s&63)}},le=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,j=e=>e.replace(le,ae),k=h?e=>Buffer.from(e,"utf8").toString("base64"):V?e=>B(V.encode(e)):e=>y(j(e)),f=(e,s=!1)=>s?N(k(e)):k(e),S=e=>f(e,!0),re=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,de=e=>{switch(e.length){case 4:var s=(7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3),i=s-65536;return a((i>>>10)+55296)+a((i&1023)+56320);case 3:return a((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return a((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}},R=e=>e.replace(re,de),W=e=>{if(e=e.replace(/\s+/g,""),!ne.test(e))throw new TypeError("malformed base64.");e+="==".slice(2-(e.length&3));let s,i="",l,c;for(let u=0;u<e.length;)s=g[e.charAt(u++)]<<18|g[e.charAt(u++)]<<12|(l=g[e.charAt(u++)])<<6|(c=g[e.charAt(u++)]),i+=l===64?a(s>>16&255):c===64?a(s>>16&255,s>>8&255):a(s>>16&255,s>>8&255,s&255);return i},A=oe?e=>atob($(e)):h?e=>Buffer.from(e,"base64").toString("binary"):W,L=h?e=>T(Buffer.from(e,"base64")):e=>T(A(e).split("").map(s=>s.charCodeAt(0))),z=e=>L(M(e)),ue=h?e=>Buffer.from(e,"base64").toString("utf8"):D?e=>D.decode(L(e)):e=>R(A(e)),M=e=>$(e.replace(/[-_]/g,s=>s=="-"?"+":"/")),F=e=>ue(M(e)),ce=e=>{if(typeof e!="string")return!1;const s=e.replace(/\s+/g,"").replace(/={0,2}$/,"");return!/[^\s0-9a-zA-Z\+/]/.test(s)||!/[^\s0-9a-zA-Z\-_]/.test(s)},Z=e=>({value:e,enumerable:!1,writable:!0,configurable:!0}),O=function(){const e=(s,i)=>Object.defineProperty(String.prototype,s,Z(i));e("fromBase64",function(){return F(this)}),e("toBase64",function(s){return f(this,s)}),e("toBase64URI",function(){return f(this,!0)}),e("toBase64URL",function(){return f(this,!0)}),e("toUint8Array",function(){return z(this)})},G=function(){const e=(s,i)=>Object.defineProperty(Uint8Array.prototype,s,Z(i));e("toBase64",function(s){return _(this,s)}),e("toBase64URI",function(){return _(this,!0)}),e("toBase64URL",function(){return _(this,!0)})},fe=()=>{O(),G()},C={version:I,VERSION:se,atob:A,atobPolyfill:W,btoa:y,btoaPolyfill:P,fromBase64:F,toBase64:f,encode:f,encodeURI:S,encodeURL:S,utob:j,btou:R,decode:F,isValid:ce,fromUint8Array:_,toUint8Array:z,extendString:O,extendUint8Array:G,extendBuiltins:fe};function he(e){return e?!0:"您必须输入用户名密码"}const pe=H({data:()=>({username:"",password:"",valiCode:"",pageType:1,id:0,jwt:"",img:"",funId:"",vueName:"",loginCode:"",email:"",messageCode:"",showSlider:!1,remember:!0,role:"STUDENT",perName:"",rules:[he]}),beforeMount(){this.pageType=1},async created(){const e=await U();this.id=e.validateCodeId,this.img=e.img;const s=E();s.remember?(this.username=C.decode(s.usernameSave),this.password=C.decode(s.passwordSave),this.remember=!0):(this.username="",this.password="",this.remember=!1)},methods:{async changeValiCode(){const e=await U();this.id=e.validateCodeId,this.img=e.img,this.valiCode=""},backLogin(){this.username="",this.password="",this.valiCode="",this.pageType=1},forgetPass(){this.username="",this.password="",this.valiCode="",this.pageType=2},pageRegister(){this.username="",this.password="",this.valiCode="",this.pageType=3},async initPassword(){let e=await w({validateCodeId:this.id,validateCode:this.valiCode});if(e.code!=0){n(this,e.msg),this.changeValiCode();return}if(this.username==""||this.username==null){n(this,"账号为空,请填写账号");return}if(this.email==""||this.email==null){n(this,"邮箱为空,请填写邮箱");return}e=await q({username:this.username,email:this.email}),e.code==0?(n(this,"初始密码已发送至您的邮箱，请注意查收"),this.changeValiCode(),this.pageType=1):n(this,e.msg)},async register(){let e=await w({validateCodeId:this.id,validateCode:this.valiCode});if(e.code!=0){n(this,e.msg),this.changeValiCode();return}if(this.username==""||this.username==null){n(this,"账号为空,请填写账号");return}if(this.password==""||this.password==null){n(this,"账号为空,请填写密码");return}if(this.perName==""||this.perName==null){n(this,"姓名为空,请填写姓名");return}if(this.email==""||this.email==null){n(this,"邮箱为空,请填写邮箱");return}if(this.role==""||this.role==null){n(this,"角色为空,请选择角色");return}e=await J({username:this.username,password:this.password,perName:this.perName,email:this.email,role:this.role}),e.code==0?(n(this,"已注册成功！"),this.changeValiCode(),this.pageType=1):n(this,e.msg)},async loginSubmit(){const e=await w({validateCodeId:this.id,validateCode:this.valiCode});if(e.code!=0){n(this,e.msg),this.changeValiCode();return}if(this.username==""||this.username==null)n(this,"用户名为空");else if(this.password==""||this.password==null)n(this,"密码为空");else{const s=E();try{await s.login(this.username,this.password),await s.setNavi(),this.remember?s.saveAccount(C.encode(this.username),C.encode(this.password)):s.removeAccount(),K.push("/MainPage")}catch{n(this,"登录失败!")}}}}});const me={class:"page flex-col"},ve={class:"group1 flex-col"},xe=ee('<div class="section1 flex-col"><div class="main1 flex-row justify-between"><div class="mod1 flex-col"></div><span class="word1">欢迎来到教务管理系统！</span></div><div class="main2 flex-col"><div class="group2 flex-col"></div></div></div>',1),ge={class:"section2 flex-row"},Ce=o("div",{class:"box1 flex-col"},null,-1),_e={class:"box2 flex-col"},we={class:"wrap1 flex-row justify-between"},be=o("div",{class:"group3 flex-col"},null,-1),Be=o("div",{class:"box3 flex-col"},[o("div",{class:"block1 flex-row justify-between"},[o("div",{class:"block2 flex-col"}),o("span",{class:"word3"},"微信登录")])],-1),Fe=o("div",{class:"section3 flex-col"},[o("span",{class:"txt1"},"copyright ©山东大学软件学院")],-1),ye={class:"group4 flex-col"},Ae={class:"group5 flex-col"},Ue={class:"section4 flex-col"},Ee=o("div",{class:"box4 flex-col"},null,-1),De={class:"box5 flex-col"},Ve={key:0,class:"main3 flex-col"},Te=o("div",{class:"main4 flex-col"},null,-1),ke={class:"main5 flex-col"},Se={class:"wrap2 flex-row justify-between"},Ie=o("div",{class:"main6 flex-col"},[o("div",{class:"box6 flex-col"})],-1),Ne={class:"main7 flex-col"},$e={class:"wrap3 flex-row justify-between"},Pe=o("div",{class:"group6 flex-col"},[o("div",{class:"mod2 flex-col"})],-1),je={class:"main8 flex-col"},Re={class:"wrap4 flex-row"},We=o("div",{class:"bd1 flex-col"},[o("div",{class:"block3 flex-col"})],-1),Le=["src"],ze={class:"ImageText1 flex-col"},Me={class:"group7 flex-row justify-between"},Ze=o("div",{class:"TextGroup1 flex-col"},[o("span",{class:"txt3"},"记住密码")],-1),Oe=o("span",{class:"info1"},"登录",-1),Ge=[Oe],He={key:1,class:"main3 flex-col"},qe=o("span",{class:"callBackPass"},"初始密码",-1),Je={class:"mod33 flex-row"},Ke=o("span",{class:"word44"},"登录账号：",-1),Qe={class:"mod33 flex-row"},Xe=o("span",{class:"word44"},"电子邮箱：",-1),Ye={class:"mod33 flex-row"},es=o("span",{class:"word44"},"验证码：",-1),ss=["src"],os={class:"ImageText19 flex-col"},ts={class:"outer49 flex-col justify-between"},is=o("span",{class:"info59"},"初始密码",-1),ns=[is],as=o("span",{class:"word89"},"返回登录",-1),ls=[as],rs={key:2,class:"main3 flex-col"},ds=o("span",{class:"callBackPass"},"用户注册",-1),us={class:"modd33 flex-row"},cs=o("span",{class:"word44"},"账号：",-1),fs={class:"modd33 flex-row"},hs=o("span",{class:"word44"},"姓名：",-1),ps={class:"modd33 flex-row"},ms=o("span",{class:"word44"},"密码：",-1),vs={class:"modd33 flex-row"},xs=o("span",{class:"word44"},"邮箱：",-1),gs={class:"modd33 flex-row"},Cs=o("span",{class:"word44"},"角色：",-1),_s=o("option",{value:"ADMIN"},"管理员",-1),ws=o("option",{value:"STUDENT"},"学生",-1),bs=o("option",{value:"TEACHER"},"教师",-1),Bs=[_s,ws,bs],Fs={class:"modd33 flex-row"},ys=o("span",{class:"word44"},"验证码：",-1),As=["src"],Us={class:"ImageText19 flex-col"},Es={class:"outer49 flex-col justify-between"},Ds=o("span",{class:"info59"},"注册提交",-1),Vs=[Ds],Ts=o("span",{class:"word89"},"返回登录",-1),ks=[Ts],Ss=o("div",{class:"box7 flex-col"},[o("span",{class:"txt4"},"001团队：张三、李四、王五")],-1);function Is(e,s,i,l,c,u){return x(),v("div",me,[o("div",ve,[xe,o("div",ge,[Ce,o("div",_e,[o("div",we,[be,o("span",{class:"word2",onClick:s[0]||(s[0]=t=>e.pageRegister())},"新用户注册")])]),Be]),Fe]),o("div",ye,[o("div",Ae,[o("div",Ue,[Ee,o("div",De,[e.pageType==1?(x(),v("div",Ve,[Te,o("div",null,[o("div",ke,[o("div",Se,[Ie,r(o("input",{class:"inputWidth","onUpdate:modelValue":s[1]||(s[1]=t=>e.username=t),placeholder:"请输入账号"},null,512),[[d,e.username]])])]),o("div",Ne,[o("div",$e,[Pe,r(o("input",{class:"inputWidth","onUpdate:modelValue":s[2]||(s[2]=t=>e.password=t),type:"password",placeholder:"请输入的密码"},null,512),[[d,e.password]])])]),o("div",je,[o("div",Re,[We,r(o("input",{class:"codeWidth","onUpdate:modelValue":s[3]||(s[3]=t=>e.valiCode=t),placeholder:"请输入的验证码"},null,512),[[d,e.valiCode]]),o("img",{onClick:s[4]||(s[4]=t=>e.changeValiCode()),class:"img1",referrerpolicy:"no-referrer",src:e.img},null,8,Le)])]),o("div",ze,[o("div",Me,[r(o("input",{type:"checkbox","onUpdate:modelValue":s[5]||(s[5]=t=>e.remember=t)},null,512),[[X,e.remember]]),Ze])]),o("div",{class:"main9 flex-col",onClick:s[6]||(s[6]=t=>e.loginSubmit())},Ge)]),o("span",{onClick:s[7]||(s[7]=t=>e.forgetPass()),class:"info2"},"忘记密码")])):b("",!0),e.pageType==2?(x(),v("div",He,[qe,o("div",Je,[Ke,r(o("input",{class:"inputWidth2","onUpdate:modelValue":s[8]||(s[8]=t=>e.username=t),placeholder:"填写教师号/学号"},null,512),[[d,e.username]])]),o("div",Qe,[Xe,r(o("input",{class:"inputWidth2","onUpdate:modelValue":s[9]||(s[9]=t=>e.email=t),placeholder:"请输入的邮箱"},null,512),[[d,e.email]])]),o("div",Ye,[es,r(o("input",{class:"inputWidth3","onUpdate:modelValue":s[10]||(s[10]=t=>e.valiCode=t),placeholder:"请输入验证码"},null,512),[[d,e.valiCode]]),o("img",{onClick:s[11]||(s[11]=t=>e.changeValiCode()),class:"img2",referrerpolicy:"no-referrer",src:e.img},null,8,ss)]),o("div",os,[o("div",ts,[o("div",{class:"box19 flex-col",onClick:s[12]||(s[12]=t=>e.initPassword())},ns),o("div",{class:"TextGroup19 flex-col",onClick:s[13]||(s[13]=t=>e.backLogin())},ls)])])])):b("",!0),e.pageType==3?(x(),v("div",rs,[ds,o("div",us,[cs,r(o("input",{class:"inputWidth2","onUpdate:modelValue":s[14]||(s[14]=t=>e.username=t),placeholder:"填写账号"},null,512),[[d,e.username]])]),o("div",fs,[hs,r(o("input",{class:"inputWidth2","onUpdate:modelValue":s[15]||(s[15]=t=>e.perName=t),placeholder:"请输入的姓名"},null,512),[[d,e.perName]])]),o("div",ps,[ms,r(o("input",{class:"inputWidth2","onUpdate:modelValue":s[16]||(s[16]=t=>e.password=t),type:"password"},null,512),[[d,e.password]])]),o("div",vs,[xs,r(o("input",{class:"inputWidth2","onUpdate:modelValue":s[17]||(s[17]=t=>e.email=t),placeholder:"请输入的邮箱"},null,512),[[d,e.email]])]),o("div",gs,[Cs,r(o("select",{class:"inputWidth2","onUpdate:modelValue":s[18]||(s[18]=t=>e.role=t)},Bs,512),[[Y,e.role]])]),o("div",Fs,[ys,r(o("input",{class:"inputWidth3","onUpdate:modelValue":s[19]||(s[19]=t=>e.valiCode=t),placeholder:"请输入验证码"},null,512),[[d,e.valiCode]]),o("img",{onClick:s[20]||(s[20]=t=>e.changeValiCode()),class:"img2",referrerpolicy:"no-referrer",src:e.img},null,8,As)]),o("div",Us,[o("div",Es,[o("div",{class:"box19 flex-col",onClick:s[21]||(s[21]=t=>e.register())},Vs),o("div",{class:"TextGroup19 flex-col",onClick:s[22]||(s[22]=t=>e.backLogin())},ks)])])])):b("",!0)]),Ss])])])])}const Ps=Q(pe,[["render",Is]]);export{Ps as default};