jQuery Cloneya

A jQuery plugin to clone just about anything, on the fly, especially form-elements

How to use?

Include jQuery and jQuery cloneya in the header or footer of your page

Then, you need markup, like the following:

<div id="wrapper">
	<div class="toclone">
	.....
		<a href="#" class="clone">+</a>
		<a href="#" class="remove">-</a>
	</div>
</div> 

Then just call the following on $('document').ready

$('#wrapper').cloneya();

Everything within the element with the 'toclone' class will be cloned, including form elements.

Tips:
1. The elements that you want to clone should be within a wrapper. Call cloneya on the wrapper.
2. The controls that will create a new clone should be within the 'toclone' element.
3. The control that will remove a clone should be within the 'toclone' element.

Options:

1. maxLimit 		(default: 999)		The maximum number of clones that are allowed.
2. toClone 		(default: 'toclone')	The class of clonable elements (form inputs, fieldsets, divs, whatever).
3. valueClone		(default: false)	If the clone contains form inputs, this will decide whether the values will be cloned, as well.
4. dataClone		(default: false)	This just stands for jQuery clone's withDataAndEvents option. If you need to use this, better read that up.
5. deepClone		(default: false)	This just stands for jQuery clone's deepWithDataAndEvents option. Do as above.	
6. cloneButton		(default: 'clone')	The class for the clone control (link, button, whatever).
7. removeButton		(default: 'remove')	The class for the remove control (link, button, whatever).
8. clonePosition	(default: 'after')	Where should the newly created clone be inserted? 'before' the element that was cloned or 'after' it.
9. beforeClone		()			Your custom callback function to run before the actual cloning takes place.
						Callback parameters: $toclone (the element that was cloned), $newclone (the element that was created)
10. afterClone		()			Your custom callback function to run after the cloning happens.
						Callback parameters: $toclone (the element that was cloned), $newclone (the element that was created)
11. beforeAppend	()			Your custom callback function to run just before the clone is inserted into the DOM.
						Callback parameters: $toclone (the element that was cloned), $newclone (the element that was created)
12. afterAppend		()			Your custom callback function to run just after the clone is inserted into the DOM.
						Callback parameters: $toclone (the element that was cloned), $newclone (the element that was created)
13. beforeRemove	()			Your custom callback function to run just before a clone is removed from the DOM.
						Callback parameters: $toremove (the element that will be removed)
14. afterRemove		()			Your custom callback function to run just after a clone is removed from the DOM.
						Callback parameters: $toremove (the element that was removed)
15. maxLimitReach	()			Your custom callback function to run when the maximum limit is reached
						Callback parameters: Integer $maxlimit (so you could show pretty messages!)
16. indexadjust		(default: true)		Whether cloneya should reset the index of cloned form index. Useful if your cloned elements will be submitted as an array.


