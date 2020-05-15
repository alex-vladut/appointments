Feature: Book new appointments at given times

  Scenario: Book multiple appointments
    Given the following appointments were booked
      | John's appointment | 12 | 00 | 60 |
      | Mary's appointment | 13 | 15 | 15 |
    When I ask for the following appointments to be booked
      | George's appointment | 13 | 00 | 15 |
      | Tom's appointment    | 11 | 00 | 60 |
      | Craig's appointment  | 13 | 30 | 15 |
    Then I should have 5 appointments

  Scenario: Booking overlapping appointments is not allowed
    Given the following appointments were booked
      | John's appointment | 12 | 00 | 60 |
      | Mary's appointment | 14 | 00 | 15 |
    When I ask for the following overlapping appointments to be booked
      | George's appointment | 11 | 30 | 60 |
      | Tom's appointment    | 12 | 30 | 60 |
      | Craig's appointment  | 12 | 30 | 15 |
      | Craig's appointment  | 13 | 30 | 60 |
    Then no new appointment should be booked and I should still have 2 appointments