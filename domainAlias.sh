echo "" > /tmp/index.html;
echo '<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />' >> /tmp/index.html;
echo '<meta http-equiv="Pragma" content="no-cache" />' >> /tmp/index.html;
echo '<meta http-equiv="Expires" content="0" />' >> /tmp/index.html;
echo "<meta http-equiv='refresh' content='0; URL=//${1}' />" >> /tmp/index.html;
echo "D3: <a href='//${1}'>${1}</a>" >> /tmp/index.html;
echo "put /tmp/index.html" | cadaver https://webdav.fastmail.com/baudbarf.imap.cc/files/public/d3/;
