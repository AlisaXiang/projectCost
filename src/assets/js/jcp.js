var JCP = {
	setup : {
		download : "http://print.jatools.com/jcp/setup.exe",
		noSetupMessage : "杰表云打印（JCP）未安装, 请下载安装之."
	}
}
var a=['max-width','min-width','border-collapse','border-spacing','caption-side','empty-cells','table-layout','direction','font','font-family','font-style','font-size','letter-spacing','text-align','text-indent','text-shadow','text-transform','word-spacing','vertical-align','color','background','background-color','background-image','background-repeat','Opacity','bottom','clear','clip','cursor','display','float','left','opacity','overflow','right','top','z-index','list-style-image','list-style-position','list-style-type','getElementsByTagName','tagName','IMG','getAttribute','split','currentStyle','getComputedStyle','getPropertyValue','<html><head><style>','ownerDocument','</style></head><body>','</body></html>','<html><head><base\x20href=\x27','URL','\x27/><style>','toString','random','onState','listener','onPagePrinted','dragDesigner','_hasCallback','http://',':31227/api?type=service&',':31227/api?type=admin&','type=TICK&','type=PULL&','api-error','event','apply','params','data','indexOf','fixed','new','key','password',':31227/api?type=NEW&','\x20杰表云打印（JCP）未安装或未运行.','silent','127.0.0.1','setup','noSetupHandle','noSetupMessage','download','location','href','api-result',':31227/api?tab=','&use=common',':31227/api?type=UPDATE&','version','getVersion','event-','NO_LICENSED_HOST','未经绑定的主机：','本版本为试用版，不支持在\x20','host','\x20上试用，请在\x20127.0.0.1\x20上试用.','本版本为试用版，在\x20127.0.0.1上试用到期，购买请联系手机:\x20(0)18969037811\x20.','printPreview','getPrinterCapability','getPrinterJobs','getPapers','isCustomPaperSupported','addPaper','setOffsetPage','isInstalled','getSettingsIds','fileType','pdf','printDocument','exportAsExcel','setupNormalOffset','printToImage','exportAsImage',':31227/api?type=download&file=','exportAsPDF','exportAsTIFF','update','getFonts','copy','copied','writeString','writeBase64','readString','readBase64','readHTML','chooseFile','getLastSettings','pop','nothing','call','join','setLastSettings','setDefaultPrinter','openFile','getPrinterInfo','dialogWidth:','dialogHeight:','aH:yes','showHTMLDialog','getPrinterStatus','setPrintBackground','getServerId','connect','initialize','exit','stringify','valueOf','function','prototype','getUTCFullYear','getUTCMonth','getUTCHours','getUTCMinutes','getUTCSeconds','test','charCodeAt','slice','string','number','boolean','[object\x20Array]','null','hasOwnProperty','JSON.stringify','img','verticalAlign','inline','parentNode','insertBefore','nextSibling','www.jatools.com','object','XDomainRequest','MSXML2.XMLHTTP.3.0','open','POST','GET','onload','responseText','result','undefined','onerror','send','onreadystatechange','readyState','status','getElementById','styleSheets','length','cssRules','cssText','replace','doctype','setAttribute','_strict','true','outerHTML','createElement','div','appendChild','cloneNode','innerHTML','pages','substring','</div>','jobPages','jobBase','done','pagePrefix','page','print','documents','html','footer','header','style','position','absolute','-3000px','2500px','_jp_wrapper','body','srcElement','complete','ownerIndex','contentWindow','document','push','iframe','attachEvent','src','border-radius','box-shadow','height','margin','padding','width2'];(function(c,d){var e=function(f){while(--f){c['push'](c['shift']());}};e(++d);}(a,0x19d));var b=function(c,d){c=c-0x0;var e=a[c];return e;};var X=b('0x0');function j(c,d,e){var f=JSON['parse']||function(g){if(g==='')g='\x22\x22';eval('var\x20p='+g+';');return p;};function h(i){};function j(k,l,m,n){try{if(l&&typeof l===b('0x1')){l['tab']=aQ||'';l=JSONstringify(l);}var o=new(window[(b('0x2'))]||window['XMLHttpRequest']||ActiveXObject)(b('0x3'));o[b('0x4')](l?b('0x5'):b('0x6'),k,0x1);if(window[b('0x2')]){o[b('0x7')]=function(){var l=f(o[b('0x8')]||'{}');if(n){l=typeof l[b('0x9')]==b('0xa')?'':l[b('0x9')];}m&&m(l,o[b('0x8')],0xc8);};o['aB']=function(){m&&m(l,o[b('0x8')],0x194);};o[b('0xb')]=function(){m&&m(l,o[b('0x8')],0x194);};o[b('0xc')](l);}else{o[b('0xd')]=function(){try{var l=f(o[b('0x8')]||'{}');if(n){l=typeof l['result']==b('0xa')?'':l[b('0x9')];}o[b('0xe')]>0x3&&m&&m(l,o[b('0x8')],o[b('0xf')]);}catch(r){h(r);}};o['send'](l);}}catch(s){h(s);}};function t(u,v){return u[b('0x10')](v);};function w(x){var y='';var z=x[b('0x11')];for(var A=0x0;A<z[b('0x12')];A++){var B=z[A];try{var C=B[b('0x13')];if(C){for(var D=0x0;D<C[b('0x12')];D++){y+=C[D]['cssText']||'';}}else{if(B[b('0x14')]){y+=B['cssText'];}}}catch(E){}}return(y+'')[b('0x15')](/[\s]*\n/gm,'');};function F(G,H){if(G[b('0x16')])H[b('0x17')](b('0x18'),b('0x19'));return H[b('0x1a')]||function(I){var J=G[b('0x1b')](b('0x1c')),K;J[b('0x1d')](I[b('0x1e')](!![]));K=J[b('0x1f')];J=null;return K;}(H);};var L;function M(N,O){if(typeof N['getElementById']!=b('0xa')){var P='';var Q={'style':w(N)};if(O[b('0x20')]){for(var R=0x0;R<O[b('0x20')][b('0x12')];R++){var S=O[b('0x20')][R];if(typeof S[b('0x21')]!='undefined'){S=t(N,S);}P+='<div\x20id=\x27page'+(R+0x1)+'\x27>'+F(N,S)+b('0x22');}}else{if(O[b('0x23')]){if(!O[b('0x24')]){O[b('0x24')]=0x0;L=O[b('0x25')]||null;var R=0x0;while(!![]){var S=t(N,(O[b('0x26')]||'')+b('0x27')+(R+0x1));if(!S)break;R++;}O['aN']=R;}for(var R=0x0;R<O[b('0x23')];R++){var S=t(N,(O[b('0x26')]||'')+b('0x27')+(R+O['jobBase']+0x1));if(!S)break;P+=F(N,S);}if(O['done']){O[b('0x25')]=function(){var X=t(N,(O[b('0x26')]||'')+b('0x27')+(R+O[b('0x24')]+0x1));if(!X&&L){L();}else{O[b('0x24')]=O[b('0x24')]+O[b('0x23')];O['documents']=document;bD[b('0x28')](O,![]);}};}}else{var R=0x0;while(!![]){var S=t(N,(O['pagePrefix']||'')+b('0x27')+(R+0x1));if(!S)break;P+=F(N,S);R++;}}}Q[b('0x20')]=P;return Q;}else return N;};function a0(a1){a1[b('0x29')]=am(a1);if(a1['footer']&&a1['footer'][b('0x2a')][b('0x1f')]){ac(a1[b('0x2b')][b('0x2a')]);a1[b('0x2b')][b('0x2a')]=a1[b('0x2b')]['html'][b('0x1f')];}if(a1['header']&&a1[b('0x2c')][b('0x2a')]['innerHTML']){ac(a1['header'][b('0x2a')]);a1[b('0x2c')][b('0x2a')]=a1[b('0x2c')][b('0x2a')][b('0x1f')];}return a1;};function a2(a3,a4){var a5=a3[b('0x29')];var a6=![];if(a5[b('0x21')]){a6=!![];a5=[a5];}var a7=0x0;var a8=document[b('0x10')]('_jp_wrapper');if(!a8){a8=document[b('0x1b')](b('0x1c'));a8[b('0x2d')][b('0x2e')]=b('0x2f');a8['style']['left']=b('0x30');a8[b('0x2d')]['width']=b('0x31');a8['id']=b('0x32');document[b('0x33')][b('0x1d')](a8);}else a8[b('0x1f')]='';var a9=function(){if(!![]||(event[b('0x34')][b('0xe')]||'')==b('0x35')){a5[event[b('0x34')][b('0x36')]]=event['srcElement'][b('0x37')][b('0x38')];a7--;if(a7==0x0){if(a6){a3[b('0x29')]=a5[0x0];}a4();}}};if(typeof a5[b('0x39')]!=b('0xa')){for(var aa=0x0;aa<a5[b('0x12')];aa++){if(a5[aa][b('0x21')]){a7++;var ab=document[b('0x1b')](b('0x3a'));ab[b('0x36')]=aa;if(ab[b('0x3b')]){ab[b('0x3b')](b('0x7'),a9);}else{ab[b('0x7')]=a9;}ab[b('0x3c')]=a5[aa];a8[b('0x1d')](ab);}}}else{if(a6){a3[b('0x29')]=a5[0x0];}a4();}};function ac(ad){var ae=['border',b('0x3d'),b('0x3e'),b('0x3f'),b('0x40'),b('0x41'),b('0x42'),b('0x43'),b('0x44'),b('0x45'),b('0x46'),b('0x47'),b('0x48'),b('0x49'),b('0x4a'),b('0x4b'),b('0x4c'),b('0x4d'),'font-variant',b('0x4e'),'font-weight',b('0x4f'),'line-height',b('0x50'),'text-decoration',b('0x51'),'text-overflow',b('0x52'),b('0x53'),'white-space',b('0x54'),'word-wrap',b('0x55'),b('0x56'),b('0x57'),b('0x58'),b('0x59'),'background-position',b('0x5a'),b('0x5b'),b('0x5c'),b('0x5d'),b('0x5e'),b('0x5f'),b('0x60'),b('0x61'),b('0x62'),b('0x63'),'outline\x20',b('0x64'),b('0x2e'),'resize\x20',b('0x65'),b('0x66'),'visibility',b('0x67'),b('0x68'),b('0x69'),b('0x6a')];var af=ad[b('0x6b')]('*');for(var ag=0x0;ag<af[b('0x12')];ag++){var ah=af['item'](ag);if(ah[b('0x6c')]==b('0x6d')){ah[b('0x3c')]=ah[b('0x3c')];}var ai=(ah[b('0x6e')](b('0x2d'))||'')[b('0x6f')](';');for(var aj=0x0;aj<ae[b('0x12')];aj++){var ak=ae[aj];var al=null;if(ah[b('0x70')]){al=ah[b('0x70')][ak];}else if(window['getComputedStyle']){if(window[b('0x71')]['getPropertyValue']){al=window['getComputedStyle'](ah,null)[b('0x72')](ak);}else{al=window['getComputedStyle'](ah)[ak];};}if(al){ah[b('0x2d')][ak]=al;}}}};function am(an){var ao=an[b('0x29')],ap=null;if(typeof ao[b('0x39')]!='undefined'){ap=[];for(var aq=0x0;aq<ao[b('0x12')];aq++){ap[b('0x39')](M(ao[aq],an));}return ap;}else{return M(ao,an);}};function ar(as){var at=b('0x73')+w(as[b('0x74')])+b('0x75')+F(as[b('0x74')],as)+b('0x76');return at;};function au(av){var aw=b('0x77')+av[b('0x78')]+b('0x79')+w(av)+b('0x75')+av[b('0x33')][b('0x1f')]+b('0x76');return aw;};var ax=[];for(var ay=0x0;ay<0x100;ay++){ax[ay]=(ay<0x10?'0':'')+ay[b('0x7a')](0x10);}function az(){var aA=Math['random']()*0xffffffff|0x0;var aB=Math[b('0x7b')]()*0xffffffff|0x0;var aC=Math[b('0x7b')]()*0xffffffff|0x0;var aD=Math[b('0x7b')]()*0xffffffff|0x0;return ax[aA&0xff]+ax[aA>>0x8&0xff]+ax[aA>>0x10&0xff]+ax[aA>>0x18&0xff]+'-'+ax[aB&0xff]+ax[aB>>0x8&0xff]+'-'+ax[aB>>0x10&0xf|0x40]+ax[aB>>0x18&0xff]+'-'+ax[aC&0x3f|0x80]+ax[aC>>0x8&0xff]+'-'+ax[aC>>0x10&0xff]+ax[aC>>0x18&0xff]+ax[aD&0xff]+ax[aD>>0x8&0xff]+ax[aD>>0x10&0xff]+ax[aD>>0x18&0xff];};function aE(aF){for(p in aF){return![];}return!![];};function aG(aH){var aI=[b('0x25'),b('0x7c'),b('0x7d'),b('0x7e')];for(var aJ=0x0;aJ<aI[b('0x12')];aJ++){var aK=aI[aJ];if(aH[aK]){aH[aK]=bk(aH[aK],![],aJ>0x0);aH['_hasCallback']=!![];}}if(aH[b('0x7f')]&&aH[b('0x7f')]['ok']){aH['dragDesigner']['ok']=bk(aH[b('0x7f')]['ok']);aH[b('0x80')]=!![];}};var aL;var aM;var aN=[];aN[0x3]=b('0x81')+c+b('0x82');aN[0x4]=b('0x81')+c+b('0x83');var aO={};var aP=0x0;var aQ;var aR;function aS(){setTimeout(function(){j(aN[0x1]+b('0x84'),{},function(aT,aU,aV){if(aV!=0xc8||aT['api-error']){b1=![];return;}aS();});},0x7530);};function aW(){aR=!![];j(aN[0x1]+b('0x85'),{},function(aX,aY,aZ){if(aZ!=0xc8||aX[b('0x86')]){b1=![];return;}try{if(aX[b('0x87')]){aO[aX[b('0x87')]][b('0x88')](null,aX[b('0x89')]||[aX[b('0x8a')]]);if(aX[b('0x87')][b('0x8b')](b('0x8c'))!=0x0){delete aO[aX[b('0x87')]];}}}catch(b0){}if(aE(aO)){aR=![];}else{aW();}});};var b1=![];var b2=![];var b3=[];function b4(b5){b5&&b3[b('0x39')](b5);if(b3[b('0x12')]==0x1||!b5){var b6={'method':b('0x8d'),'lic':typeof LIC!=b('0xa')?LIC[b('0x8e')]:'','base':document[b('0x78')]};var b7='';if(d){b6[b('0x8f')]=e;b7='forward='+d+'&';}j(b('0x81')+c+b('0x90')+b7,b6,function(b8,b9,ba){if(ba!=0xc8){var bb=b('0x91');if(!bC[b('0x92')]){if(c!==b('0x93')){alert(bb='无法连接\x20JCP\x20站：'+c);return h(bb);}if(JCP[b('0x94')]){if(JCP[b('0x94')]['noSetupHandle']){JCP[b('0x94')][b('0x95')]();}else if(!b2){if(JCP[b('0x94')][b('0x96')])bb=JCP['setup'][b('0x96')];alert(bb);if(JCP[b('0x94')][b('0x97')]){b2=!![];document[b('0x98')][b('0x99')]=JCP['setup']['download'];var bc=function(){j(b('0x81')+c+b('0x82'),{'method':'getVersion'},function(bd,be,bf){if(bd[b('0x9')]){b4(null);}else setTimeout(bc,0xbb8);});};setTimeout(bc,0x2710);}}}else alert(bb);}return h(bb);}else if(b8[b('0x9a')]){b1=!![];aQ=b8['api-result'];aN[0x0]=b('0x81')+c+b('0x9b')+aQ+b('0x9c')+'&'+b7;aN[0x1]=b('0x81')+c+b('0x9b')+aQ+'&'+b7;aN[0x2]=b('0x81')+c+b('0x9d');aN[0x3]=b('0x81')+c+b('0x82');aS();aW();if(JCP[b('0x94')][b('0x9e')]&&JCP[b('0x94')][b('0x9e')]!=b8[b('0x9e')]){var bc=function(){j(aN[0x3],{'method':b('0x9f')},function(bh,bi,bj){if(bh['result']!=JCP[b('0x94')][b('0x9e')]){setTimeout(bc,0xbb8);}else{b4(null);}});};getJCP()['update'](JCP[b('0x94')][b('0x97')],JCP['setup'][b('0x9e')]);setTimeout(bc,0xbb8);}else{while(b3[b('0x12')]){b3['shift']()();}}}else{b3[b('0x12')]=0x0;alert(b8[b('0x86')]);return h(b8[b('0x86')]);}});}};function bk(bl,bm,bn){if(bl){var bo=bn?b('0x8c'):b('0xa0')+aP++;aO[bo]=!bm?bl:function(bp){bp=eval('('+bp+')');bl(bp);};return aQ+':'+bo;}else return'';};function bq(br){if(!b1){b4(br);}else{br();}};function bs(bt,bu,bv){if(bv!=0xc8||bt[b('0x86')]){if(bv==0xc8&&bt[b('0x86')]==b('0xa1')){var bw=bt['ar']||0x0;if(bw==0x0)alert(b('0xa2')+bt['host']);else if(bw==0x1){alert(b('0xa3')+bt[b('0xa4')]+b('0xa5'));}else if(bw==0x2){alert(b('0xa6'));}aO={};}b1=![];return;}};function bx(by,bz,bA){!aR&&aW();j(aN[by]+(bz||''),bA,bs);};var bB=!![];var bC={};var bD=null;return(bD={'initialize':function(){return this;},'options':function(bE){if(bE){bC=bE;return this;}else{return bC;}},'print':function(bF,bG){bq(function(){bF=a0(bF);aG(bF);bx(0x1,null,{'method':'print','params':[bF,bG?!![]:![]]});});},'printPreview':function(bH,bI){bq(function(){bH=a0(bH);aG(bH);bx(0x1,null,{'method':b('0xa7'),'params':[bH,bI?!![]:![]]});});},'getVersion':function(bJ){bq(function(){bx(0x0,null,{'method':'getVersion','event':bk(bJ)});});},'getDefaultPrinter':function(bK){bq(function(){bx(0x0,null,{'method':'getDefaultPrinter','event':bk(bK)});});},'getPrinterCapability':function(bL,bM,bN){var bO=function(bP){bP=eval('('+bP+')');bN(bP['result']);};bq(function(){bx(0x0,null,{'method':b('0xa8'),'params':[bL,bM],'event':bk(bO)});});},'about':function(){bq(function(){bx(0x1,null,{'method':'about'});});},'exit':function(){bq(function(){bx(0x1,null,{'method':'exit'});});},'emptyCallback':function(){},'getPrinters':function(bQ){bq(function(){bx(0x0,null,{'method':'getPrinters','event':bk(bQ)});});},'getPrinterJobs':function(bR,bS){bq(function(){bx(0x0,null,{'method':b('0xa9'),'params':[bR],'event':bk(bS)});});},'getPapers':function(bT,bU){bq(function(){bx(0x0,null,{'method':b('0xaa'),'params':[bT],'event':bk(bU)});});},'isCustomPaperSupported':function(bV,bW){bq(function(){bx(0x0,null,{'method':b('0xab'),'params':[bV],'event':bk(bW)});});},'addPaper':function(bX,bY,bZ,c0,c1){bq(function(){bx(0x0,null,{'method':b('0xac'),'params':[bX,bY,bZ,c0],'event':bk(c1)});});},'isImplemented':function(c2,c3){bq(function(){bx(0x0,null,{'method':'isImplemented','params':[c2],'event':bk(c3)});});},'getLocalMacAddress':function(c4){bq(function(){bx(0x0,null,{'method':'getLocalMacAddress','event':bk(c4)});});},'getCPUSerialNo':function(c5){bq(function(){bx(0x0,null,{'method':'getCPUSerialNo','event':bk(c5)});});},'setOffsetPage':function(c6,c7){bq(function(){bx(0x0,null,{'method':b('0xad'),'params':[c6],'event':bk(c7)});});},'isInstalled':function(c8,c9){bq(function(){bx(0x0,null,{'method':b('0xae'),'params':[c8],'event':bk(c9)});});},'setDragCSS':function(ca,cb,cc){bq(function(){bx(0x0,null,{'method':'setDragCSS','params':[ca,cb],'event':bk(cc)});});},'clearSettings':function(cd,ce){bq(function(){bx(0x0,null,{'method':'clearSettings','params':[cd],'event':bk(ce)});});},'getSettingsIds':function(cf){bq(function(){bx(0x0,null,{'method':b('0xaf'),'event':bk(cf,!![])});});},'printTIFF':function(cg,ch,ci,cj){bq(function(){bx(0x1,null,{'method':'printTIFF','params':[cg,ch,ci],'event':bk(cj)});});},'printDocument':function(ck,cl,cm){bq(function(){aG(cl);if(cl[b('0xb0')]==b('0xb1')){cl[b('0x94')]=JCP['setup'][b('0x97')];}bx(0x1,null,{'method':b('0xb2'),'params':[ck,cl],'event':bk(cm)});});},'exportAsExcel':function(cn,co,cp,cq){bq(function(){var cr=ar(cn);bx(0x1,null,{'method':b('0xb3'),'params':[cr,co,cp],'event':bk(cq)});});},'setupNormalOffset':function(cs,ct){bq(function(){bx(0x1,null,{'method':b('0xb4'),'params':[cs],'event':bk(ct)});});},'download':function(cu,cv,cw){bq(function(){bx(0x0,null,{'method':b('0x97'),'params':[cu,cv],'event':bk(cw)});});},'printToImage':function(cx,cy,cz){bq(function(){cx=a0(cx);aG(cx);bx(0x1,null,{'method':b('0xb5'),'params':[cx,cy],'event':bk(cz)});});},'exportAsImage':function(cA,cB,cC){if(c==X){bq(function(){cA=a0(cA);bx(0x1,null,{'method':b('0xb6'),'params':[cA,cB],'event':bk(function(cD){var cE=b('0x81')+c+b('0xb7')+cD;cC(cE);})});});}else getJCP(X)['exportAsImage'](cA,cB,cC);},'exportAsPDF':function(cF,cG){if(c==X){bq(function(){cF=a0(cF);bx(0x1,null,{'method':b('0xb8'),'params':[cF],'event':bk(function(cH){var cI=b('0x81')+c+b('0xb7')+cH;cG(cI);})});});}else getJCP(X)['exportAsPDF'](cF,cG);},'exportAsTIFF':function(cJ,cK){if(c==X){bq(function(){cJ=a0(cJ);bx(0x1,null,{'method':b('0xb9'),'params':[cJ],'event':bk(function(cL){var cM='http://'+c+b('0xb7')+cL;cK(cM);})});});}else getJCP(X)[b('0xb9')](cJ,cK);},'configUpdate':function(cN,cO,cP){bq(function(){bx(0x2,null,{'method':'configUpdate','params':[cN,cO],'event':bk(cP)});});},'update':function(cQ,cR,cS){bq(function(){bx(0x2,null,{'method':b('0xba'),'params':[cQ,cR],'event':bk(cS)});});},'getFonts':function(cT){bq(function(){bx(0x0,null,{'method':b('0xbb'),'event':bk(cT)});});},'copy':function(cU,cV,cW){bq(function(){bx(0x0,null,{'method':b('0xbc'),'params':[cU,cV],'event':bk(cW)});});},'copied':function(cX,cY){bq(function(){bx(0x0,null,{'method':b('0xbd'),'params':[cX],'event':bk(cY)});});},'writeString':function(cZ,d0,d1,d2){bq(function(){bx(0x0,null,{'method':b('0xbe'),'params':[cZ,d0,d1],'event':bk(d2)});});},'writeBase64':function(d3,d4,d5){bq(function(){bx(0x0,null,{'method':b('0xbf'),'params':[d3,d4],'event':bk(d5)});});},'readString':function(d6,d7,d8){bq(function(){bx(0x0,null,{'method':b('0xc0'),'params':[d6,d7],'event':bk(d8)});});},'readBase64':function(d9,da){bq(function(){bx(0x0,null,{'method':b('0xc1'),'params':[d9],'event':bk(da)});});},'readHTML':function(db,dc,dd){bq(function(){bx(0x0,null,{'method':b('0xc2'),'params':[db,dc],'event':bk(dd)});});},'chooseFile':function(de,df,dg,dh){bq(function(){bx(0x1,null,{'method':b('0xc3'),'params':[de,df,dg],'event':bk(dh)});});},'showPageSetupDialog':function(di){var dj=function(dk){di(dk?eval('('+dk+')'):null);};bq(function(){bx(0x0,null,{'method':'showPageSetupDialog','event':bk(dj)});});},'getLastSettings':function(dl,dm){bq(function(){bx(0x0,null,{'method':b('0xc4'),'params':[dl],'event':bk(dm)});});},'getAbsoluteURL':function(dn,dp,dq){var dr=dp[b('0x6f')]('/'),ds=dn[b('0x6f')]('/');dr[b('0xc5')]();for(var dt=0x0;dt<ds[b('0x12')];dt++){if(ds[dt]=='.')continue;if(ds[dt]=='..')dr[b('0xc5')]();else dr[b('0x39')](ds[dt]);}(dq||this[b('0xc6')])[b('0xc7')](this,dr[b('0xc8')]('/'));},'setLastSettings':function(du,dv,dw){bq(function(){bx(0x0,null,{'method':b('0xc9'),'params':[du,dv],'event':bk(dw)});});},'setDefaultPrinter':function(dx,dy){bq(function(){bx(0x0,null,{'method':b('0xca'),'params':[dx],'event':bk(dy)});});},'openFile':function(dz,dA){bq(function(){bx(0x1,null,{'method':b('0xcb'),'params':[dz],'event':bk(dA)});});},'getPrinterInfo':function(dB,dC){bq(function(){bx(0x0,null,{'method':b('0xcc'),'params':[dB],'event':bk(dC)});});},'showHTMLDialog':function(dD,dE,dF,dG){bq(function(){var dH=[];if(dE)dH[b('0x39')](b('0xcd')+dE);if(dF)dH[b('0x39')](b('0xce')+dF);if(!dG)dH[b('0x39')](b('0xcf'));bx(0x1,null,{'method':b('0xd0'),'params':[0x0,dD,dH[b('0xc8')](';')]});});},'getPrinterStatus':function(dI,dJ,dK){bq(function(){bx(0x0,null,{'method':b('0xd1'),'params':[dI,dJ],'event':bk(dK)});});},'nothing':function(){},'setPrintBackground':function(dL,dM){bq(function(){bx(0x0,null,{'method':b('0xd2'),'params':[dL],'event':bk(dM)});});},'getServerId':function(dN,dO){bq(function(){j(aN[0x3],{'method':b('0xd3'),'url':dN},dO,!![]);});},'findJCPs':function(dP,dQ){bq(function(){j(aN[0x3],{'method':'findJCPs','seconds':dQ||0x5},dP,!![]);});},'connect':function(dR,dS,dT){bq(function(){j(aN[0x4],{'method':b('0xd4'),'aJ':dR,'ax':dS},dT,!![]);});}})[b('0xd5')]();};var ak={};function getJCP(dU,dV,dW){dU=dU||b('0x93');var dX=dU+(dV||'');if(!ak[dX]){ak[dX]=new j(dU,dV||'',dW||'');}return ak[dX];};function L(){getJP()[b('0xd6')]();};var JSON=JSON||{};var JSONstringify=JSON[b('0xd7')]||function(){'use strict';var dY=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;function dZ(e0){return e0<0xa?'0'+e0:e0;};function e1(){return this[b('0xd8')]();};if(typeof Date['prototype']['aM']!==b('0xd9')){Date[b('0xda')]['aM']=function(){return isFinite(this[b('0xd8')]())?this[b('0xdb')]()+'-'+dZ(this[b('0xdc')]()+0x1)+'-'+dZ(this['getUTCDate']())+'T'+dZ(this[b('0xdd')]())+':'+dZ(this[b('0xde')]())+':'+dZ(this[b('0xdf')]())+'Z':null;};Boolean[b('0xda')]['aM']=e1;Number[b('0xda')]['aM']=e1;String[b('0xda')]['aM']=e1;}var e2;var e3;var e4;var e5;function e6(e7){dY['lastIndex']=0x0;return dY[b('0xe0')](e7)?'\x22'+e7[b('0x15')](dY,function(e8){var e9=e4[e8];return typeof e9==='string'?e9:'\x5cu'+('0000'+e8[b('0xe1')](0x0)[b('0x7a')](0x10))[b('0xe2')](-0x4);})+'\x22':'\x22'+e7+'\x22';};function ea(eb,ec){var ed;var ee;var ef;var eg;var eh=e2;var ei;var ej=ec[eb];if(ej&&typeof ej===b('0x1')&&typeof ej['aM']===b('0xd9')){ej=ej['aM'](eb);}if(typeof e5===b('0xd9')){ej=e5[b('0xc7')](ec,eb,ej);}switch(typeof ej){case b('0xe3'):return e6(ej);case b('0xe4'):return isFinite(ej)?String(ej):'null';case b('0xe5'):case'null':return String(ej);case b('0x1'):if(!ej){return'null';}e2+=e3;ei=[];if(Object['prototype'][b('0x7a')][b('0x88')](ej)===b('0xe6')){eg=ej['length'];for(ed=0x0;ed<eg;ed+=0x1){ei[ed]=ea(ed,ej)||b('0xe7');}ef=ei[b('0x12')]===0x0?'[]':e2?'[\x0a'+e2+ei[b('0xc8')](',\x0a'+e2)+'\x0a'+eh+']':'['+ei[b('0xc8')](',')+']';e2=eh;return ef;}if(e5&&typeof e5==='object'){eg=e5[b('0x12')];for(ed=0x0;ed<eg;ed+=0x1){if(typeof e5[ed]===b('0xe3')){ee=e5[ed];ef=ea(ee,ej);if(ef){ei[b('0x39')](e6(ee)+(e2?':\x20':':')+ef);}}}}else{for(ee in ej){if(Object['prototype'][b('0xe8')][b('0xc7')](ej,ee)){ef=ea(ee,ej);if(ef){ei[b('0x39')](e6(ee)+(e2?':\x20':':')+ef);}}}}ef=ei[b('0x12')]===0x0?'{}':e2?'{\x0a'+e2+ei[b('0xc8')](',\x0a'+e2)+'\x0a'+eh+'}':'{'+ei[b('0xc8')](',')+'}';e2=eh;return ef;}};if(typeof JSON[b('0xd7')]!=='function'){e4={'\b':'\x5cb','\t':'\x5ct','\n':'\x5cn','\f':'\x5cf','\r':'\x5cr','"':'\x5c\x22','\\':'\x5c\x5c'};JSON[b('0xd7')]=function(ek,el,em){var en;e2='';e3='';if(typeof em===b('0xe4')){for(en=0x0;en<em;en+=0x1){e3+='\x20';}}else if(typeof em==='string'){e3=em;}e5=el;if(el&&typeof el!==b('0xd9')&&(typeof el!==b('0x1')||typeof el[b('0x12')]!==b('0xe4'))){throw new Error(b('0xe9'));}return ea('',{'':ek});};}return JSON[b('0xd7')];}();var Y=null;function showLoading(eo){if(!Y){Y=document[b('0x1b')](b('0xea'));Y[b('0x3c')]='http://print.jatools.com/jcp/0.99/image/loading1.gif';Y[b('0x2d')][b('0xeb')]='middle';}Y[b('0x2d')][b('0x60')]=b('0xec');var ep=document['getElementById'](eo);ep[b('0xed')][b('0xee')](Y,ep[b('0xef')]);};function hideLoading(){if(Y){Y['style'][b('0x60')]='none';}}