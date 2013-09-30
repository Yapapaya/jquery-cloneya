# jQuery CloneYa

## Options

<table>
	<tr>
		<td>**limit**</td>
		<td>*999*</td>
		<td>The maximum number of clones that should be generated</td>
	</tr>
	<tr>
		<td>**cloneThis**</td>
		<td>*'.toclone'*</td>
		<td>Any valid jQuery selector for the clonable elements</td>
	</tr>
	<tr>
		<td>**valueClone**</td>
		<td>*false*</td>
		<td>Copy the values of form inputs inside the clonable?</td>
	</tr>
	<tr>
		<td>**dataClone**</td>
		<td>*false*</td>
		<td>Copy the jQuery data with the clone element object?</td>
	</tr>
	<tr>
		<td>**deepClone**</td>
		<td>*false*</td>
		<td>Copy the events too, very deep copying?</td>
	</tr>
	<tr>
		<td>**cloneButton**</td>
		<td>*'.clone'*</td>
		<td>Any valid jQuery selector for the element that triggers cloning. Must be a child of the cloneThis selector</td>
	</tr>
	<tr>
		<td>**deleteButton**</td>
		<td>*'.delete'*</td>
		<td>Any valid jQuery selector for the element that triggers clone deletion. Must be a child of the cloneThis selector</td>
	</tr>
	<tr>
		<td>**clonePosition**</td>
		<td>*'after'*</td>
		<td>The position the clone will be inserted. Possible values:
			<table>
				<tr>
					<td>*'before'*</td>
					<td>before the clonable</td>
				</tr>
				<tr>
					<td>*'after'*</td>
					<td>after the clonable</td>
				</tr>
				<tr>
					<td>*'start'*</td>
					<td>before the first clone (to do)</td>
				</tr>
				<tr>
					<td>*'end'*</td>
					<td>after the last clone (to do)</td>
				</tr>				
			</table>
		</td>
	</tr>
</table>


## Events

### Generic events

<table>
	<tr>
		<td>**clone_clone**</td>
		<td></td>
		<td>The clone event, triggered when the cloneButton is clicked. Useful for custom binding</td>
	</tr>
	<tr>
		<td>**clone_delete**</td>
		<td></td>
		<td>The delete event, triggered when the deleteButton is clicked. Useful for custom binding</td>
	</tr>
</table>


### Specific events (*can be used as hooks*)

<table>
	<tr>
		<td>**clone_before_clone**</td>
		<td>*$toclone*</td>
		<td>Just before an element is cloned</td>
	</tr>
	<tr>
		<td>**clone_form_input**</td>
		<td>*$form_input, $toclone, $newclone*</td>
		<td>When a form input of a new clone is being processed, after cloning. Useful for reindexing input names</td>
	</tr>
	<tr>
		<td>**clone_after_clone**</td>
		<td>*$toclone, $newclone*</td>
		<td>Just after the cloning is complete</td>
	</tr>
	<tr>
		<td>**clone_before_append**</td>
		<td>*$newclone*</td>
		<td>Just before the new clone is appended to the DOM</td>
	</tr>
	<tr>
		<td>**clone_after_append**</td>
		<td>*$newclone*</td>
		<td>Just after the new clone is appended to the DOM</td>
	</tr>
	<tr>
		<td>**clone_limit**</td>
		<td>*$limit_count, $toclone*</td>
		<td>When the maximum limit for cloning is reached</td>
	</tr>
	<tr>
		<td>**clone_before_delete**</td>
		<td>*$todelete*</td>
		<td>Just before a clone is deleted</td>
	</tr>
	<tr>
		<td>**clone_after_delete**</td>
		<td></td>
		<td>Just after the clone is deleted</td>
	</tr>
</table>
