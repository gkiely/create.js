//@details: Progress bar element for touch-swipe js
//@authors: Grant Kiely

var ProgressBar = createClass(function(){
    /////////
    // Public: Anything inside this object is public
    // _ to indicate private
    ////////
    return {
        //=== Defaults ===//
        // Can be overwritten w/ optional 2nd {} argument in create()
        $ct: [],
        $imgs: [],
        click:function(){}, 
        length: 3,
        active: 1,

        //==== Required params ====
        //==== gets evaluated by by checkReq in create()
        req: {$ct:[], $imgs: []},

        //==== Runs on object creation ====
        //==== gets called by create() on all all instances
        init: function(){
            var _this = this;
            // Runtime constructors
            this.length = this.$imgs.length;
            
            // Init code
            if(this.length){
                var str = this.buildDots();
                // this._attachEventHandlers()
            }
            this.$ct.children('.pdot').click(function(e){
                _this.click(e);
            })
        },

        //=====================
        // Dom & object methods 
        // Anything that works with the dom or modifies/needs access to this should go here.
        // These guys are on the prototype.
        //=====================
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

    //====================
    // Module util methods
    // They don't access the dom or this, they have a defined return value.
    // Cached and fast
    //====================
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







// =======================
// Initialise progress bar
// =======================

var progress = create(ProgressBar, {
    $ct: $('.progress-ct'),
    $banner: $('.case-wrapper'),
    $imgs: $swipe_slides,
    click: function(e){
       var i = this.scrollTo(e);
        if(i){
            banner.update(i);
            swipe.scrollProgress(i, 500);
        }
    }
});
