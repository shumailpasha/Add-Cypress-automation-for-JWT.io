describe('JWT.io Web Automation', () => {
  const jwtUrl = 'https://jwt.io';
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhIjoxLCJiIjoyLCJjIjozLCJpYXQiOjE2OTYzOTc5Mjd9.6S9s1qxsu454fCUtOOME3Y_LLw7jq1owBleccDmPwvo`;
  const secret = `helloworld`;
  const payloadFieldSelector = '.jwt-content-payload pre';
  const signatureMessageSelector = '.jwt-verified span';
  const tokenTextAreaSelector = '.jwt-content-encoded textarea';
  const secretInputSelector = '#jwt-decode input[placeholder="your-256-bit-secret"]';

  beforeEach(() => {
    cy.visit(jwtUrl);
    cy.contains('JWT Decoder').should('exist').and('have.class', 'active');
  });

  it('Example 1: Validate token decoding and invalid signature', () => {
    cy.get(tokenTextAreaSelector).clear().type(token, { delay: 10 });
    cy.get(payloadFieldSelector).should('contain.text', '"c": 3');
    cy.get(signatureMessageSelector).should('contain.text', 'Invalid Signature');
  });

  it('Example 2: Validate signature verification with secret', () => {
    cy.get(tokenTextAreaSelector).clear().type(token, { delay: 10 });
    cy.get(signatureMessageSelector).should('contain.text', 'Invalid Signature');
    cy.get(secretInputSelector).clear().type(secret, { delay: 10 });
    cy.get(signatureMessageSelector).should('contain.text', 'Signature Verified');
    cy.get(tokenTextAreaSelector).should('have.value', token);
    cy.get(payloadFieldSelector).should('contain.text', '"c": 3');
    cy.get(secretInputSelector).clear().type('wrongsecret', { delay: 10 });
    cy.get(signatureMessageSelector).should('contain.text', 'Invalid Signature');
    cy.get(payloadFieldSelector).should('contain.text', '"c": 3');
  });
});
