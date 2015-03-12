# jQuery CloneYa [![Build Status](https://travis-ci.org/yapapaya/jquery-cloneya.svg?branch=master)](https://travis-ci.org/yapapaya/jquery-cloneya)

CloneYa is a jQuery class useful for cloning DOM elements with their children. I wanted to be able to clone form inputs and groups of form inputs or fieldsets, or even whole forms. With time, I've hopefully made it very generic.

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

## Usage

[View a Demo](http://yapapaya.github.io/jquery-cloneya/demo.html "View a Demo")

```javascript
	
	$clonecontainer.cloneya({
            minimum		: 1,
            maximum             : 999,
            cloneThis		: '.toclone',
            valueClone		: false,
            dataClone		: false,
            deepClone		: false,
            cloneButton		: '.clone',
            deleteButton	: '.delete',
            clonePosition	: 'after',
            serializeID         : true,
            ignore		: 'label.error',
            defaultCount	: false,
            preserveChildCount  : false
        });
```


## Bower Support
You can install CloneYa using Bower.

From the CLI, run
```batchfile
bower install cloneya
```
Learn more [about installing bower packages](http://bower.io/#getting-started)

## Documentation

The detailed documentation has been moved over at the [Wiki](https://github.com/yapapaya/jquery-cloneya/wiki).

### Support

 * If you can provide some **technical** insight into the issue and know what a bug is and what an enhancement is, please [create an issue](https://github.com/yapapaya/jquery-cloneya/issues/new) accordingly.

 * Please show us *your* complete code with [jsfiddle](http://jsfiddle.net/) or something similar, if you want us to be able to help you!

 * If you prefer Stackoverflow, tag your question with [jquery-cloneya](http://stackoverflow.com/questions/tagged/jquery-cloneya) tag. (Please read [how to ask](http://stackoverflow.com/help/how-to-ask). Your question could be closed, if not asked properly!) 

