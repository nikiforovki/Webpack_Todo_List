// declare module '*.svg' {
//     const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
//     export default content;
// }

declare module '*.svg' {
    import * as React from 'react';
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

