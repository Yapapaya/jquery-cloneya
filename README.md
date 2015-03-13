```javascript
$('#simple-clone').cloneya();
```

```javascript
$('.nest-clone').cloneya();
```

```javascript
$('.nest-clone-p').cloneya({
    preserveChildCount: true
});
```

```javascript
$('#limit-clone').cloneya({
    maximum: 3,
    minimum: 2,
    defaultRender: 2
})
        .on('maximum.cloneya', function (e, limit, toclone) {
            var limitmsg = 'No more than ' + limit + ' clones for you!'
            alert(limitmsg);
        })
        .on('minimum.cloneya', function (e, limit, toclone) {
            var limitmsg = 'No less than ' + limit + ' clones for you!'
            alert(limitmsg);
        });
```

```javascript
$('#animate-clone').cloneya()
        .on('before_clone.cloneya', function (event, toclone) {
            // do something
        })
        .on('after_clone.cloneya', function (event, toclone, newclone) {
            // do something   
        })
        .on('before_append.cloneya', function (event, toclone, newclone) {
            $(newclone).css('display', 'none');
            $(toclone).fadeOut('fast', function () {
                $(this).fadeIn('fast');
            });
        })
        .on('after_append.cloneya', function (event, toclone, newclone) {
            $(newclone).slideToggle();
        })
        .off('remove.cloneya')
        .on('remove.cloneya', function (event, clone) {
            clone.css('background-color', 'red');

            $(clone).slideToggle('slow', function () {
                $(clone).remove();
            });

        })
        .on('after_delete.cloneya', function () {
            console.log('deleted');
        });
```

