Cypress.Commands.add('CC_Intercept_Get_Items', () => {
    cy.intercept({
        method: 'GET',
        url: '**/api/items',
    }).as('getItems')
})

Cypress.Commands.add('CC_Intercept_Post_Items', () => {
    cy.intercept({
        method: 'POST',
        url: '**/api/items',
    }).as('postItems')
})

Cypress.Commands.add('CC_Intercept_Delete_Items', () => {
    cy.intercept({
        method: 'DELETE',
        url: '**/api/items/**',
    }).as('deleteItems')
})