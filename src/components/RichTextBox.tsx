import React, { FC } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

interface RichTextBoxProps {
    content: any
}

const RichTextBox: FC<RichTextBoxProps> = ({ content }) => {
    return <div>{documentToReactComponents(content)}</div>
}

export default RichTextBox
