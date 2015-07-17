//@details: Progress bar element
//@authors: Grant Kiely

var ProgressBar = createClass(function(){
    // Public
    // prefix property with _ to indicate private
    //-----------------------
    return {
        
        // Defaults
        //-----------------------
        active: 1,

        
        // Required params (type checked)
        //-----------------------
        req: {
          $container:[]
        },

        // Init function
        //-----------------------
        init: function(){
            var _this = this;
            this.length = this.$imgs.length;
            
            // Init code
            if(this.length){
                var str = this.buildDots();
            }
            this.$ct.children('.pdot').click(function(e){
                _this.click(e);
            })
        },

        // Dom & prototype methods go here
        //----------------------------------
        buildDots: function(l, active){
            var str = _makeDots(l || this.length, active || this.active);
            this._appendDots(str);
        },
        _appendDots: function(str){
            this.$ct.html(str);
            this.$dots = this.$ct.children('.pdot');
        },
        updateActiveDot: function(i){
            this.$dots.filter('.active').removeClass('active');
            this.$dots.eq(i-1).addClass('active');
            this.active = i;
        },
        next: function(){
            if(this.active < this.length)
                this.updateActiveDot(this.active + 1);
        },
        prev: function(){
            if(this.active > 1)
            this.updateActiveDot(this.active - 1);
        },
        scrollTo: function(e){
            var $e = $(e.target), i;
            if( !$e.hasClass('active') && e.target !== this.$ct.get(0) ){
                i = $e.data('item');

                //update dots
                this.updateActiveDot(i);
                return i;
            }
        }
    }

    // Private methods go here
    //---------------------------
    function _makeDots(num, active){
        var str="";
        for(var i = 0; i < num; i++) {
            str+= _generateDot(i+1, i === active-1 ? true : false )
        }
        return str;
    }
    function _generateDot(i, active){
        return '<i data-item="'+ i +'" class="pdot '+ (active ? "active" : "") +'"></i>';
    }

})();




// Create progressbar
var progress = create(ProgressBar, {
    $container: $('.progress-ct'),
    length: 6,
    click: function(e){
      this.scrollTo(e); 
    }
});
