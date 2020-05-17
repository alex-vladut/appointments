package com.comp.appointments.bdd;

import org.junit.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootContextLoader;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("test")
@ContextConfiguration(loader = SpringBootContextLoader.class)
public class SpringIntegrationTest {
    private static final Logger LOGGER = LoggerFactory.getLogger(SpringIntegrationTest.class);

    @Before
    public void setup() {
        // This one is necessary in order to pull up the spring context
        LOGGER.info("Started the application");
    }
}
