import Chance from 'chance'

Cypress.Commands.add('CC_delete_item', (item_id) => {
    cy.request({
        method: 'DELETE',
        url: `/api/items/${item_id}`,
        body: {},
    }).then(
        (resp) => {
            expect(resp.status).to.eq(200)
        },
    )
})

Cypress.Commands.add('CC_add_item', () => {
    cy.intercept({
        method: 'POST',
        url: '**/api/items',
    }).as('postItems')

    const filePath1 = 'chapter8-250px-250px.jpg'
    let synopsisChapter8 = chance.paragraph({sentences: 1})

    cy.visit('/')
    cy.CC_Intercept_Get_Items()

    cy.get('#inputImage').attachFile(filePath1)
    cy.findByPlaceholderText('Maximum allowed length: 300 characters').type(synopsisChapter8).invoke('val').as('descriptionText')
    cy.findByRole('button', {name: /create item/i}).should('be.enabled').click()
    cy.wait('@postItems').then((resp) => {
        const body = resp.response.body
        let lastItem = body[body.length - 1]
        cy.wrap(lastItem)
    })
})