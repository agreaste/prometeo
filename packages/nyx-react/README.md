# Nyx React
React implementation of ARIA compliant widget.

## Available patterns
- Accordion
- Carousel
- Listbox
- Combobox with listbox popup
- Menu & Menubar
- Radio & Radio groups

## Usage
Nyx-react uses Compound component pattern to implement accessible custom widget.
```tsx
// index.ts
import {ComboBox} from "nyx-react";

const Dropdown = () => {
return <ComboBox<number> label={"test-combobox"} onChange={...} placeholder={"Test value"}>
            <ComboBox.asListBox id={"test-listbox"} data-test={"listbox"}>
                
                {[1, 2, 3].map((val: number, i: number) => (
                    <ComboBox.Option<number> key={i} aria-label={`option ${i}`} value={val} data-test={`option-${i}`}>
                        option {i}
                    </ComboBox.Option>))}
            </ComboBox.asListBox>
    </ComboBox>;
};

```