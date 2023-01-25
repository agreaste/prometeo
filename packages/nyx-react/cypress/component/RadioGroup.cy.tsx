import {RadioGroup} from "../../src";

describe("Radio.tsx", () => {
    context("ARIA compliance", () => {
        beforeEach(() => {
            cy.mount(<RadioGroup.Radio<number> aria-label={"pippo"} value={1}>pippo</RadioGroup.Radio>);
        });

        it("has role radio", () => {
            cy.get("[role=\"radio\"]").should("be.visible");
        });

        it("is labelled by its content", () => {
            cy.get("[role=\"radio\"]").should("be.visible").should("contain", "pippo");
        });

        it("has a label specified with aria-label", () => {
            cy.get("[role=\"radio\"]").should("have.attr", "aria-label");
        });
    });
});

describe("RadioGroup.tsx", () => {
    beforeEach(() => {
        cy.mount(<RadioGroup id={"test-radio-group"} label="My test Radio group" onChange={(arg) => console.log(arg)}>
            {[1, 2, 3].map((val: number, i: number) => (
                <RadioGroup.Radio<number> key={i} aria-label={`option ${i}`} value={val} data-test={`option-${i}`} as={"span"}>
                    option {i}
                </RadioGroup.Radio>))}
        </RadioGroup>);
    });

    context("ARIA keyboard compliance", () => {
        const targetRadio = () =>  cy.get("[role=\"radiogroup\"] > [role=\"radio\"]").first();
        beforeEach(() => {
            targetRadio().focus(); // tabbing is currently not supported by cypress.
        });

        it("checks radio using enter when radio button is focused and unchecked", () => {
            targetRadio().first().should("have.attr", "aria-checked", "false");
            targetRadio().type("{enter}");
            targetRadio().should("have.attr", "aria-checked", "true");
        });

        it("checks radio using space bar when radio button is focused and unchecked", () => {
            targetRadio().should("have.attr", "aria-checked", "false");
            targetRadio().type(" ");
            targetRadio().should("have.attr", "aria-checked", "true");
        });

        it("moves focus to the next radiobutton when radio button is not the last element", () => {
            targetRadio().type("{rightArrow}");
            targetRadio().should("not.have.focus");
            targetRadio().next().should("have.focus");
        });
    });

    context("ARIA attribute compliance", () => {
        it("has role radiogroup", () => {
            cy.get("#test-radio-group").should("have.attr", "role", "radiogroup");
        });

        it("has a label specified with aria-label", () => {
            cy.get("#test-radio-group").should("have.attr", "aria-label");
        });

        it("has children with role radio", () => {
            cy.get("[role=\"radiogroup\"] > *").each(($option) => {
                expect($option).to.have.attr("role", "radio");
            });
        });

        it("has children with aria-checked", () => {
            cy.get("[role=\"radiogroup\"] > [role=\"radio\"]").each(($option) => {
                expect($option).to.have.attr("aria-checked");
            });
        });

        it("If a radio button is checked, the radio element has aria-checked set to true", () => {
            cy.get("[role=\"radiogroup\"] > [role=\"radio\"]").first().click();
            cy.get("[role=\"radiogroup\"] > [role=\"radio\"]").first().should("have.attr", "aria-checked", "true");
        });
    });
});