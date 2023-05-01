// process.env.NODE_ENV = 'test';

describe('auth Spec', () => {
	before(function() {
		cy.task('READFROMDB', {
			dbConfig: Cypress.config('DB'),

			sql: 'DELETE FROM users;'
		});
	});
	it('loads login', () => {
		cy.visit('localhost:3000/');

		cy.contains('Login');
		/* ==== Generated with Cypress Studio ==== */
		cy.get('#email').clear('f');
		cy.get('#email').type('frodo@gmail.com');
		cy.get('#password').clear('f');
		cy.get('#password').type('Frodo123!@#');
		cy.get('.btn-primary').click();
		cy.get('.container-md > a').click();

		cy.get('#name').type('Frodo');

		cy.get('#email').type('frodo@gmail.com');
		cy.get('#password').clear();
		cy.get('#password').type('Frodo123!@#');
		cy.get('#confirm').clear();
		cy.get('#confirm').type('frodo123!@#');
		cy.get('.btn-primary').click();
		cy.get('#name').clear('F');
		cy.get('#name').type('Frodo');
		cy.get('#email').clear();
		cy.get('#email').type('frodo@gmail.com');
		cy.get('#password').clear();
		cy.get('#password').type('Frodo123!@#');
		cy.get('#confirm').clear();
		cy.get('#confirm').type('Frodo123!@#');
		cy.get('.btn-primary').click();

		/* ==== End Cypress Studio ==== */
		/* ==== Generated with Cypress Studio ==== */
		cy.get('#email').clear('frodo@gmail.com');
		cy.get('#email').type('frodo@gmail.com');
		cy.get('#password').clear('F');
		cy.get('#password').type('Frodo123!@#{enter}');
		cy.get('#create-character-btn').click();
		cy.get('#name').clear('G');
		cy.get('#name').type('Gollum');
		cy.get('.btn').click();
		cy.get('[name="strength"]').clear('10');
		cy.get('[name="strength"]').type('10');
		cy.get('[name="dexterity"]').clear('10');
		cy.get('[name="dexterity"]').type('10');
		cy.get('[name="constitution"]').clear('10');
		cy.get('[name="constitution"]').type('10');
		cy.get('[name="intelligence"]').clear('10');
		cy.get('[name="intelligence"]').type('10');
		cy.get('[name="wisdom"]').clear('1');
		cy.get('[name="wisdom"]').type('10');
		cy.get('[name="charisma"]').clear('1');
		cy.get('[name="charisma"]').type('10');
		cy.get('#abilities_form > .btn').click();
		cy.get('#max-hp-form > .mb-3 > input').clear('0');
		cy.get('#max-hp-form > .mb-3 > input').type('204');
		cy.get('#max-hp-form > .mb-3 > .btn').click();
		cy.get('#ac-form > .mb-3 > input').clear('1');
		cy.get('#ac-form > .mb-3 > input').type('15');
		cy.get('#ac-form > .mb-3 > .btn').click();
		cy.get(':nth-child(12) > form > input').clear('Gollum ');
		cy.get(':nth-child(12) > form > input').type('Gollum - 2');
		cy.get(':nth-child(12) > form > .btn-danger').click();
		cy.get('#nav-login').click();
		cy.get('#rooms-list > :nth-child(2) > a').click();
		cy.get(':nth-child(4) > .nav-link').click();
		cy.get('#room_id').click();
		cy.get('#name').clear('F');
		cy.get('#name').type("Frodo's Room");
		cy.get('.form > .btn').click();
		cy.get('#user-characters').select('Gollum');
		cy.get('.flex-row > .d-flex > form > .btn').click();
		cy.get('#max-hp-form > .mb-3 > .form-control').clear('2');
		cy.get('#max-hp-form > .mb-3 > .form-control').type('200');
		cy.get('.mb-3 > .btn').click();
		cy.get('#conditions').select('deafened');
		cy.get('.btn').contains('Add Condition').click();
		cy.get('.btn-secondary').click();
		cy.get('#remove-condition').click();
		cy.get('#user-characters').select('Gollum - 2');
		cy.get('.flex-row > .d-flex > form > .btn').click();
		cy.get('button').closest('.btn-danger').contains('Remove Character').click();

		/* ==== End Cypress Studio ==== */
		/* ==== Generated with Cypress Studio ==== */

		/* ==== End Cypress Studio ==== */
	});
});

describe('Character Spec', () => {
	it('should create and delete characters', () => {
		cy.visit('localhost:3000/user');
		/* ==== Generated with Cypress Studio ==== */
		cy.get('#email').type('frodo@gmail.com');
		cy.get('#password').clear('F');
		cy.get('#password').type('Frodo123!@#');
		cy.get('.btn-primary').click();
		cy.get('#create-character-btn').click();
		cy.get('#name').clear('G');
		cy.get('#name').type('Gandalf');
		cy.get('#class').clear('W');
		cy.get('#class').type('Wizard');
		cy.get('#species').clear('H');
		cy.get('#species').type('Human');
		cy.get('.btn').click();
		cy.get('#max-hp-form > .mb-3 > input').click();
		cy.get(':nth-child(11) > form > .btn-danger').click();

		/* ==== Generated with Cypress Studio ==== */

		/* ==== End Cypress Studio ==== */
	});
});

describe('Should allow for multiple users interacting with characters through room', () => {
	it('', () => {
		cy.visit('localhost:3000/user');
		/* ==== Generated with Cypress Studio ==== */
		cy.get('#email').type('frodo@gmail.com');
		cy.get('#password').clear('F');
		cy.get('#password').type('Frodo123!@#');
		cy.get('.btn-primary').click();

		/* ==== Generated with Cypress Studio ==== */
	});
});
