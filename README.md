# jQuery CloneYa

## Options


	
		**limit**
		*999*
		The maximum number of clones that should be generated
	
	
		**cloneThis**
		*'.toclone'*
		Any valid jQuery selector for the clonable elements
	
	
		**valueClone**
		*false*
		Copy the values of form inputs inside the clonable?
	
	
		**dataClone**
		*false*
		Copy the jQuery data with the clone element object?
	
	
		**deepClone**
		*false*
		Copy the events too, very deep copying?
	
	
		**cloneButton**
		*'.clone'*
		Any valid jQuery selector for the element that triggers cloning. Must be a child of the cloneThis selector
	
	
		**deleteButton**
		*'.delete'*
		Any valid jQuery selector for the element that triggers clone deletion. Must be a child of the cloneThis selector
	
	
		**clonePosition**
		*'after'*
		The position the clone will be inserted. Possible values:
			
				
					*'before'*
					before the clonable
				
				
					*'after'*
					after the clonable
				
				
					*'start'*
					before the first clone (to do)
				
				
					*'end'*
					after the last clone (to do)
								
			
		
	



## Events

### Generic events


	
		**clone_clone**
		
		The clone event, triggered when the cloneButton is clicked. Useful for custom binding
	
	
		**clone_delete**
		
		The delete event, triggered when the deleteButton is clicked. Useful for custom binding
	



### Specific events (*can be used as hooks*)


	
		**clone_before_clone**
		*$toclone*
		Just before an element is cloned
	
	
		**clone_form_input**
		*$form_input, $toclone, $newclone*
		When a form input of a new clone is being processed, after cloning. Useful for reindexing input names
	
	
		**clone_after_clone**
		*$toclone, $newclone*
		Just after the cloning is complete
	
	
		**clone_before_append**
		*$newclone*
		Just before the new clone is appended to the DOM
	
	
		**clone_after_append**
		*$newclone*
		Just after the new clone is appended to the DOM
	
	
		**clone_limit**
		*$limit_count, $toclone*
		When the maximum limit for cloning is reached
	
	
		**clone_before_delete**
		*$todelete*
		Just before a clone is deleted
	
	
		**clone_after_delete**
		
		Just after the clone is deleted
	

