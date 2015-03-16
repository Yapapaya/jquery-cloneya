# jQuery Cloneya 

[![Build Status](https://travis-ci.org/yapapaya/jquery-cloneya.svg?branch=stable)](https://travis-ci.org/yapapaya/jquery-cloneya)
 [![Dependency Status](https://david-dm.org/yapapaya/jquery-cloneya.svg)](https://david-dm.org/yapapaya/jquery-cloneya)
 [![devDependency Status](https://david-dm.org/yapapaya/jquery-cloneya/dev-status.svg)](https://david-dm.org/yapapaya/jquery-cloneya#info=devDependencies)

[![GitHub version](https://badge.fury.io/gh/yapapaya%2Fjquery-cloneya.svg)](http://badge.fury.io/gh/yapapaya%2Fjquery-cloneya)
 [![Bower version](https://badge.fury.io/bo/cloneya.svg)](http://badge.fury.io/bo/cloneya)
 [![npm version](https://badge.fury.io/js/cloneya.svg)](http://badge.fury.io/js/cloneya)
 
Cloneya is a jQuery class useful for cloning DOM elements with their children. I wanted to be able to clone form inputs and groups of form inputs or fieldsets, or even whole forms. With time, I've hopefully made it very generic.

## Installation

### Bower

To install Cloneya using Bower, on the command line, run

```batchfile
bower install cloneya
```

Learn more [about installing bower packages](http://bower.io/#getting-started)

### NPM

To install Cloneya using npm, on the command line, run

```batchfile
npm install cloneya
```

## Requirements


Cloneya must be invoked on a wrapper with the clonable items as children. It automatically recognizes this markup, by default (except the *clone-wrapper*) :


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

[View demo with examples](http://yapapaya.github.io/jquery-cloneya/demo.html "View a Demo")

```javascript
	
	$clonecontainer.cloneya({
            minimum		    : 1,
            maximum         : 999,
            cloneThis		: '.toclone',
            valueClone		: false,
            dataClone		: false,
            deepClone		: false,
            cloneButton		: '.clone',
            deleteButton	: '.delete',
            clonePosition	: 'after',
            serializeID     : true,
            ignore	    	    : 'label.error',
            preserveChildCount  : false
        });
```

## Documentation

The detailed documentation has been moved over at the [Wiki](https://github.com/yapapaya/jquery-cloneya/wiki).

## Support

 * If you can provide some **technical** insight into the issue and know what a bug is and what an enhancement is, please [create an issue](https://github.com/yapapaya/jquery-cloneya/issues/new) accordingly.

 * Please show us your **complete code** with [jsfiddle](http://jsfiddle.net/) or something similar, if you want us to be able to help you!

 * If you prefer Stackoverflow, tag your question with [jquery-cloneya](http://stackoverflow.com/questions/tagged/jquery-cloneya) tag. (Please read [how to ask](http://stackoverflow.com/help/how-to-ask). Your question could be closed, if not asked properly!) 

## Contributions

Please read [how to contribute](https://github.com/yapapaya/jquery-cloneya/blob/stable/CONTRIBUTING.md)