/*
Script Name: Creators_series.js
Description: Validate if there is an item in the list with the names of the creators
Author: Juan Pablo Romero
Data Preconditions Flow:
   1. Item created with the name of the creators of the Strangers of things series
*/

import Chance from 'chance'

const resolutions = ['iphone-xr', [1280, 720]]

describe('Check creators', () => {
    beforeEach(function () {
        cy.intercept({
            method: 'GET',
            url: '**/api/items',
        }).as('getItems')
    })

    resolutions.forEach((resolution) => {

        it(`Check if the name of the creators of the series exists as an item on ${resolution}`, function () {
            if (Cypress._.isArray(resolution)) {
                cy.viewport(resolution[0], resolution[1])
            } else {
                cy.viewport(resolution)
            }

            cy.visit('/')
            cy.wait('@getItems')
            cy.findByText(/Creators: Matt Duffer, Ross Duffer/i).should('be.visible').invoke('text').as('creatorSeries')

            cy.get('@creatorSeries').then((creatorSeries) => {
                const creators = 'Creators: Matt Duffer, Ross Duffer'
                expect(creatorSeries).to.be.equal(creators)
            })
        })
    })
})

