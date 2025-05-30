function searchTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#experienceTable tbody tr");
    const headers = document.querySelectorAll("#experienceTable thead th");
    const headerTexts = Array.from(headers).map(header => header.textContent.toLowerCase());

    rows.forEach(row => {
        let found = false;
        const experienceName = row.cells[0].textContent.toLowerCase();
        
        // First priority: direct match in experience name
        if (experienceName.includes(input)) {
            found = true;
        } 
        // Check for column-specific searches (e.g., "paid:yes")
        else if (input.includes(":")) {
            const [column, value] = input.split(":");
            const columnIndex = headerTexts.findIndex(header => header.includes(column.trim()));
            
            if (columnIndex !== -1) {
                const cellValue = row.cells[columnIndex].textContent.toLowerCase();
                if (cellValue.includes(value.trim())) {
                    found = true;
                }
            }
        } 
        // Check for concept matches (e.g., searching "paid" should show all paid positions)
        else {
            for (let i = 0; i < headerTexts.length; i++) {
                if (headerTexts[i].includes(input)) {
                    // If user searches for a column name, show rows where that column is "Yes"
                    const cellValue = row.cells[i].textContent.toLowerCase();
                    if (cellValue.includes("yes")) {
                        found = true;
                        break;
                    }
                }
            }
            
            // If no concept match, check all cells
            if (!found) {
                for (let i = 0; i < row.cells.length; i++) {
                    const cellValue = row.cells[i].textContent.toLowerCase();
                    if (cellValue.includes(input)) {
                        found = true;
                        break;
                    }
                }
            }
        }
        
        row.style.display = found ? "" : "none";
    });
}

// Update the input placeholder to give users search hints
document.getElementById("searchInput").placeholder = 
    "Search for experiences or type keywords like 'paid', 'summer', or 'credit'";