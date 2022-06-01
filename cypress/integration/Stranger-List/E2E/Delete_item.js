/*
Script Name: Delete_item.js
Description: Delete an existing item in the stranger list from e2e test
Author: Juan Pablo Romero
Data Preconditions Flow:
   1. Item already created
*/

const resolutions = ['iphone-xr', [1280, 720]]

describe('Delete an existing item', () => {
    beforeEach(function () {
        cy.intercept({
            method: 'GET',
            url: '**/api/items',
        }).as('getItems')

        cy.intercept({
            method: 'DELETE',
            url: '**/api/items/**',
        }).as('deleteItems')
    })

    beforeEach(function () {
        cy.CC_add_item().as('addItem')
    })

    resolutions.forEach((resolution) => {
        it(`Delete item on ${resolution}`, function () {
            if (Cypress._.isArray(resolution)) {
                cy.viewport(resolution[0], resolution[1])
            } else {
                cy.viewport(resolution)
            }

            cy.visit('/')
            cy.wait('@getItems')

            cy.get('li').last().within(() => {
                cy.findByText(this.addItem.text).should('be.visible')
                cy.findByText(/edit/i).should('be.visible')
                cy.findByText(/delete/i).click()
            })

            cy.findByText(/¿are you shure you want to delete this item\?/i).should('be.visible')
            cy.findByRole('button', {name: /cancel/i}).should('be.visible')
            cy.findByRole('button', {name: /yes, delete it!/i}).click()

            cy.wait('@deleteItems').then((resp) => {
                const body = resp.response.body
                let lastItem = body[body.length - 1]
                let idLastItem = lastItem.id
                let descriptionLastItem = lastItem.text

                cy.log(`ID LAST ITEM: ${idLastItem}`)
                cy.log(`DESCRIPTION LAST ITEM: ${descriptionLastItem}`)

                cy.wrap({descriptionLastItem, idLastItem})
            }).as('lasItem')

            cy.get('@lasItem').then((lasItem) => {
                expect(lasItem.descriptionLastItem.trim()).not.to.be.equal(this.addItem.text)
                expect(lasItem.idLastItem).not.to.be.equal(this.addItem.id)
            })

            cy.get('li').last().within(() => {
                cy.findByText(this.addItem.text).should('not.exist')
            })
        })
    })
})

