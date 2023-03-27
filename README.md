# form validator

This repository provides an example of how to efficiently implement a form validator without relying on external libraries. The approach used allows for the validator to be easily expanded and implemented without requiring component coupling or being dependent on any specific framework. This implementation offers high performance in various frameworks by utilizing the observer pattern to synchronize data between components and the validator in a fully decoupled manner.

Overall, this approach to form validation offers several advantages including increased efficiency, flexibility, and ease of implementation.

The form validator can be found in ```src/pages/sign-up/form-validator.ts```, and the implementation of the form can be found in ```src/pages/sign-up/sign-up.tsx```. You can use this validator in your project by including the necessary files and calling the relevant functions.
