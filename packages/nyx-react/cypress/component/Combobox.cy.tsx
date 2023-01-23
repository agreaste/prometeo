import ListBox from "../../src/components/listBox/ListBox";
import ComboBox from "../../src/components/listBox/ComboBox";

describe("ListBox.tsx", () => {
    it("render", () => {
        cy.mount(<ComboBox label={"test-combobox"} onChange={(arg) => console.log(arg)} placeholder={"Test value"}>
            <ListBox id={"test-listbox"} label="My test Combobox" onChange={(arg) => console.log(arg)}>
                {[1, 2, 3].map((val: number, i: number) => (
                    <ListBox.Option<number> key={i} aria-label={`option ${i}`} value={val} data-test={`option-${i}`}>
                        option {i}
                    </ListBox.Option>))}
            </ListBox>
        </ComboBox>);
    });
});