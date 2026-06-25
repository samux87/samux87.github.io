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
            authors: formatAuthors(getField("author")).replace(/\s+/g, " ").trim(),
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

function cleanLatex(str = "") {
    return str
        // 1. gestisce \v{c} \'{e} ecc.
        .replace(/\\[\'"`^~=.]{1}\s*{?([a-zA-Z])}?/g, (_, c) => {
            const map = {
                a: "á", e: "é", i: "í", o: "ó", u: "ú",
                A: "Á", E: "É", I: "Í", O: "Ó", U: "Ú",
                n: "ñ", N: "Ñ",
                c: "ć"
            };
            return map[c] || c;
        })

        // 2. \v{c}, \u{g} ecc.
        .replace(/\\v\s*{?([a-zA-Z])}?/g, (_, c) => {
            const map = {
                c: "č",
                C: "Č",
                z: "ž",
                s: "š"
            };
            return map[c] || c;
        })

        // 3. casi tipo \i, \j (dotless / broken latex export)
        .replace(/\\[a-zA-Z]+\s*/g, "")

        // 4. rimuove graffe residue
        .replace(/[{}]/g, "")

        // 5. compatta spazi
        .replace(/\s+/g, " ")

        // 6. fix unicode finale
        .normalize("NFC")

        .trim();
}

function formatAuthors(authorStr) {
    if (!authorStr) return "";

    return authorStr
        .split(/\s+and\s+/i)
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
