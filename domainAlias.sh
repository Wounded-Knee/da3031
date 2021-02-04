echo "
<html>
	<head>
		<meta http-equiv='Cache-Control' content='no-cache, no-store, must-revalidate' />
		<meta http-equiv='Pragma' content='no-cache' />
		<meta http-equiv='Expires' content='0' />

		<title>D³ Redirector</title>

		<script type='text/javascript'>
			<!--
				const destinationUrl = '//${1}/' + window.location.search;
				window.location.href = destinationUrl;
			//-->
		</script>
	</head>
	<body>
		Please go to:
		<script type='text/javascript'>
			<!--
				document.writeln(\`<a href='\${destinationUrl}'>\${destinationUrl}</a>\`);
			//-->
		</script>
	</body>
</html>
" > /tmp/index.html;

echo "put /tmp/index.html" | cadaver https://webdav.fastmail.com/baudbarf.imap.cc/files/public/d3/;
