# Welcome to Automated Stranger List

The Stranger list project is an application made in Javascript/Cypress, where there are validation scenarios for the
creation, editing and deletion of items from a list of episodes of the Strangers of Things series

### Prerequisites

The requirement for this project is to have [Node.js](https://nodejs.org/en/)

### Installation

```shell
npm install
```

### Start Cypress

```shell
npm run open
```

## Tests

| Type | Location                                 |
| ---- | ---------------------------------------- |
| ui  | [cypress/integration/Stranger-List/E2E](./cypress/integration/Stranger-List/E2E) |

## Additional NPM Scripts

| Script         | Description                                                                      |
| -------------- | -------------------------------------------------------------------------------- |
| open           | Starts cypress debugger mode, allowing you to deploy an instance of the browser  |
| e2e            | Starts the test cases in headless browser mode                                   |
| repeat         | Run test cases n times in headless-mode with the cypress-repeat plugin           |

For a complete list of scripts see [package.json](./package.json)

## Execution examples

1. To run in open mode, just run

```shell
npm run open
```

2. To run in headless mode and generate report

```shell
npm run e2e
```

3. To run the scripts n times

```shell
npm run repeat "path"
```

**e.g**

```shell
npm run repeat cypress/integration/Stranger-List/E2E/**
```

## Best practices

When defining a test on a web page, it was decided to make use of the Cypress automation tool since it is a tool
specially designed for the definition of automated test cases at the E2E level, with this automation framework the
readability of the code is allowed In a simple way, the possibility of using the testing-library as a library on which
we can base ourselves to search for elements in an easier way such as the searches that are made with the '
findbyText', 'findByRole', easier to read and to maintain the code, cypress allows the possibility and the request
sniffer is implemented with the page, being able to obtain those elements at certain times and perform API mockings or
in the case of the project, to be able to make implicit waits to validate the loading of the elements at the level of UI
with the 'cy.intercept', it is possible to add design pattern themes making use of assertions with BDD with chai, where
we have the possibility to It is possible to make assertions depending on the elements that are or are not in the DOM '
should (“be.visible”)', or certain actions that are allowed to be done in the platform. Libraries were also added to
handle random data through chance.js and to be able to upload images through cypress-file-upload. And finally, as a
design pattern, the actions of the application were used, creating generic functions that through custom commands (
Item_Commands.js and Intercept_Commands.js) we can call them in the code, reusing them without having to duplicate code.