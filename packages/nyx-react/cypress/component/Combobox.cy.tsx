import ComboBox from "../../src/components/listBox/ComboBox";

describe("ComboBox.tsx.tsx", () => {
    beforeEach(() => {
        cy.mount(<ComboBox label={"test-combobox"} onChange={(arg) => console.log(arg)} placeholder={"Test value"}>
            <ComboBox.asListBox id={"test-listbox"} data-test={"listbox"}>
                {[1, 2, 3].map((val: number, i: number) => (
                    <ComboBox.Option<number> key={i} aria-label={`option ${i}`} value={val} data-test={`option-${i}`}>
                        option {i}
                    </ComboBox.Option>))}
            </ComboBox.asListBox>
        </ComboBox>);
    });

    context("ARIA roles, states and properties", () => {
        it("has role combobox", () => {
            cy.get("[role=\"combobox\"]").should("be.visible");
        });

        it("has attribute aria-controls", () => {
            cy.get("[role=\"combobox\"]").should("have.attr", "aria-controls");
        });

        it("has attribute aria-haspopup", () => {
            cy.get("[role=\"combobox\"]").should("have.attr", "aria-haspopup");
        });

        it("has popup referenced in aria-controls", () => {
            cy.get("[role=\"combobox\"]").click();
            cy.get("[role=\"combobox\"]").should(($combobox) => {
                const popup = $combobox.next();
                const popupId = $combobox.attr("aria-controls");

                expect(popup).to.have.attr("id", popupId);
            });
        });

        it("has popup of type defined in aria-haspopup", () => {
            cy.get("[role=\"combobox\"]").click();
            cy.get("[role=\"combobox\"]").should(($combobox) => {
                const popup = $combobox.next();
                const popupType = $combobox.attr("aria-haspopup");

                expect(popup).to.have.attr("role", popupType);
            });
        });

        it("has attribute aria-expanded set to false when popup is not visible", () => {
            cy.get("[role=\"combobox\"]").should("have.attr", "aria-expanded", "false");
        });

        it("has attribute aria-expanded set to true when popup is visible", () => {
            cy.get("[role=\"combobox\"]").click();
            cy.get("[role=\"combobox\"]").should("have.attr", "aria-expanded", "true");
        });

        it("has aria-activedescendant set to a value that refers to the focused element within the popup", () => {
            let activeOption: string;
            cy.get("[role=\"combobox\"]").click();
            cy.get("[data-test=\"option-2\"]").trigger("mouseover").then(($option) => {
                activeOption = $option.attr("id") as string;
            });

            cy.get("[role=\"combobox\"]").should(($combobox) => {
                expect($combobox).have.attr("aria-activedescendant", activeOption);
            });
        });

        it("has at least a label provided by aria-label", () => {
            cy.get("[role=\"combobox\"]").should("have.attr", "aria-label");
        });
    });

    context("combobox keyboard interaction", () => {
        // TODO: define test for all keyboard requirements
        it("closes the popup when the popup is open and Escape key is pressed", () => {
            cy.get("[role=\"combobox\"]").click().should("have.attr", "aria-expanded", "true");
            cy.get("[role=\"combobox\"]").type("{esc}").should("have.attr", "aria-expanded", "false");
        });
    });

    context("listbox popup keyboard interaction", () => {
        beforeEach(() => {
            cy.get("[role=\"combobox\"]").type("{enter}").should("have.attr", "aria-expanded", "true");
        });

        it("accepts the focused option in the listbox by closing the popup, placing the accepted value in the combobox when Enter key is pressed", () => {
            let selectedLabel: string;

            cy.get("[data-test=\"listbox\"]").should(($listbox) => {
                selectedLabel = $listbox.children("li[data-active=\"true\"]").html();
            });

            // here click is used instead of enter as it behaves randomly
            cy.get("[role=\"combobox\"]").click()
                .should("have.attr", "aria-expanded", "false")
                .should(($combobox) => {
                    expect($combobox.html()).to.be.eq(selectedLabel);
                });
        });

        it("closes the popup and returns focus to the combobox when Escape key is pressed", () => {
            cy.get("[role=\"combobox\"]").type("{esc}");
            cy.get("[data-test=\"listbox\"]").should("not.exist");
            cy.get("[role=\"combobox\"]").type("{esc}").should(($combobox) => {
                expect($combobox.next()).to.have.length(0);
            });
        });

        it("moves focus to and selects the next option when Down Arrow key is pressed", () => {
            cy.get("[role=\"combobox\"]").type("{downArrow}").should(($combobox) => {
                const activeDesc = $combobox.attr("aria-activedescendant");
                const activeElement = $combobox.next().children("[data-active=\"true\"]").attr("id");

                expect(activeDesc).to.be.eq(activeElement);
            });
        });

        it("moves focus to and selects the previous option when Up Arrow key is pressed", () => {
            cy.get("[role=\"combobox\"]").type("{downArrow}").type("{upArrow}").should(($combobox) => {
                const activeDesc = $combobox.attr("aria-activedescendant");
                const activeElement = $combobox.next().children("[data-active=\"true\"]").attr("id");

                expect(activeDesc).to.be.eq(activeElement);
            });
        });
    });
});