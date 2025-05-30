function searchTable() {
    const input = document.getElementById("searchInput").value.toLowerCase().trim();
    const table = document.getElementById("experienceTable");
    const rows = table.querySelectorAll("tbody tr");

    if (!input) {
        rows.forEach(row => row.style.display = "");
        return;
    }

    // Split input into words
    const terms = input.split(/\s+/).filter(Boolean);

    rows.forEach(row => {
        // Combine all cell text in the row into one string
        // Only include cells that exist (skip empty rows)
        if (!row.cells || row.cells.length === 0) {
            row.style.display = "none";
            return;
        }
        const rowText = Array.from(row.cells).map(cell => cell.textContent.toLowerCase()).join(" ");
        // Show row only if ALL terms are found somewhere in the row
        const show = terms.every(term => rowText.includes(term));
        row.style.display = show ? "" : "none";
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const infoPopup = document.getElementById('infoPopup');
    document.querySelectorAll('.info-cell').forEach(cell => {
        cell.addEventListener('mouseenter', function (e) {
            // Only show popup if data-info exists
            const info = cell.getAttribute('data-info');
            if (info) {
                infoPopup.textContent = info;
                infoPopup.style.display = 'block';
            }
        });
        cell.addEventListener('mousemove', function (e) {
            infoPopup.style.left = (e.pageX + 15) + 'px';
            infoPopup.style.top = (e.pageY + 10) + 'px';
        });
        cell.addEventListener('mouseleave', function () {
            infoPopup.style.display = 'none';
        });
    });
    document.getElementById("searchInput").placeholder =
        "Search for experience type...";
});