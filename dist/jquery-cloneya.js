/**
 * CloneYa!: Plugin to clone form elements in a nested manner
 * @author Saurabh Shukla <saurabh@yapapaya.com>
 * http://hookrefineandtinker.com
 * License GNU/GPL & MIT
 */

(function ($) {
    /**
     * Create the class CloneYa
     * 
     * @class CloneYa
     * @classdesc Adds cloning functionality to element
     * 
     * @param {String | Object} element - the clone wrapper
     * 
     * @param {Object} options - options to initialise with
     * 
     * @param {String} options.cloneThis - Selector for the  clone element
     * @param {String} options.cloneButton - Selector for the  clone button
     * @param {String} options.deleteButton - Selector for the  delete button
     * 
     * @param {String} options.clonePosition - Where should the clone be added 'before' or 'after'
     * 
     * @param {Number} options.limit - The maximum number of clones
     * 
     * @param {Boolean} options.valueClone - Clone the input values as well?
     * @param {Boolean} options.dataClone - Clone the data attributes?
     * @param {Boolean} options.deepClone - Clone other data added to the jQuery object
     * 
     * @param {Boolean} options.serializeID - Whether to serialize the IDs, automatically
     * @param {String} options.ignore - Selectors for clonables' elements that should not be cloned
     * @param {Boolean} options.defaultRender - Start with this number of clones, by default
     * @param {Boolean} options.preserveInitialChildCount - whether to preserve the initial number of clone's child clones, works with nesting as well.
     * 
     * @returns {_L13.CloneYa}
     */
    var CloneYa = function (element, options)
    {
        /**
         * regex for recalculating the ids
         * 
         * @type RegExp
         */
        var regex = /^(.*)(\d)+$/i;

        /**
         * creating a jQuery object, just in case
         * 
         * @type @call;$
         */
        var elem = $(element);

        /**
         * 
         * @type type - Default options, see doc above
         */
        var defaults = {
            cloneThis: '.toclone',
            cloneButton: '.clone',
            deleteButton: '.delete',
            clonePosition: 'after',
            minimum: 1,
            // renaming limit
            maximum: 999, //setting it to a high number, by default

            //limit: 999,

            valueClone: false,
            dataClone: false,
            deepClone: false,
            serializeID: true,
            ignore: 'label.error',
            
            // renaming defaultRender
            // type consistencey
            defaultCount: 0,
            
            // defaultRender: false,
            
            preserveInitialChildCount: false
        };
        
        /**
         * Support deprecated parameters
         */
        if (typeof options !== 'undefined') {
            if (typeof options.limit !== 'undefined' && options.limit > 0) {
                options.maximum = options.limit;
            }
            if (typeof options.defaultRender !== 'undefined' && options.defaultRender > 0) {
                options.defaultCount = options.defaultRender;
            }
        }

        /**
         * merge the passed options object with defaults
         * 
         * @type @exp;$@call;extend
         */
        var config = $.extend(defaults, options || {});

        /**
         * getter function for options
         * 
         * @returns {Object}
         */
        this.getOption = function () {
            return config;
        };

        /**
         * setter function for options
         * 
         * @param {Object} lateOptions
         * @returns {undefined}
         */
        this.setOption = function (lateOptions) {
            $.extend(config, lateOptions || {});
        };

        /**
         * 
         * @type @exp;elem@call;closestChild
         */
        var clones = elem.closestChild(config.cloneThis);
        
        var clone = function( event, item){
            // get the closest parent clone
            /**
             * 
             * @type @exp;$this@call;closest
             */
            var toClone = item.closest(config.cloneThis);

            // get the count of all the sibling clones
            /**
             * 
             * @type @exp;$toclone@call;closest@call;closestChild@pro;length
             */
            var cloneCount = toClone.closest(element).closestChild(config.cloneThis).length;

            // check if we've reached the maximum limit
            if (cloneCount < config.maximum) {

                // trigger a custom event for hooking in
                elem.triggerHandler('clone_before_clone', [toClone]);

                var newClone = cloneClone(toClone);
                
                // trigger custom event on the original element
                elem.triggerHandler('clone_after_clone', [toClone, newClone]);
                
                // add to our clones object
                clones.add(newClone);

                // trigger custom event on the new clone
                elem.triggerHandler('clone_before_append', [toClone, newClone]);

                // get the position where the clone has to be added
                // and add the newclone
                if (config.clonePosition !== 'after') {
                    toClone.before(newClone);
                } else {
                    toClone.after(newClone);

                }

                if (config.ignore) {
                    newClone.find(config.ignore).remove();
                }

                // reformat the id attributes
                redoIDs();

                // trigger custom event for hooking
                elem.triggerHandler('clone_after_append', [toClone, newClone]);
            } else {
                // trigger a custom event for hooking
                elem.triggerHandler('clone_limit', config.maximum, [toClone]);
                elem.triggerHandler('clone_maximum', config.maximum, [toClone]);
            }

        };
        
        var cloneClone = function(toClone){
            // clone it
                /**
                 * 
                 * @type @exp;$toclone@call;clone
                 */
                var newClone = toClone.clone({
                    withDataAndEvents: config.dataClone,
                    deepWithDataAndEvents: config.deepClone
                });

                // we want to preserve the initial child count
                if (config.preserveInitialChildCount !== false) {
                    // the child count only needs preservation if they are clonable.

                    // for each wrapper
                    newClone.find('.cloneya-wrap').each(function () {
                        /**
                         * 
                         * @type @call;jquery-cloneya_L8.$@call;closestChild
                         */
                        var inNewClone = $(this).closestChild('.cloneya');
                        /**
                         * 
                         * @type @exp;inNewClone@call;data
                         */
                        var originalCount = inNewClone.data('initialCount');
                        /**
                         * 
                         * @type @exp;inNewClone@call;slice
                         */
                        var $extra = inNewClone.slice(originalCount, inNewClone.length);

                        $extra.remove();
                    });

                }

                // get the form input
                newClone.find('input, textarea, select').each(function () {

                    // check if the values need to be copied, if not empty them
                    _clearForm($(this));

                    // removed the portion taking care of the index
                    // each case is specific and I'd rather leave it to the developer

                    // custom event hook for index handling
                    elem.triggerHandler('clone_form_input', [$(this), toClone, newClone]);
                });
                
                return newClone;

        };
        
        // add our classes
        elem.addClass('cloneya-wrap');
        clones.addClass('cloneya');

        // save the sibling count into data attr
        clones.data('initialCount', clones.length);

        //Now, what if the clone button and delete button are not contained in 
        //the clonable?
        // add a click handler for the clone buttons
        elem.on('click', config.cloneThis + '>' + config.cloneButton, function (event) {
            event.preventDefault();
            event.stopPropagation();
            // this is just a wrapper for the custom clone event
            elem.triggerHandler('clone_clone', [$(this)]);
        });
        

        // the custom clone event
        elem.on('clone_clone', function (event, $this) {
            clone(event, $this);
            
        });
        
        // click handler for delete button
        elem.on('click', config.cloneThis + '>' + config.deleteButton, function (event) {
            event.preventDefault();
            event.stopPropagation();
            // just a wrapper for delclone event
            elem.triggerHandler('clone_delete', [$(this)]);
        });
        
        //  the delete clone event
        elem.on('clone_delete', function (event, $this) {

            // get the closest parent clone
            /**
             * 
             * @type @exp;$this@call;closest
             */
            var toDelete = $this.closest(config.cloneThis);

            // get the count of all the sibling clones
            /**
             * 
             * @type @exp;$todelete@call;closest@call;closestChild@pro;length
             */
            var cloneCount = toDelete.closest(element).closestChild(config.cloneThis).length;

            // trigger hook
            $.when(elem.triggerHandler('clone_before_delete', [toDelete, cloneCount]))
                    .done(function () {

                        elem.triggerHandler('clone_after_delete');
                    });


        });

        // this shouldn't be default behaviour. Let the dev decide whether they want to clear the inputs
        elem.on('clone_before_delete', function (event, toDelete, cloneCount) {
            // never delete all the clones
            // at least one must remain
            if (cloneCount > config.minimum) {

                $(toDelete).remove();
            }
            else {
                
                elem.triggerHandler('clone_minimum', config.minimum, [toDelete]);
                
                
                // First clone form can't be deleted, but the values should be removed from first form    
                // is this expected behaviour? especially since we use minimum?
                toDelete.find('input, textarea, select').each(function () {
                    _clearForm($(this));
                });

            }


        });

        /*
         * Clear Form will used to clear the values of the form
         */
        /**
         * 
         * @param {type} $el
         * @returns {undefined}
         */
        var _clearForm = function ($el) {

            if (!config.valueClone && !$el.hasClass('noEmpty')) {

                if ($el.is(':checkbox') || $el.is(':radio')) {

                    $el.prop('checked', false);
                }
                else {
                    $el.val('');
                }

            }

        };

        /**
         * Redo the id attribute, serially
         */
        /**
         * 
         * @returns {undefined}
         */
        var redoIDs = function () {

            // check if this even needs to be done
            if (config.serializeID !== true) {
                return;
            }

            // get the id of the first clone (hoping to increment the ids)
            /**
             * 
             * @type @exp;elem@call;find@call;first@call;attr
             */
            var mainid = elem.find(config.cloneThis).first().attr('id');

            elem.find(config.cloneThis).each(function (i) {

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

                var id, nId;
                // take all the elements inside the clone
                $(this).find('*').each(function () {

                    id = $(this).attr('id');
                    if (id) {
                        // match the id with the regex to get the string part
                        // separate from the number part 
                        var match = id.match(regex);

                        // if there was a number
                        if (match && match.length === 3) {
                            // just take the string part
                            // add the new number to it
                            nId = id.replace(/\d+$/, "") + j;

                            $(this).attr('id', nId);
                        } else {
                            // else there was no number,
                            // this was earlier the first element
                            // just add the number to its id
                            nId = id + j;
                            $(this).attr('id', nId);
                        }
                    }

                    //update label                    
                    $(this).closest(config.cloneThis).find("label[for='" + id + "']").attr('for', nId);

                    if (config.serializeIndex) {
                        var name = $(this).attr('name');
                        // This will increment the numeric array index for cloned field names
                        if (name) {
                            var matches = name.match(/\[([^}]+)\]/);

                            if (matches && matches.length >= 1) {

                                var st = name;
                                name = [].map.call(st, function (s, n) {
                                    return (!isNaN(+s) && st[n - 1] === '[' && st[n + 1] === ']') ? i : s;
                                }).join('');

                                $(this).attr('name', name);
                            }
                        }
                    }

                });
            });

        };
        
        //onload        
        if (config.defaultRender) {
            for (i = 1; i < config.defaultRender; i++) {
                $(config.cloneButton).last().trigger("click");
            }
        }

    };

    // add the cloneya to the global object
    /**
     * 
     * @param {type} options
     * @returns {jquery-cloneya_L8.$.fn@call;each}
     */
    $.fn.cloneya = function (options)
    {
        return this.each(function ()
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

    /*
     * jquery.closestchild 0.1.1
     *
     * Author: Andrey Mikhaylov aka lolmaus
     * Email: lolmaus@gmail.com
     *
     */
    /**
     * 
     * @param {type} selector
     * @returns {$}
     */
    $.fn.closestChild = function (selector) {
        var $children, $results;

        $children = this.children();

        if ($children.length === 0)
            return $();

        $results = $children.filter(selector);

        if ($results.length > 0)
            return $results;
        else
            return $children.closestChild(selector);
    };
})(jQuery);