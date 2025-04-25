describe('Price filtering', () => {
    it('Displays only products within the selected price range', () => {
      cy.visit('/home')
      cy.wait(1000)
  
      // Set minimum and maximum price
      cy.get('input[name="min_price"]').type('10')
      cy.wait(1000)
      cy.get('input[name="max_price"]').type('50')
      cy.wait(1000)

      // Submit the form
      cy.contains('Filtrer').click()
      cy.wait(1500)
  
      // For each product, check that the price is within the range
      cy.get('.portfolio-item').each(($el) => {
        cy.wrap($el).find('h6').invoke('text').then((priceText) => {
          const price = parseFloat(priceText.replace('$', '').trim())
          expect(price).to.be.gte(10)
          expect(price).to.be.lte(50)
        })
      })
    })
})
