/// <reference types="cypress" />

context('Cart Actions', () => {
	beforeEach(() => {
		cy.visit('/');
	})

	it('Send order to the backend server successful', () => {
		cy.get('[data-cy=add-to-cart-2]').click();
		cy.get('[data-cy=add-to-cart-3]').click();

		cy.get('[data-cy=open-cart]').click();

		cy.get('[data-cy=send-order]').click();

		cy.get('[data-cy=response-message]').should(($div) =>{
			expect($div).to.contain('succeed')
		})
	})

	it('does not allow users to send empty order', ()=>{
		cy.get('[data-cy=open-cart]').click();

		cy.get('[data-cy=send-order]').should('be.disabled')
	});

});