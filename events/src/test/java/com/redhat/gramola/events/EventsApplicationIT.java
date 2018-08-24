package com.redhat.gramola.events;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.Matchers.isEmptyString;

import io.restassured.http.ContentType;
import java.net.URL;
import org.arquillian.cube.openshift.impl.enricher.AwaitRoute;
import org.arquillian.cube.openshift.impl.enricher.RouteURL;
import org.jboss.arquillian.junit.Arquillian;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(Arquillian.class)
public class EventsApplicationIT {

    private static final String EVENTS_PATH = "api/events";
    
    @AwaitRoute(path = "/health")
    @RouteURL("${app.name}")
    private URL url;

    @Test
    public void testPostGetAndDelete() {	 
    	 String object = "{\n" + 
    	 		"    \"name\" : \"Guns 'n' Roses 2018\",\n" + 
    	 		"    \"address\" : \"Calle Alcalá 1\",\n" + 
    	 		"    \"city\" : \"MADRID\",\n" + 
    	 		"    \"province\" : \"MADRID\",\n" + 
    	 		"    \"country\" : \"SPAIN\",\n" + 
    	 		"    \"date\" : \"2018-07-05\",\n" + 
    	 		"    \"startTime\" : \"18:00\",\n" + 
    	 		"    \"endTime\" : \"21:00\",\n" + 
    	 		"    \"location\" : \"Plaza de toros de la Ventas\",\n" + 
    	 		"    \"artist\" : \"Guns 'n' Roses\",\n" + 
    	 		"    \"description\" : \"Lorem ipsum...\",\n" + 
    	 		"    \"image\" : \"images/guns-P1080795.png\"\n" + 
    	 		"}";
    	
        Integer id = given()
          .baseUri(url.toString())
          .contentType(ContentType.JSON)
          .body(object)
          .post(EVENTS_PATH)
          .then()
          .statusCode(201)
          .body("id", not(isEmptyString()))
          .body("name", is("Guns 'n' Roses 2018"))
          .extract()
          .response()
          .path("id");
          
    
        given()
          .baseUri(url.toString())
          .get(id.toString())
          .then()
          .statusCode(200)
          .body("id", is(id))
          .body("name", is("Guns 'n' Roses 2018"));
    
        given()
          .baseUri(url.toString())
          .delete(id.toString())
          .then()
          .statusCode(204);
    }
}

