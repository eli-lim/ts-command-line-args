import { IReplaceOptions } from '../contracts';
import { splitContent, findEscapeSequence } from './line-ending.helper';

export function addContent(inputString: string, content: string, options: IReplaceOptions): string {
    const lineBreak = findEscapeSequence(inputString);
    const lines = splitContent(inputString);
    const replaceBelowIndex = lines.indexOf(options.replaceBelow);
    const replaceAboveIndex = lines.indexOf(options.replaceAbove);

    if (replaceAboveIndex > -1 && replaceBelowIndex > -1 && replaceAboveIndex < replaceBelowIndex) {
        throw new Error(
            `The replaceAbove marker '${options.replaceAbove}' was found before the replaceBelow marker '${options.replaceBelow}'. The replaceBelow marked must be before the replaceAbove.`,
        );
    }

    const linesBefore = lines.slice(0, replaceBelowIndex + 1);
    const linesAfter = replaceAboveIndex >= 0 ? lines.slice(replaceAboveIndex) : [];

    return [...linesBefore, ...splitContent(content), ...linesAfter].join(lineBreak);
}
