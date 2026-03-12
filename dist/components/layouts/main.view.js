"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderMainLayoutView = renderMainLayoutView;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const sidebar_view_1 = require("./common/sidebar.view");
const THEME_PATH = (0, node_path_1.join)(process.cwd(), 'theme html', 'pages-starter-1.html');
const SIDEBAR_START = '<!-- Sidebar -->';
const MAIN_WRAPPER_START = '<!-- Main Content Wrapper -->';
const MAIN_END = '</main>';
let cachedFragments = null;
function readThemeFragments() {
    if (cachedFragments) {
        return cachedFragments;
    }
    const themeHtml = (0, node_fs_1.readFileSync)(THEME_PATH, 'utf8');
    const sidebarIndex = themeHtml.indexOf(SIDEBAR_START);
    const mainWrapperIndex = themeHtml.indexOf(MAIN_WRAPPER_START);
    const mainEndIndex = themeHtml.indexOf(MAIN_END, mainWrapperIndex);
    if (sidebarIndex === -1 || mainWrapperIndex === -1 || mainEndIndex === -1) {
        throw new Error('Cannot build main layout from theme file. Required markers were not found.');
    }
    cachedFragments = {
        beforeSidebar: themeHtml.slice(0, sidebarIndex),
        afterMain: themeHtml.slice(mainEndIndex + MAIN_END.length),
    };
    return cachedFragments;
}
function renderMainContent(title, content) {
    return `      <!-- Main Content Wrapper -->
      <main class="main-content w-full px-[var(--margin-x)] pb-8">
        <div class="flex items-center space-x-4 py-5 lg:py-6">
          <h2 class="text-xl font-medium text-slate-800 dark:text-navy-50 lg:text-2xl">
            ${title}
          </h2>
        </div>
        ${content}
      </main>`;
}
function renderMainLayoutView(options = {}) {
    const { beforeSidebar, afterMain } = readThemeFragments();
    const title = options.title ?? 'Zairosoft Platform';
    const content = options.content ?? '';
    const sidebar = options.includeSidebar === false ? '' : `      ${(0, sidebar_view_1.renderSidebarView)()}\n\n`;
    const mainContent = renderMainContent(title, content);
    return `${beforeSidebar}${sidebar}${mainContent}${afterMain}`;
}
//# sourceMappingURL=main.view.js.map