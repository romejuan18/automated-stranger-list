/*
Script Name: Edit_item.js
Description: Edit an existing item in the stranger list from e2e test
Author: Juan Pablo Romero
Data Preconditions Flow:
   1. Item already created
*/

import Chance from 'chance'

const resolutions = ['iphone-xr', [1280, 720]]

describe('Edit an existing item', () => {
    beforeEach(function () {
        cy.intercept({
            method: 'GET',
            url: '**/api/items',
        }).as('getItems')

        cy.intercept({
            method: 'POST',
            url: '**/api/items',
        }).as('postItems')
    })

    beforeEach(function () {
        cy.CC_add_item().as('addItem')
    })

    afterEach(function () {
        cy.CC_delete_item(this.lasItemModified.idLastItem)
    })

    resolutions.forEach((resolution) => {
        it(`Edit item description and image successfully on ${resolution}`, function () {
            if (Cypress._.isArray(resolution)) {
                cy.viewport(resolution[0], resolution[1])
            } else {
                cy.viewport(resolution)
            }

            const filePath2 = 'chapter8-320px-320px.png'
            let synopsisChapter8 = chance.paragraph({sentences: 1})

            cy.visit('/')
            cy.wait('@getItems')
            cy.get('li').last().within(() => {
                cy.findByText(this.addItem.text).should('be.visible')
                cy.findByText(/delete/i).should('be.visible')
                cy.findByText(/edit/i).click()
            })

            cy.get('#inputImage').attachFile(filePath2)
            cy.findByPlaceholderText('Maximum allowed length: 300 characters').clear().type(synopsisChapter8).invoke('val').as('descriptionModifiedText')
            cy.findByRole('button', {name: /update item/i}).should('be.enabled').click()
            cy.wait('@postItems')

            cy.wait('@postItems').then((resp) => {
                const body = resp.response.body
                let lastItem = body[body.length - 1]
                let idLastItem = lastItem.id
                let descriptionModifiedLastItem = lastItem.text

                cy.log(`ID LAST ITEM: ${idLastItem}`)
                cy.log(`DESCRIPTION LAST ITEM: ${descriptionModifiedLastItem}`)

                cy.wrap({descriptionModifiedLastItem, idLastItem})
            }).as('lasItemModified')

            cy.get('@descriptionModifiedText').then((descriptionModifiedText) => {
                cy.get('@lasItemModified').then((lasItemModified) => {
                    const descriptionModifiedItem = lasItemModified.descriptionModifiedLastItem
                    expect(descriptionModifiedItem.trim()).to.be.equal(descriptionModifiedText.trim())
                    expect(descriptionModifiedText.trim(), 'Original Description').not.to.be.equal(this.addItem.text, 'Modified Description')
                })
            })
        })
    })
})

