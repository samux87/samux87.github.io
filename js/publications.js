async function loadBibtex() {
    const response = await fetch("assets/pubs.bib");
    const bibText = await response.text();

    const parsed = bibtexParse.toJSON(bibText);

    const publications = parsed.map(entry => {
        const f = entry.entryTags;

        return {
            type: entry.entryType,
            key: entry.citationKey,
            title: cleanLatex(f.title),
            year: parseInt(f.year || "0"),
            journal: cleanLatex(f.journal || f.booktitle || ""),
            authors: formatAuthors(f.author || "")
        };
    }).sort((a, b) => b.year - a.year);

    renderPublications(publications);
}

function parseBibtex(bib) {
    const entries = bib.split("@").slice(1);
    const results = [];

    entries.forEach(entry => {
        const type = entry.split("{")[0].trim();
        const body = entry.substring(entry.indexOf("{") + 1);

        const key = body.split(",")[0]?.trim();
        const fieldsBlock = body.substring(body.indexOf(",") + 1);

        function getField(field) {
            // cattura anche multilinea e blocchi con {}
            const regex = new RegExp(
                field + "\\s*=\\s*(\\{[\\s\\S]*?\\}|\\\"[\\s\\S]*?\\\")\\s*,?",
                "i"
            );

            const match = fieldsBlock.match(regex);
            if (!match) return "";

            let value = match[1];

            // rimuove wrapper { } o " "
            value = value.replace(/^\\{|\\}$/g, "").replace(/^"|"$/g, "");

            return cleanLatex(value);
        }

        results.push({
            type,
            key,
            title: getField("title"),
            year: getField("year"),
            journal: getField("journal") || getField("booktitle"),
            authors: formatAuthors(getField("author"))
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
        // rimuove gruppi { }
        .replace(/[{}]/g, "")

        // accenti base LaTeX -> Unicode (minimo utile)
        .replace(/\\'e/g, "é")
        .replace(/\\`e/g, "è")
        .replace(/\\"o/g, "ö")
        .replace(/\\"u/g, "ü")
        .replace(/\\'a/g, "á")

        // comandi residui
        .replace(/\\[a-zA-Z]+/g, "")

        .replace(/\s+/g, " ")
        .trim();
}

function formatAuthors(authorStr) {
    if (!authorStr) return "";

    return authorStr
        .split(/\s+and\s+/i)
        .map(a => cleanLatex(a))
        .map(a => {
            if (a.includes(",")) {
                const [last, first] = a.split(",").map(s => s.trim());
                return `${first} ${last}`;
            }
            return a;
        })
        .join(", ");
}

loadBibtex();
