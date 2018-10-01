export FILES_SERVICE_URL=http://files-gramola-dev.apps.istio.openshiftworkshop.com

curl \
  -F "naming_strategy=original" \
  -F "image=@./sample-images/foo-P1000628.jpg" \
  ${FILES_SERVICE_URL}/api/files/upload
  
curl \
  -F "naming_strategy=original" \
  -F "image=@./sample-images/guns-P1080795.jpg" \
  ${FILES_SERVICE_URL}/api/files/upload