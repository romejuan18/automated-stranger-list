/*
Script Name: Create_item.js
Description: create a new item in the stranger list from e2e test
Author: Juan Pablo Romero
Data Preconditions Flow:
   1. Image with the requested conditions saved
*/

import Chance from 'chance'

const resolutions = ['iphone-xr', [1280, 720]]

describe('Create item', () => {
    context('Create item successfully', () => {
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

        afterEach(function () {
            cy.CC_delete_item(this.lasItem.idLastItem)
        })

        resolutions.forEach((resolution) => {

            it(`Create item successfully with adequate image(jpg, png, gif) on ${resolution}`, function () {
                if (Cypress._.isArray(resolution)) {
                    cy.viewport(resolution[0], resolution[1])
                } else {
                    cy.viewport(resolution)
                }

                const filePath1 = 'chapter8-250px-250px.jpg'
                let synopsisChapter8 = chance.paragraph({sentences: 1})

                cy.visit('/')
                cy.wait('@getItems')

                cy.get('#inputImage').attachFile(filePath1)
                cy.findByPlaceholderText('Maximum allowed length: 300 characters').type(synopsisChapter8).invoke('val').as('descriptionText')
                cy.findByRole('button', {name: /create item/i}).should('be.enabled').click()
                cy.wait('@postItems').then((resp) => {
                    const body = resp.response.body
                    let lastItem = body[body.length - 1]
                    let idLastItem = lastItem.id
                    let descriptionLastItem = lastItem.text

                    cy.log(`ID LAST ITEM: ${idLastItem}`)
                    cy.log(`DESCRIPTION LAST ITEM: ${descriptionLastItem}`)

                    cy.wrap({descriptionLastItem, idLastItem})
                }).as('lasItem')

                cy.get('@descriptionText').then((descriptionText) => {
                    cy.get('@lasItem').then((lasItem) => {
                        const descriptionChapter = lasItem.descriptionLastItem
                        expect(descriptionChapter.trim()).to.be.equal(descriptionText.trim())

                    })
                })
            })
        })
    })

    context('Create item unsuccessfully', () => {

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

        resolutions.forEach((resolution) => {

            it(`Create item unsuccessfully with inadequate image on ${resolution}`, function () {
                if (Cypress._.isArray(resolution)) {
                    cy.viewport(resolution[0], resolution[1])
                } else {
                    cy.viewport(resolution)
                }

                const filePath2 = 'chapter8-600px-600px.jpg'
                let synopsisChapter8 = chance.paragraph({sentences: 1})

                cy.visit('/')
                cy.wait('@getItems')

                cy.get('#inputImage').attachFile(filePath2)
                cy.findByPlaceholderText('Maximum allowed length: 300 characters').type(synopsisChapter8)
                cy.findByRole('button', {name: /create item/i}).should('not.be.enabled')
            })

            it(`Create item with file type not accepted (jpeg, bmp, svg) on ${resolution}`, function () {
                if (Cypress._.isArray(resolution)) {
                    cy.viewport(resolution[0], resolution[1])
                } else {
                    cy.viewport(resolution)
                }

                const filePath3 = 'chapter8-320px-320px.svg'
                let synopsisChapter8 = chance.paragraph({sentences: 1})

                cy.visit('/')
                cy.wait('@getItems')

                cy.get('#inputImage').attachFile(filePath3)
                cy.findByPlaceholderText('Maximum allowed length: 300 characters').type(synopsisChapter8)
                cy.findByRole('button', {name: /create item/i}).should('not.be.enabled')
            })

            it(`Create item without uploading image on ${resolution}`, function () {
                if (Cypress._.isArray(resolution)) {
                    cy.viewport(resolution[0], resolution[1])
                } else {
                    cy.viewport(resolution)
                }

                let synopsisChapter8 = chance.paragraph({sentences: 1})

                cy.visit('/')
                cy.wait('@getItems')

                cy.findByPlaceholderText('Maximum allowed length: 300 characters').type(synopsisChapter8)
                cy.findByRole('button', {name: /create item/i}).should('be.enabled').click()

                cy.on('window:alert', (text) => {
                    expect(text).to.contains('You must to select an image')
                })
            })

            it(`Create an item with a very long description on ${resolution}`, function () {
                if (Cypress._.isArray(resolution)) {
                    cy.viewport(resolution[0], resolution[1])
                } else {
                    cy.viewport(resolution)
                }

                const filePath1 = 'chapter8-250px-250px.jpg'
                let synopsisChapter8 = chance.paragraph({sentences: 7})

                cy.visit('/')
                cy.wait('@getItems')

                cy.get('#inputImage').attachFile(filePath1)
                cy.findByPlaceholderText('Maximum allowed length: 300 characters').type(synopsisChapter8).invoke('val').as('descriptionText')
                cy.get('@descriptionText').then((descriptionText) => {
                    const lengthDescriptionText = descriptionText.length
                    cy.log(`Entered text size: ${lengthDescriptionText}`)
                    expect(lengthDescriptionText, 'Entered text size:').to.be.greaterThan(300, 'Possible size')
                })
                cy.findByRole('button', {name: /create item/i}).should('not.be.enabled')
            })
        })
    })
})