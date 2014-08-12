/**
  * --------------------------------
  *       Collection Library
  * --------------------------------
  *
  * @Author co3moz (Doğan DERYA)
  * @Date 22.07.2014 17:19
  *
  */

module.exports = function( scheme , datafile ) {
	this.this = [];
	
	this.add =
		function( what ) {
			if (!( what instanceof Array )) {
				if ( this.syntax(what) ) {
					for( var key in scheme ) {
						if ( typeof what[key] === "undefined" ) {
							what[key] = scheme[key];
						}
					}
				
					this.this.push(what);
					return true;
				}
				return false;
			}
			
			var total = 0;
			for(key in what) {
				if(this.add(what[key]))
					total++;
			}
			return total;
		};
		
	this.delete =
		function ( what ) {
			var total = 0;
			for( var key in this.this ) {
				var status = true;
				for( var key2 in what ) {
					if (this.this[key][key2] !== what[key2]) {
						status = false;
						break;
					}
				}
				
				if (status == true) {
					total++;
					delete this.this[key];
				}
			}
			return total;
		};
		
	this.find =
		function ( what , limit) {
			if (typeof limit === "undefined") {
				limit == -1;
			}
			
			var data = [];
			for( var key in this.this ) {
				var status = true;
				for( var key2 in what ) {
					if (this.this[key][key2] !== what[key2]) {
						status = false;
						break;
					}
				}
				
				if (limit == data.length) {
					break;
				}
				
				if (status == true) {
					data.push(this.this[key]);
					
				}
			}
			return data;
		};
		
	this.exists =
		function ( what ) {
			for( var key in this.this ) {
				var status = true;
				for( var key2 in what ) {
					if (this.this[key][key2] !== what[key2]) {
						status = false;
						break;
					}
				}
				
				if (status == true) {
					return true;
				}
			}
			return false;;
		};
		
	this.findIt = 
		function ( what, inwhat) {
			var find = this.find( what , 1);
			if (find.length > 0) {
				return find[0][inwhat];
			}
			else return null;
		};
		
	this.syntax =
		function( what ) {
			for( var key in scheme ) {
				if ( ( typeof what[key] === "undefined" ) && ( typeof scheme[key] === "undefined" ) ) {
					return false;
				}
			}
			return true;
		};
	
	this.save =
		function (location) {
			location = location || datafile;
			require('fs').writeFileSync(location, JSON.stringify(this.this, null, "\t"));
		}
		
	this.count = 
		function () {
			return this.this.length;
		};
		
	try {
		if (typeof datafile !== "undefined") {
			if (require('fs').existsSync(datafile)) {
				var temp = JSON.parse(require('fs').readFileSync(datafile));
				if (temp instanceof Array) {
					for( var key in temp ) {
						if (temp[key] != undefined) {
							if (!this.add(temp[key])) {
								console.log("This record cannot use with this scheme!!! key:" + key);
							}
						}
					}
					this.save();
				}
			}
		}
	}
	catch(e) {
		console.log("Warning! %s can't parsed.", datafile); 
	}
};