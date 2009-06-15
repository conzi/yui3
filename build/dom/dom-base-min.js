YUI.add("dom-base",function(A){(function(F){var O="nodeType",D="ownerDocument",C="documentElement",B="defaultView",H="parentWindow",K="tagName",L="parentNode",N="firstChild",P="lastChild",J="previousSibling",M="nextSibling",I="contains",E="compareDocumentPosition",G=/<([a-z]+)/i;F.DOM={byId:function(R,Q){Q=Q||F.config.doc;return Q.getElementById(R);},getText:(document.documentElement.textContent!==undefined)?function(R){var Q="";if(R){Q=R.textContent;}return Q||"";}:function(R){var Q="";if(R){Q=R.innerText;}return Q||"";},setText:(document.documentElement.textContent!==undefined)?function(Q,R){if(Q){Q.textContent=R;}}:function(Q,R){if(Q){Q.innerText=R;}},firstChild:function(Q,R){return F.DOM._childBy(Q,null,R);},firstChildByTag:function(R,Q,S){return F.DOM._childBy(R,Q,S);},lastChild:function(Q,R){return F.DOM._childBy(Q,null,R,true);},lastChildByTag:function(R,Q,S){return F.DOM._childBy(R,Q,S,true);},_childrenByTag:function(){if(document[C].children){return function(T,R,U,S){R=(R&&R!=="*")?R.toUpperCase():null;var V=[],Q=U;if(T){if(R&&!F.UA.webkit){V=T.children.tags(R);}else{V=T.children;if(R){Q=function(W){return W[K].toUpperCase()===R&&(!U||U(W));};}}V=F.DOM.filterElementsBy(V,Q);}return V;};}else{return function(S,R,T){R=(R&&R!=="*")?R.toUpperCase():null;var U=[],Q=T;if(S){U=S.childNodes;if(R){Q=function(V){return V[K].toUpperCase()===R&&(!T||T(V));};}U=F.DOM.filterElementsBy(U,Q);}return U;};}}(),children:function(Q,R){return F.DOM._childrenByTag(Q,null,R);},previous:function(Q,S,R){return F.DOM.elementByAxis(Q,J,S,R);},next:function(Q,S,R){return F.DOM.elementByAxis(Q,M,S,R);},ancestor:function(Q,S,R){return F.DOM.elementByAxis(Q,L,S,R);},elementByAxis:function(Q,T,S,R){while(Q&&(Q=Q[T])){if((R||Q[K])&&(!S||S(Q))){return Q;}}return null;},byTag:function(R,S,V){S=S||F.config.doc;var W=S.getElementsByTagName(R),U=[],T,Q;for(T=0,Q=W.length;T<Q;++T){if(!V||V(W[T])){U[U.length]=W[T];}}return U;},firstByTag:function(R,S,V){S=S||F.config.doc;var W=S.getElementsByTagName(R),T=null,U,Q;for(U=0,Q=W.length;U<Q;++U){if(!V||V(W[U])){T=W[U];break;}}return T;},filterElementsBy:function(V,U,T){var R=(T)?null:[],S,Q;for(S=0,Q=V.length;S<Q;++S){if(V[S][K]&&(!U||U(V[S]))){if(T){R=V[S];break;}else{R[R.length]=V[S];}}}return R;},contains:function(R,S){var Q=false;if(!S||!R||!S[O]||!R[O]){Q=false;}else{if(R[I]){if(F.UA.opera||S[O]===1){Q=R[I](S);}else{Q=F.DOM._bruteContains(R,S);}}else{if(R[E]){if(R===S||!!(R[E](S)&16)){Q=true;}}}}return Q;},inDoc:function(Q,R){R=R||Q[D];var S=Q.id;if(!S){S=Q.id=F.guid();}return !!(R.getElementById(S));},insertBefore:function(S,Q){var R=null,T;if(S&&Q&&(T=Q.parentNode)){if(typeof S==="string"){S=F.DOM.create(S);}R=T.insertBefore(S,Q);}else{}return R;},insertAfter:function(R,Q){if(!R||!Q||!Q[L]){return null;}if(typeof R==="string"){R=F.DOM.create(R);}if(Q[M]){return Q[L].insertBefore(R,Q[M]);}else{return Q[L].appendChild(R);}},create:function(V,X){V=F.Lang.trim(V);if(!X&&F.DOM._cloneCache[V]){return F.DOM._cloneCache[V].cloneNode(true);}X=X||F.config.doc;var R=G.exec(V),U=F.DOM._create,W=F.DOM.creators,T=null,Q,S;if(R&&W[R[1]]){if(typeof W[R[1]]==="function"){U=W[R[1]];}else{Q=W[R[1]];}}S=U(V,X,Q).childNodes;if(S.length===1){T=S[0].parentNode.removeChild(S[0]);}else{T=X.createDocumentFragment();while(S.length){T.appendChild(S[0]);}}F.DOM._cloneCache[V]=T.cloneNode(true);return T;},CUSTOM_ATTRIBUTES:(!document.documentElement.hasAttribute)?{"for":"htmlFor","class":"className"}:{"htmlFor":"for","className":"class"},setAttribute:function(R,Q,S){if(R&&R.setAttribute){Q=F.DOM.CUSTOM_ATTRIBUTES[Q]||Q;R.setAttribute(Q,S);}},getAttribute:function(S,Q){var R="";if(S&&S.getAttribute){Q=F.DOM.CUSTOM_ATTRIBUTES[Q]||Q;R=S.getAttribute(Q,2);if(R===null){R="";}}return R;},srcIndex:(document.documentElement.sourceIndex)?function(Q){return(Q&&Q.sourceIndex)?Q.sourceIndex:null;}:function(Q){return(Q&&Q[D])?[].indexOf.call(Q[D].getElementsByTagName("*"),Q):null;},isWindow:function(Q){return Q.alert&&Q.document;},_fragClones:{div:document.createElement("div")},_create:function(R,S,Q){Q=Q||"div";var T=F.DOM._fragClones[Q];if(T){T=T.cloneNode(false);}else{T=F.DOM._fragClones[Q]=S.createElement(Q);}T.innerHTML=R;return T;},_removeChildNodes:function(Q){while(Q.firstChild){Q.removeChild(Q.firstChild);}},_cloneCache:{},addHTML:function(U,T,R,V){T=F.Lang.trim(T);var Q,S=F.DOM._cloneCache[T];if(S){S=S.cloneNode(true);}else{if(T.nodeType){S=T;}else{S=F.DOM.create(T);}}if(R){if(R.nodeType){R.parentNode.insertBefore(S,R);}else{switch(R){case"replace":while(U.firstChild){U.removeChild(U.firstChild);}U.appendChild(S);break;case"before":U.parentNode.insertBefore(S,U);break;case"after":if(U.nextSibling){U.parentNode.insertBefore(S,U.nextSibling);}else{U.parentNode.appendChild(S);}break;default:U.appendChild(S);}}}else{U.appendChild(S);}if(V){if(S.tagName.toUpperCase()==="SCRIPT"&&!F.UA.gecko){Q=[S];}else{Q=S.getElementsByTagName("script");}F.DOM._execScripts(Q);}else{if(T.nodeType||(T.indexOf&&T.indexOf("<script")>-1)){F.DOM._stripScripts(S);}}return S;},VALUE_SETTERS:{},VALUE_GETTERS:{},getValue:function(S){var R="",Q;if(S&&S[K]){Q=F.DOM.VALUE_GETTERS[S[K].toLowerCase()];if(Q){R=Q(S);}else{R=S.value;}}return(typeof R==="string")?R:"";},setValue:function(Q,R){var S;if(Q&&Q[K]){S=F.DOM.VALUE_SETTERS[Q[K].toLowerCase()];if(S){S(Q,R);}else{Q.value=R;}}},_stripScripts:function(T){var Q=T.getElementsByTagName("script"),S,R;for(S=0,R;R=Q[S++];){R.parentNode.removeChild(R);}},_execScripts:function(Q,U){var S,T,R;U=U||0;for(T=U,R;R=Q[T++];){S=R.ownerDocument.createElement("script");R.parentNode.replaceChild(S,R);if(R.text){S.text=R.text;}else{if(R.src){S.src=R.src;if(typeof S.onreadystatechange!=="undefined"){S.onreadystatechange=function(){if(/loaded|complete/.test(R.readyState)){event.srcElement.onreadystatechange=null;setTimeout(function(){F.DOM._execScripts(Q,T++);},0);}};}else{S.onload=function(V){V.target.onload=null;F.DOM._execScripts(Q,T++);};}return;}}}},_bruteContains:function(Q,R){while(R){if(Q===R){return true;
}R=R.parentNode;}return false;},_getRegExp:function(R,Q){Q=Q||"";F.DOM._regexCache=F.DOM._regexCache||{};if(!F.DOM._regexCache[R+Q]){F.DOM._regexCache[R+Q]=new RegExp(R,Q);}return F.DOM._regexCache[R+Q];},_getDoc:function(Q){Q=Q||{};return(Q[O]===9)?Q:Q[D]||Q.document||F.config.doc;},_getWin:function(Q){var R=F.DOM._getDoc(Q);return R[B]||R[H]||F.config.win;},_childBy:function(U,Q,W,S){var T=null,R,V;if(U){if(S){R=U[P];V=J;}else{R=U[N];V=M;}if(F.DOM._testElement(R,Q,W)){T=R;}else{T=F.DOM.elementByAxis(R,V,W);}}return T;},_batch:function(T,X,W,S,R,V){X=(typeof name==="string")?F.DOM[X]:X;var Q,U=[];if(X&&T){F.each(T,function(Y){if((Q=X.call(F.DOM,Y,W,S,R,V))!==undefined){U[U.length]=Q;}});}return U.length?U:T;},_testElement:function(R,Q,S){Q=(Q&&Q!=="*")?Q.toUpperCase():null;return(R&&R[K]&&(!Q||R[K].toUpperCase()===Q)&&(!S||S(R)));},creators:{},_IESimpleCreate:function(Q,R){R=R||F.config.doc;return R.createElement(Q);}};(function(U){var V=U.DOM.creators,Q=U.DOM.create,T=/(?:\/(?:thead|tfoot|tbody|caption|col|colgroup)>)+\s*<tbody/,S="<table>",R="</table>";if(U.UA.gecko||U.UA.ie){U.mix(V,{option:function(W,X){return Q("<select>"+W+"</select>",X);},tr:function(W,X){return Q("<tbody>"+W+"</tbody>",X);},td:function(W,X){return Q("<tr>"+W+"</tr>",X);},tbody:function(W,X){return Q(S+W+R,X);},legend:"fieldset"});V.col=V.tbody;}if(U.UA.ie){U.mix(V,{tbody:function(X,Y){var Z=Q(S+X+R,Y),W=Z.children.tags("tbody")[0];if(Z.children.length>1&&W&&!T.test(X)){W[L].removeChild(W);}return Z;},script:function(W,X){var Y=X.createElement("div");Y.innerHTML="-"+W;Y.removeChild(Y[N]);return Y;}},true);U.mix(U.DOM.VALUE_GETTERS,{button:function(W){return(W.attributes&&W.attributes.value)?W.attributes.value.value:"";}});U.mix(U.DOM.VALUE_SETTERS,{button:function(X,Y){var W=X.attributes.value;if(!W){W=X[D].createAttribute("value");X.setAttributeNode(W);}W.value=Y;}});}if(U.UA.gecko||U.UA.ie){U.mix(V,{th:V.td,thead:V.tbody,tfoot:V.tbody,caption:V.tbody,colgroup:V.tbody,col:V.tbody,optgroup:V.option});}U.mix(U.DOM.VALUE_GETTERS,{option:function(X){var W=X.attributes;return(W.value&&W.value.specified)?X.value:X.text;},select:function(X){var Y=X.value,W=X.options;if(W&&Y===""){if(X.multiple){}else{Y=U.DOM.getValue(W[X.selectedIndex],"value");}}return Y;}});})(F);})(A);A.mix(A.DOM,{hasClass:function(D,C){var B=A.DOM._getRegExp("(?:^|\\s+)"+C+"(?:\\s+|$)");return B.test(D.className);},addClass:function(C,B){if(!A.DOM.hasClass(C,B)){C.className=A.Lang.trim([C.className,B].join(" "));}},removeClass:function(C,B){if(B&&A.DOM.hasClass(C,B)){C.className=A.Lang.trim(C.className.replace(A.DOM._getRegExp("(?:^|\\s+)"+B+"(?:\\s+|$)")," "));if(A.DOM.hasClass(C,B)){A.DOM.removeClass(C,B);}}},replaceClass:function(C,B,D){A.DOM.addClass(C,D);A.DOM.removeClass(C,B);},toggleClass:function(C,B){if(A.DOM.hasClass(C,B)){A.DOM.removeClass(C,B);}else{A.DOM.addClass(C,B);}}});},"@VERSION@",{requires:["event"],skinnable:false});