// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
    // Strangers List Item Custom Commands Definitions

    // CC_delete_item
    interface cy {
        /**
         * @example cy.CC_delete_item(item_id).as(deleteItem')
         *
         * File: ../support/Item_Commands.js
         *
         * Delete an item from the list
         *
         * Received parameters:
         * - id item
         *
         * Return:
         * - Updated list after deleting the item
         *
         */
        CC_delete_item(
            id_item: string
        )
    }

    // cy.CC_add_item()
    interface cy {
        /**
         * @example cy.CC_add_item().as('addItem')
         *
         * File: ../support/Item_Commands.js
         *
         * Add an item to the list
         *
         * Received parameters:
         * - Doesn't receive parameters
         *
         * Return:
         * - Updated list with the new item added
         *
         */
        CC_add_item()
    }
}