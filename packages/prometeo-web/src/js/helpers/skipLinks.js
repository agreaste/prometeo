export default function (ctx) {
    console.log('ctx: ', ctx);
    return ''
/*
    return Array.from(document.querySelectorAll('main, header, footer'))
        .filter(({id}) => !!id)
        .map(({
                  localName,
                  id
              }) => skipLink(localName, id)
        ).join('');
*/
}

const skipLink = (label, anchor) => new Handlebars.SafeString(`<li>
                <a class="skip_link" href="${anchor}" id="skip-to-main">${label}</a>
            </li>`);