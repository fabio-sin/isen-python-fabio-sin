describe('Create and connect to an account', () => {
  it('Visits the OC commerce site and creates a new account', () => {
    cy.visit('/home')

    // Generate a random username and email
    const randomId = Math.random().toString(36).substring(2, 8)
    const username = `user_${randomId}`
    const email = `${username}@test.com`
    const password = '1hstesh<23456789'

    // Go to signup page
    cy.contains('SIGNUP').click()
    cy.url().should('include', '/user/signup')

    // Fill the signup form with random credentials
    cy.get('[id^=fname]').type('John')
    cy.get('[id^=lname]').type('Doe')
    cy.get('[id^=username]').type(username)
    cy.get('[id^=email]').type(email)
    cy.get('[id^=pass]').type(password)
    cy.get('[id^=re_pass]').type(password)
    cy.get('form').contains('Register').click()

    // Expect redirection to login page
    cy.url().should('include', '/user/login')

    // Log in with the newly created account
    cy.get('[id^=your_name]').type(username)
    cy.get('[id^=your_pass]').type(password)
    cy.get('form').contains('Log in').click()

    // Confirm login success
    cy.url().should('include', '/home')
    cy.contains('FAVOURITE')
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
