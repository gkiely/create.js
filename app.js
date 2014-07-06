var Human = createClass(function Human(){
	return {
		//default vals

		//req & init
		req: {
			name: '',
			age: 0
		},
		init:function(){
			echo('Human class created');
		},

		// Anything w/ this or dom

		//public api
		sayMyName: function(){
			echo(this.name)
		}

	}

	// pure functions

});


var Child = createClass(Human, function Child(){
	return {
		init:function(){
			echo('Child class created');
		},
		__req: {'grade': 0}
	}

});


var YoungerChild = createClass(Child, function YoungerChild (){
		return{
			init: function(){
				echo('YoungerChild class created')
			},
			age: 10
		}

});