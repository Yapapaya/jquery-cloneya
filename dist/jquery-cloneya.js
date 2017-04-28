/**
 * CloneYa!: Plugin to clone form elements in a nested manner
 * @author Saurabh Shukla <saurabh@yapapaya.com>
 * http://hookrefineandtinker.com
 * License GNU/GPL & MIT
 */

(function ($) {

    "use strict";

    var name = "cloneya", defaults = {
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
        preserveChildCount: false
    };
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
     * @param {Boolean} options.preserveChildCount - whether to preserve the initial number of clone's child clones, works with nesting as well.
     * 
     * @returns {_L13.CloneYa}
     */
    function CloneYa(element, options) {
        /**
         * regex for recalculating the ids
         * 
         * @type RegExp
         */
        this.regex = /^(.*)(\d)+$/i;


        this.elem = element;

        this.$elem = $(element);
	
	this.elemClass = name + '-wrap';

        /**
         * creating a jQuery object, just in case
         * 
         * @type @call;$
         */
        //var elem = $(element);


        /**
         * Support deprecated parameters
         */
        if (typeof options !== 'undefined') {
            if (typeof options.limit !== 'undefined' && options.limit > 0) {
                options.maximum = options.limit;
            }
        }

        /**
         * merge the passed options object with defaults
         * 
         * @type @exp;$@call;extend
         */
        this.config = $.extend({}, defaults, options);


        /**
         * 
         * @type @exp;elem@call;closestChild
         */
        this.clones = this.$elem.closestChild(this.config.cloneThis);

        this.init();

    }

    CloneYa.prototype = {
        init: function () {

            var $this = this;


            // add our classes
            $this.$elem.addClass($this.elemClass);
            $this.clones.addClass(name);

            // save the sibling count into data attr
            $this.clones.data('initialCount', $this.clones.length);

            //Now, what if the clone button and delete button are not contained in 
            //the clonable?
            // add a click handler for the clone buttons
            $this.$elem.on('click.' + name, $this.config.cloneThis + '>' + $this.config.cloneButton, function (event) {
                event.preventDefault();
                event.stopPropagation();

                var toClone = $(this).closest($this.config.cloneThis);

                // this is just a wrapper for the custom clone event
                $this.$elem.triggerAll('clone_clone clone.' + name, [toClone]);
            });


            // the custom clone event
            $this.$elem.on('clone.' + name, function (event, toClone) {
                if (event.namespace === name) {
                    $this._cloneAndAppend(toClone);
                }
            });

            // click handler for delete button
            $this.$elem.on('click.' + name, $this.config.cloneThis + '>' + $this.config.deleteButton, function (event) {
                event.preventDefault();
                event.stopPropagation();

                var toDelete = $(this).closest($this.config.cloneThis);
                // just a wrapper for delclone event
                $this.$elem.triggerAll('clone_delete delete.' + name, [toDelete]);
            });

            //  the delete clone event
            $this.$elem.on('delete.' + name, function (event, toDelete) {

                // get the count of all the sibling clones
                /**
                 * 
                 * @type @exp;$todelete@call;closest@call;closestChild@pro;length
                 */
                var cloneCount = toDelete.closest('.' + $this.elemClass).closestChild($this.config.cloneThis).length;

                if (cloneCount > $this.config.minimum) {
                    // trigger hook
                    $this.$elem.triggerAll('clone_before_delete before_delete.' + name, [toDelete, cloneCount]);
                    $this.$elem.triggerHandler('remove.' + name, [toDelete]);
                    $this.$elem.triggerAll('clone_after_delete after_delete.' + name);

                }
                else {

                    $this.$elem.triggerHandler('minimum.' + name, $this.config.minimum, [toDelete]);


                    // First clone form can't be deleted, but the values should be removed from first form    
                    // is this expected behaviour? especially since we use minimum?
                    toDelete.find('input, textarea, select').each(function () {
                        $this._clearForm($(this));
                    });

                }
            });



            $this.$elem.on('remove.' + name, function (event, toDelete) {
                $(toDelete).remove();

            });

        },
        _clean: function () {
            var $this = this;
            $this.$elem.removeClass(name + '-wrap');
            $this.clones.removeClass(name);
            $this.$elem.off('click.' + name, $this.config.cloneThis + '>' + $this.config.cloneButton);
            $this.$elem.off('click.' + name, $this.config.cloneThis + '>' + $this.config.deleteButton);
            $this.$elem.off('clone_clone clone_delete clone_before_delete clone.' + name + ' delete.' + name + ' before_delete.' + name);

        },
        destroy: function () {
            this._clean();
            this.$elem.removeData(name);
        },
        getOption: function () {
            return this.config;
        },
        setOption: function (lateOptions) {
            $.extend(this.config, lateOptions || {});
            this._clean();
            this.init();

        },
        _cloneAndAppend: function (toClone) {


            // get the count of all the sibling clones
            /**
             * 
             * @type @exp;$toclone@call;closest@call;closestChild@pro;length
             */
            var cloneCount = toClone.closest('.' + this.elemClass).closestChild(this.config.cloneThis).length;


            // check if we've reached the maximum limit
            if (cloneCount < this.config.maximum) {

                // trigger a custom event for hooking in
                this.$elem.triggerAll('clone_before_clone before_clone.' + name, [toClone]);

                var newClone = this._cloneItem(toClone);



                // trigger custom event on the original element
                this.$elem.triggerAll('clone_after_clone after_clone.' + name, [toClone, newClone]);

                // add to our clones object
                this.clones.add(newClone);

                // trigger custom event on the new clone
                this.$elem.triggerAll('clone_before_append before_append.' + name, [toClone, newClone]);

                // get the position where the clone has to be added
                // and add the newclone
                if (this.config.clonePosition !== 'after') {
                    toClone.before(newClone);
                } else {
                    toClone.after(newClone);

                }

                if (this.config.ignore) {
                    newClone.find(this.config.ignore).remove();
                }

                // reformat the id attributes
                this._redoIDs();

                // trigger custom event for hooking
                this.$elem.triggerAll('clone_after_append after_append.' + name, [toClone, newClone]);
            } else {
                // trigger a custom event for hooking
                this.$elem.triggerAll('clone_limit maximum.' + name, this.config.maximum, [toClone]);
            }

        },
        _cloneItem: function (toClone) {
            var $this = this;

            // clone it
            /**
             * 
             * @type @exp;$toclone@call;clone
             */
            var newClone = toClone.clone($this.config.dataClone, $this.config.deepClone);

            // we want to preserve the initial child count
            if ($this.config.preserveChildCount !== false) {
                // the child count only needs preservation if they are clonable.

                var originalChildren = toClone.find('.' + name + '-wrap');

                // for each wrapper
                newClone.find('.' + name + '-wrap').each(function (index) {

                    /**
                     * 
                     * @type @call;jquery-cloneya_L8.$@call;closestChild
                     */
                    var inNewClone = $(this).closestChild('.' + name);

                    var inOriginal = $(originalChildren[index]).closestChild('.' + name);

                    /**
                     * 
                     * @type @exp;inOriginal@call;data
                     */
                    var originalCount = inOriginal.data('initialCount');

                    /**
                     * 
                     * @type @exp;inNewClone@call;slice
                     */
                    var $extra = inNewClone.slice(originalCount, inNewClone.length);

                    $extra.remove();

                    inNewClone.data('initial-count', originalCount);
                });

            }

            // get the form input
            newClone.find('input, textarea, select').each(function () {

                // check if the values need to be copied, if not empty them
                $this._clearForm($(this));

                // removed the portion taking care of the index
                // each case is specific and I'd rather leave it to the developer

                // custom event hook for index handling
                $this.$elem.triggerAll('clone_form_input form_input.' + name, [$(this), toClone, newClone]);
            });

            return newClone;

        },
        /*
         * Clear Form will used to clear the values of the form
         */
        /**
         * 
         * @param {type} $el
         * @returns {undefined}
         */
        _clearForm: function ($el) {

            if (!this.config.valueClone && !$el.hasClass('noEmpty')) {

                if ($el.is(':checkbox') || $el.is(':radio')) {

                    $el.prop('checked', false);
                }
                else {
                    $el.val('');
                }

            }

        },
        /**
         * Redo the id attribute, serially
         */
        /**
         * 
         * @returns {undefined}
         */
        _redoIDs: function () {

            var $this = this;

            // check if this even needs to be done
            if ($this.config.serializeID !== true) {
                return;
            }

            // get the id of the first clone (hoping to increment the ids)
            /**
             * 
             * @type @exp;elem@call;find@call;first@call;attr
             */
            var mainid = $this.$elem.find($this.config.cloneThis).first().attr('id');

            $this.$elem.find($this.config.cloneThis).each(function (i) {

                var j;
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
                        var match = id.match($this.regex);

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
                    $(this).closest($this.config.cloneThis).find("label[for='" + id + "']").attr('for', nId);

                    if ($this.config.serializeIndex) {
                        var name = $(this).attr('name');
                        // This will increment the numeric array index for cloned field names
                        if (name) {
                            var matches = name.match(/\[([0-9}]+)\]/);

                            if (matches && matches.length >= 1) {

                                var st = name;
                                var name = st.replace(matches[0], "["+i+"]");

                                $(this).attr('name', name);
                            }
                        }
                    }

                });
            });

        }


    };

    // add the cloneya to the global object
    /**
     * 
     * @param {type} options
     * @returns {jquery-cloneya_L8.$.fn@call;each}
     */
    $.fn[name] = function (options)
    {
        var args = arguments;

        if (options === undefined || typeof options === 'object') {
            // Creates a new plugin instance, for each selected element, and
            // stores a reference withint the element's data
            return this.each(function () {
                if (!$.data(this, name)) {
                    $.data(this, name, new CloneYa(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            // Call a public pluguin method (not starting with an underscore) for each 
            // selected element.
            if (Array.prototype.slice.call(args, 1).length === 0 && $.inArray(options, $.fn[name].getters) !== -1) {
                // If the user does not pass any arguments and the method allows to
                // work as a getter then break the chainability so we can return a value
                // instead the element reference.
                var instance = $.data(this[0], name);
                return instance[options].apply(instance, Array.prototype.slice.call(args, 1));
            } else {
                // Invoke the speficied method on each selected element
                return this.each(function () {
                    var instance = $.data(this, name);
                    if (instance instanceof CloneYa && typeof instance[options] === 'function') {
                        instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                    }
                });
            }
        }
    };

    $.fn[name].getters = ['getOption'];



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

        if ($children.length === 0) {
            return $();
        }

        $results = $children.filter(selector);

        if ($results.length > 0) {
            return $results;
        } else {
            return $children.closestChild(selector);
        }
    };

    /*
     * TriggerAll, modified from stackoverflow
     * http://stackoverflow.com/questions/11850625/jquery-trigger-multiple-events 
     */
    $.fn.extend({
        triggerAll: function (events, params) {
            var el = this, i, evts = events.split(' ');
            for (i = 0; i < evts.length; i += 1) {
                el.triggerHandler(evts[i], params);
            }
            return el;
        }
    });

})(jQuery);
