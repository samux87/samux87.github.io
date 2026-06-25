async function loadBibtex() {
    const response = await fetch("assets/pubs.bib");
    const bibText = await response.text();

    const publications = parseBibtex(bibText);
    renderPublications(publications);
}

// Simple BibTeX parser (sufficient for Google Scholar export)
function parseBibtex(bib) {
    const entries = bib.split("@").slice(1);
    const results = [];

    entries.forEach(entry => {
        const type = entry.split("{")[0].trim();
        const body = entry.substring(entry.indexOf("{") + 1);

        const key = body.split(",")[0];
        const fields = body.substring(body.indexOf(",") + 1);

        const getField = (field) => {
            const regex = new RegExp(field + "\\s*=\\s*[\\{\\\"](.*?)[\\}\\\"],", "i");
            const match = fields.match(regex);
            return match ? match[1] : "";
        };

        results.push({
            type,
            key,
            title: getField("title"),
            year: getField("year"),
            journal: getField("journal") || getField("booktitle"),
            authors: formatAuthors(getField("author")),
        });
    });

    return results.sort((a, b) => (b.year || 0) - (a.year || 0));
}

function renderPublications(pubs) {
    const container = document.getElementById("pub-list");
    container.innerHTML = "";

    pubs.forEach(pub => {
        const div = document.createElement("div");
        div.className = "mb-4";

        div.innerHTML = `
            <h5>${pub.title}</h5>
            <p>
                <strong>${pub.authors}</strong><br>
                ${pub.journal ? pub.journal + "," : ""} ${pub.year || ""}
            </p>
        `;

        container.appendChild(div);
    });
}

function cleanLatex(str) {
    return str
        // rimuove wrapper {...}
        .replace(/[{}]/g, "")
        // accenti comuni BibTeX
        .replace(/\\['"`^~=.]/g, "")
        // combinazioni tipo {\v{c}} -> c
        .replace(/\\v\s*{([^}])}/g, "$1")
        .replace(/\\[a-zA-Z]+\s*{([^}])}/g, "$1")
        // cleanup spazi doppi
        .replace(/\s+/g, " ")
        .trim();
}

function formatAuthors(authorStr) {
    if (!authorStr) return "";

    return authorStr
        .split(" and ")
        .map(a => {
            a = cleanLatex(a);

            // caso "Cognome, Nome"
            if (a.includes(",")) {
                const [last, first] = a.split(",").map(s => s.trim());
                return `${first} ${last}`;
            }

            return a;
        })
        .join(", ");
}

loadBibtex();
