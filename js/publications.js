async function loadBibtex() {
    const response = await fetch("assets/pubs.bib");
    const bibText = await response.text();

    const publications = parseBibtex(bibText);
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
        // \'{a}, \`{e}, ecc.
        .replace(/\\['"`^~=.]{1}\s*\\?{?([a-zA-Z])}?/g, (_, c) => {
            const map = {
                a: "á", e: "é", i: "í", o: "ó", u: "ú",
                A: "Á", E: "É", I: "Í", O: "Ó", U: "Ú",
                n: "ñ", N: "Ñ",
                c: "ć"
            };
            return map[c] || c;
        })

        // \v{c}, \v{z}
        .replace(/\\v\s*\\?{?([a-zA-Z])}?/g, (_, c) => {
            const map = {
                c: "č",
                C: "Č",
                z: "ž",
                s: "š"
            };
            return map[c] || c;
        })

        // FIX CRUCIALE: V{\'\i}t → Vít
        .replace(/\\i/g, "i")

        // rimuove solo comandi residui (ma NON quelli già processati sopra)
        .replace(/\\[a-zA-Z]+/g, "")

        // pulizia finale
        .replace(/[{}]/g, "")
        .replace(/\s+/g, " ")
        .normalize("NFC")
        .trim();
}

function formatAuthors(authorStr) {
    if (!authorStr) return "";

    return authorStr
        .split(/\s+and\s+/i)
        .map(a => {
            a = cleanLatex(a);

            // "Cognome, Nome"
            if (a.includes(",")) {
                const [last, first] = a.split(",").map(s => s.trim());
                return `${first} ${last}`;
            }

            return a;
        })
        .filter(Boolean)
        .join(", ")
        .replace(/\s+/g, " ")
        .trim();
}

loadBibtex();
