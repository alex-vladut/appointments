package com.comp.appointments.bdd;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(plugin = {"pretty"}, strict = true, features = "src/test/resources/bdd", stepNotifications = true)
public class CucumberTest {
}
