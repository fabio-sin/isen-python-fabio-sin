describe('Create and connect to an account', () => {
  it('Visits the Oc commerce site', () => {
    cy.visit('/home')

    // User is able to create an account an to be redirect to login pages

    cy.contains('SIGNUP').click()
    cy.url().should('include', '/user/signup')
    // cy.contains('fname')
    cy.get('[id^=fname]').type('fakeuser')
    cy.get('[id^=lname]').type('toto')
    cy.get('[id^=username]').type('fakeuser')
    cy.get('[id^=email]').type('fake@email.com')
    cy.get('[id^=pass]').type('1hstesh<23456789')
    cy.get('[id^=re_pass]').type('1hstesh<23456789')
    cy.get('form').contains('Register').click()
    cy.url().should('include', '/user/login')

    // User is able to connect with the previously created account
    cy.get('[id^=your_name]').type('fakeuser')
    cy.get('[id^=your_pass]').type('1hstesh<23456789')
    cy.get('form').contains('Log in').click()
    cy.url().should('include', '/home')
  })
})



describe('Put item in favourite', () => {
  it('Connect to OC commerce and put in favourite', () => {
    cy.visit('/home')

    // In this test you should load the home url and connect with the previous account

    cy.contains('LOGIN').click()

    cy.url().should('include', '/user/login')

    // Log in
    cy.get('[id^=your_name]').type('fakeuser')
    cy.get('[id^=your_pass]').type('1hstesh<23456789')
    cy.get('form').contains('Log in').click()
    cy.url().should('include', '/home')

    // You will go to favourite pages to make sure there is no favourite
    cy.contains('FAVOURITE').click()
    cy.url().should('include', '/favourite')
    cy.contains('No Product in your favourite list')

    // Then go back to home
    cy.contains('OC-commerce').click()

    // You will add an item to favourite
    cy.get('[id^=favBtn]').first().click()

    // You will go to favourite pages to confirm item is here
    cy.contains('FAVOURITE').click()
    cy.get('table tbody tr').should('have.length.at.least', 1)
    cy.get('table tbody tr').first().within(() => {
      cy.get('td').eq(1).invoke('text').then((productName) => {
        cy.log('Produit ajouté aux favoris : ' + productName)
      })
    })

    // You will then delete the item an check it has been successfully deleted
    cy.get('[id^=favBtn]').first().click()
    cy.reload()
    cy.contains('No Product in your favourite list')
  })
})
