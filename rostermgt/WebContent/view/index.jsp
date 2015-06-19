<script type="text/javascript" src="../js/jquery-1.11.1.js"></script>
<link rel="stylesheet" href="../js/bootsrap/bootstrap-combined.min.css"></link>
<script type="text/javascript" src="../js/bootsrap/bootstrap.min.js"></script>
<script type="text/javascript">
		$('a.btn').on('click', function(e) {
		    e.preventDefault();
		    var url = $(this).attr('href');
		    $(".modal-body").html('<iframe width="100%" height="100%" frameborder="0" scrolling="no" allowtransparency="true" src="'+url+'"></iframe>');
		});
		</script>
<div style="padding-lef: 200px;">

	<table>
		<tr>
			<td>Title 1</td>
			<td>Title 2</td>
			<td>Title 3</td>
		</tr>
		<tr>
			<td>Row 1</td>
			<td>Row 1</td>
			<td>Row 1</td>
		</tr>
		<tr>
			<td>Row 2</td>
			<td>Row 2</td>
			<td>Row 2</td>
		</tr>
		<tr>
			<td>Row 2</td>
			<td>Row 2</td>
			<td>Row 2</td>
		</tr>
		<tr>
			<td>Row 3</td>
			<td>Row 3</td>
			<td>Row 3</td>
		</tr>
	</table>
</div>
<a data-toggle="modal" class="btn" href="http://localhost:5050/rostermgt/" data-target="#myModal">click me</a>
<div class="modal hide fade" id="myModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true">×</button>
		<h3 id="myModalLabel">Modal header</h3>
	</div>
	<div class="modal-body"></div>
</div>