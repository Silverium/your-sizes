import { LocalizedString } from 'typesafe-i18n'

// create a component that handles the translated message

interface WrapTranslationPropsType {
   message: LocalizedString,
   renderComponent: (messagePart: LocalizedString) => JSX.Element
}

export function WrapTranslation({ message, renderComponent }: WrapTranslationPropsType) {
   // define a split character, in this case '<>'
   let [prefix, infix, postfix] = message.split('<>') as LocalizedString[]

   // render infix only if the message doesn't have any split characters
   if (!infix && !postfix) {
      infix = prefix
      prefix = '' as LocalizedString
   }

   return <>
      {prefix}
      {renderComponent(infix)}
      {postfix}
   </>
}