export declare const saveSvg: ({ node, format, name, size, onFinish, }: {
    node: Element | null;
    format: 'png' | 'jpeg' | 'svg';
    name: string;
    size: number;
    onFinish?: (() => void) | undefined;
}) => Promise<void>;
