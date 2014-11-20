# jQuery CloneYa


CloneYa is a jQuery class useful for cloning DOM elements with their children. I wanted to be able to clone form inputs and groups of form inputs or fieldsets, or even whole forms. With time, I've hopefully made it very generic.


## Usage

[View a Demo](http://yapapaya.github.io/jquery-cloneya/demo.html "View a Demo")

```javascript
	
	$clonecontainer.cloneya({
            limit		: 999,
            cloneThis		: '.toclone',
            valueClone		: false,
            dataClone		: false,
            deepClone		: false,
            cloneButton		: '.clone',
            deleteButton	: '.delete',
            clonePosition	: 'after',
            serializeID         : true,
            ignore: 'label.error'
        });
```


## Requirements


CloneYa must be invoked on a wrapper with the clonable items as children. It automatically recognizes this markup, by default (except the *clone-wrapper*) :


```html
	<div class="clone-wrapper">
		<div class="toclone">
		...
			<div class="clone">+</div>
			<div class="delete">-</div>
		</div>	
	</div>
```

```javascript
	$('.clone-wrapper').cloneya();
```


It need not be div's as in the above example. It might, as well have been table &gt; tr, or a ul &gt; li arrangement. 

### External controllers (*new*)

Cloneya doesn't need the exact markup, as above. Inside, cloneya works via custom events triggered by the click events bound to the clone and delete buttons in the markup.

If the above markup is not found, or if you want an element outside the clonables to be able to trigger deletion and cloning, you can do so by binding the `clone_clone` and `clone_delete` events.

## Options

**option** *default*


**limit** *999*

The maximum number of clones that should be generated


**cloneThis** *'.toclone'*

Any valid jQuery selector for the clonable elements


**valueClone** *false*

Copy the values of form inputs inside the clonable?


**dataClone** *false*

Copy the jQuery data with the clone element object?


**deepClone** *false*

Copy the events too, very deep copying?


**cloneButton** *'.clone'*

Any valid jQuery selector for the element that triggers cloning. Must be a child of the *cloneThis* selector


**deleteButton** *'.delete'*

Any valid jQuery selector for the element that triggers clone deletion. Must be a child of the *cloneThis* selector

**clonePosition** *'after'*

The position the clone will be inserted.

Possible values:

*'before'* before the clonable
*'after'* after the clonable
*'start'* before the first clone (to do)
*'end'* after the last clone (to do)

**serializeID** *'true'*

Numerically increment the ids of the inputs to maintain uniqueness

**ignore** **'label.error'**
Ignore specific content from the clone

## Events

### Generic events

```javascript
	$clonewrapper.on( 'clone_clone', function(e){
		console.log('yay! cloned again!');
	});
```
```javascript
	$my_custom_clone_trigger = $('.clone-that');
	$my_custom_clone_trigger.on( 'mouseenter', function(e){
		$clonewrapper.trigger('clone_clone');
	});
```
**clone_clone**
The clone event, triggered when the cloneButton is clicked. Useful for custom binding


**clone_delete**
The delete event, triggered when the deleteButton is clicked. Useful for custom binding


### Specific events

*can be used as hooks*

**event** *parameter1, parameter2, &hellip;*

```javascript
	$clonewrapper.on( 'clone_after_append', function(e,newclone){
		console.log('a new clone was created:');
		console.log( newclone );
	});
```


**clone_before_clone** *$toclone*

Just before an element is cloned


**clone_form_input** *$form_input, $toclone, $newclone*

When a form input of a new clone is being processed, after cloning. Useful for reindexing input name


**clone_after_clone** *$toclone, $newclone*

Just after the cloning is complete


**clone_before_append** *$toclone, $newclone*

Just before the new clone is appended to the DOM


**clone_after_append** *$toclone, $newclone*

Just after the new clone is appended to the DOM


**clone_limit** *$limit_count, $toclone*

When the maximum limit for cloning is reached


**clone_before_delete** *$todelete*

Just before a clone is deleted


**clone_after_delete** *NULL*

Just after the clone is deleted
