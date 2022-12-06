class AbstractShadowElement extends HTMLElement {
    /**
     * @returns {{style: HTMLStyleElement, element: HTMLDivElement}}
     */
    shadowBuilder () {
        throw Error('This should be implemented actually, return something like {style, shadowElement}...');
        /*
        // something like this:
        const style = this.css(`
            .some-class {
                background: back;
                color: white;
            }
        `);
        const element = document.createElement('div');

        element.setAttribute('class', 'some-class');

        return {style, element};*/
    }

    shadowMount(mode = 'closed') {
        // Create a shadow root
        const ref = this.attachShadow({mode}); // sets and returns 'this.shadowRoot'

        const {style, element} = this.shadowBuilder();
        ref.append(style, element);
    }

    /**
     * @param cssString
     * @returns {HTMLStyleElement}
     */
    css(cssString) {
        const style = document.createElement('style');
        style.textContent = cssString;

        return style;
    }
}

export default AbstractShadowElement;