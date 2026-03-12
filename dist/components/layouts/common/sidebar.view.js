"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderSidebarView = renderSidebarView;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const THEME_PATH = (0, node_path_1.join)(process.cwd(), 'theme html', 'pages-starter-1.html');
const SIDEBAR_START = '<!-- Sidebar -->';
const MAIN_WRAPPER_START = '<!-- Main Content Wrapper -->';
let cachedSidebarHtml = null;
function extractBetween(source, startMarker, endMarker) {
    const startIndex = source.indexOf(startMarker);
    const endIndex = source.indexOf(endMarker);
    if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
        throw new Error(`Cannot extract sidebar from theme file. Missing markers: "${startMarker}" / "${endMarker}"`);
    }
    return source.slice(startIndex, endIndex).trim();
}
function renderSidebarView() {
    if (cachedSidebarHtml) {
        return cachedSidebarHtml;
    }
    const html = (0, node_fs_1.readFileSync)(THEME_PATH, 'utf8');
    cachedSidebarHtml = extractBetween(html, SIDEBAR_START, MAIN_WRAPPER_START);
    return cachedSidebarHtml;
}
//# sourceMappingURL=sidebar.view.js.map