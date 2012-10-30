/**
 * CloneYa!: Plugin to clone form elements in a nested manner
 * Features next in line:
 * Integrating jQuery form validation
 * @author Saurabh Shukla
 * http://yapapayalabs.com
 * License GNU/GPL & MIT
 */

(function($){
	var emptyFunction = function(){};


	var CloneYa = function(element, options)
	{
		var regex = /^(.*)(\d)+$/i;
		var regindex = /\[.*(\d+)\]/;
		var elem = $(element);
		var obj = this;
		var defaults = {
			maxLimit : 999,//who'll need that many?
			toClone:'toclone',
			baseID: '',
			valueClone: false,
			dataClone: false,
			deepClone:false,
			cloneButton: 'clone',
			removeButton: 'remove',
			clonePosition: 'after',
			beforeClone: emptyFunction,
			afterClone: emptyFunction,
			beforeAppend: emptyFunction,
			afterAppend: emptyFunction,
			beforeRemove: emptyFunction,
			afterRemove: emptyFunction,
			maxLimitReach:emptyFunction,
			indexadjust: true
		};

		var config = $.extend(defaults, options || {});

		this.getConfig = function()
		{
			return config;
		};
		var elems = elem.find('.'+config.toClone);
		if (!config.baseID){
			mainid=config.baseID;
		}else{
			mainid=elems.first().attr('id');
		}
		mainid=elems.first().attr('id');
		maininex = elems.first().attr('name');
		var cloneIndex = elems.length;

		elem.on('click','.'+config.cloneButton,function(event){
			event.preventDefault();
			if(cloneIndex<config.maxLimit){
				$toclone = $(this).closest('.'+config.toClone);
				config.beforeClone($toclone);
				$newclone = $toclone.clone({
					withDataAndEvents:config.dataClone,
					deepWithDataAndEvents:config.deepClone
				});


				$newclone.find('input, textarea, select').each(function(){
					if(!config.valueClone){
						$(this).val('');
					}
					var name = $(this).attr('name');
					if(name){
						var match = name.match(regindex);
						if (match && match.length == 2) {
							newindex='[]';
							newname = name.replace(/\[.*(\d+)\]/, newindex);
							$(this).attr('name', newname);
						}
					}
				});

				currIndex = cloneIndex+1;
				config.afterClone($toclone,$newclone);
				config.beforeAppend($toclone,$newclone);
				if(config.clonePosition!='after'){
					$toclone.before($newclone);
				}else{
					$toclone.after($newclone);
				}
				redoIDs();
				config.afterAppend($toclone,$newclone);
				cloneIndex++;
			}else{
				config.maxLimitReach(config.maxLimit);
			}

		});

		elem.on('click','.'+config.removeButton,function(event){
			event.preventDefault();
			if(cloneIndex> 1){
				$toremove = $(this).closest('.'+config.toClone);
				config.beforeRemove($toremove);
				$toremove.remove();
				config.afterRemove($toremove);
				cloneIndex--;
			}
		});
		var redoIDs = function(){
			$('.'+config.toClone).each(function(i){
				if(i!=0){
					j=i
				}else{
					j='';
				}
				if($(this).attr('id')){
					$(this).attr('id',mainid+j);
				}
				$(this).find('*').each(function() {
					var id = $(this).attr('id');
					if(id){
						var match = id.match(regex);
						if (match && match.length == 3) {
							$(this).attr('id', match[1] + j);
						}else{
							$(this).attr('id', id + j);
						}
					}
				});
			});
		}
	};

	$.fn.cloneya = function(options)
	{
		return this.each(function()
		{
			var element = $(this);

			// Return early if this element already has a plugin instance
			if (element.data('cloneya')) return;

			// pass options to plugin constructor
			var cloneya = new CloneYa(this, options);

			// Store plugin object in this element's data
			element.data('cloneya', cloneya);
		});
	};
})(jQuery);
