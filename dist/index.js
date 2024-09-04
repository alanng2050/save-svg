var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { saveBlob } from '@tinychange/save-blob';
export const saveSvg = ({ node, format, name, size, onFinish, }) => __awaiter(void 0, void 0, void 0, function* () {
    if ((node === null || node === void 0 ? void 0 : node.nodeName) !== 'svg')
        throw Error('"node" must be SVG item');
    const stringhtml = node.outerHTML;
    const blob = new Blob([stringhtml], { type: 'image/svg+xml' });
    if (format === 'svg') {
        saveBlob({ filename: name, blob });
        onFinish === null || onFinish === void 0 ? void 0 : onFinish();
        return;
    }
    const reader = new FileReader();
    reader.onload = (readerEvt) => {
        var _a;
        const data = (_a = readerEvt.target) === null || _a === void 0 ? void 0 : _a.result;
        const imgNode = document.createElement('img');
        imgNode.src = data;
        const canvas = document.createElement('canvas');
        canvas.height = size;
        canvas.width = size;
        imgNode.onload = () => {
            const ctx = canvas.getContext('2d');
            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(imgNode, 0, 0);
            canvas.toBlob((blob) => {
                if (blob)
                    saveBlob({ blob, filename: name });
                imgNode.remove();
                canvas.remove();
                onFinish === null || onFinish === void 0 ? void 0 : onFinish();
            }, `image/${format}`, 1);
        };
    };
    reader.readAsDataURL(blob);
});
