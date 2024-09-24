import LoginPage from "../../src/pages/auth/LoginPage";

describe("logincomponent.cy.jsx", () => {
  it("mountpage", () => {
    // Mount the LoginPage component
    cy.mount(<LoginPage />);
  });
});
