(function(root){

	root['struct'] = root['struct'] || {};

	/* 
		Linked List Implementation
	*/
	struct.linkedList = function(){
		this.head = null;
	}

	struct.linkedList.prototype = {  
		item : function(index){
			var length = this.length(), count = 0, current = this.head;

			if(this.isEmpty()){
				return;
			}

			if(index >= 0 && index <= length){
				if(index === 0){
					return current.data;
				}				
				while(current){	
					
					if(count === index){
						return current.data;
					}
					
					current = current.next;
					count++;
				}
			}
		},
		insert : function(data){
			var node = { data : data, next : null}, current = {};

			if(this.head === null){
				this.head = node;
			}else{
				current = this.head;

				while(current.next !== null){
     	           current = current.next;
	            }

	            current.next = node;
			}	
		},
		insertBefore : function(index, data){
			var node = { data : data, next : null}, current = this.head, length = this.length(), count = 0;;

			if(this.isEmpty()){
				return;
			}

			if(index >= 0 && index <= length){
				if(index === 0){
					node.next = current;
					this.head = node;
					
					return;
				}
				while(current){
					if(count === index - 1){
						node.next = current.next;
						current.next = node;						

						return;
					}

					current = current.next;
     	           	count++;
	            }	 	             
			}
		},
		insertAfter : function(index, data){
			var node = { data : data, next : null}, current = this.head, length = this.length(), count = 0;

			if(this.isEmpty()){
				return;
			}

			if(index >= 0 && index <= length){
				while(current){			
				
					if(count === index){
						node.next = current.next;
						current.next = node;						

						return;
					}

					current = current.next;
     	           	count++;
	            }	
	            current.next = node;       
			}
		},
		insertFirst : function(data){
			var node = { data : data, next : null}, current = this.head;

			node.next = current;
			this.head = node;
		},
		insertLast : function(data){
			var node = { data : data, next : null}, current = this.head;

			if(this.isEmpty()){
				this.head = node;

				return;
			}else{
				while(current.next !== null){			
					current = current.next;
	            }
	            current.next = node;   
			}
		},		
		remove : function(index){
			var current = this.head, previous = {}, length = this.length(), count = 0;

			if(this.isEmpty()){
				return;
			}

			if(index >= 0 && index <= length){
				if(index === 0){
					this.head = current.next;
					delete current;

					return;
				}else{
					while(current.next !== null){
						if(count === index){
							previous.next = current.next;
							delete current;

							return;
						}else{
							previous = current;
							current = current.next;
						}
						count++;
					}
				}
			}	
		},
		removeFirst : function(){
			var current = this.head;

			if(this.isEmpty()){
				return;
			}else{
				this.head = current.next;
				delete current;				
			}
		},
		removeLast : function(){
			var current = this.head, previous = {}, length = this.length(), count = 0;

			if(this.isEmpty()){
				return;
			}else{
				while(current){

					if(count === length - 1){
						previous.next = current.next;
						delete current;

						return;
					}else{
							previous = current;
							current = current.next;
					}
					count++;
				};				
			}
		},		
		length : function(){
			var count = 0, current = this.head;

			if(current === null) return 0;
			
			while(current){
				current = current.next;
				count++;
			}

			return count;
		},
		clear : function(){
			this.head = null;
		},
		isEmpty : function(){
			return this.head === null ? true : false ;
		},
		toArray : function(){
			var current = this.head, tmpArr = [];

			while(current){
				tmpArr.push(current.data);
				current = current.next;
			}
			return tmpArr;
		},
		toString : function(){
			return this.toArray().toString();
		}
	};


	/* 
		Binary Tree Implementation
	*/
	struct.binaryTree = function(){
		this.root = null;
	};

	struct.binaryTree.prototype = {
		add :function(value){
			var node = {value : value, left: null, right: null};

			if(this.root === null){
				this.root = node;
			}else{
				(addHelper = function(n, v){
					if(v < n.value){
						if(n.left === null){
							n.left = {value : v, left: null, right: null};
						}else{
							addHelper(n.left, v);
						}
					}else if(v > n.value){
						if(n.right === null){
							n.right = {value : v, left: null, right: null};
						}else{
							addHelper(n.right, v);
						}
					}else{
						return;
					}	

				})(this.root, value);
			}
		},
		remove : function(value){
			var current = parent = rparent = replace = null, found = false, isRoot = false, numChildren;

			(f = function(c){
				if(value < c.value){
					parent = c;
					f(c.left);
				}else if(value > c.value){
					parent = c;
					f(c.right);
				}else if(c.value === value){
					current = c;
					found = true;
					return;
				}
			})(this.root);

			if(!found) return;

			numChildren = this._numberOfChildren(current);

			if(this.root.value === value) isRoot = true;

			if(numChildren === 0){
				if(isRoot){
					this.root = null;
				}else{
					if(current.value < parent.value){
						parent.left = null;					
					}else{
						parent.right = null;
					}
					delete current;
				}
			}else if(numChildren === 1){
				if(isRoot){
					this.root = current.right;

					if(current.left !== null){
						this.root = current.left;
					}
				}else{
					if(current.value < parent.value){
						parent.left = current.left;					
					}else{
						parent.right = current.right;
					}
					delete current;
				}				
			}else if(numChildren === 2){
				if(isRoot){
	                replacement = this.root.left;

	                while (replacement.right !== null){
	                    rparent = replacement;
	                    replacement = replacement.right;
	                }

	                if (rparent !== null){
	                    rparent.right = replacement.left;

	                    replacement.right = this.root.right;
	                    replacement.left = this.root.left;
	                } else {

	                    replacement.right = this.root.right;
	                }

	                this.root = replacement;
				}else{
					replace = current.left;

					if(current.value < parent.value){
						replace.right = current.right;
						parent.left = replace;				
					}else{
						replace.right = current.right;
						parent.right = replace;
					}	
					delete current;	
				}						
			}
		},
		minNode : function(){
			var current = this.root;

			while(current.left !== null){
				current = current.left;
			}
			return current.value;
		},
		maxNode : function(){
			var current = this.root;

			while(current.right !== null){
				current = current.right;
			}

			return current.value;
		},
		traverse : function(callback){
			(traverseHelper = function(n){

				if(n === null) return;
				
				callback.call(this, n);	
				
				traverseHelper(n.left);
				traverseHelper(n.right);				

			})(this.root);
		},
		find : function(value){
			var n = null;

			this.traverse(function(node){								
				if(node.value === value){
					n = node;
				}
			});

			return n;
		},
		count: function(){
			var count = 0;

			this.traverse(function(node){
				count++;
			});

			return count;
		},
		clear : function(){
			this.root = null;
		},		
		toArray: function(){
	        var tmpArr = [];

	        this.traverse(function(node){
	            tmpArr.push(node.value);
	        });
	        
	        return tmpArr;
	    },
	    toString: function(){
	        return this.toArray().toString();
	    },
		getRoot : function(){
			return this.root;
		},	    		
		_numberOfChildren : function(node){
			var numChildren = 0;

			if(node.left !== null){
				numChildren++;
			}
			
			if(node.right !== null){
				numChildren++;
			}

			return numChildren;
		}	
	};	

	/*
		Collection Implementation
	*/
	struct.collection = function(){
		this.length = 0;
		this.collection = {};
	};

	struct.collection.prototype = {
		add : function(key, item){
			if(this.collection.hasOwnProperty(key)) return;

			this.collection[key] = item;
			this.length++;
		},
		remove : function(key){
			if(! this.collection.hasOwnProperty(key)) return;

			delete this.collection[key]
			this.length--;
		},
		item : function(key){
			if(this.collection.hasOwnProperty(key)){
				return this.collection[key];
			}
		},
		count : function(){
			return this.length;
		},
		forEach : function(process){
			for (key in this.collection){
				if(this.collection.hasOwnProperty(key)){
					process.call(this, this.collection[key]);
				}
 			}		
		},
		clear : function(){
			this.collection = {};
		},
		print : function(){
			var item;

			this.forEach(function(item){
				console.log(item);
			});
		},
		toArray : function(){
			var tmpArr = [];

			this.forEach(function(item){
				tmpArr.push(item);
			});	

			return tmpArr;		
		},
		toString : function(){
			return this.toArray().toString();
		}
	};

}(this));