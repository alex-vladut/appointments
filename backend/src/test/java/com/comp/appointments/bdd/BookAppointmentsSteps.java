package com.comp.appointments.bdd;

import io.cucumber.datatable.DataTable;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.List;

import static com.comp.appointments.utils.DateTimeGenerator.nextBusinessDay;
import static java.util.stream.Collectors.toList;
import static org.hamcrest.Matchers.hasSize;

public class BookAppointmentsSteps extends SpringIntegrationTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private ZonedDateTime date;
    private String appointmentId;

    @Before
    public void setUp() {
        date = nextBusinessDay();
    }

    @After
    public void tearDown() {
        // clean up database after each scenario
        jdbcTemplate.execute("DELETE FROM appointment");
    }

    @Given("the following appointments were booked")
    public void the_following_appointments_were_booked(final DataTable table) {
        bookAppointments(table, 201);
    }

    @Given("an appointment was booked at {int} PM")
    public void an_appointment_was_booked_at(Integer hour) {
        final var start = date.withHour(hour).withMinute(0);
        final var appointment = new Appointment("My appointment", start.toString(), start.plusHours(1).toString());
        final var response = RestAssured.given()
                .contentType(ContentType.JSON)
                .body(appointment)
                .when()
                .post("/appointments");

        appointmentId = response.getHeader("Location").split("/")[2];
        response.then()
                .assertThat()
                .statusCode(201);
    }

    @Given("the appointment was cancelled")
    public void the_appointment_was_cancelled() {
        RestAssured.given()
                .basePath("/appointments")
                .contentType(ContentType.JSON)
                .when()
                .post("/{appointmentId}/cancel", appointmentId)
                .then()
                .assertThat()
                .statusCode(200);
    }

    @When("I ask for the following appointments to be booked")
    public void i_ask_for_multiple_appointments_to_be_booked(final DataTable table) {
        bookAppointments(table, 201);
    }

    @When("I ask for the following overlapping appointments to be booked")
    public void i_ask_for_the_following_overlapping_appointments_to_be_booked(final DataTable table) {
        bookAppointments(table, 400);
    }

    @When("I ask to book another appointment at {int} PM")
    public void i_ask_to_book_another_appointment_at(final Integer hour) {
        final var start = date.withHour(hour).withMinute(0);
        final var appointment = new Appointment("My new appointment", start.toString(), start.plusHours(1).toString());
        RestAssured.given()
                .contentType(ContentType.JSON)
                .body(appointment)
                .when()
                .post("/appointments")
                .then()
                .assertThat()
                .statusCode(201);
    }

    @Then("I should have {int} appointments")
    @Then("no new appointment should be booked and I should still have {int} appointments")
    @Then("the request should be successful and I should have {int} appointment")
    public void i_should_have_appointments(final Integer size) {
        RestAssured.given()
                .queryParam("from", date.minusDays(1).toString())
                .queryParam("to", date.plusDays(1).toString())
                .get("/appointments")
                .then()
                .statusCode(200)
                .assertThat()
                .body("data", hasSize(size));
    }

    private void bookAppointments(final DataTable table, final int expectedStatusCode) {
        final var appointments = mapDataTableToAppointments(table);
        for (var appointment : appointments) {
            RestAssured.given()
                    .contentType(ContentType.JSON)
                    .body(appointment)
                    .when()
                    .post("/appointments")
                    .then()
                    .assertThat()
                    .statusCode(expectedStatusCode);
        }
    }

    private List<Appointment> mapDataTableToAppointments(final DataTable table) {
        final List<List<String>> rows = table.asLists(String.class);
        return rows.stream().map(this::mapListToAppointment).collect(toList());
    }

    private Appointment mapListToAppointment(List<String> list) {
        final var title = list.get(0);
        final var start = date.withHour(Integer.parseInt(list.get(1))).withMinute(Integer.parseInt(list.get(2)));
        final var end = start.plusMinutes(Integer.parseInt(list.get(3)));
        return new Appointment(title, start.toString(), end.toString());
    }

    private static class Appointment {
        private final String title;
        private final String start;
        private final String end;

        Appointment(final String title, final String start, final String end) {
            this.title = title;
            this.start = start;
            this.end = end;
        }

        public String getTitle() {
            return title;
        }

        public String getStart() {
            return start;
        }

        public String getEnd() {
            return end;
        }
    }

}
