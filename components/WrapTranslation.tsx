
// create a component that handles the translated message

interface WrapTranslationPropsType {
   message: string,
   renderComponent: (messagePart: string) => JSX.Element
}

export function WrapTranslation({ message, renderComponent }: WrapTranslationPropsType) {
   // define a split character, in this case '<>'
   let [prefix, infix, postfix] = message.split('<>')

   // render infix only if the message doesn't have any split characters
   if (!infix && !postfix) {
      infix = prefix
      prefix = ''
   }

   return <>
      {prefix}
      {renderComponent(infix)}
      {postfix}
   </>
}