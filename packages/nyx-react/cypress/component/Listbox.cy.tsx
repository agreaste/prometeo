import ListBox from "../../src/components/listBox/ListBox";

describe("Option.tsx", () => {
    context("ARIA compliance", () => {
        beforeEach(() => {
            cy.mount(<ListBox.Option aria-label={"pippo"} value={1}>pippo</ListBox.Option>);
        });

        it("has role option", () => {
            cy.get("[role=\"option\"]").should("be.visible");
        });

        it("is labelled by its content", () => {
            cy.get("[role=\"option\"]").should("be.visible").should("contain", "pippo");
        });

        it("has a label specified with aria-label", () => {
            cy.get("[role=\"option\"]").should("have.attr", "aria-label");
        });
    });
});

describe("ListBox.tsx", () => {
    beforeEach(() => {
        cy.mount(<ListBox id={"test-listbox"} label="My test Combobox" onChange={(arg) => console.log(arg)}>
            {[1, 2, 3].map((val: number, i: number) => (
                <ListBox.Option<number> key={i} aria-label={`option ${i}`} value={val} data-test={`option-${i}`}>
                    option {i}
                </ListBox.Option>))}
        </ListBox>);
    });

    context("ARIA keyboard compliance", () => {
        const targetOption = () =>  cy.get("[role=\"listbox\"] > [role=\"option\"]").first();
        beforeEach(() => {
            targetOption().focus(); // tabbing is currently not supported by cypress.
        });

        it("select option using enter when radio button is focused and unchecked", () => {
            targetOption().first().should("have.attr", "aria-selected", "false");
            targetOption().type("{enter}");
            targetOption().should("have.attr", "aria-selected", "true");
        });

        it("select option using space bar when radio button is focused and unchecked", () => {
            targetOption().should("have.attr", "aria-selected", "false");
            targetOption().type(" ");
            targetOption().should("have.attr", "aria-selected", "true");
        });

        it("moves focus to the next option when current option is not the last element", () => {
            targetOption().type("{downArrow}");
            targetOption().should("not.have.focus");
            targetOption().next().should("have.focus");
        });
    });

    context("ARIA attribute compliance", () => {
        const targetListbox = () => cy.get("[role=\"listbox\"]");
        it("has role listbox", () => {
            targetListbox().should("be.visible");
        });

        it("has a label specified with aria-label", () => {
            targetListbox().should("have.attr", "aria-label");
        });

        it("has children with role option", () => {
            cy.get("[role=\"listbox\"] [role=\"option\"]").should("have.length", 3);
        });

        it("has children with aria-checked", () => {
            cy.get("[role=\"listbox\"] > [role=\"option\"]").each(($option) => {
                expect($option).to.have.attr("aria-selected");
            });
        });

        it("If a radio button is checked, the radio element has aria-checked set to true", () => {
            cy.get("[role=\"listbox\"] > [role=\"option\"]").first().click();
            cy.get("[role=\"listbox\"] > [role=\"option\"]").first().should("have.attr", "aria-selected", "true");
        });
    });
});