# jQuery Cloneya [![Build Status](https://travis-ci.org/yapapaya/jquery-cloneya.svg?branch=master)](https://travis-ci.org/yapapaya/jquery-cloneya)

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

 * Please do not send pull requests to the `stable` branch.

 * Please [create a new ticket](https://github.com/yapapaya/jquery-cloneya/issues/new) before setting out to add new features or enhancements, so that we may discuss it. Any pull requests without such discussions may not be accepted.

 * If fixing a bug, [create a new ticket](https://github.com/yapapaya/jquery-cloneya/issues/new) describing the bug and refer the ticket number in the commit message.

 * Please run all the unit tests by running `grunt` before committing and sending pull requests.

 * If adding or modifying a feature, be sure to update:

  a. the appropriate [QUnit](http://qunitjs.com/) unit tests in *tests/jquery-cloneya.html*.
  a. the appropriate demo in *demo/index.html*.
  a. the [Wiki](https://github.com/yapapaya/jquery-cloneya/wiki)
  a. the examples in the `gh-pages` branch that shows up on [the pages here](http://yapapaya.github.io/jquery-cloneya/)

 * If for some reason, you can't do 3 and 4, let us know by creating a new ticket. If you don't, the pull request won't be accepted (sorry!). 1 and 2 are absolute must.

