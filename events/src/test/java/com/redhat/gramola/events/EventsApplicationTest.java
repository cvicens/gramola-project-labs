package com.redhat.gramola.events;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.hasItems;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.Matchers.isEmptyString;
import static org.junit.Assert.assertFalse;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;

import java.util.Collections;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.redhat.gramola.events.service.Event;
import com.redhat.gramola.events.service.EventRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EventsApplicationTest {
    
    private static final String EVENTS_PATH = "api/events";

    @Value("${local.server.port}")
    private int port;

    @Autowired
    private EventRepository eventRepository;

    @Before
    public void beforeTest() {
        eventRepository.deleteAll();
        RestAssured.baseURI = String.format("http://localhost:%d/" + EVENTS_PATH, port);
    }

    @Test
    public void testGetAll() {        
        Event event1 = eventRepository.save(new Event("Event1", "Address1", "City1", "Province1", "Country1", "2018-07-01", "18:00", "23:00", "Location1", "Artist1", "Desc1", "Image1"));
        Event event2 = eventRepository.save(new Event("Event2", "Address2", "City2", "Province2", "Country2", "2018-07-01", "18:00", "23:00", "Location2", "Artist2", "Desc2", "Image2"));
        requestSpecification()
                .get()
                .then()
                .statusCode(200)
                .body("id", hasItems(event1.getId(), event2.getId()))
                .body("name", hasItems(event1.getName(), event2.getName()));
    }

    @Test
    public void testGetEmptyArray() {
        requestSpecification()
                .get()
                .then()
                .statusCode(200)
                .body(is("[]"));
    }

    @Test
    public void testGetOne() {
        Event event1 = eventRepository.save(new Event("Event1", "Address1", "City1", "Province1", "Country1", "2018-07-01", "18:00", "23:00", "Location1", "Artist1", "Desc1", "Image1"));
        requestSpecification()
                .get(String.valueOf(event1.getId()))
                .then()
                .statusCode(200)
                .body("id", is(event1.getId()))
                .body("name", is(event1.getName()));
    }

    @Test
    public void testGetNotExisting() {
        requestSpecification()
                .get("0")
                .then()
                .statusCode(404);
    }

    @Test
    public void testPost() {        
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
        requestSpecification()
                .contentType(ContentType.JSON)
                .body(object)
                .when()
                .post()
                .then()
                .statusCode(201)
                .body("id", not(isEmptyString()))
                .body("name", is("Guns 'n' Roses 2018"));
    }

    @Test
    public void testPostWithWrongPayload() {
        requestSpecification()
                .contentType(ContentType.JSON)
                .body(Collections.singletonMap("id", 0))
                .when()
                .post()
                .then()
                .statusCode(422);
    }

    @Test
    public void testPostWithNonJsonPayload() {
        requestSpecification()
                .contentType(ContentType.XML)
                .when()
                .post()
                .then()
                .statusCode(415);
    }

    @Test
    public void testPostWithEmptyPayload() {
        requestSpecification()
                .contentType(ContentType.XML)
                .when()
                .post()
                .then()
                .statusCode(415);
    }

    @Test
    public void testPut() {         
        Event event1 = eventRepository.save(new Event("Event1", "Address1", "City1", "Province1", "Country1", "2018-07-01", "18:00", "23:00", "Location1", "Artist1", "Desc1", "Image1"));
        String newEvent1 = "{\n" + 
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
        requestSpecification()
                .contentType(ContentType.JSON)
                .body(newEvent1)
                .when()
                .put(String.valueOf(event1.getId()))
                .then()
                .statusCode(200)
                .body("id", is(event1.getId()))
                .body("name", is("Guns 'n' Roses 2018"));

    }

    @Test
    public void testPutNotExisting() {
        requestSpecification()
                .contentType(ContentType.JSON)
                .body(Collections.singletonMap("name", "Lemon"))
                .when()
                .put("/0")
                .then()
                .statusCode(404);
    }

    @Test
    public void testPutWithWrongPayload() {
        Event event1 = eventRepository.save(new Event("Event1", "Address1", "City1", "Province1", "Country1", "2018-07-01", "18:00", "23:00", "Location1", "Artist1", "Desc1", "Image1"));
        requestSpecification()
        .contentType(ContentType.JSON)
                .body(Collections.singletonMap("id", 0))
                .when()
                .put(String.valueOf(event1.getId()))
                .then()
                .statusCode(422);
    }

    @Test
    public void testPutWithNonJsonPayload() {
        Event event1 = eventRepository.save(new Event("Event1", "Address1", "City1", "Province1", "Country1", "2018-07-01", "18:00", "23:00", "Location1", "Artist1", "Desc1", "Image1"));
        requestSpecification()
                .contentType(ContentType.XML)
                .when()
                .put(String.valueOf(event1.getId()))
                .then()
                .statusCode(415);
    }

    @Test
    public void testPutWithEmptyPayload() {
        Event event1 = eventRepository.save(new Event("Event1", "Address1", "City1", "Province1", "Country1", "2018-07-01", "18:00", "23:00", "Location1", "Artist1", "Desc1", "Image1"));
        requestSpecification()
                .contentType(ContentType.JSON)
                .when()
                .put(String.valueOf(event1.getId()))
                .then()
                .statusCode(415);
    }

    @Test
    public void testDelete() {
        Event event1 = eventRepository.save(new Event("Event1", "Address1", "City1", "Province1", "Country1", "2018-07-01", "18:00", "23:00", "Location1", "Artist1", "Desc1", "Image1"));
        requestSpecification().delete(String.valueOf(event1.getId()))
                .then()
                .statusCode(204);
        assertFalse(eventRepository.exists(event1.getId()));
    }

    @Test
    public void testDeleteNotExisting() {
        requestSpecification()
                .delete("/0")
                .then()
                .statusCode(404);
    }


    private RequestSpecification requestSpecification() {
        return given().baseUri(String.format("http://localhost:%d/%s", port, EVENTS_PATH));
    }
}
