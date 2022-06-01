// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
    // Strangers List Item Custom Commands Definitions

    // CC_Intercept_Get_Items
    interface cy {
        /**
         * @example cy.CC_Intercept_Get_Items()
         *
         * File: ../support/Intercept_Commands.js
         *
         * Intercept the items
         *
         * Received parameters:
         * - Doesn't receive parameters
         *
         * Return:
         * - Returns the list of items with their information
         *
         */
        CC_Intercept_Get_Items()
    }

    // CC_Intercept_Post_Items
    interface cy {
        /**
         * @example cy.CC_Intercept_Post_Items()
         *
         * File: ../support/Intercept_Commands.js
         *
         * Intercepts when an item is created
         *
         * Received parameters:
         * - Doesn't receive parameters
         *
         * Return:
         * - Returns the updated list including the new item created in the last position of the array object
         *
         */
        CC_Intercept_Post_Items()
    }

    // CC_Intercept_Delete_Items
    interface cy {
        /**
         * @example cy.CC_Intercept_Delete_Items()
         *
         * File: ../support/Intercept_Commands.js
         *
         * Intercepts when an item is deleted
         *
         * Received parameters:
         * - Doesn't receive parameters
         *
         * Return:
         * - Returns the list of items after an item is removed
         *
         */
        CC_Intercept_Delete_Items()
    }
}