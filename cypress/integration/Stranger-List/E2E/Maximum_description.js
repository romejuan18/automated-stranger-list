/*
Script Name: Maximum_description.js
Description: Validate the maximum number of characters to enter in the description of an item in the stranger list from e2e test
Author: Juan Pablo Romero
Data Preconditions Flow:
   1. Item already created
*/

import Chance from 'chance'

const resolutions = ['iphone-xr', [1280, 720]]

describe('Maximum description', () => {
    beforeEach(function () {
        cy.intercept({
            method: 'GET',
            url: '**/api/items',
        }).as('getItems')
    })

    resolutions.forEach((resolution) => {
        it(`Create a successful item with 300 characters in the description on ${resolution}`, function () {
            if (Cypress._.isArray(resolution)) {
                cy.viewport(resolution[0], resolution[1])
            } else {
                cy.viewport(resolution)
            }

            const filePath1 = 'chapter8-320px-320px.jpg'
            let synopsisChapter8 = chance.string({length: 300})

            cy.visit('/')
            cy.wait('@getItems')

            cy.get('#inputImage').attachFile(filePath1)
            cy.findByPlaceholderText('Maximum allowed length: 300 characters').type(synopsisChapter8).invoke('val').as('descriptionText')
            cy.get('@descriptionText').then((descriptionText) => {
                const lengthDescriptionText = descriptionText.length
                cy.log(`Entered text size: ${lengthDescriptionText}`)
                expect(lengthDescriptionText, 'Entered text size:').to.be.equal(300, 'Possible size')
            })
            cy.findByRole('button', {name: /create item/i}).should('be.enabled')
        })

        it(`Create an unsuccessful item with 301 characters in the description on ${resolution}`, function () {
            if (Cypress._.isArray(resolution)) {
                cy.viewport(resolution[0], resolution[1])
            } else {
                cy.viewport(resolution)
            }

            const filePath1 = 'chapter8-320px-320px.jpg'
            let synopsisChapter8 = chance.string({length: 301})

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