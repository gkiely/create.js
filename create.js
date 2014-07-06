// todo
// clean up, make functions modular & nice, comment, maybe start from scratch and do a rewrite
// add code for init, should make an array, and call each of those
// create lotr themed example
// documentation for api (__ to extend method)
// best practice: defaults, req & init, this || dom, public , pure



var create = (function(){
	// main add props method
	function addProps(child, o){
		for(var i in o){
			child[i] = o[i];
		}
	}

	// This guy is for overwriting/adding req's
	function addReqs(child, req, obj){
		if(obj.req){
			child.req = obj.req;
		}
		else if(req){
			child.req = obj.__req || {};
			for(var i in req){
				child.req[i] = req[i];
			} 
		}
	}
	// checks requirement objects
	function checkReq(obj, req, parent){
		var err = [], typeStr,
			name = parent._name;

		for(var i in req){
			if(obj && obj.hasOwnProperty(i)){
				//also check against type
				typeVal = typeof req[i];
				if(typeVal === 'function'){
					//see what function returns, if false, throw err
					if( !req[i](obj[i]) ) {
						throw new Error ('parameter: ['+ i + '] did not meed param requirements');
					}
				}
				else if(typeVal === 'object' && Object.keys(req[i]).length){
					//This currently only allows 1 test & msg, can update for more in future
					if( req[i].test && !req[i].test( obj[i] ) ){ 
						throw new Error ('parameter: ['+ i + '] ' + req[i].msg( obj[i] )  || 'did not meed param requirements' );
					}
				}
			}
			else if( !parent.hasOwnProperty(i) ){
				err.push(i);
			}
		}
		if(err.length) {
			throw new Error(name  +' instance missing parameter' + (err.length > 1 ? 's' : '') + ': ' + err.join(', ') );
		}
	}

	function getAllProps(parent){
		var obj={};
		for(var i in parent){
			if(typeof parent[i] !== "function" && i !== "req" && i.charAt(0) !== "_"){
				obj[i] = parent[i];
			}
		}
		return obj;
	}
	
	// Public wrapper for createClass
	// Prevents init from calling for classes & takes function as 2nd arg
	window.createClass = function createClass(parent, func){
		var name = parent.name, obj;
		if(typeof parent === "function"){
			parent = parent();
			if(name){
				parent._name = name;
			}
			return parent;
		}
		// dev can pass function or just plain object, preferably function
		if(typeof func === "function"){
			name = func.name;
			obj = func() || {};
			obj._name = name;
			obj._parent = parent._name;
			return create(parent, obj, false);
		}
		else throw new Error('createClass() requires function as 2nd argument');
	};

	// main create function
	return function create(parent, obj, init){
		var child = Object.create(parent),
				req = parent.req;

		if(obj){
			addProps(child, obj);
			addReqs(child, req, obj);
		}

		if(init !== false){
			//If object do normal checkReq
			if(typeof child.req === "object") checkReq(obj, child.req, parent);
			//If string get do full check, does not include vars prefixed with _
			else if(typeof child.req === "string" && child.req.toLowerCase() === "all"){
				var tempObj = getAllProps(parent);
				checkReq(obj, tempObj, parent);
			}
		}

		if(typeof child.init === "function" && init !== false) child.init();
		return child;
	}

})();