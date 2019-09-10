/**
 * Converts a html string to a html node
 *
 * @template T
 * @param {string} html
 * @returns {T}
 */
const htmlToElement = <T extends Element>(html: string): T => {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    const resultNode = template.content.firstElementChild as T;
    if (!resultNode) {
        throw new Error("Failed to create valid html node from input string");
    }
    return resultNode;
};

/**
 * Responsible for prepending empty table headers to results table to keey alignment
 *
 * @returns {void}
 */
const addBarcodeTablesHeader = (): void => {
    const emptyTableHeaderElement = htmlToElement(`
        <th class="highlight-header tablesorter-header" data-column="0">
            <div class="tablesorter-header-inner">
                <div class="tablesorter-header-inner">
                    <div class="relative"></div>
                </div>
            </div>
        </th>
    `);

    const tableHeaderRowSelector = "table.result-table > thead > tr";
    const tableHeaderRow = document.querySelector<HTMLTableRowElement>(tableHeaderRowSelector);
    if (!tableHeaderRow) {
        throw new Error("Could not find reference to table header row");
    }
    tableHeaderRow.insertBefore(emptyTableHeaderElement, tableHeaderRow.firstElementChild);
};

/**
 * Responsible for appending a barcode modal to the document body
 *
 * @returns {void}
 */
const addBarcodeModal = (): void => {
    const modalElement = htmlToElement(`
        <div id="barcode-modal" class="modal">
            <div id="barcode-modal-background" class="modal-background"></div>
                <div class="modal-content" style="overflow: hidden">
                    <svg id="barcode"></svg>
                </div>
            <button id="barcode-modal-close" class="modal-close is-large"></button>
        </div>
    `);

    document.body.insertBefore(modalElement, document.body.firstElementChild);
};

/**
 * Responsible for generating a new table data cell element for a barcode button
 *
 * @param {*} scannableId
 * @returns {void}
 */
const createTableDataCell = <T extends Element>(scannableId: string | null): T => {
    const tableDataCell = htmlToElement<T>(`
        <td style="border: none">
            <a barcode-data="${scannableId}" style="cursor: pointer">
                <i class="fas fa-barcode" aria-hidden="true"></i>
            </a>
        </td>
    `);

    return tableDataCell;
};

((): void => {
    addBarcodeModal();
    addBarcodeTablesHeader();

    const tableRows = [...document.querySelectorAll("table.result-table > tbody > tr")];

    const scannableIdSelector = `td > div.relative a[href*="container"i]`;

    for (const tableRow of tableRows) {
        // Fetch scannable id value for current row
        const scannableIdElement = tableRow.querySelector<HTMLAnchorElement>(scannableIdSelector);
        if (!scannableIdElement) {
            throw new Error("Failed to find scannable id for given row");
        }
        const scannableId = scannableIdElement.textContent;

        // Create a table data cell for the barcode icon
        const barcodeTableDataCell = createTableDataCell<HTMLTableDataCellElement>(scannableId);
        tableRow.insertBefore(barcodeTableDataCell, tableRow.firstElementChild);

        // Add onclick listeners to handle the modal display
        barcodeTableDataCell.addEventListener("click", (event: MouseEvent) => {
            const target = event.currentTarget as HTMLTableCellElement;
            if (!target) {
                throw new Error("Cannot find reference to clicked element");
            }
            const barcodeAnchorElement = target.firstElementChild as HTMLAnchorElement;
            if (!barcodeAnchorElement) {
                throw new Error("Cannot find reference to barcode anchor element");
            }
            const barcodeData = barcodeAnchorElement.getAttribute("barcode-data");
            if (!barcodeData) {
                throw new Error("No barcode data found for this row");
            }

            // @ts-ignore
            JsBarcode("#barcode", barcodeData);

            const barcodeImage = document.getElementById("barcode");
            if (!barcodeImage) {
                throw new Error("Could not find reference to barcode svg image");
            }
            barcodeImage.style.width = "100%";
            barcodeImage.style.height = "100%";

            const barcodeModal = document.getElementById("barcode-modal");
            if (!barcodeModal) {
                throw new Error("Could not find reference to barcode modal");
            }
            barcodeModal.classList.add("is-active");
            const barcodeModalCloseButton = document.getElementById("barcode-modal-close");
            if (!barcodeModalCloseButton) {
                throw new Error("Could not find reference to barcode modal");
            }
            barcodeModalCloseButton.addEventListener("click", () => {
                barcodeModal.classList.remove("is-active");
            });
            const barcodeModalBackground = document.getElementById("barcode-modal-background");
            if (!barcodeModalBackground) {
                throw new Error("Could not find reference to barcode modal");
            }
            barcodeModalBackground.addEventListener("click", () => {
                barcodeModal.classList.remove("is-active");
            });
        });
    }
})();
