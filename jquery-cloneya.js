/**
 * CloneYa!: Plugin to clone form elements in a nested manner
 * @author Saurabh Shukla <saurabh@yapapaya.com>
 * http://yapapayalabs.com/projects/jquery-cloneya
 * License GNU/GPL & MIT
 */

(function($) {

    // Create the cbelass CloneYa
    /**
     * 
     * @param {string} element a valid jQuery selector for the parent element of clones
     * @param {object} options options that can be passed to each instance
     * @returns {_L13.CloneYa}
     */
    var CloneYa = function(element, options)
    {
        // regex for recalculating the ids
        // looks for the numbers at the end of the string
        var regex = /^(.*)(\d)+$/i;

        // just creating a jQuery object, just in case
        var elem = $(element);

        // the default options
        var defaults = {
            // the maximum times, an element can be cloned
            limit: 999, //setting it to a high number, by default

            // a valid jQuery selector for the element to be cloned
            cloneThis: '.toclone',
                    
            // if there are form input elements, should the values be cloned
            valueClone: false,
            
            // should the jQuery data with the object be cloned, as well
            dataClone: false,
                    
            // should it be a deep clone
            deepClone: false,
            
            // a valid jQuery selector for the element that triggers cloning
            // must be a child of the cloneThis selector
            cloneButton: '.clone',
                    
            // a valid jQuery selector for the element that triggers removal
            // must be a child of the cloneThis selector
            deleteButton: '.delete',
                    
            // the position the clone will be inserted
            // relative to the original element
            clonePosition: 'after', // or 'before'
            
            // whether to serialize the IDs, automatically
            serializeID: true,
        };

        // merge the passed options object with defaults
        var config = $.extend(defaults, options || {});

        // getter function for options
        this.getOption = function() {
            return config;
        };
        
        // setter function for options
        this.setOption = function(lateoptions) {
            $.extend(config, lateoptions || {});
        };
        
        //Now, what if the clone button and delete button are not contained in 
        //the clonable?
        
        if(elem.find(config.cloneButton).length){
            // add a click handler for the clone button
            elem.on('click', config.cloneButton, function(event) {
                event.preventDefault();

                // this is just a wrapper for the custom clone event
                elem.triggerHandler('clone_clone',[$(this)]);
            });
        }
        
        
        // the custom clone event
        elem.on('clone_clone', function(event,$this) {
        
        	
            // get the count of all the clones
            var cloneCount = elem.find(config.cloneThis).length;

            
            // check if we've reached the maximum limit
            if (cloneCount < config.limit) {

                // get the closest parent clone
                $toclone = $this.closest(config.cloneThis);
                
              
                // trigger a custom event for hooking in
                elem.triggerHandler('clone_before_clone', [$toclone]);

                // clone it
                $newclone = $toclone.clone({
                    withDataAndEvents: config.dataClone,
                    deepWithDataAndEvents: config.deepClone
                });

                // get the form input
                $newclone.find('input, textarea, select').each(function() {

                    // check if the values need to be copied, if not empty them
                    if (!config.valueClone) {
                        $(this).val('');
                    }

                    // removed the portion taking care of the index
                    // each case is specific and I'd rather leave it to the developer

                    // custom event hook for index handling
                    elem.triggerHandler('clone_form_input',[ $(this), $toclone, $newclone]);
                });
             
                // trigger custom event on the original element
                elem.triggerHandler('clone_after_clone', [$toclone, $newclone]);

                // trigger custom event on the new clone
                elem.triggerHandler('clone_before_append', [$toclone, $newclone]);

                // get the position where the clone has to be added
                // and add the newclone
                if (config.clonePosition != 'after') {
                    $toclone.before($newclone);
                } else {
                    $toclone.after($newclone);
             
                   
                }

                // reformat the id attributes
                redoIDs();

                // trigger custom event for hooking
                elem.triggerHandler('clone_after_append', [$toclone, $newclone]);
            } else {
                // trigger a custom event for hooking
                elem.triggerHandler('clone_limit', config.limit, [$toclone] );
            }

        });
        
        if(elem.find(config.cloneButton).length){
            // click handler for delete button
            elem.on('click', config.deleteButton, function(event) {
                event.preventDefault();

                // just a wrapper for delclone event
                elem.triggerHandler('clone_delete',[$(this)]);
            });
        }

        //  the delete clone event
        elem.on('clone_delete', function(event,$this) {

            // get the count of all the clones
            var cloneCount = elem.find(config.cloneThis).length;

            // never delete all the clones
            // at least one must remain
            if (cloneCount > 1) {

                // get the closest parent clone
                $todelete = $this.closest(config.cloneThis);

                // trigger hook
                $.when(elem.triggerHandler('clone_before_delete', [$todelete]))
                .done(function(){
                    
                    elem.triggerHandler('clone_after_delete');
                });

            }
        });
        
        elem.on('clone_before_delete', function(event,$todelete){
            $($todelete).remove();


        });

        /**
         * Redo the id attribute, serially
         */
        var redoIDs = function() {

            // check if this even needs to be done
            if (config.serializeID !== true) {
                return;
            }
            
            // get the id of the first clone (hoping to increment the ids)
            mainid = elem.find(config.cloneThis).first().attr('id');
            
            elem.find(config.cloneThis).each(function(i) {
                
                // assign the index to a string var for appending to the ids
                // 0 index will have no number at the end
                if (i !== 0) {
                    j = i;
                } else {
                    j = '';
                }
                
                // first modify the clone id
                if ($(this).attr('id')) {
                    $(this).attr('id', mainid + j);
                }
                
                // take all the elements inside the clone
                $(this).find('*').each(function() {
                    
                    var id = $(this).attr('id');
                    if (id) {
                        // match the id with the regex to get the string part
                        // separate from the number part 
                        var match = id.match(regex);
                        
                        // if there was a number
                        if (match && match.length === 3) {
                            // just take the string part
                            // add the new number to it
                            $(this).attr('id', match[1] + j);
                        } else {
                            // else there was no number,
                            // this was earlier the first element
                            // just add the number to its id
                            $(this).attr('id', id + j);
                        }
                    }
                });
            });

        };
    };
    
    // add the cloneya to the global object
    $.fn.cloneya = function(options)
    {
        return this.each(function()
        {
            var element = $(this);

            // Return early if this element already has a plugin instance
            if (element.data('cloneya'))
                return;

            // pass options to plugin constructor and create a new instance
            var cloneya = new CloneYa(this, options);

            // Store plugin object in this element's data
            element.data('cloneya', cloneya);
        });
    };
})(jQuery);