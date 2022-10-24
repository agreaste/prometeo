class ShadowElementUtils {
    /**
     * @returns {{style: HTMLStyleElement, element: HTMLElement}}
     */
    static shadowBuilder() {
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

    /**
     * @param {HTMLElement} root
     * @param {() => {style: HTMLStyleElement, element: HTMLElement}}callback
     * @param {'closed'|'open'} mode
     */
    static shadowMount(root, callback, mode = 'closed') {
        // Create a shadow root
        const ref = root.attachShadow({mode}); // sets and returns 'this.shadowRoot'

        const {style, element} = callback();
        ref.append(style, element);
    }

    /**
     * @param {string} cssString
     * @returns {HTMLStyleElement}
     */
    static css(cssString) {
        const style = document.createElement('style');
        style.textContent = cssString;

        return style;
    }

    static defineExtend(name, component, extendTag = 'div') {
        console.log('mounting div extension')
        customElements.define(name, component, {extends: extendTag});
    }
}

export default ShadowElementUtils;