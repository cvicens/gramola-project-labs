export SERVICE_URL=http://timeline-gramola-dev.apps.istio.openshiftworkshop.com
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{
    "id": 1,
    "eventId": 1,
    "userId": "trever",

    "title": "Waiting at the entrance!",

    "date": "2018-04-27",
    "time" : "18:00",

    "body": "Lorem ipsum...",
    "image": "images/guns-P1080795.png" }' \
  ${SERVICE_URL}/api/timeline
  
 curl --header "Content-Type: application/json" \
  --request POST \
  --data '{
    "id": 2,
    "eventId": 1,
    "userId": "trever",

    "title": "Checking in!",

    "date": "2018-04-27",
    "time" : "18:32",

    "body": "Lorem ipsum...",
    "image": "images/guns-P1080795.png" }' \
  ${SERVICE_URL}/api/timeline
  
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{
    "id": 3,
    "eventId": 2,
    "userId": "trever",

    "title": "At the entrance...",

    "date": "2018-07-27",
    "time" : "20:31",

    "body": "Lorem ipsum...",
    "image": "images/guns-P1080795.png" }' \
  ${SERVICE_URL}/api/timeline
  
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{
    "id": 4,
    "eventId": 2,
    "userId": "trever",

    "title": "About to start...",

    "date": "2018-07-27",
    "time" : "20:46",

    "body": "Lorem ipsum...",
    "image": "images/guns-P1080795.png" }' \
  ${SERVICE_URL}/api/timeline